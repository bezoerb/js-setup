/*global define */
define(function (require) {
    'use strict';
	
	// load dependencies
	var $ = require('jquery'),
		log = require('loglevel'),
		// require components
		dummy = require('components/dummy'),
		self = {};

    // API methods
    $.extend(self, {

        /**
         * App initialization
         */
        init: function init() {
            log.debug('Running jQuery %s', $().jquery);
			log.debug('Dummy.a = ' + dummy.a);

        }
    });

	return self;
});