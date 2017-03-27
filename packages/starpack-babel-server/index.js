'use strict';

const {InstanceBuilder, RUN_ALWAYS} = require('starpack-core');

const DEFAULT_OPTIONS = {
	entry: 'src/server/index.js',
	dest: 'build/server/'
};

class BabelServer extends InstanceBuilder {
	constructor(options = {}) {
		options = Object.assign({}, options, DEFAULT_OPTIONS);
		super();
		this.runMode = RUN_ALWAYS;
	}

	webpack() {
		const config = {};

		return config;
	}
}

module.exports = BabelServer;
