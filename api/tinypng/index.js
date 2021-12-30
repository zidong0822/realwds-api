const fetch = require('fetch')
module.exports = async (req, res) => {
  const result = await fetch('https://api.tinify.com/shrink/',{method:'POST',headers:{'Content-type':'application/json','authorization':'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy'},body:JSON.stringify({
    "source": {
      "url": "https://tinypng.com/images/panda-happy.png"
    }
  })}).then(aa=>aa.json()).then(bb=>bb)

  res.json({
    status: 'ok',
    data: result
  })
}