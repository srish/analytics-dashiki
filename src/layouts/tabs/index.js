'use strict';

if (typeof window === 'undefined') {
    module.exports = {
        optimizerConfig: {
            include: [
                'requireLib',
                'components/layouts/tabs/tabs',
                'components/layouts/created-by/created-by',
                'components/visualizers/visualizer/visualizer',
            ],
            bundles: {
                // If you want parts of the site to load on demand, remove them from the 'include' list
                // above, and group them into bundles here.
                'out-of-service':       ['components/layouts/out-of-service/out-of-service'],
                'sunburst':             ['components/visualizers/sunburst/sunburst'],
                'hierarchy':            ['components/visualizers/hierarchy/hierarchy'],
                'stacked-bars':         ['components/visualizers/stacked-bars/stacked-bars'],
                'dygraphs-timeseries':  ['components/visualizers/dygraphs-timeseries/dygraphs-timeseries'],
                'table-timeseries':     ['components/visualizers/table-timeseries/table-timeseries'],
                'filter-timeseries': [
                    'components/visualizers/filter-timeseries/filter-timeseries',
                    'components/visualizers/dygraphs-timeseries/dygraphs-timeseries'
                ],
            }
        }
    };
}
