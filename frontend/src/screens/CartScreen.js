import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { addCartItem } from "../features/cart/cartSlice";

const CartScreen = () => {
  let { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty"));
  console.log(typeof qty);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCartItem(id, qty));
  }, [dispatch, id]);

  return (
    <>
      {id} : {qty}
      {cartItems.name}
    </>
  );
};

export default CartScreen;
