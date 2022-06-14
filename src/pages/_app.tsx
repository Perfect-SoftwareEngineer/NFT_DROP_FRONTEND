import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles/index.scss';
import { ThemeProvider } from '@mui/material/styles';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../styles/theme';
import createEmotionCache from '../utils/createEmotionCache';
import { AppContextProvider } from '../context/AppContext';
import { RecoilRoot } from 'recoil';

function getLibrary(provider: any) {
    return new Web3(provider);
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    return (
        <RecoilRoot>
            <Web3ReactProvider getLibrary={getLibrary}>
                <CacheProvider value={emotionCache}>
                    <Head>
                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                        <title>Curry Brand NF3 Basketball</title>

                        <meta charSet="utf-8" />
                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                        <meta name="author" content="Curry Brand NF3 Basketball" />
                        <meta
                            name="description"
                            content="Every three-pointer that Stephen makes during the playoffs, Curry Brand will release three NFT basketballs free of charge to fans on a first-come, first-serve basis."
                        />

                        {/* Metadata */}
                        <meta property="og:title" content="Basketball Headz" />
                        <meta
                            property="og:image"
                            content="https://luna-bucket.s3.us-east-2.amazonaws.com/400x400_CURRY.png"
                        />
                        <meta property="og:image:width" content="256" />
                        <meta property="og:image:height" content="256" />
                        <meta property="og:image:type" content="image/png" />
                        <meta property="og:url" content="https://lab.currybrand.com" />
                        <meta property="og:site_name" content="Basketball Headz" />
                        <meta property="og:type" content="website" />
                        <meta
                            property="og:description"
                            content="Curry brand is unifying basketball and positive communities across the Metaverse. Introducing Basketball Headz - a limited-edition 3D generative NFT project that unifies multiple communities to mix and match your favorite NFT traits"
                        />

                        {/* Twitter Cards */}
                        <meta name="twitter:title" content="Basketball Headz" />
                        <meta
                            name="twitter:description"
                            content="Curry brand is unifying basketball and positive communities across the Metaverse. Introducing Basketball Headz - a limited-edition 3D generative NFT project that unifies multiple communities to mix and match your favorite NFT traits"
                        />
                        <meta
                            name="twitter:image"
                            content="https://luna-bucket.s3.us-east-2.amazonaws.com/400x400_CURRY.png"
                        />
                        <meta name="twitter:site" content="@LunaMarketInc" />
                        <meta name="twitter:creator" content="@LunaMarketInc" />
                    </Head>
                    <ThemeProvider theme={theme}>
                        <AppContextProvider>
                            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                            <CssBaseline />
                            <Component {...pageProps} />
                        </AppContextProvider>
                    </ThemeProvider>
                </CacheProvider>
            </Web3ReactProvider>
        </RecoilRoot>
    );
}
