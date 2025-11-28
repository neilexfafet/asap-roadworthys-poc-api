const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    await authService.registerUser(req.body);
    res.status(201).json({ success: true, message: "User registered successfully"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await authService.loginUser(req.body);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res
      .status(403)
      .json({ error: "A token is required for authentication." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await authService.findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }
    req.user = user;
    res.status(200).json({ user, verified: true });
  } catch (err) {
    return res.status(401).json({ error: "Invalid Token." });
  }

  return next();
};
