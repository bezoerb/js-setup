

//Load common code that includes config, then load the app logic for this page.
require(['app', 'jquery', 'loglevel'], function (app, $, log) {
	'use strict';
	// define loglevel
	log.setLevel(0);

	// use app here
	log.info('Starting application ...');
	app.init();
//	});
});
