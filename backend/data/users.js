import bcrypt from "bcryptjs";

const users = [
  {
    name: "William Fish",
    email: "willfish4food@live.com",
    password: bcrypt.hashSync("Wpf5902!", 10),
    isAdmin: true,
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
