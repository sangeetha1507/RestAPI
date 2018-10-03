module.exports = (app) => {
    const userController = require('../controllers/user.controller.js');
    var jwt = require('jsonwebtoken');

    function validateUser(req, res, next) {
	  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
	    if (err) {
	      res.json({status:"error", message: err.message, data:null});
	    }else{
	      // add user id to request
	      req.body.userId = decoded.id;
	      next();
	    }
	  });
	  
	}

    app.post('/register',  userController.create);

    app.post('/authenticate', userController.authenticate);

    app.post('/index',validateUser, userController.hello);

}