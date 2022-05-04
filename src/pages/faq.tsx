import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import FAQPageContainer from '../containers/FAQ';

interface ComponentProps {}

const FAQPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <Head>
                <title>FAQ</title>
            </Head>
            <PageContainer>
                <FAQPageContainer />
            </PageContainer>
        </>
    );
};

export default FAQPage;
