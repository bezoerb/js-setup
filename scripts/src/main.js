
//Load common code that includes config, then load the app logic for this page.
require(['./config'], function () {
	'use strict';

	require(['app', 'jquery','loglevel'], function (app, $, log) {

		// define loglevel
		log.setLevel(0);

		// use app here
		log.info('Starting application ...');
		app.init();
	});
});

