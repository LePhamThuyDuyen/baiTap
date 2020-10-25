const express = require("express");
const SinhVien = require("./routes/students"); // Tách nhỏ API sang file students.js
const bodyParser = require("body-parser");
const axios = require('axios');
require('dotenv').config();
const app = express();

const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true })); // Nhiệm vụ chuyển body thành x-www-urlencoded cho request
app.use(bodyParser.json()); // Nhiệm vụ chuyển body thành json cho request
app.use("/api/students", SinhVien); //import các api con (router) cho app
app.set('view engine', 'ejs'); // Nhiệm vụ render html từ code

//Từ nay không nghỉ nữa

app.get('/', async function(req, res) {
  const rootUrl = `http://${req.get('host')}`;
  var data = await axios.get(`${rootUrl}/api/students/getall`);
  res.render('index.ejs',{
    Datatbl : data.data.Items,
    rurl: rootUrl
  });
});

app.listen(port, () => {
  console.log(`${process.env.LEDUYEN} dang chay tai http://localhost:${port}`);
});

