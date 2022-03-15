import bcrypt from "bcrypt"

const users = [
  {
    name: "admin adesholly",
    email: "adesholly@example.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: true,
  },
  {
    name: "marry woman",
    email: "adeshop@example.com",
    password: bcrypt.hashSync("12345678", 10),
  },

  {
    name: "daniel man",
    email: "ibrahim@example.com",
    password: bcrypt.hashSync("12345678", 10),
  },
]

export default users
