import {config, getPolyfill, isPolyfillReady, loadScript, nextTick, setPolyfillReadyStatus} from "./src/deps";

const PolyfillA = ( polyfills, done ) => {
    let copyFromPolyfills = polyfills.slice( 0 );

    function checkIsBoundary() {
        copyFromPolyfills.splice( 0, 1 );
        ( !copyFromPolyfills.length ) && done && done();
    }

    return nextTick( () => polyfills.forEach( item => {
        let $polyfill = getPolyfill( item );

        if ( !isPolyfillReady( $polyfill ) ) {
            return loadScript(
                $polyfill.url,
                () => {
                    setPolyfillReadyStatus( $polyfill );
                    checkIsBoundary();
                }
            );
        }

        checkIsBoundary();
    } ) );
};

PolyfillA.config = config;

export default PolyfillA;