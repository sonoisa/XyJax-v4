# XyJax v4
 -- Xy-pic extension for **MathJax version 4** --

----
XyJax is an almost Xy-pic compatible extension for **MathJax version 4**.

This extension enables you to draw various graphs and diagrams.

See https://sonoisa.github.io/xyjax-v4/xyjax-v4.html for more details. And origins

- MathJax: https://www.mathjax.org/
- Xy-pic: https://www.tug.org/applications/Xy-pic/

This software is under development.


## Installation instructions

### Using XyJax-v4 from a CDN

(ref. test/sample-xyjax-v4-CDN.html)

1. In your html, configure it to load the xypic.js.
```
<script>
  MathJax = {
    loader: {
      load: ['[custom]/xypic.js'],
      paths: {custom: 'https://cdn.jsdelivr.net/gh/sonoisa/XyJax-v4@4/build/'}
    },
    tex: {
      packages: {'[+]': ['xypic']}
    }
  };
</script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js"></script>
<!-- <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-svg.js"></script> -->
```


### Hosting your own copy of XyJax-v4

(ref. test/sample-xyjax-v4-chtml.html and test/sample-xyjax-v4-svg.html)

1. Download build/xypic.js. The rest of the files are not necessary for use. 

2. In your html, configure it to load the xypic.js you downloaded.
```
<script>
  MathJax = {
    loader: {
      load: ['[custom]/xypic.js'],
      paths: {custom: '.'}  // specify the path where xypic.js is located. 
                            // This example assumes that xypic.js is in the same place as html.
    },
    tex: {
      packages: {'[+]': ['xypic']}
    }
  };
</script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js"></script>
<!-- <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-svg.js"></script> -->
```


## Supported MathJax Functions

- Supported MathJax version:
    - 4.0.0+ (for MathJax 3, use [XyJax-v3](https://github.com/sonoisa/XyJax-v3))
- Supported Renderers:
    - CHTML
    - SVG
- Accessibility does not work.  


## For Developers

### How to build xypic.js
```
$ git clone https://github.com/sonoisa/XyJax-v4 XyJax-v4
$ cd XyJax-v4
$ npm install
$ npm run clean
$ npm run build
```

The build configuration is in components/xypic/config.json
(the MathJax 4 component build system is used: `@mathjax/src/components/bin/pack`).


### How to test
```
$ npm test
```

This renders all diagrams in test/test-xyjax-v4.html with build/xypic.js
in Node.js (CHTML and SVG output), and reports any errors.
To check the rendering visually, open test/test-xyjax-v4.html in a browser
(serve the repository directory with a local web server).
