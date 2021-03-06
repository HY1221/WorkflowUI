var webpack = require("webpack");
var AotPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
var AngularCompilerPlugin = new AotPlugin({
    entryModule: "./source_code/AppModule#AppModule",
    tsConfigPath: "./tsconfig.json"
});
/*
const WorkboxPlugin = require('workbox-webpack-plugin');
const PWAPlugin = new WorkboxPlugin.GenerateSW({
    //clientsClaim: true,
    //skipWaiting: true
    dwDest: path.join
});
*/

module.exports = (environment)=>{
    const webpackconfig = {
        entry: {            
            "app": "./source_code/Main.ts",
            //"sw_cache": "./src/serviceworker/sw_cache.ts"
        },
        output: {
            filename: "[name].js",
            path: __dirname + "/dist",
            libraryTarget: "umd",
            globalObject: "this"
        },
        mode: "development",
        
        
        optimization: {
            splitChunks: {
                chunks: "all",
                cacheGroups: {
                    rxjs: {
                        test: /[\\/]rxjs[\\/]/,
                        name: "rxjs",
                        minSize: 0
                    },
                    angular: {
                        test: /[\\/]@angular[\\/]/,
                        name: "angular",
                        minSize: 0
                    }
                }
            }
        },
        devServer: {
            contentBase: __dirname + '/assets',
            https: false,
            inline: false,
            compress: false,
            port: 10086,
            historyApiFallback: {
                index: "/"
            }
        },
        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                { test: /\.tsx?$/, loader: [ /*"awesome-typescript-loader",*/"@ngtools/webpack" ] },
                { test: /\.(html|css)$/, loader: 'raw-loader', exclude: /\.async\.(html|css)$/}
            ]
        },
        devtool: "source-map",    
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"]
        },    
        plugins: [ AngularCompilerPlugin ]
    };

    return webpackconfig;
};