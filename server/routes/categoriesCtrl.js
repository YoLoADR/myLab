var router = require('express').Router()
var Category = require('../models/category')

//CATEGORIES
router.get('/', function(req, res, next) {
	Category.find(function(err, categories) {
		if (err) return next(err)
		return res.status(200).json({ categories: categories })
	})
})

router.get('/category/:category_name', function(req, res, next) {
	Category.findOne({ name: req.params.category_name }, function(err, category) {
		if (err) return next(err)
		return res.status(200).json({ category: category })
	})
})

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

module.exports = router
