module.exports = async (req, res) => {
    const result = await axios({
      method: 'get',
      url: `http://cn.bing.com/HPImageArchive.aspx?format=js&idx=${1}&n=${1}`
    })
  
    res.json({
      status: 'ok',
      data: result.data
    })
  }