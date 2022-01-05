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
    const data =  await postImageData(req);
    const result = await axios({
      method: 'POST',
      url: `https://api.tinify.com/shrink`,
      headers:{
        'authorization':'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
        'Content-type':'application/json'
      },
      data:data
    })
    //const gcsData = await saveTinyPng(result.data);
    //console.log(gcsData);
    res.json(result.data);
}

const saveTinyPng = async (data) => {
  return new Promise(async (resolve, reject) => {
  const url = data.output.url;
  const arr = url.split('/')
  const name = arr[arr.length - 1];
  const result = await axios({
    method: 'POST',
    url: `${url}`,
    headers:{
      'authorization':'Basic YXBpOlRQUmg0RlpRWkhQTmpOUW5WTlhYWjNjSnh5eWJGVGgy',
      'Content-type':'application/json'
    },
    data:JSON.stringify({
        "store" : {
          "service": "gcs",
          "gcp_access_token": "ya29.a0ARrdaM-zHGD_147x6L5krgoEdUdGq_NjU6J7A6AdkZXeOgznNkv3vIAjsGhA2cGmQ03DmMHPka0p1SOhrRHZAEdpwqOXVM_1QgJGZFxixCUnCuTtxba5X6Zcq8aI3wiXgPEdWfJ18wPPEbsy_AHnKOPFGnhO",
          "path": `xiabanba/${name}`
        }
      })
    })
    resolve(result.data);
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
