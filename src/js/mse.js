;(function() {
    'use strict';

    var root = require('./window.js'),
        MediaSource = require('./MediaSource');

    function mediaSourceShim(root, mediaSourceClass) {
        root.MediaSource = mediaSourceClass;
    }

    mediaSourceShim(root, MediaSource);
}.call(this));