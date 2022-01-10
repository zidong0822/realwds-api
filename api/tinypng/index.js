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
  try {
    const result = await axios({
      method: 'POST',
      url: `https://api.tinify.com/shrink`,
      headers: {
        'authorization': 'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
        'Content-type': 'application/json'
      },
      data: data
    })
    console.log('result',result);
    //const saveResult =  await savePngToStorage(result.data);
    res.json(result.data);
  }catch(error){
    console.log('result',error);
  }
}

const savePngToStorage = async (data) => {
  const outPutUrl = data.output.url;
  const outPutType = data.output.type;
  const name = outPutUrl.split('/').pop();
  const type = outPutType.split('/').pop()
  return new Promise(async (resolve, reject) => {
    axios({
      method: 'POST',
      url: outPutUrl,
      headers: {
        'authorization': 'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
        'Content-type': 'application/json'
      },
      data: JSON.stringify({
        "store": {
          "service": "gcs",
          "gcp_access_token": "ya29.a0ARrdaM8FNrLZ29J2mHKdVRDlbCGKQo4cB86PODrOzpyPh3QvZc5sPXvSo8EThVR5Wm6-woTJpLqf-CRcJPDOXaasfHCpcEB5crqfz9itwcXh2P2drl0CuwsbndqMv-GmeaA9WDWCyuZmpvEAN6-cegd13Ega",
          "path": `bujuan101/${name}.${type}`,
          "headers": {
            "Content-Disposition": `attachment; filename=${name}.${type}`
          }
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