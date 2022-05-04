import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import CurryCounterPageContainer from '../containers/CurryCounter';

interface ComponentProps {}

const CurryCounterPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <title>NF3 Counter</title>
            </Head>
            <PageContainer>
                <CurryCounterPageContainer />
            </PageContainer>
        </>
    );
};

export default CurryCounterPage;
