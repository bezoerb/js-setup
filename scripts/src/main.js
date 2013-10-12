require.config({
	paths: {
		tests: '../../test/tests',
		jquery: 'vendor/jquery/jquery',
		loglevel: 'vendor/loglevel/dist/loglevel.min',
		requirejs: 'vendor/requirejs/require',
		'conponent-dummy': 'components/dummy'
	}
});


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
