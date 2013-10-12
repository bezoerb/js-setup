require.config({
	baseUrl: '../../scripts/src'
});

//phantom.log('test');

// require the unit tests.
require(['tests/dummyTest'], function(dummyTest){

	dummyTest.run();
	QUnit.start();
});

