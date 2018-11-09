//const adminRoutes = require('./routes/admin')
const categoriesRoutes = require('./routes/categoriesCtrl')
const productsRoutes = require('./routes/productsCtrl')
const providersRoutes = require('./routes/providersCtrl')
const apiGeneratorRoutes = require('./api/apiGeneratorRoutes')
const Category = require('./models/category')
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

	expressServer.use(function(req, res, next) {
		Category.find({}, function(err, categories) {
			if (err) return next(err)
			res.locals.categories = categories
			next()
		})
	})
	//expressServer.use(adminRoutes)
	expressServer.use('/categories', categoriesRoutes)
	expressServer.use('/products', productsRoutes)
	expressServer.use('/providers', providersRoutes)
	expressServer.use('/api', apiGeneratorRoutes)
}
