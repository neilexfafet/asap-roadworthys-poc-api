const axios = require('axios');
const servicem8Service = require("../services/servicem8.service");

exports.auth = async (req, res) => {
  try {
    const authParams = {
      grant_type: 'authorization_code',
      client_id: process.env.SERVICEM8_CLIENT_ID,
      client_secret: process.env.SERVICEM8_CLIENT_SECRET,
      code: req.query.code,
      redirect_uri: process.env.API_URL+'/servicem8/auth'
    };
    
    const response = await axios.post('https://go.servicem8.com/oauth/access_token', authParams);
    await servicem8Service.authorize(
      {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token
      }
    )
    res.status(201).json({message: 'Authenticated successfully'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.retrieveForms = async (req, res) => {
  try {
    const forms = await servicem8Service.retrieveForms()
    res.status(200).json(forms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
