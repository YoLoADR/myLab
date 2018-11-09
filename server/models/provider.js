const mongoose = require('mongoose')
const mongoosastic = require('mongoosastic')
const Schema = mongoose.Schema

var ProviderSchema = new Schema({
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	email: { type: String, unique: true, lowercase: true },
	password: String,
	profile: {
		name: { type: String, default: '' },
		companyName: { type: String, default: '' },
		picture: { type: String, default: '' },
		title: { type: String, default: '' },
		jobDescription: { type: String, default: '' },
		domainName: { type: String, default: '' },
		rate: { type: Number, default: 10 },
		iban: { type: String, default: '' }
	},
	address: String,
	city: { type: String, default: '' },
	country: { type: String, default: '' },
	phone: String
})

ProviderSchema.plugin(mongoosastic, {
	hosts: ['localhost:9200']
})

module.exports = mongoose.model('Provider', ProviderSchema)
