'use strict';
const assert = require('assert');
const onlyStrings = (item) => assert.equal(typeof item, 'string', 'Item must be a string type');
const npm = require('npm-programmatic');

const RUN_ALWAYS = 'awlays';
const RUN_OPTIONAL = 'optional';
const ALLOWED_RUNMODE_LIST = [RUN_ALWAYS, RUN_OPTIONAL];

const properties = Symbol('Private properties');
class InstanceBuilder {
	constructor(conf = {}) {
		const {
			availableOptions = [],
		} = conf;

		const options = availableOptions.reduce((result, optionName) => {
			result[optionName] = true;
			return result;
		}, {});

		this[properties] = {
			required: [],
			runMode: RUN_OPTIONAL,
			plugins: [],
			additionLoaders: [],
			options,
		};
	}

	/**
	 * Webpack configuration builder
	 */
	webpack() {
		return null;
	}

	async install() {
		return this.required.length ? npm.install(this.required) : 'ok';
	}

	get environment() {
		return process.env.NODE_ENV === 'production' ? 'production' : 'development';
	}

	/**
	 * Set plugins
	 */
	plugins(...plugins) {
		plugins.forEach((pluginCallback) => assert(typeof plugin === 'function', 'Plugin is a function'));
		this[properties].plugins = plugins;
	}

	/**
	 * Get plugins list
	 * @return {Function[]} List of plugin function
	 */
	get plugins() {
		return this[properties].plugins;
	}

	/**
	 * Set required modules
	 *
	 * @param  {String[]}  [modules=[]] Array of required modules
	 * @return {[type]}              [description]
	 */
	set required(modules = []) {
		modules = Array.isArray(modules) ? modules : [modules];
		modules.forEach(onlyStrings);
		this[properties].required = modules;
	}

	get required() {
		return this[properties].required;
	}

	async config() {

	}

	async run() {

	}

	set runMode(runMode) {
		assert(['always', 'optional'].indexOf(runMode));
	}

	/**
	 * List of available option switchers
	 * @return {String[]}
	 */
	get availableOptions() {
		return Object.keys(this[properties].options);
	}

	/**
	 * Switch available
	 *
	 * @param {String} name Name of option, must be listed in available options
	 * @param {Boolean} switcher Options switcher
	 */
	option(name, switcher) {
		assert(typeof name === 'string', 'Option name must be a string');
		assert(this.availableOptions.indexOf(name) >= 0, 'Option must be defined into available options');
		assert(typeof switcher === 'boolean', 'Switcher must be boolean');

		this[properties].options[name] = switcher;
	}

	/**
	 * Set multiplie option switchers
	 * @type {Object}
	 */
	options(options = {}) {
		assert(typeof options === 'object', 'Argument options must be an object');
		Object.entries(options).map(([name, switcher]) => this.option(name, switcher))	;
	}

	/**
	 * Check if option is enabled
	 */
	optionEnabled(optionName) {
		return !!this[properties].options[optionName];
	}
}

module.exports = {InstanceBuilder, RUN_ALWAYS, RUN_OPTIONAL};
