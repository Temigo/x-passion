'use strict';

angular.module('xpassion.api', [
    'ngResource'
])

.factory('API', ['$location', 
    function ($location) {
        return { 
            route: function (path) {
                if (/localhost/.test($location.absUrl())) {
                    return 'http://127.0.0.1:8000' + (path == '' ? '' : '/' + path);
                } else {
                    return 'api' + (path == '' ? '' : '/' + path);
                }
            }
        };
    }
])

.factory('Comment', ['API', '$resource',
    function(API, $resource) {
        return $resource(API.route('comments/:id/'), {id: '@id'}, {
            sremove: {method: 'PUT', url: API.route('comments/:id/remove/')},
            restore: {method: 'PUT', url: API.route('comments/:id/restore/')},
        }, {stripTrailingSlashes: false});
    }]
)

.factory('News', ['API', '$resource',
    function(API, $resource) {
        return $resource(API.route('news/:id'), {id: '@id'}, {
            update: {method: 'PUT', url: API.route('news/:id')},
            undelete: {method: 'PUT', url: API.route('news/undelete/:id')}
        }, {stripTrailingSlashes: false});
    }]
)
;
