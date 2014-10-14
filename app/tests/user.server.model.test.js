'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Globals
 */
var user, user2;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			address1: 'Address1',
			address2: 'Address2',
			city: 'City',
			postal: 'AL100S0',
			contry: 'United Kingdom',
			phone: '0044123456789',
			email2: 'test@test.com',
			prevAddress1: 'prevAddress1',
			prevAddress2: 'prevAddress2',
			prevCity: 'prevPostal',
			prevPostal: 'AL100S0',
			prevCountry: 'United Kingdom',
			password2: 'password2',
			dateOfBirth: '21/01/1980' ,
			passport: 'passport',
			driving: 'driving',
			social: 'social',
			mothersName: 'mothersName',
			liability: '1000',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});
		user2 = new User({
			firstName: 'Full',
			lastName: 'Name',
			address1: 'Address1',
			address2: 'Address2',
			city: 'City',
			postal: 'AL100S0',
			contry: 'United Kingdom',
			phone: '0044123456789',
			email2: 'test@test.com',
			prevAddress1: 'prevAddress1',
			prevAddress2: 'prevAddress2',
			prevCity: 'prevPostal',
			prevPostal: 'AL100S0',
			prevCountry: 'United Kingdom',
			password2: 'password2',
			dateOfBirth: '21/01/1980' ,
			passport: 'passport',
			driving: 'driving',
			social: 'social',
			mothersName: 'mothersName',
			liability: '1000',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			user.save(done);
		});

		it('should fail to save an existing user again', function(done) {
			user.save();
			return user2.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without first name', function(done) {
			user.firstName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	after(function(done) {
		User.remove().exec();
		done();
	});
});
