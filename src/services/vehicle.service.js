const supabase = require("../config/supabase");

exports.createVehicle = async (vehicleData) => {
  const { data, error } = await supabase
    .from("vehicles")
    .insert(vehicleData)
    .select()
    .single();

  if (error) throw error;

  return data;
};