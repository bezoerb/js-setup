require.config({
	baseUrl: '../scripts/src',
	paths: {
		tests: '../../test/tests',
		jquery: 'vendor/jquery/jquery',
		loglevel: 'vendor/loglevel/dist/loglevel.min',
		requirejs: 'vendor/requirejs/require',
		'conponent-dummy': 'components/dummy'
	}
});

//phantom.log('test');

// require the unit tests.
require(['tests/dummyTest'], function(dummyTest){

	dummyTest.run();
	QUnit.start();
});

