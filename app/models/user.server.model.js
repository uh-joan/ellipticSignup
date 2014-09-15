'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
    validator = require ('validator');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property && property.length>2);
};

var validateLocalStrategyPropertyCountry = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property && property.length>1);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
    //console.log(this.provider !== 'local' || (password && password.length > 6));
	return (this.provider !== 'local' || (password && password.length > 7));
};

/**
 * A Validation function for local strategy email
 */
/*var validateLocalStrategyEmail = function(email2) {
    console.log(this.email);
    console.log(email2);
    console.log('emails not the same? ',this.email !== this.email2  );
    return (this.email !== this.email2 );
};

var many= [
    {validator: validateLocalStrategyEmail, msg :'Emails don\'t match'},
    {validator: validateLocalStrategyProperty, msg :'Please re-enter email'}
];*/

var validateEmails = function(email2) {
    return (validator.equals(email2, this.email) );
};

var validateNumber = function(phone) {
    return (validator.isNumeric(phone)   );
};

/**
 * User Schema
 */
var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
	lastName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	},
    address1: {
        type: String,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your address']
    },
    address2: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your city']
    },
    postal: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your postal/zip code']
    },
    country: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyPropertyCountry, 'Please fill in your country']
    },
    phone: {
        type: Number,
        default: '',
        trim: true,
        validate: [validateNumber, 'Please fill in your phone number'],
        match: [/^\d+$/, 'Please fill in a valid number']
    },
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
        trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
    email2: {
        type: String,
        trim: true,
        default: '',
        validate: [validateEmails, 'Emails do not match'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
	username: {
		type: String,
		unique: 'testing error message',
		required: 'Please fill in a username',
		trim: true
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should at least 8 characters long']
	},
    password2: {
        type: String,
        default: '',
        validate: [validateLocalStrategyPassword, 'Password should at least 8 characters long']
    },
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
  	resetPasswordExpires: {
  		type: Date
  	}
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

//UserSchema.set('username', this.email);


//UserSchema.path('email2').validate(function(){
    //console.log (validator.equals(this.email2, this.email));
//   if  (!validator.equals(this.email2, this.email)){
//       this.invalidate ('email2','Emails must match');
//   }
//},null);

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);

