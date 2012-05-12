# HTML5.js <sup>v1.0.0-rc</sup>

<!-- div -->


<!-- div -->

## `html5`
* [`html5`](#html5)
* [`html5.version`](#html5version)
* [`html5.createDocumentFragment`](#html5createdocumentfragmentownerdocumentdocument)
* [`html5.createElement`](#html5createelementownerdocumentdocument-nodename)
* [`html5.install`](#html5installownerdocumentdocument-options)
* [`html5.noConflict`](#html5noconflict)
* [`html5.uninstall`](#html5uninstallownerdocumentdocument-options)

<!-- /div -->


<!-- div -->

## `html5.support`
* [`html5.support`](#html5support)
* [`html5.support.html5Printing`](#html5supporthtml5printing)
* [`html5.support.html5Styles`](#html5supporthtml5styles)
* [`html5.support.unknownElements`](#html5supportunknownelements)

<!-- /div -->


<!-- /div -->


<!-- div -->


<!-- div -->

## `html5`

<!-- div -->


<!-- div -->

### `html5`
<a id="html5" href="#html5">#</a> [&#x24C8;](https://github.com/bestiejs/html5.js/blob/master/html5.js#L753 "View in source") [&#x24C9;][1]

*(Object)*: The `html5` object.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `html5.version`
<a id="html5version" href="#html5version">#</a> [&#x24C8;](https://github.com/bestiejs/html5.js/blob/master/html5.js#L761 "View in source") [&#x24C9;][1]

*(String)*: The semantic version number.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `html5.createDocumentFragment([ownerDocument=document])`
<a id="html5createdocumentfragmentownerdocumentdocument" href="#html5createdocumentfragmentownerdocumentdocument">#</a> [&#x24C8;](https://github.com/bestiejs/html5.js/blob/master/html5.js#L596 "View in source") [&#x24C9;][1]

Creates a shimmed document fragment.

#### Arguments
1. `[ownerDocument=document]` *(Document)*: The context document.

#### Returns
*(Fragment)*: The created document fragment.

#### Example
~~~ js
// basic usage
html5.createDocumentFragment();

// from a child iframe
parent.html5.createDocumentFragment(document);
~~~

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `html5.createElement([ownerDocument=document], nodeName)`
<a id="html5createelementownerdocumentdocument-nodename" href="#html5createelementownerdocumentdocument-nodename">#</a> [&#x24C8;](https://github.com/bestiejs/html5.js/blob/master/html5.js#L552 "View in source") [&#x24C9;][1]

Creates a shimmed element of the given node name.

#### Arguments
1. `[ownerDocument=document]` *(Document)*: The context document.
2. `nodeName` *(String)*: The node name of the element to create.

#### Returns
*(Element)*: The created element.

#### Example
~~~ js
// basic usage
html5.createElement('div');

// from a child iframe
parent.html5.createElement(document, 'div');
~~~

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `html5.install([ownerDocument=document, options={}])`
<a id="html5installownerdocumentdocument-options" href="#html5installownerdocumentdocument-options">#</a> [&#x24C8;](https://github.com/bestiejs/html5.js/blob/master/html5.js#L654 "View in source") [&#x24C9;][1]

Installs shims according to the specified options.

#### Arguments
1. `[ownerDocument=document]` *(Document)*: The document.
2. `[options={}]` *(Object)*: Options object.

#### Returns
*(Document)*: The document.

#### Example
~~~ js
// basic usage
// autmatically called on the primary document to allow IE < 9 to
// parse HTML5 elements correctly
html5.install();

// from a child iframe
parent.html5.install(document);

// with an options object
html5.install({

  // allow IE6 to use CSS expressions to support `[hidden]` styles
  'expressions': true,

  // overwrite the document's `createElement` and `createDocumentFragment`
  // methods with `html5.createElement` and `html5.createDocumentFragment` equivalents.
  'methods': true,

  // add support for printing HTML5 elements
  'print': true,

  // add default HTML5 element styles
  // (optional if `expressions` option is truthy)
  'styles': true
});

// with an options string
html5.install('print styles');

// from a child iframe with options
parent.html5.install(document, options);

// using a shortcut to install all support extensions
html5.install('all');

// special note:
// the `expressions` options may also be a selector to limit the number of
// elements the CSS expression applies to
html5.install({
  'expressions': 'article, section'
});
~~~

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `html5.noConflict()`
<a id="html5noconflict" href="#html5noconflict">#</a> [&#x24C8;](https://github.com/bestiejs/html5.js/blob/master/html5.js#L688 "View in source") [&#x24C9;][1]

Restores a previously overwritten `html5` object.

#### Returns
*(Object)*: The current `html5` object.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `html5.uninstall([ownerDocument=document, options={}])`
<a id="html5uninstallownerdocumentdocument-options" href="#html5uninstallownerdocumentdocument-options">#</a> [&#x24C8;](https://github.com/bestiejs/html5.js/blob/master/html5.js#L728 "View in source") [&#x24C9;][1]

Uninstalls shims according to the specified options.

#### Arguments
1. `[ownerDocument=document]` *(Document)*: The document.
2. `[options={}]` *(Object)*: Options object.

#### Returns
*(Document)*: The document.

#### Example
~~~ js
// basic usage with an options object
html5.uninstall({

  // remove CSS expression use
  'expressions': true,

  // restore the document's original `createElement`
  // and `createDocumentFragment` methods.
  'methods': true,

  // remove support for printing HTML5 elements
  'print': true,

  // remove default HTML5 element styles
  'styles': true
});

// with an options string
html5.uninstall('print styles');

// from a child iframe with options
parent.html5.uninstall(document, options);

// using a shortcut to uninstall all support extensions
html5.uninstall('all');
~~~

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `html5.support`

<!-- div -->


<!-- div -->

### `html5.support`
<a id="html5support" href="#html5support">#</a> [&#x24C8;](https://github.com/bestiejs/html5.js/blob/master/html5.js#L54 "View in source") [&#x24C9;][1]

*(Object)*: An object used to flag features.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `html5.support.html5Printing`
<a id="html5supporthtml5printing" href="#html5supporthtml5printing">#</a> [&#x24C8;](https://github.com/bestiejs/html5.js/blob/master/html5.js#L114 "View in source") [&#x24C9;][1]

*(Boolean)*: Detect whether the browser supports printing html5 elements.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `html5.support.html5Styles`
<a id="html5supporthtml5styles" href="#html5supporthtml5styles">#</a> [&#x24C8;](https://github.com/bestiejs/html5.js/blob/master/html5.js#L85 "View in source") [&#x24C9;][1]

*(Boolean)*: Detect whether the browser supports default html5 styles.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `html5.support.unknownElements`
<a id="html5supportunknownelements" href="#html5supportunknownelements">#</a> [&#x24C8;](https://github.com/bestiejs/html5.js/blob/master/html5.js#L94 "View in source") [&#x24C9;][1]

*(Boolean)*: Detect whether the browser supports unknown elements.

* * *

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #readme "Jump back to the TOC."