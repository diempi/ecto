/* ecto
 * Simple/fast node.js blogging system.
 *
 * JS Document - /src/core/middlewares.js
 * Express Middlewares
 *
 * coded by leny
 * started at 02/09/13
 */

"use strict";

exports.log = function( oRequest, oResponse, fNext ) {
    console.log( "(" + oRequest.method + ") " + oRequest.url );
    fNext();
};

