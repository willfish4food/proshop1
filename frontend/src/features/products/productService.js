import axios from "axios";

// Register product
const listProducts = async () => {
  const { data } = await axios.get("/api/products");
  return data;
};

const productDetails = async (id) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

const deleteProduct = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.delete(`/api/products/${id}`, config);

  return console.log(`Product ${id} deleted`);
};

const createProduct = async (product, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(`/api/products`, product, config);
  return data;
};

const updateProduct = async (product, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    `/api/products/${product._id}`,
    product,
    config
  );
  return data;
};

const createProductReview = async (productId, review, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(
    `/api/products/${productId}/reviews`,
    review,
    config
  );
  return data;
};

const listTopProducts = async () => {
  const { data } = await axios.get(`/api/products/top`);
  return data;
};

const productService = {
  listProducts,
  productDetails,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  listTopProducts,
};

export default productService;
