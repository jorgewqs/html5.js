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
    // move vars exposed by Closure Compiler into the IIFE
    source = source.replace(/^((?:(['"])use strict\2;)?(?:var (?:[a-z]+=(?:!0|!1|null)[,;])+)?)([\s\S]*?function[^)]+\){)/, '$3$1');

    // use double quotes consistently
    source = source.replace(/'use strict'/, '"use strict"');

    // unescape properties (i.e. foo["bar"] => foo.bar)
    source = source.replace(/(\w)\["([^."]+)"\]/g, function(match, left, right) {
      return /\W/.test(right) ? match : (left + '.' + right);
    });

    // correct AMD module definition for AMD build optimizers
    source = source.replace(/("function")\s*==\s*(typeof define)\s*&&\s*\(?\s*("object")\s*==\s*(typeof define\.amd)\s*&&\s*(define\.amd)\s*\)?/, '$2==$1&&$4==$3&&$5');

    // add trailing semicolon
    source = source.replace(/[\s;]*$/, ';');

    // exit early if version snippet isn't found
    var snippet = /version\s*:\s*([\'"])(.*?)\1/.exec(source);
    if (!snippet) {
      return source;
    }

    // add license
    return licenseTemplate.replace('@VERSION', snippet[2]) + '\n;' + source;
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
