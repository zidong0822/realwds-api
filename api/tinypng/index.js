const axios = require('axios')

module.exports = async (req, res) => {
  
  const result = await axios({
    method: 'get',
    url: `https://api.tinify.com/shrink`
  })

  res.json({
    status: 'ok',
    data: result.data
  })
}