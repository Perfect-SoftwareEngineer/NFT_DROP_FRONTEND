/** @type {import('next').NextConfig} */
// next.config.js
require('dotenv').config();
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withPWA(
    withBundleAnalyzer({
        pwa: {
            dest: 'public',
            runtimeCaching,
            disable: process.env.NODE_ENV === 'development',
        },
        reactStrictMode: true,
        webpack: (config, { isServer }) => {
            const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
            fileLoaderRule.exclude = /\.svg$/;

            if (!isServer) {
                config.resolve.fallback.fs = false;
            }

            if (process.env.NODE_ENV === 'development') {
                config.resolve.alias = {
                    ...config.resolve.alias,
                    'lightweight-charts': 'lightweight-charts/dist/lightweight-charts.esm.development.js',
                };
            }

            config.module.rules.push({
                loader: '@svgr/webpack',
                options: {
                    prettier: false,
                    svgo: true,
                    svgoConfig: {
                        plugins: [{ removeViewBox: false }],
                    },
                    titleProp: true,
                    replaceAttrValues: { '#000': '{props.fill}' },
                },
                test: /\.svg$/,
            });

            return config;
        },
    })
);
