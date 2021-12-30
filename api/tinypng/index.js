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
 let msg = []
 req.on('data', (chunk) => {
  if (chunk) {
   msg.push(chunk)
  }
 })
 req.on('end', () => {
  let buf = Buffer.concat(msg)
    const result = await axios({
      method: 'POST',
      url: `https://api.tinify.com/shrink`,
      headers:{
        'authorization':'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
        'Content-type':'application/json'
      },
      data: buf
    })
    res.json(result.data)
 })
    
  }

module.exports = allowCors(getTinyPng);
