

require.config({
	baseUrl: '../scripts/src'
});


//Load common code that includes config, then load the app logic for this page.
require(['config'], function () {
	//phantom.log('test');

	// require the unit tests.
	require(['tests/dummyTest'], function(dummyTest){

		dummyTest.run();
		QUnit.start();
	});
});


