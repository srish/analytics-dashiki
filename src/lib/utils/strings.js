'use strict';
define(function (require) {

    var moment = require('moment');

    return {
        /**
         * Using a sample string, returns a function that can parse
         * similar values.  Falls back to the identity function.
         */
        parserFromSample: function (sample) {
            // NOTE: Dates in YYYYMMDD format will parse incorrectly, please use
            //       YYYY-MM-DD (with your choice of separator)
            if (!isNaN(parseFloat(sample)) && isFinite(sample)) {
                return function (x) {
                    return parseFloat(x);
                };
            }
            if (moment(sample).isValid()) {
                return function (x) {
                    return moment.utc(x).toDate();
                };
            }
            // If the sample contains null values,
            // the default parser tries to cast to float.
            return function (x) {
                return parseFloat(x) || x;
            };
        },

        /**
         * splits text by separators
         *
         * Parameters
         *      lineSeparator
         *      colSeparator
         *
         * Returns an array of rows
         */
        splitter: function (text, lineSeparator, valueSeparator) {
            return text.split(lineSeparator).map(function (row) {
                return row.split(valueSeparator);
            }).filter(function (row) {
                return row.length > 1;
            });
        },

        separators: {
            line: '\n',
            value: {
                'tsv': '\t',
                'csv': ',',
            },
        },
    };
});
