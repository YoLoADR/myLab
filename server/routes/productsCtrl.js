const router = require('express').Router()
const Product = require('../models/product')

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

const stream = Product.synchronize()
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
router.get('/search', function(req, res, next) {
	if (req.query.q) {
		Product.search(
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

//PRODUCTS
//Recherche les providers (fournisseurs) dans une même catégories
router.get('/:category_id', function(req, res, next) {
	//Populate est pour récuperer toutes les datas de sa catégorie == Product.find(function())
	// high-tech (5bdeb5c57223f90fa92dd26d), cadeau (5bdeb6227223f90fa92dd26e), gadgets (5bdd3a2adebfc706bc7d606b)
	Product.find({ category: req.params.category_id })
		.populate('category')
		.exec(function(err, products) {
			if (err) return next(err)
			res.status(200).json({ products: products })
		})
})

router.get('/product/:product_name', function(req, res, next) {
	Product.findOne({ name: req.params.product_name }, function(err, product) {
		if (err) return next(err)
		return res.status(200).json({ product: product })
	})
})

router.get('/product/:product_id', function(req, res, next) {
	Product.findById({ _id: req.params.product_id }, function(err, product) {
		if (err) return next(err)
		res.status(200).json({ product: product })
	})
})

module.exports = router
