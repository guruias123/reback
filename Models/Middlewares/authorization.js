const authorization = (...types) => {
    return (req, res, next) => {
      if (!types.includes(req.user.type)) {
        return res.json({
          success: false,
          msg: `Role (${req.user.type}) is not allowed to acccess this resource`,
        })
      }
      next()
    }
  }
  
  export default authorization