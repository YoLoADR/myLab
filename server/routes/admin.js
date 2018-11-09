var router = require('express').Router()
var Category = require('../models/category')
var Product = require('../models/product')
var Provider = require('../models/provider')

//MONGOOSASTIC MONGO AND ELASTICSEARCH
Product.createMapping(function(err, mapping) {
	if (err) {
		console.log('error creating mapping')
		//console.log(err)
	} else {
		console.log('Mapping created')
		console.log(mapping)
	}
})

var stream = Product.synchronize()
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

// /search?q=joker = req.query.joker
router.get('/products/search', function(req, res, next) {
	if (req.query.q) {
		Product.search(
			{
				query_string: { query: req.query.q }
			},
			function(err, results) {
				if (err) return next(err)
				var data = results.hits.hits.map(function(hit) {
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
//CATEGORIES
router.get('/add-category', function(req, res, next) {
	res.json({ message: 'success' })
})

router.post('/add-category', function(req, res, next) {
	const name = req.body.name
	const category = new Category({
		name: name
	})

	category.save(function(err) {
		if (err) return next(err)
		res.status(200).json({ status: 'Successfully added a category' })
	})
})

//PRODUCTS

router.get('/products/:category_id', function(req, res, next) {
	//Populate est pour récuperer toutes les datas de sa catégorie == Product.find(function())
	// high-tech (5bdeb5c57223f90fa92dd26d), cadeau (5bdeb6227223f90fa92dd26e), gadgets (5bdd3a2adebfc706bc7d606b)
	Product.find({ category: req.params.category_id })
		.populate('category')
		.exec(function(err, products) {
			if (err) return next(err)
			res.status(200).json({ products: products })
		})
})

router.get('/product/:product_id', function(req, res, next) {
	Product.findById({ _id: req.params.product_id }, function(err, product) {
		if (err) return next(err)
		res.status(200).json({ product: product })
	})
})

//PROVIDERS

router.get('/providers/:category_id', function(req, res, next) {
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

router.get('/provider/:product_id', function(req, res, next) {
	Provider.findById({ _id: req.params.product_id }, function(err, product) {
		if (err) return next(err)
		res.status(200).json({ product: product })
	})
})

module.exports = router
