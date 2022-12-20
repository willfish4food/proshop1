import axios from "axios";

// Register product
const addCartItem = async (id, qty) => {
  const { data } = await axios.get(`/api/products/${id}`);

  const item = {
    product: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
  };

  return { ...item, qty };
};

const cartService = {
  addCartItem,
};

export default cartService;
