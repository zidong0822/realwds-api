const axios = require('axios')

module.exports = async (req, res) => {
  
  const result = await axios({
    method: 'post',
    url: 'https://api.tinify.com/shrink'
  })
  console.log('测试结果',result);
  res.json({
    status: 'ok',
    data: result.data
  })
}