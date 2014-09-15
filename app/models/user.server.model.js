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
 * A Validation function for local strategy properties
 */
var validateLocalStrategyAtLeastOne = function() {
    return ( this.passport || this.social || this.driving);
};

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
    prevAddress1: {
        trim: true,
        type: String,
        default: ''
    },
    prevAddress2: {
        trim: true,
        type: String,
        default: ''
    },
    prevCity: {
        trim: true,
        type: String,
        default: ''
    },
    prevPostal: {
        trim: true,
        type: String,
        default: ''
    },
    prevCountry: {
        trim: true,
        type: String,
        default: ''
    },
	username: {
        trim: true,
		type: String,
		unique: 'testing error message',
		required: 'Please fill in a username'
	},
	password: {
		type: String,
		default: '',
        trim: true,
		validate: [validateLocalStrategyPassword, 'Password should at least 8 characters long']
	},
    password2: {
        type: String,
        default: '',
        trim: true,
        validate: [validateLocalStrategyPassword, 'Password should at least 8 characters long']
    },
    dateOfBirth: {
        type: Date,
        default: ''
        //validate: [validateLocalStrategyProperty, 'Please fill in your date']
        //match: [/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/, 'Please fill a valid date of birth (mm/dd/yyyy)']
    },
    passport: {
        type: String,
        default: '',
        trim: true,
        validate: [validateLocalStrategyAtLeastOne, 'Please fill at least one Passport Number, Driving License or Social security Number']
        //match: [/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/, 'Please fill a valid date of birth (mm/dd/yyyy)']
    },
    driving: {
        type: String,
        default: '',
        trim: true,
        validate: [validateLocalStrategyAtLeastOne, 'Please fill at least one Passport Number, Driving License or Social security Number']
        //match: [/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/, 'Please fill a valid date of birth (mm/dd/yyyy)']
    },
    social: {
        type: String,
        default: '',
        trim: true,
        validate: [validateLocalStrategyAtLeastOne, 'Please fill at least one Passport Number, Driving License or Social security number']
        //match: [/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/, 'Please fill a valid date of birth (mm/dd/yyyy)']
    },
    mothersName: {
        type: String,
        default: '',
        trim: true,
        validate: [validateLocalStrategyProperty, 'Please fill in your mother\'s maiden name']
        //match: [/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/, 'Please fill a valid date of birth (mm/dd/yyyy)']
    },
    school: {
        type: String,
        default: '',
        trim: true,
        validate: [validateLocalStrategyProperty, 'Please fill in the name of first school attended']
        //match: [/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/, 'Please fill a valid date of birth (mm/dd/yyyy)']
    },
    liability: {
        type: Number,
        default: '',
        trim: true,
        validate: [validateNumber, 'Please specify our Liability Limit for your account in GBP']//,
        //match: [/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/, 'Please fill a valid date of birth (mm/dd/yyyy)']
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
	if (this.password && this.password.length > 7) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

    if (this.password2 && this.password2.length > 7) {
        this.password2 = this.hashPassword(this.password2);
    }

	next();
});

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

