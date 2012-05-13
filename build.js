#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem and path modules */
  var fs = require('fs'),
      path = require('path');

  /** The minify module */
  var Minify = require(path.join(__dirname, 'build', 'minify'));

  /** The html5.js source */
  var source = fs.readFileSync(path.join(__dirname, 'html5.js'), 'utf8');

  /*--------------------------------------------------------------------------*/

  // begin the minification process
  new Minify(source, 'html5.min', function(result) {
    // create a build of html5.js without HTML5 print support
    var noprint = source;

    // remove print related functions
    ['addPrintSheet', 'addPrintWrappers', 'createPrintWrapper',
     'removePrintWrappers', 'setPrintSupport', 'unsetPrintSupport'
    ].forEach(function(funcName) {
        noprint = noprint.replace(RegExp('\n +/\\*[^*]*\\*+(?:[^/][^*]*\\*+)*/\\n( +)function ' + funcName + '[\\s\\S]+?\\n\\1};?\n'), '');
    });

    // remove "print" options
    noprint = noprint.replace(/ *'print':[^,]+,/, '');

    // remove `html5Printing` support test
    noprint = noprint.replace(/\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/\n( +)support.html5Printing *=[\s\S]+?\n\1\);?\n/, '');

    // remove related if-statements
    noprint = noprint.replace(/\n +if *\(!support\.html5Printing[^}]+}/, '');

    // write files
    new Minify(noprint, 'html5.noprint.min', function(noprintResult) {
      fs.writeFileSync(path.join(__dirname, 'html5.min.js'), result);
      fs.writeFileSync(path.join(__dirname, 'html5.noprint.js'), noprint);
      fs.writeFileSync(path.join(__dirname, 'html5.noprint.min.js'), noprintResult);
    });
  });
}());
