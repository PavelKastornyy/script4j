module.exports = function (api) {
    api.cache(true);
    console.log("Point XXX");
    return {
        babelrcRoots: [
            '.',
            './modules/script4j.base',
            './modules/script4jfx.base',
            './modules/script4jfx.graphics'
        ],
	ignore: [/node_modules/],
        presets: ["@babel/preset-env"]
    };
}




//    const path = require('path');
//
//    const aliases = {
//        'script4j.base': __dirname + '/modules/script4j.base',
//        'script4jfx.base': __dirname + '/modules/script4jfx.base'
//    };
//
//
//    const plugins = [
//    [
//      'module-resolver',
//      {
//        // https://github.com/tleunen/babel-plugin-module-resolver/issues/338
//        // There seem to be a bug with module-resolver with a mono-repo setup:
//        // It doesn't resolve paths correctly when using root/alias combo, so we
//        // use this function instead.
//        resolvePath(sourcePath) {
//            console.log(sourcePath + "**" + path);
//          //  console.log(aliases);
//            // This will return undefined if aliases has not key for the sourcePath,
//          //  in which case module-resolver will fallback on its default behaviour.
//          return aliases[sourcePath];
//        },
//      },
//    ]
//];
    //throw new Error();