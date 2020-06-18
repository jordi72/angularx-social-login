const path = require('path');
const Uglify = require('uglifyjs-webpack-plugin');

const umd = Object.assign({}, {
    mode: 'none',
    entry: './src/public-api.ts',
    output: {
        filename: 'bundle.umd.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            './node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/, 
                loader: "ts-loader"
            }
        ]
    }
});

const umdMin = Object.assign({}, {
    mode: 'none',
    entry: './src/public-api.ts',
    output: {
        filename: 'bundle.umd.min.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            './node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/, 
                loader: "ts-loader"
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new Uglify()]
    }
});

/* const umd2 = Object.assign({}, {
    mode: 'none',
    entry: './src/public_api.ts',
    output: {
        filename: 'bundle.umd2.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd2'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            './node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/, 
                loader: "ts-loader"
            }
        ]
    }
});

const amd = Object.assign({}, {
    mode: 'none',
    entry: './src/public_api.ts',
    output: {
        filename: 'bundle.amd.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'amd'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            './node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/, 
                loader: "ts-loader"
            }
        ]
    }
});

const amdRequire = Object.assign({}, {
    mode: 'none',
    entry: './src/public_api.ts',
    output: {
        filename: 'bundle.amdr.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'amd-require'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            './node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/, 
                loader: "ts-loader"
            }
        ]
    }
});

const cjs = Object.assign({}, {
    mode: 'none',
    entry: './src/public_api.ts',
    output: {
        filename: 'bundle.cjs.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            './node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/, 
                loader: "ts-loader"
            }
        ]
    }
});

const cjs2 = Object.assign({}, {
    mode: 'none',
    entry: './src/public_api.ts',
    output: {
        filename: 'bundle.cjs2.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            './node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/, 
                loader: "ts-loader"
            }
        ]
    }
});

const cjsModule = Object.assign({}, {
    mode: 'none',
    entry: './src/public_api.ts',
    output: {
        filename: 'bundle.cjsm.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs-module'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            './node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/, 
                loader: "ts-loader"
            }
        ]
    }
});

const system = Object.assign({}, {
    mode: 'none',
    entry: './src/public_api.ts',
    output: {
        filename: 'bundle.system.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'system'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            './node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/, 
                loader: "ts-loader"
            }
        ]
    }
});

const window = Object.assign({}, {
    mode: 'none',
    entry: './src/public_api.ts',
    output: {
        filename: 'bundle.window.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'window'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            './node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/, 
                loader: "ts-loader"
            }
        ]
    }
});
 */

module.exports = [umd, umdMin /* umd2, amd, amdRequire, cjs, cjs2, cjsModule, system, window */];
