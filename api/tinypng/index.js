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
  const data = await postImageData(req);
  console.log('1111111', data);
  const result = await axios({
    method: 'POST',
    url: `https://api.tinify.com/shrink`,
    headers: {
      'authorization': 'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
      'Content-type': 'application/json'
    },
    data: data
  })
  const saveResult =  await savePngToStorage(result.data);
  console.log('123123123', saveResult);
  res.json(result.data);
}

const savePngToStorage = async (data) => {
  const imageUrl = data.output.url;
  const arr = imageUrl.split('/');
  const imageName = arr[arr.length - 1];
  return new Promise(async (resolve, reject) => {
    axios({
      method: 'POST',
      url: imageUrl,
      headers: {
        'authorization': 'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
        'Content-type': 'application/json'
      },
      data: JSON.stringify({
        "store": {
          "service": "gcs",
          "gcp_access_token": "ya29.a0ARrdaM-rh0PjHPIpUKoiOA96L5q4ckys9EF9sA1qmY9agO-A-X3J8SKwCPyy2Tmu2d-FbiiEIHjy1fzBn1hN6E08jfsd5a8fm1TELIR-wygfMg4hosuA2kHCt-g1MQC5Ixm-xPQpYI0CnUZBpmnJ4TLJrug2",
          "path": `bujuan101/${imageName}`
        }
      })
    }).then(result => {
      resolve(result)
    })
  })
}

const postImageData = async (req) => {
  return new Promise(async (resolve, reject) => {
    let msg = []
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      resolve(buf);
    })
  })
}

module.exports = allowCors(getTinyPng);