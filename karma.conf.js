module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        files: [
            {
                pattern: './src/spec/run.js',
                watched: false
            }
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            './src/spec/run.js': ['webpack']
        },
        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        query: {
                            presets: [
                                ['env', {
                                "targets": {
                                    "node": "current"
                                    }
                                }]
                            ]
                        }
                    }
                ]
            },
            watch: true
        },
        webpackServer: {
            noInfo: true
        }
    });
};