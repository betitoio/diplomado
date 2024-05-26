
module.exports = function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
      return next();
    } else {
      res.status(401).json({ message: 'Acceso no autorizado. Por favor, inicie sesión.' });
    }
  };
  