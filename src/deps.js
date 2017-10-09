const WINDOW   = window;
const DOCUMENT = document;
const HEADER   = DOCUMENT.head;

export let POLYFILLS = {
    promise: {
        state: 1,
        url  : 'https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.min.js',

        condition() {
            return WINDOW.Promise;
        }
    },
    fetch  : {
        state: 1,
        url  : 'https://cdn.bootcss.com/fetch/2.0.3/fetch.min.js',

        condition() {
            return WINDOW.fetch;
        }
    }
};

export const isExist = $pf => $pf && $pf.state;

export const isPolyfillReady = $pf => {

    if ( !isExist( $pf ) || $pf.state === 0 ) {
        return true;
    }

    return ($pf.condition && $pf.condition());
};

export const getPolyfill = name => POLYFILLS[name];

export const setPolyfillReadyStatus = $pf => $pf.state = 0;

export const loadScript = ( url, done ) => {
    let node = DOCUMENT.createElement( 'script' );

    node.onload
        = node.onerror
        = node.onabort
        = function () {
        done && done();

        HEADER.removeChild( node );
        node
            = node.onload
            = node.onerror
            = node.onabort
            = null;
    };

    HEADER.insertBefore( node, HEADER.firstChild );
    node.src = url;
};

export const nextTick = fn => WINDOW.setTimeout( fn, 0 );

export const config = ( name, config ) => {
    if ( typeof name === 'string' ) {
        let oldConf     = POLYFILLS[name] || {};
        POLYFILLS[name] = {
            ...oldConf,
            ...config
        };
    } else {
        POLYFILLS = {
            ...POLYFILLS,
            ...name
        }
    }
};