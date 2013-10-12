"use strict";
define(['conponent-dummy'], function(sth) {


	return {
		run: function() {
			describe('Give it some context', function () {
				describe('maybe a bit more context here', function () {
					it('should run here few assertions', function () {
						expect(sth.a).to.equal(false);
					});
				});
			});
		}
	}
});
