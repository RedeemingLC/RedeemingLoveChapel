"use strict";

const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* =========================
   🔐 Protect - Verify Logged In User
========================= */
const protect = async (req, res, next) => {
  let token;

  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Not authorized, user no longer exists",
      });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({
      message: "Token failed",
    });
  }
};

/* =========================
   👑 Admin Only Access
========================= */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admins only" });
  }
};

module.exports = {
  protect,
  adminOnly,
};
