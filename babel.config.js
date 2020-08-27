module.exports = {
    presets: [
        [
            '@babel/preset-env', {
                modules: false,
            },
        ],
    ],
    plugins: [
        [
            '@babel/plugin-transform-classes', {
                loose: false
            }
        ],
        [
            '@babel/plugin-transform-runtime', {
                corejs: {
                    version: 3,
                    proposals: true,
                },
                useESModules: true,
            },
        ], [
            '@babel/plugin-proposal-class-properties', {
                loose: false,
            },
        ],
    ],
};