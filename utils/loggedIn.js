const withAuth = (req, res, next) => {
    // redirect request to login route
    if (!req.session.logged_in) {
      res.redirect('/profile');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;