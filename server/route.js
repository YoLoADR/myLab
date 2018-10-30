const AuthentificationController = require('./controllers/authentification')
require('./services/passport')
const passport = require('passport')
const requireToken = passport.authenticate('jwt', { session: false })
const requireValideCredentials = passport.authenticate('local', { session: false })

module.exports = function(expressServer) {
	expressServer.post('/signup', AuthentificationController.signup)
	expressServer.get('/specialRessource', requireToken, function(req, res) {
		res.send({ result: "Ca c'est de la ressource de qualité" })
	})
	expressServer.post('/signin', requireValideCredentials, AuthentificationController.signin)
}
