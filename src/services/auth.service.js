const bcrypt = require("bcrypt");
const supabase = require("../config/supabase");

const SALT_ROUNDS = 10;

exports.registerUser = async ({ email, password, name, phone_number }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    throw new Error("Invalid email format.");
  }

  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) throw new Error("User with this email already exists.");

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const { data, error } = await supabase
    .from("users")
    .insert({
      email,
      password: hashedPassword,
      name,
      phone_number,
      role: "customer",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

exports.loginUser = async ({ username, password }) => {
  const { data, error } = await supabase.from("users").select("*")
    .or(`email.eq.${username},phone_number.eq.${username}`)
    .single();

  console.log(username);

  if (error || !data) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, data.password);
  if (!valid) throw new Error("Invalid credentials");

  return data;
};

exports.findUserById = async (id) => {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();

  if (error || !data) throw new Error("User not found");

  return data;
}
