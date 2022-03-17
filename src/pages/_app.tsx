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
