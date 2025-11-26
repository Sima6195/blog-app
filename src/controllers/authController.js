import prisma from "../prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export async function register(req, res) {
  const { name, email, password } = req.body;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashed }
  });

  res.json({
    message: "User created",
    token: generateToken(user)
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: "Invalid email" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  res.json({
    message: "Login successful",
    token: generateToken(user)
  });
}