'use strict';
define([], function () {
    /**
     * Logger for client side errors.
     *
     * Logger logs to the console for now
     * but it could also do a post request to a known endpoint
     * where we collect logs.
     *
     * Since logging does not alter our code path and it is a dependency of the
     * whole codebase the logger is a static function available site wide.
     *
     * Sample usage:

             try {
             } catch(e) {
                logger.error('blah')
             }
     *
     * Logging of ajax errors is done via jquery ajax events
     */

    var logger = window.logger = {

        error: function (message) {
            console.log(this.getTimestamp() + ' ' + message);
        },
        getTimestamp: function () {
            return new Date().toUTCString();
        }
    };

    // registering for window.onerror, although many events do not trigger this
    window.onerror = function (message, file, line) {
        logger.error(file + ':' + line + '\n\n' + message);
    };

    return logger;
});
