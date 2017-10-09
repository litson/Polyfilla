const WINDOW   = window;
const DOCUMENT = document;
const HEADER   = DOCUMENT.head;

export let POLYFILLS = {};

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

    for ( let $p of POLYFILLS ) {
        if ( typeof $p.state === 'undefined' ) {
            $p.state = 1;
        }
    }

};


