
"use strict";
define(function(require) {
	describe('Dummy Test',function(){
		it('should have dummy.a == false', function () {
			var a = require('component-dummy');
			expect(a.a).toBe(false);
		});
	});
});
