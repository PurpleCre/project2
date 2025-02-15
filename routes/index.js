const routes = require('express').Router();
const passport = require("passport");

routes.use('/', require('./swagger'));
routes.get('/', (req, res) => {
  // swagger.tags=['Hello World']
  res.send('Hello World');
});

routes.get("/login", passport.authenticate("github"), (req, res) => { })
routes.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect("/");
  });
});

routes.use('/certificates', require('./certificates'));
routes.use('/degrees', require('./degrees'));

module.exports = routes;
