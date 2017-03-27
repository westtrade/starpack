'use strict';
const babelServer = require('starpack-babel-server');

const {expect} = require('chai');
const {InstanceBuilder} = require('../');

describe('InstanceBuilder', function () {
	let builder;

	beforeEach(function() {
		builder = new InstanceBuilder();
	});

	describe('#set required(modules)', function () {
		it('set one module', function () {
			builder.required = 'json-loader';
			expect(builder.required).that.is.an('array').to.include.members(['json-loader']);
		});

		it('set multiplie modules', function () {
			builder.required = ['json-loader', 'html-loader'];
			expect(builder.required).is.eql(['json-loader', 'html-loader']);
		});

		it('has error if argument is not a string', function () {
			expect(() => {builder.required = 0}).to.throw(Error);
		});
	});
});


describe('Server configuration', function () {

	let builder;

	beforeEach(function() {
		builder = new babelServer({
			entry: 'src/server/',
			dist: 'src/build/server/',
		});
	});

});
