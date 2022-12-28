import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts, reset } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (!userInfo) {
      nav("/login");
    }
    dispatch(listProducts());
    /* return () => {
      dispatch(reset());
    }; */
  }, [userInfo, nav, dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
