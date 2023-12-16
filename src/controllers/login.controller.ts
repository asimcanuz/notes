import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/schemas/userSchema";
import { CustomRequest } from "../types";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils";

const loginController = {
  renderLoginView: (req: CustomRequest, res: Response) => {
    res.render("login", {
      title: "Login",
      errors: req.session?.flash?.error || [],
    });
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Find the user by email in the database
      const user = await UserModel.findOne({ email });

      if (!user) {
        req.flash("error", "Invalid email or password!");
        return res.redirect("/login");
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        req.flash("error", "Invalid email or password!");
        return res.redirect("/login");
      }

      const accessToken = generateAccessToken({email:user.email})
      const refreshToken = generateRefreshToken({email:user.email})

      // Set the token as a cookie or send it in the response
      res.cookie("access-token", accessToken);
      res.cookie("refresh-token", refreshToken);

      res.redirect("/dashboard");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default loginController;
