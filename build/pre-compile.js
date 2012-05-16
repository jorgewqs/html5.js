#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem module */
  var fs = require('fs');

  /** Used to minify `cache` properties */
  var cacheProps = [
    'frag',
    'nativeCreateElement',
    'nativeCreateFragment',
    'nodes',
    'trash'
  ];

  /** Used to minify variables embedded in compiled strings */
  var compiledVars = [
    'create',
    'frag',
    'node'
  ];

  /** Used to minify variables and string values to a single character */
  var minNames = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  /** Used protect the specified properties from getting minified */
  var propWhitelist = [
    'all',
    'amd',
    'appendChild',
    'applyElement',
    'attachEvent',
    'attributes',
    'body',
    'canHaveChildren',
    'childNodes',
    'cloneNode',
    'close',
    'contentDocument',
    'contentWindow',
    'createDocumentFragment',
    'createElement',
    'cssText',
    'currentStyle',
    'disabled',
    'display',
    'document',
    'documentElement',
    'firstChild',
    'frag',
    'frameBorder',
    'frameElement',
    'height',
    'hidden',
    'html5',
    'html5Printing',
    'html5Styles',
    'imports',
    'innerHTML',
    'insertBefore',
    'lastChild',
    'media',
    'methods',
    'name',
    'namespaces',
    'nodes',
    'nodeName',
    'nodeType',
    'nodeValue',
    'outerHTML',
    'ownerDocument',
    'parentWindow',
    'print',
    'protocol',
    'removeNode',
    'specified',
    'style',
    'styles',
    'styleSheets',
    'trash',
    'uniqueNumber',
    'unknownElements',
    'w',
    'width',
    'write',
    'XMLHttpRequest'
  ];

  /*--------------------------------------------------------------------------*/

  /**
   * Pre-process a given JavaScript `source`, preparing it for minification.
   *
   * @param {String} source The source to process.
   * @returns {String} Returns the processed source.
   */
  function preprocess(source) {
    var tokenized,
        token = '__token__';

    // remove copyright to add later in post-compile.js
    source = source.replace(/\/\*![\s\S]+?\*\//, '');

    // temporarily tokenize the compiled snippet
    source = source.replace(/( +)ownerDocument.createDocumentFragment *= *Function[\s\S]+?\n\1\)/, function(match) {
      tokenized = match;
      return token;
    });

    // minify compiled snippet variables / arguments
    compiledVars.forEach(function(variable, index) {
      tokenized = tokenized.replace(RegExp('\\b' + variable + '\\b', 'g'), minNames[index]);
    });

    // add brackets to whitelisted properties so Closure Compiler won't mung them
    // http://code.google.com/closure/compiler/docs/api-tutorial3.html#export
    source = source.replace(RegExp('\\.(' + propWhitelist.concat(cacheProps).join('|') + ')\\b', 'g'), "['$1']");

    // detokenize the compiled snippet and correct "$&"
    source = source.replace(token, tokenized).replace('__tok', '$').replace('en__', '&');

    // remove whitespace from string literals
    source = source.replace(/'(?:(?=(\\?))\1.)*?'/g, function(string) {
      return string.replace(/\[object |else if|function | in |return\s+[\w']|throw |typeof |use strict|var |\\\\n|\\n|\s+/g, function(match) {
        return match == false || match == '\\n' ? '' : match;
      });
    });

    // minify `cache` property name strings
    cacheProps.forEach(function(property, index) {
      source = source.replace(RegExp("'" + property + "'", 'g'), "'" + minNames[index] + "'");
    });

    // correct `sandbox.write()`
    source = source.replace(/document\['w'\] *= *this/, 'document.w=this');

    return source;
  }

  /*--------------------------------------------------------------------------*/

  // expose `preprocess`
  if (module != require.main) {
    module.exports = preprocess;
  }
  else {
    // read the JavaScript source file from the first argument if the script
    // was invoked directly (e.g. `node pre-compile.js source.js`) and write to
    // the same file
    (function() {
      var source = fs.readFileSync(process.argv[2], 'utf8');
      fs.writeFileSync(process.argv[2], preprocess(source), 'utf8');
    }());
  }
}());
