import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import MixologyPageContainer from '../containers/Mixology';

interface ComponentProps {}

const Home: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Curry Part 2 - Mixology</title>
            </Head>
            <PageContainer>
                <MixologyPageContainer />
            </PageContainer>
        </>
    );
};

export default Home;
