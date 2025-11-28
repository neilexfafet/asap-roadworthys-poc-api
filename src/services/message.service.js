const supabase = require("../config/supabase");

exports.create = async (messageData) => {
  const { data, error } = await supabase
    .from("messages")
    .insert(messageData)
    .select()
    .single();

  if (error) throw error;

  return data;
};
