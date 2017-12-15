'use strict';

/**
 * Static configuration object
 */
define(function (require) {

    // load any config files written by the build system
    var buildConfig = require('./config-from-build');

    var uniqueDevicesConfig = {
        endpoint: 'getUniqueDevices',
        valueField: 'devices',
        dateFormat: {
            'daily': 'YYYYMMDD',
            'monthly': 'YYYYMM01'
        },
        // Api knows how to translate from general breakdown
        // labels to api semantics to retrieve data.
        breakdownOptions: {
            'All': 'all-sites',
            'Desktop site': 'desktop-site',
            'Mobile site': 'mobile-site'
        },
        breakdownParameter: 'access-site',
        dataStart: '20160101'
    };

    var pageviewsConfig = {
        endpoint: 'getAggregatedPageviews',
        valueField: 'views',
        dateFormat: {
            'hourly': 'YYYYMMDDHH',
            'daily': 'YYYYMMDD00',
            'monthly': 'YYYYMM0100'
        },
        // Api knows how to translate from general breakdown
        // labels to api semantics to retrieve data.
        breakdownOptions: {
            'All': 'all-access',
            'Desktop site': 'desktop',
            'Mobile site': 'mobile-web',
            'Mobile App': 'mobile-app'
        },
        breakdownParameter: 'access',
        dataStart: '2015010100'
    };

    return {

        // indicates which mediawiki host and pages contain the configuration
        configApi: {
            endpoint: buildConfig ? buildConfig.endpoint : 'meta.wikimedia.org',
            // next two fields are mediawiki page names
            categorizedMetricsPage: 'Dashiki:CategorizedMetrics',
            dashboardArticle: buildConfig ? buildConfig.dashboardArticle : null,
            dashboardConfigLink: buildConfig ? '//' + buildConfig.endpoint + '/wiki/' + buildConfig.dashboardArticle : null,
            defaultDashboardArticleRoot: 'Config:Dashiki:Sample',
            //https://meta.wikimedia.org/wiki/Dashiki:OutOfService
            outOfService: 'Dashiki:OutOfService',
            // this is a digest of sitematrix taylored to the UI,
            // can be cached a long time and makes for a snappier UI
            projectLanguageChoices: 'Dashiki:AvailableProjects'
        },

        // format are specified per API for now, in the future they can be specified per metric if needed
        // this means that formatters can also be a property of the API
        // this asumption makes code simpler for now
        wikimetricsApi: {
            endpoint: 'metrics.wmflabs.org',
            format: 'json'
        },

        aqsApi: {
            'Pageviews': pageviewsConfig,
            'MonthlyPageviews': pageviewsConfig,
            'LegacyPagecounts': {
                endpoint: 'getAggregatedLegacyPagecounts',
                valueField: 'count',
                dateFormat: {
                    'hourly': 'YYYYMMDDHH',
                    'daily': 'YYYYMMDD00',
                    'monthly': 'YYYYMM0100'
                },
                breakdownOptions: {
                    'All': 'all-sites',
                    'Desktop site': 'desktop-site',
                    'Mobile site': 'mobile-site'
                },
                breakdownParameter: 'access-site',
                dataStart: '2007120918'
            },
            // these two metrics come from the same place
            // just granularity is different and that is configured on metric itself
            'UniqueDevices': uniqueDevicesConfig,
            'MonthlyUniqueDevices': uniqueDevicesConfig
        },

        datasetsApi: {
            endpoint: 'https://analytics.wikimedia.org/datasets/periodic/reports/metrics',
            format: 'tsv'
        },

        // our sitematrix request should be cached for 1 hour
        sitematrix: {
            endpoint: 'https://meta.wikimedia.org/w/api.php?action=sitematrix&formatversion=2&format=json&maxage=3600&smaxage=3600'
        }
    };
});
