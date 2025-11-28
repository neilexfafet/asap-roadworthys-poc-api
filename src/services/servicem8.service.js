require("dotenv").config();
const supabase = require("../config/supabase");
const axios = require('axios');

const API_BASE_URL = 'https://api.servicem8.com/api_1.0';
const AUTH_TOKEN = process.env.SERVICEM8_TOKEN;

exports.authorize = async (authData) => {
    try {
      const { data, error } = await supabase
      .from("servicem8_credentials")
      .upsert({ ...authData, id: 1 })
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error authentication from ServiceM8:', error.response ? error.response.data : error.message);
    throw new Error('Failed to authenticate.');
  }
}

exports.retrieveForms = async () => {
  try {
    const servicem8creds = await supabase.from("servicem8_credentials").select("*").eq("id", 1).single();
    const response = await axios.get(`${API_BASE_URL}/form.json`, {
      headers: { 
        'Authorization': `Bearer ${servicem8creds.access_token}`,
        'X-Api-Key': AUTH_TOKEN,
        'Content-Type': 'application/json'
      },
      // maxRedirects: 0
    });

    return response.data;
  } catch (error) {
    console.error('Error retrieving forms from ServiceM8:', error.response ? error.response.data : error.message);
    throw new Error('Failed to retrieve forms from ServiceM8.');
  }
};
