const axios = require('axios')

module.exports = async (req, res) => {
  const result = await axios({
    method: 'POST',
    url: `https://api.tinify.com/shrink`,
    headers:{
      'authorization':'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
      'Content-type':'application/json'
    },
    data:JSON.stringify({
        "source": {
            "url": "https://tinypng.com/images/panda-happy.png"
        }
      })
  })
  res.json({
    status: 'ok',
    data: result.data
  })
}

