const auth = async (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    }
    else {
      res.redirect('/');
    }
  };
  
  module.exports = auth;
  
  /* const webAuth = (req, res, next) => {
    if (req.session?.user) {
        res.redirect('/home')
    } else {
        next()
    }
  }
  const homeAuth = (req, res, next) => {
    if (req.session?.user) {
        next()
    } else {
        res.status(401).json({ error: 'no autorizado!' })
    }
  } */
  
  /* module.exports = {
    webAuth,
    homeAuth
  } */