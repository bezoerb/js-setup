"use strict";
define(['component-dummy'], function(dummy) {
	return {
		run: function() {
			describe('Give it some context', function () {
				describe('maybe a bit more context here', function () {
					it('should run here few assertions', function () {
						expect(dummy.a).to.equal(false);
					});
				});
			});
		}
	}
});
