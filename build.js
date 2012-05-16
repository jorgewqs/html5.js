#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem and path modules */
  var fs = require('fs'),
      path = require('path');

  /** The minify module */
  var minify = require(path.join(__dirname, 'build', 'minify'));

  /** A list of print related functions */
  var printFuncs = [
    'addPrintSheet', 'addPrintWrappers', 'createPrintWrapper',
    'removePrintWrappers', 'setPrintSupport', 'unsetPrintSupport'
  ];

  /** The html5.js source */
  var source = fs.readFileSync(path.join(__dirname, 'html5.js'), 'utf8');

  /*--------------------------------------------------------------------------*/

  /**
   * Removes the `funcName` function declaration from the `source`.
   *
   * @private
   * @param {String} source The source to process.
   * @param {String} funcName The name of the function to remove.
   * @returns {String} Returns the source with the function removed.
   */
  function removeFunction(source, funcName) {
    return source.replace(RegExp(
      // match multi-line comment block (could be on a single line)
      '(?:\\n +/\\*[^*]*\\*+(?:[^/][^*]*\\*+)*/)?\\n' +
      // match a function declaration
      '( +)function ' + funcName + '\\b[\\s\\S]+?\\n\\1}\\n'
    ), '');
  }

  /*--------------------------------------------------------------------------*/

  // begin the minification process
  minify(source, 'html5.min', function(result) {
    // create a build of html5.js without HTML5 print support
    var noprint = source;

    // remove print related functions
    printFuncs.forEach(function(funcName) {
      noprint = removeFunction(noprint, funcName);
    });

    // remove "print" options
    noprint = noprint.replace(/ *'print':[^,]+,/, '');

    // remove `html5Printing` support test
    noprint = noprint.replace(/(?:\n +\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/)?\n( +)support.html5Printing *=[\s\S]+?\n\1\);?\n/, '');

    // remove `html5Printing` related if-statements
    noprint = noprint.replace(/\n +if *\(!support\.html5Printing[^}]+}/, '');

    // write files
    minify(noprint, 'html5.noprint.min', function(noprintResult) {
      fs.writeFileSync(path.join(__dirname, 'html5.min.js'), result);
      fs.writeFileSync(path.join(__dirname, 'html5.noprint.js'), noprint);
      fs.writeFileSync(path.join(__dirname, 'html5.noprint.min.js'), noprintResult);
    });
  });
}());
