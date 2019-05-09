var express = require('express');
var axios = require('axios');
var router = express.Router();

const client = axios.create({
  baseURL: 'http://www.maniadb.com/api/search/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});


router.get('/:name', async function(req, res, _next) {
  console.log(1111);
  try {
    const result = await getMusicData(encodeURI(req.params.name));
    console.log('=================================================');
    console.log(result.data);
    res.send(result.data);
  } catch (error) {
    console.log("ERROR >>>>>>>>>>>>>>>>>>>>>>>>>", req.params.name);
    console.error(error);
  }
});


async function getMusicData(name) {
  try {
    console.log('getMusicData');
    const response = await client.get(`${name}/?sr=artist&display=10&key=miriya.lee@gmail.com&v=0.5`)
    console.log('response');
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;
