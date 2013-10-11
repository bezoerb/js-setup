/*global define */
define(function (require) {
    'use strict';
	
	// load dependencies
	var $ = require('jquery'),
		log = require('loglevel'),
		self = {};

    // API methods
    $.extend(self, {

        /**
         * App initialization
         */
        init: function init() {
            log.debug('Running jQuery %s', $().jquery);
        }
    });

	return self;
});