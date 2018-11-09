const router = require('express').Router()
const async = require('async')
const faker = require('faker')
const Category = require('../models/category')
const Product = require('../models/product')
const Provider = require('../models/provider')

//Product Generator
router.get('/product/:name', (req, res, next) => {
	async.waterfall([
		callback => {
			Category.findOne({ name: req.params.name }, (err, category) => {
				if (err) return next(err)
				callback(null, category)
			})
		},
		(category, callback) => {
			for (var i = 0; i < 30; i++) {
				const product = new Product()
				product.category = category._id
				product.name = faker.commerce.productName()
				product.price = faker.commerce.price()
				product.image = faker.image.image()

				product.save()
			}
		}
	])
	res.json({ message: `Success ${req.params.name} have been create in` })
})

//Provider Generator
router.get('/provider/:name', (req, res, next) => {
	async.waterfall([
		callback => {
			Category.findOne({ name: req.params.name }, (err, category) => {
				if (err) return next(err)
				callback(null, category)
			})
		},
		(category, callback) => {
			for (var i = 0; i < 10; i++) {
				const provider = new Provider()
				provider.category = category._id
				provider.email = faker.internet.email()
				provider.password = '1234'
				provider.profile.name = faker.commerce.productName()
				provider.profile.companyName = faker.company.companyName()
				provider.profile.picture = faker.internet.avatar()
				provider.profile.title = faker.name.jobTitle()
				provider.profile.jobDescription = faker.lorem.paragraph()
				provider.profile.domainName = faker.internet.domainName()
				provider.profile.rate = faker.commerce.price()
				provider.profile.iban = faker.finance.iban()
				provider.address = faker.address.streetAddress()
				provider.city = 'Paris'
				provider.country = 'France'
				provider.phone = faker.phone.phoneNumber()
				provider.image = faker.image.image()

				provider.save()
			}
		}
	])
	res.json({ message: `Success ${req.params.name} have been create in` })
})

module.exports = router
