module.exports = {
    webpack: (config, { isServer }) => {
        // Enable WebAssembly as an experimental feature
        config.experiments = { asyncWebAssembly: true };

        return config;
    },
    images: {
        loader: 'akamai',
        path: '',
    },
}