//Copyright (c) 2015 3CSI, Tom Zellman, Dan Pressel and contributors
//
//Permission is hereby granted, free of charge, to any person obtaining a copy of
//this software and associated documentation files (the "Software"), to deal in
//the Software without restriction, including without limitation the rights to
//use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
//of the Software, and to permit persons to whom the Software is furnished to do
//so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.bbcode=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
var VERSION = '0.2.0',
// default options
    defaults = {
        showQuotePrefix: true,
        classPrefix: 'bbcode_'
    };

var version = VERSION;
exports.version = version;
/**
 * Renders the content as html
 * @param content   the given content to render
 * @param options   optional object with control parameters
 * @returns rendered html
 */
var render = function (content, options) {
    var matches = {}, expr, regex, hasMatch, tmp;

    options = options || {};
    for (tmp in defaults) {
        if (!(tmp in options)) {
            options[tmp] = defaults[tmp];
        }
    }

    var tagReplace = function (fullMatch, tag, params, value) {
        tag = tag.toLowerCase();
        if (params && params.length >= 2 &&
            ((params[0] === '"' && params[params.length - 1] === '"') ||
            (params[0] === '\'' && params[params.length - 1] === '\''))) {
            params = params.slice(1, -1);
        }
        switch (tag) {
            case 'quote':
                return '<div class="' + options.classPrefix + 'quote">' + (params ? params + ' wrote:' : (options.showQuotePrefix ? 'Quote:' : '')) + '<blockquote>' + value + '</blockquote></div>';
            case 'url':
                return '<a class="' + options.classPrefix + 'link" target="_blank" href="' + (params || value) + '">' + value + '</a>';
            case 'email':
                return '<a class="' + options.classPrefix + 'link" target="_blank" href="mailto:' + (params || value) + '">' + value + '</a>';
            case 'anchor':
                return '<a name="' + (params || value) + '">' + value + '</a>';
            case 'b':
                return '<strong>' + value + '</strong>';
            case 'i':
                return '<em>' + value + '</em>';
            case 'u':
                return '<span style="text-decoration:underline">' + value + '</span>';
            case 'u':
                return '<span style="text-decoration:line-through">' + value + '</span>';
            case 'code':
                return '<pre class="' + options.classPrefix + 'code">' + value + '</pre>';
            case 'span':
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                return '<' + tag + '>' + value + '</' + tag + '>';
            case 'youtube':
                return '<object class="' + options.classPrefix + 'video" width="425" height="350"><param name="movie" value="http://www.youtube.com/v/' + value + '"></param><embed src="http://www.youtube.com/v/' + value + '" type="application/x-shockwave-flash" width="425" height="350"></embed></object>';
            case 'gvideo':
                return '<embed class="' + options.classPrefix + 'video" style="width:400px; height:325px;" id="VideoPlayback" type="application/x-shockwave-flash" src="http://video.google.com/googleplayer.swf?docId=' + value + '&amp;hl=en">';
            case 'google':
                return '<a class="' + options.classPrefix + 'link" target="_blank" href="http://www.google.com/search?q=' + (params || value) + '">' + value + '</a>';
            case 'wikipedia':
                return '<a class="' + options.classPrefix + 'link" target="_blank" href="http://www.wikipedia.org/wiki/' + (params || value) + '">' + value + '</a>';
            case 'img':
                var dims = new RegExp('^(\\d+)x(\\d+)$').exec(params || '');
                if (!dims || (dims.length !== 3)) {
                    dims = new RegExp('^width=(\\d+)\\s+height=(\\d+)$').exec(params || '');
                }
                if (dims && dims.length === 3) {
                    params = undefined;
                }
                return '<img class="' + options.classPrefix + 'image" src="' + value + '"' + (dims && dims.length === 3 ? ' width="' + dims[1] + '" height="' + dims[2] + '"' : '') + (params ? (' alt="' + ((dims && dims.length === 3) ? '' : params) + '"') : '') + '/>';
        }
        // return the original
        return fullMatch;
    };

    // for now, only one rule
    matches['\\[(\\w+)(?:[= ]([^\\]]+))?]((?:.|[\r\n])*?)\\[/\\1]'] = tagReplace;

    // match/replace until we don't change the input anymore
    do {
        hasMatch = false;
        for (expr in matches) {
            regex = new RegExp(expr, 'gi');
            tmp = content.replace(regex, matches[expr]);
            hasMatch = (tmp !== content);
            if (hasMatch) {
                content = tmp;
            }
        }
    } while (hasMatch);
    return content;
};
exports.render = render;
},{}]},{},[1])
(1)
});