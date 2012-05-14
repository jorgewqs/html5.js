#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem module */
  var fs = require('fs');

  /** The minimal license/copyright template */
  var licenseTemplate =
    '/*!\n' +
    ' HTML5.js @VERSION github.com/bestiejs/html5.js\n' +
    ' HTML5 Shiv pre3.3 github.com/aFarkas/html5shiv\n' +
    ' MIT/GPL2 licensed\n' +
    '*/';

  /*--------------------------------------------------------------------------*/

  /**
   * Post-process a given minified JavaScript `source`, preparing it for
   * deployment.
   *
   * @param {String} source The source to process.
   * @returns {String} Returns the processed source.
   */
  function postprocess(source) {
    // set the version
    var license = licenseTemplate.replace('@VERSION', (/version\s*:\s*([\'"])(.*?)\1/).exec(source).pop());
    // move vars exposed by Closure Compiler into the IIFE
    source = source.replace(/^([^(\n]+)\s*(\(function[^)]+\){)/, '$2$1');
    // use double quotes consistently
    source = source.replace(/'use strict'/, '"use strict"');
    // add license
    return license + '\n;' + source;
  }

  /*--------------------------------------------------------------------------*/

  // expose `postprocess`
  if (module != require.main) {
    module.exports = postprocess;
  } else {
    // read the JavaScript source file from the first argument if the script
    // was invoked directly (e.g. `node post-compile.js source.js`) and write to
    // the same file
    (function() {
      var source = fs.readFileSync(process.argv[2], 'utf8');
      fs.writeFileSync(process.argv[2], postprocess(source), 'utf8');
    }());
  }
}());
