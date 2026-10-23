/*************************************************************
 *
 *  Copyright (c) 2011-2026 Isao Sonobe <sonoisa@gmail.com>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import './preload.js';
import '../../src/core/XypicConfiguration.js';


import {CreateCHTMLWrapper} from '../../src/output/CHTMLWrappers.js';
import {CreateSVGWrapper} from '../../src/output/SVGWrappers.js';

//
//  Check to see which output jax are loaded, and
//    set up callbacks for if the other is loaded via the menu
//    so that we can set up the wrappers for them.
//
const {Loader} = MathJax._.components.loader;
if (Loader) {
  //
  //  Record the version information for this component (the name depends on how it was loaded,
  //    e.g. '[custom]/xypic.js'), so that the loader does not warn about it.
  //
  const {Package} = MathJax._.components.package;
  for (const name of Package.packages.keys()) {
    if (/(^|\/)xypic(\.js)?$/.test(name)) {
      Loader.saveVersion(name);
    }
  }

  if (!MathJax._.output.chtml.Wrapper.ChtmlWrapper) {
    Loader.ready('output/chtml').then(() => {
      const chtml = MathJax._.output.chtml
      CreateCHTMLWrapper(chtml.Wrapper.ChtmlWrapper, chtml.Wrappers_ts.ChtmlWrappers);
    }).catch(err => console.log('Caught', err));
  }
  if (!MathJax._.output.svg.Wrapper.SvgWrapper) {
    Loader.ready('output/svg').then(() => {
      const svg = MathJax._.output.svg;
      CreateSVGWrapper(svg.Wrapper.SvgWrapper, svg.Wrappers_ts.SvgWrappers);
    }).catch(err => console.log('Caught', err));
  }
}
