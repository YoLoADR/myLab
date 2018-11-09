const router = require('express').Router()
const Provider = require('../models/provider')

//MONGOOSASTIC MONGO AND ELASTICSEARCH
Provider.createMapping(function(err, mapping) {
	if (err) {
		console.log('error creating mapping')
		//console.log(err)
	} else {
		console.log('Mapping created')
		console.log(mapping)
	}
})

const stream = Provider.synchronize()
var count = 0

stream.on('data', function() {
	count++
})

stream.on('close', function() {
	console.log('Indexed ' + count + ' documents')
})

stream.on('error', function(err) {
	console.log(err)
})

// Recherche via une query string/search?q=joker = req.query.joker
router.get('/search', function(req, res, next) {
	if (req.query.q) {
		Provider.search(
			{
				query_string: { query: req.query.q }
			},
			function(err, results) {
				if (err) return next(err)
				const data = results.hits.hits.map(function(hit) {
					return hit
				})
				res.status(200).json({
					query: req.query.q,
					data: data
				})
			}
		)
	} else {
		res.status(500).send({ error: 'something blew up' })
	}
})

router.post('/search_term', function(req, res, next) {
	console.log('req.body.search_term', req.body.search_term)
	Provider.search(
		{
			query_string: { query: req.body.search_term }
		},
		function(err, results) {
			if (err) return next(err)
			res.json(results)
		}
	)
})

//PROVIDERS
//Recherche les providers (fournisseurs) dans une même catégories
router.get('/:category_id', function(req, res, next) {
	//Populate est pour récuperer toutes les datas de sa catégorie == Product.find(function())
	// chauffeur (5bdeacc15e5e020e93ae15ae), autocariste (5bdeacd65e5e020e93ae15af)
	// copywriter (5bdead2d5e5e020e93ae15b0), developer (5bdead365e5e020e93ae15b1), designer (5bdead465e5e020e93ae15b2)
	Provider.find({ category: req.params.category_id })
		.populate('category')
		.exec(function(err, providers) {
			if (err) return next(err)
			res.status(200).json({ providers: providers })
		})
})

router.get('/provider/:provider_name', function(req, res, next) {
	Provider.findOne({ name: req.params.provider_name }, function(err, provider) {
		if (err) return next(err)
		return res.status(200).json({ provider: provider })
	})
})

// id d'un chauffeur 5bdeaf6f320d2a0ec9d87ad6
router.get('/provider/:provider_id', function(req, res, next) {
	Provider.findById({ _id: req.params.provider_id }, function(err, provider) {
		if (err) return next(err)
		res.status(200).json({ provider: provider })
	})
})

module.exports = router
