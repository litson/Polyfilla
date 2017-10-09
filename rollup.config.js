/* global require */

import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";

const BANNER =
          '/*!\n' +
          ' * Polyfilla.js v' + require( './package.json' ).version + '\n' +
          ' * (c) ' + new Date().getFullYear() + ' Litson Zhang\n' +
          ' * Released under the MIT License.\n' +
          ' */';

export default {
    entry     : 'polyfilla.js',
    format    : 'umd',
    moduleName: 'Polyfilla',
    plugins   : [babel(), json()],
    banner    : BANNER,
    useStrict : false,
    sourceMap : false,
    dest      : './dist/polyfilla.js'
};