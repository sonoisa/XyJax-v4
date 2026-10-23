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

/**
 * Returns the wrapper factory of the output jax that MathJax has already created
 * (only when its name matches the given one), or null.
 *
 * Wrapper factories copy their default wrapper map when they are created,
 * so wrappers registered after that must also be added to the existing factory.
 *
 * @param {string} name  "chtml" or "svg"
 */
export function getOutputJaxFactory(name) {
	const MathJax = globalThis.MathJax;
	if (!MathJax || !MathJax.startup) {
		return null;
	}
	const jax = MathJax.startup.output;
	if (!jax || !jax.factory || typeof jax.name !== "string" || jax.name.toLowerCase() !== name) {
		return null;
	}
	return jax.factory;
}
