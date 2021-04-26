const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	tokens: [{
		token: {
			type: String,
		}
	}]
})

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner'
})

const User = mongoose.model("User", userSchema);
module.exports = User;


