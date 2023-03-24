
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    webpack: (config, { isServer }) => {
        // Enable WebAssembly as an experimental feature
        config.experiments = { asyncWebAssembly: true };

        return config;
    },

    assetPrefix: isProd ? '/goscript-dev-site/' : '',
    images: {
        unoptimized: true,
    },
}