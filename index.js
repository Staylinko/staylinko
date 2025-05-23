const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const NAMECHEAP_API_USER = process.env.NAMECHEAP_API_USER;
const NAMECHEAP_API_KEY = process.env.NAMECHEAP_API_KEY;
const NAMECHEAP_USERNAME = process.env.NAMECHEAP_USERNAME;
const CLIENT_IP = process.env.CLIENT_IP;

app.post('/check-domain', async (req, res) => {
  const { domain } = req.body;

  const params = new URLSearchParams({
    ApiUser: NAMECHEAP_API_USER,
    ApiKey: NAMECHEAP_API_KEY,
    UserName: NAMECHEAP_USERNAME,
    ClientIp: CLIENT_IP,
    Command: 'namecheap.domains.check',
    DomainList: domain
  });

  try {
    const response = await axios.get(`https://api.namecheap.com/xml.response?${params}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
