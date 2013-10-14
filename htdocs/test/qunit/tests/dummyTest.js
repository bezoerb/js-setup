"use strict";
define(['component-dummy'], function(dummy) {
	return {
		run: function() {

			test('basic test', function() {
				expect(1);
				ok(true, 'this had better work.');
			});

			test('can access the DOM', function() {
				expect(1);
				var fixture = document.getElementById('qunit-fixture');
				equal(fixture.innerText, 'this had better work.', 'should be able to access the DOM.');
			});

			test('required dummy component\'s a property should return false',function(){
				expect(1);
				equal(dummy.a, false, 'dummy.a should be false.');
			});
		}
	}
});
