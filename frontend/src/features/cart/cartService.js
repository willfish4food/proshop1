import axios from "axios";

// Register product
const addCartItem = async (id, qty) => {
  const { data } = await axios.get(`/api/products/${id}`);

  return {
    product: id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty,
  };
};

const removeCartItem = async (id) => {
  return id;
};

const cartService = {
  addCartItem,
  removeCartItem,
};

export default cartService;
