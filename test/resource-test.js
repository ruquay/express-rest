var assert = require('assert');
var vows = require('vows');

var xrest = require('../lib/express-rest'),
    Resource = xrest.Resource;

// add a default middleware so we can test ordering with
// per-resource middleware
xrest.defaults.middleware.push(function test() {});

exports.suite = vows.describe('xRest Resource').addBatch({
    'Resource constructed without arguments': {
        topic: function() {
            return new Resource();
        },

        'has': {
            'default formats': function(resource) { assert.deepEqual(resource.formats, xrest.defaults.formats); },
            'default handlers': function(resource) { assert.deepEqual(resource.handlers, xrest.defaults.handlers); },
            'default middleware': function(resource) { assert.deepEqual(resource.middleware, xrest.defaults.middleware); },
            'default templates': function(resource) { assert.deepEqual(resource.templates, xrest.defaults.templates); }
        }
    },
    'Resource constructed with arguments': {
        topic: function() {
            return new Resource({
                handlers: { index: 'index_test' },
                templates: { index: 'index-test' },
                middleware: [ 'dummy' ],
                formats: [ 'sanscrit' ]
            });
        },

        'has': {
            'custom formats': function(resource) {
                assert.deepEqual(resource.formats, ['sanscrit']);
            },
            'custom handlers': function(resource) {
                var handlers = xrest.util.clone(xrest.defaults.handlers);
                handlers.index = 'index_test';

                assert.deepEqual(resource.handlers, handlers);
            },
            'custom middleware': function(resource) {
                assert.deepEqual(resource.middleware, xrest.defaults.middleware.concat('dummy'));
            },
            'custom templates': function(resource) {
                var templates = xrest.util.clone(xrest.defaults.templates);
                templates.index = 'index-test';

                assert.deepEqual(resource.templates, templates);
            }
        }
    }
});