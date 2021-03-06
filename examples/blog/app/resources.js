var sys = require('sys'); //xxx
var xrest = require('express-rest');
var middleware = require('./middleware');
var data = require('./data');

var clone = xrest.util.clone;
var mixin = xrest.util.mixin;


exports.BlogEntry = new xrest.Resource({
    prefix: 'blog/entries',


    // ********************
    // ********************

    // called for: * /blog
    fetchAll: function(req, res, next) {
        sys.debug('BlogEntry.fetchAll()');

        // fetch latest 5 blog entries from database,
        // with comments and body summarized:
        var entries = clone(data.slice(0, 5));
        entries.forEach(function(entry) {
            entry.body = entry.body.slice(0, 200) + '...';
            entry.comments = entry.comments && entry.comments.length || 0;
        });

        // store results in request context and pass
        // control to the next route matching this request:
        req.context.locals.entries = entries;
        next();
    },

//    // called for: POST /blog
//    createItem: function(req, res, next) {
//        sys.debug('BlogEntry.itemCreate()');
//        // TODO
//    },


    // ********************
    // ********************

    // called for: * /blog/:title/:op?
    fetchItem: function(req, res, next) {
        // fetch the blog entry
        var title = req.param('id'); // xxx id? title?
        var entry = data.reduce(function(prev, next) {
            return (next.title == title) ? next : prev;
        }, null);

        // store it on request and forward to next route
        req.context.locals.entry = entry;
        next();
    },

//    // called for: PUT /blog/:title
//    updateItem: function(req, res, next) {
//        sys.debug('BlogEntry.itemUpdate()');
//        // TODO
//    },

//    // called for: DELETE /blog/:title
//    removeItem: function(req, res, next) {
//        sys.debug('BlogEntry.itemRemove()');
//        // TODO
//    },


    // ********************
    // ********************

// fixme just here for debugging
    // called for: GET /blog
    // we can just rely on default behaviour for this,
    // which is render the configured template
//    itemList: function(req, res, next) {
//        sys.debug('BlogEntry.itemList()');
//    },
    // called for: GET /blog/new
    // we can just rely on default behaviour for this
    // which is render the configured template
//    itemCreateForm: function(req, res, next) {
//        sys.debug('BlogEntry.itemCreateForm()');
//    },
    // called for: GET /blog/:title
    // we can just rely on default behaviour
    itemDetail: function(req, res, next) {
        sys.debug('BlogEntry.itemDetail()');
        res.render();
    },
    // called for: GET /blog/:title/edit
    // we can just rely on default behaviour
//    itemUpdateForm: function(req, res, next) {
//        sys.debug('BlogEntry.itemUpdateForm()');
//    },
// fixme just here for debugging


    // ********************
    // ********************

    toString: function() { return '[blog entries]'; }
});
