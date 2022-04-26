import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import CurryShopPageContainer from '../containers/CurryShop';

interface ComponentProps {}

const CurryShopPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Curry Part 2 - CurryShop</title>
            </Head>
            <PageContainer>
                <CurryShopPageContainer />
            </PageContainer>
        </>
    );
};

export default CurryShopPage;
