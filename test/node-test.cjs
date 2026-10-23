/*
 *  Renders every display-math block of test/test-xyjax-v4.html with the
 *  locally built build/xypic.js, using MathJax 4 in Node (liteDOM),
 *  for both the CHTML and SVG output jax, and reports any errors.
 *
 *  Usage:  node test/node-test.cjs [chtml|svg]
 */

// Blocks of the test page that are expected to produce an error.
const EXPECTED_ERRORS = new Set([
  '\\begin{xy}\n(0,0)*{}ABC}\n\\end{xy}'
]);
const fs = require('fs');
const path = require('path');

const jax = process.argv[2] || 'chtml';
const root = path.resolve(__dirname, '..');

global.MathJax = {
  loader: {
    paths: {
      mathjax: '@mathjax/src/bundle',
      custom: path.join(root, 'build')
    },
    load: ['input/tex', `output/${jax}`, 'adaptors/liteDOM', '[custom]/xypic.js'],
    require: require
  },
  tex: {
    packages: {'[+]': ['xypic']},
    formatError: (parser, err) => { throw err; }
  },
  startup: {typeset: false}
};

require('@mathjax/src/bundle/startup.js');

(async () => {
  await MathJax.startup.promise;
  const html = fs.readFileSync(path.join(__dirname, 'test-xyjax-v4.html'), 'utf8');
  const body = html.replace(/^[\s\S]*<body>/, '');
  const blocks = [...body.matchAll(/\\\[([\s\S]*?)\\\]/g)].map(m => m[1]);
  const adaptor = MathJax.startup.adaptor;
  let failed = 0;
  for (const [i, tex] of blocks.entries()) {
    if (EXPECTED_ERRORS.has(tex.trim())) {
      continue;
    }
    try {
      const convert = (jax === 'chtml' ? MathJax.tex2chtmlPromise : MathJax.tex2svgPromise);
      const out = adaptor.outerHTML(await convert(tex, {display: true}));
      if (/merror|data-mjx-error/.test(out)) {
        failed++;
        console.log(`#${i}: error output\n${tex.trim().slice(0, 200)}\n${out.slice(0, 500)}`);
      }
    } catch (err) {
      failed++;
      console.log(`#${i}: ${err.message || err}\n${tex.trim().slice(0, 200)}`);
      if (err.stack && !err.id) console.log(err.stack);
    }
  }
  const total = blocks.length - EXPECTED_ERRORS.size;
  console.log(`${jax}: ${total - failed}/${total} rendered without error`);
  process.exitCode = failed ? 1 : 0;
})().catch(err => { console.error(err); process.exitCode = 1; });
