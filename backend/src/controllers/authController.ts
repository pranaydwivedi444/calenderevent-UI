import { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import checkValidation from "../lib/zodValidation.js";
import prisma from "../db/db.js";


export const register = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const result = checkValidation(req.body);
  if (!result.isValid) {
    return res.status(400).json(result.errors);
  }
  const { name, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email: email ,
      },
    });
    console.log(user);
    res.json({ message: "User registered successfully , Now Login Again" });
  } catch (error) {
    res.status(400).json({ error: "Phone number already registered" });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
    //not mentioning the problem because of security issues
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || "secret_key",
    { expiresIn: "7d" }
  );

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
    maxAge: 60 * 60 * 1000,
  });

  res.json({ message: "Login successful" });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("access_token");
  res.json({ message: "Logged out successfully" });
};
