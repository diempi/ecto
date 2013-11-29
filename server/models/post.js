/* ecto
 * Simple/fast node.js blogging system.
 *
 * JS Document - /server/models/post.js
 * Main entry point
 *
 * coded by leny
 * started at 18/11/13
 */

 "use strict";

var root= __dirname + "/..",
    sPostsFolderPath = root + "/../posts";

var FS = require ("fs");

var Markdown = require("markdown").markdown;


 var Post = function(sFileName, fNext){
    var _sFileName = sFileName,
        _sFilePath = sPostsFolderPath + "/" + sFileName,
        _sTitle,
        _dDate,
        _sContent;


        this.__defineGetter__("title", function(){
            return _sTitle;
        });

        this.__defineSetter__("title", function( sTitle ){
             _sTitle = sTitle;
        });


        this.__defineGetter__("date", function(){
            return _dDate;
        });

        this.__defineSetter__("date", function( dDate ){
             _dDate = dDate;
        });


        this.__defineGetter__("content", function(){
            return _sContent;
        });

        this.__defineSetter__("content", function( sContent ){
             _sContent = sContent;
        });


        this.__defineGetter__("markdown", function(){
            return Markdown.toHTML( _sContent );
        });

        this.__defineGetter__("path", function(){
            return _sFilePath;
        });

        this.__defineGetter__("file", function(){
            return _sFileName;
        });

        this.__defineGetter__("url", function(){
            return "/" +  _sFileName.replace(".json", ".html");
        });

    this.load(fNext); // on charge le fichier

 };

Post.prototype.load = function(fNext){
    var that = this;
    FS.exists(this.path, function( bExists){
        if(!bExists){
            return fNext && fNext( new Error(that.path + " Doesn't exist! "));
        }
        FS.readFile(that.path, {"encoding": "utf8"}, function(oError, sRawContent){
            var oPost;
            if( oError){
                return fNext && fNext(oError);
            }
            oPost = JSON.parse( sRawContent);
            that.title = oPost.title;
            that.date = new Date(oPost.date);
            that.content = oPost.content;
            return fNext && fNext(null,that);
        });
    });
};

Post.compareDates = function ( a, b ){
    return a.date.getTime() - b.date.getTime();
};

Post.loadAll = function( bFilter, fNext ){
    // Vérifier qu'on a des fichiers de post
    FS.readdir( sPostsFolderPath, function( oError, aFiles ){
        //console.log(oError, aFiles);
        //fNext();
        var i, sPostFile,
        aPosts = [],
        iFilesLoaded = 0,
        iNow = (new Date()).getTime(),
        fFileLoaded = function ( oError, oPost ){
            if ( !oError) {
                if( !bFilter || bFilter && oPost.date.getTime() <= iNow ){
                    aPosts.push( oPost );
                }
            }
            if( ++iFilesLoaded === aFiles.length ){
                aPosts.sort( Post.compareDates ).reverse();
                return fNext && fNext( null,aPosts );
            }
        };
        if ( oError ){
            return fNext && fNext ( oError );
        }
        for (i = -1; sPostFile = aFiles[ ++i];){
            new Post(sPostFile, fFileLoaded);
        }

    });
};

module.exports = Post;
