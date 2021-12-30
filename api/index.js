const axios = require('axios')

module.exports = async (req, res) => {
  const image = req.data;
  const result = await axios({
    method: 'post',
    url: `https://api.tinify.com/shrink`,
    headers:{
      'authorization':'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
      'Content-type':'application/json'
    },
    body:image
  })

  res.json({
    status: 'ok',
    data: result.data
  })
}