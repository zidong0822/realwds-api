const axios = require('axios')
const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
}
const getTinyPng = async (req, res) => {
    const url = req.query.url;
    const result = await axios({
      url: url,
      responseType: 'arraybuffer',
      headers:{
        'authorization':'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy'
      }
    })
    const  base64 =  `data:${result.headers['content-type']};base64,${Buffer.from(String.fromCharCode(...new Uint8Array(result.data)), 'binary')
    .toString('base64')}`
    res.json({
        status: 'ok',
        data: base64
    });
}

module.exports = allowCors(getTinyPng);