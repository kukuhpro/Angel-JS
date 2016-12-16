'use strict';

var mandrillTransport = require('nodemailer-mandrill-transport');

class Mandrill {
	constructor(core) {
		this.core = core;
		this.MandrillConfig = {
			auth: {
				apiKey: this.core.env.mandrillApiKey
			}
		};

		return this.register();
	}

	register() {
		const MandrillTransport = mandrillTransport(this.MandrillConfig);
		this.core.make('MandrillTransport', MandrillTransport);
		return this.core;
	}
}

module.exports = Mandrill;