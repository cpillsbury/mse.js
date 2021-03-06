(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var root = require('./window.js'),

    mediaSourceClassName = 'MediaSource',
    webKitMediaSourceClassName = 'WebKitMediaSource',
    mediaSourceEvents = ['sourceopen', 'sourceclose', 'sourceended'],
    // TODO: Test to verify that webkit prefixes the 'sourceended' event type.
    webKitMediaSourceEvents = ['webkitsourceopen', 'webkitsourceclose', 'webkitsourceended'];

function hasClassReference(object, className) {
    return ((className in object) && (typeof object[className] === 'function'));
}

function createEventsMap(keysArray, valuesArray) {
    if (!keysArray || !valuesArray || keysArray.length !== valuesArray.length) { return null; }
    var map = {};
    for (var i=0; i<keysArray.length; i++) {
        map[keysArray[i]] = valuesArray[i];
    }

    return map;
}

function overrideEventFn(classRef, eventFnName, eventsMap) {
    var originalFn = classRef.prototype[eventFnName];
    classRef.prototype[eventFnName] = function(type /*, callback, useCapture */) {
        originalFn.apply(this, Array.prototype.slice.call(arguments));
        if (!(type in eventsMap)) { return; }
        var restArgsArray = Array.prototype.slice.call(arguments, 1),
            newArgsArray = [eventsMap[type]].concat(restArgsArray);
        originalFn.apply(this, Array.prototype.slice.call(newArgsArray));
    };
}

function getMediaSourceClass(root) {
    // If the root (window) has MediaSource, nothing to do so simply return the ref.
    if (hasClassReference(root, mediaSourceClassName)) { return root[mediaSourceClassName]; }
    // If the root (window) has WebKitMediaSource, override its add/remove event functions to meet the W3C
    // spec for event types and return a ref to it.
    else if (hasClassReference(root, webKitMediaSourceClassName)) {
        var classRef = root[webKitMediaSourceClassName],
            eventsMap = createEventsMap(mediaSourceEvents, webKitMediaSourceEvents);

        overrideEventFn(classRef, 'addEventListener', eventsMap);
        overrideEventFn(classRef, 'removeEventListener', eventsMap);

        return classRef;
    }

    // Otherwise, (standard or nonstandard) MediaSource doesn't appear to be natively supported, so return
    // a generic function that throws an error when called.
    // TODO: Throw error immediately instead (or both)?
    return function() { throw new Error('MediaSource doesn\'t appear to be supported in your environment'); };
}

var MediaSource = getMediaSourceClass(root);

module.exports = MediaSource;
},{"./window.js":3}],2:[function(require,module,exports){
;(function() {
    'use strict';

    var root = require('./window.js'),
        MediaSource = require('./MediaSource');

    function mediaSourceShim(root, mediaSourceClass) {
        root.MediaSource = mediaSourceClass;
    }

    mediaSourceShim(root, MediaSource);
}.call(this));
},{"./MediaSource":1,"./window.js":3}],3:[function(require,module,exports){
(function (global){
// Create a simple module to refer to the window/global object to make mocking the window object and its
// properties cleaner when testing.
'use strict';
module.exports = global;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvTWVkaWFTb3VyY2UuanMiLCJzcmMvanMvbXNlLmpzIiwic3JjL2pzL3dpbmRvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcm9vdCA9IHJlcXVpcmUoJy4vd2luZG93LmpzJyksXG5cbiAgICBtZWRpYVNvdXJjZUNsYXNzTmFtZSA9ICdNZWRpYVNvdXJjZScsXG4gICAgd2ViS2l0TWVkaWFTb3VyY2VDbGFzc05hbWUgPSAnV2ViS2l0TWVkaWFTb3VyY2UnLFxuICAgIG1lZGlhU291cmNlRXZlbnRzID0gWydzb3VyY2VvcGVuJywgJ3NvdXJjZWNsb3NlJywgJ3NvdXJjZWVuZGVkJ10sXG4gICAgLy8gVE9ETzogVGVzdCB0byB2ZXJpZnkgdGhhdCB3ZWJraXQgcHJlZml4ZXMgdGhlICdzb3VyY2VlbmRlZCcgZXZlbnQgdHlwZS5cbiAgICB3ZWJLaXRNZWRpYVNvdXJjZUV2ZW50cyA9IFsnd2Via2l0c291cmNlb3BlbicsICd3ZWJraXRzb3VyY2VjbG9zZScsICd3ZWJraXRzb3VyY2VlbmRlZCddO1xuXG5mdW5jdGlvbiBoYXNDbGFzc1JlZmVyZW5jZShvYmplY3QsIGNsYXNzTmFtZSkge1xuICAgIHJldHVybiAoKGNsYXNzTmFtZSBpbiBvYmplY3QpICYmICh0eXBlb2Ygb2JqZWN0W2NsYXNzTmFtZV0gPT09ICdmdW5jdGlvbicpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRXZlbnRzTWFwKGtleXNBcnJheSwgdmFsdWVzQXJyYXkpIHtcbiAgICBpZiAoIWtleXNBcnJheSB8fCAhdmFsdWVzQXJyYXkgfHwga2V5c0FycmF5Lmxlbmd0aCAhPT0gdmFsdWVzQXJyYXkubGVuZ3RoKSB7IHJldHVybiBudWxsOyB9XG4gICAgdmFyIG1hcCA9IHt9O1xuICAgIGZvciAodmFyIGk9MDsgaTxrZXlzQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbWFwW2tleXNBcnJheVtpXV0gPSB2YWx1ZXNBcnJheVtpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwO1xufVxuXG5mdW5jdGlvbiBvdmVycmlkZUV2ZW50Rm4oY2xhc3NSZWYsIGV2ZW50Rm5OYW1lLCBldmVudHNNYXApIHtcbiAgICB2YXIgb3JpZ2luYWxGbiA9IGNsYXNzUmVmLnByb3RvdHlwZVtldmVudEZuTmFtZV07XG4gICAgY2xhc3NSZWYucHJvdG90eXBlW2V2ZW50Rm5OYW1lXSA9IGZ1bmN0aW9uKHR5cGUgLyosIGNhbGxiYWNrLCB1c2VDYXB0dXJlICovKSB7XG4gICAgICAgIG9yaWdpbmFsRm4uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICAgIGlmICghKHR5cGUgaW4gZXZlbnRzTWFwKSkgeyByZXR1cm47IH1cbiAgICAgICAgdmFyIHJlc3RBcmdzQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgICAgbmV3QXJnc0FycmF5ID0gW2V2ZW50c01hcFt0eXBlXV0uY29uY2F0KHJlc3RBcmdzQXJyYXkpO1xuICAgICAgICBvcmlnaW5hbEZuLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5ld0FyZ3NBcnJheSkpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGdldE1lZGlhU291cmNlQ2xhc3Mocm9vdCkge1xuICAgIC8vIElmIHRoZSByb290ICh3aW5kb3cpIGhhcyBNZWRpYVNvdXJjZSwgbm90aGluZyB0byBkbyBzbyBzaW1wbHkgcmV0dXJuIHRoZSByZWYuXG4gICAgaWYgKGhhc0NsYXNzUmVmZXJlbmNlKHJvb3QsIG1lZGlhU291cmNlQ2xhc3NOYW1lKSkgeyByZXR1cm4gcm9vdFttZWRpYVNvdXJjZUNsYXNzTmFtZV07IH1cbiAgICAvLyBJZiB0aGUgcm9vdCAod2luZG93KSBoYXMgV2ViS2l0TWVkaWFTb3VyY2UsIG92ZXJyaWRlIGl0cyBhZGQvcmVtb3ZlIGV2ZW50IGZ1bmN0aW9ucyB0byBtZWV0IHRoZSBXM0NcbiAgICAvLyBzcGVjIGZvciBldmVudCB0eXBlcyBhbmQgcmV0dXJuIGEgcmVmIHRvIGl0LlxuICAgIGVsc2UgaWYgKGhhc0NsYXNzUmVmZXJlbmNlKHJvb3QsIHdlYktpdE1lZGlhU291cmNlQ2xhc3NOYW1lKSkge1xuICAgICAgICB2YXIgY2xhc3NSZWYgPSByb290W3dlYktpdE1lZGlhU291cmNlQ2xhc3NOYW1lXSxcbiAgICAgICAgICAgIGV2ZW50c01hcCA9IGNyZWF0ZUV2ZW50c01hcChtZWRpYVNvdXJjZUV2ZW50cywgd2ViS2l0TWVkaWFTb3VyY2VFdmVudHMpO1xuXG4gICAgICAgIG92ZXJyaWRlRXZlbnRGbihjbGFzc1JlZiwgJ2FkZEV2ZW50TGlzdGVuZXInLCBldmVudHNNYXApO1xuICAgICAgICBvdmVycmlkZUV2ZW50Rm4oY2xhc3NSZWYsICdyZW1vdmVFdmVudExpc3RlbmVyJywgZXZlbnRzTWFwKTtcblxuICAgICAgICByZXR1cm4gY2xhc3NSZWY7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlLCAoc3RhbmRhcmQgb3Igbm9uc3RhbmRhcmQpIE1lZGlhU291cmNlIGRvZXNuJ3QgYXBwZWFyIHRvIGJlIG5hdGl2ZWx5IHN1cHBvcnRlZCwgc28gcmV0dXJuXG4gICAgLy8gYSBnZW5lcmljIGZ1bmN0aW9uIHRoYXQgdGhyb3dzIGFuIGVycm9yIHdoZW4gY2FsbGVkLlxuICAgIC8vIFRPRE86IFRocm93IGVycm9yIGltbWVkaWF0ZWx5IGluc3RlYWQgKG9yIGJvdGgpP1xuICAgIHJldHVybiBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKCdNZWRpYVNvdXJjZSBkb2VzblxcJ3QgYXBwZWFyIHRvIGJlIHN1cHBvcnRlZCBpbiB5b3VyIGVudmlyb25tZW50Jyk7IH07XG59XG5cbnZhciBNZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlQ2xhc3Mocm9vdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWVkaWFTb3VyY2U7IiwiOyhmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgcm9vdCA9IHJlcXVpcmUoJy4vd2luZG93LmpzJyksXG4gICAgICAgIE1lZGlhU291cmNlID0gcmVxdWlyZSgnLi9NZWRpYVNvdXJjZScpO1xuXG4gICAgZnVuY3Rpb24gbWVkaWFTb3VyY2VTaGltKHJvb3QsIG1lZGlhU291cmNlQ2xhc3MpIHtcbiAgICAgICAgcm9vdC5NZWRpYVNvdXJjZSA9IG1lZGlhU291cmNlQ2xhc3M7XG4gICAgfVxuXG4gICAgbWVkaWFTb3VyY2VTaGltKHJvb3QsIE1lZGlhU291cmNlKTtcbn0uY2FsbCh0aGlzKSk7IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuLy8gQ3JlYXRlIGEgc2ltcGxlIG1vZHVsZSB0byByZWZlciB0byB0aGUgd2luZG93L2dsb2JhbCBvYmplY3QgdG8gbWFrZSBtb2NraW5nIHRoZSB3aW5kb3cgb2JqZWN0IGFuZCBpdHNcbi8vIHByb3BlcnRpZXMgY2xlYW5lciB3aGVuIHRlc3RpbmcuXG4ndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSJdfQ==
