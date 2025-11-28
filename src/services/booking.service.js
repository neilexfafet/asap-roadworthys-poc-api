const supabase = require("../config/supabase");

exports.fetchBookings = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, messages(*), vehicles(*), users!inner(id, name, email, role)");

  if (error) throw error;

  return data;
};

exports.createBooking = async (bookingData) => {
  const { data, error } = await supabase
    .from("bookings")
    .insert(bookingData)
    .select()
    .single();

  if (error) throw error;

  return data;
};

exports.findBookingById = async (id) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, messages(*), vehicles(*), users!inner(id, name, email, role)")
    .eq("id", id)
    .single();

  if (error) throw new Error("Booking not found");

  return data;
};

exports.fetchBookingsByUser = async (id) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, messages(*), vehicles(*), users!inner(id, name, email, role)")
    .eq("user_id", id);

  if (error) throw new Error("Booking not found");

  return data;
};

exports.updateBooking = async (id, updateData) => {
  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error("Booking not found for update");

  return data;
}
