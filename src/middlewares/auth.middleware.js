const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { data, error } = await supabase.from("users").select("*").eq("id", decoded.id).single();

    if (error || !data) return res.status(401).json({ error: "Invalid token" });

    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
