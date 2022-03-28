module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/screening-timer/" : "/",
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: './src/service-worker.js',
            swDest: 'service-worker.js',
        },
    },
};
