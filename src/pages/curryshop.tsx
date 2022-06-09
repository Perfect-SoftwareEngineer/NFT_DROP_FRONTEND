import React, { useEffect, PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import CurryShopPageContainer from '../containers/CurryShop';
import { useRouter } from 'next/router';

interface ComponentProps {}

const CurryShopPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    const router = useRouter();

    // useEffect(() => {
    //     router.push('/');
    // }, []);

    return (
        <>
            <PageContainer>
                <CurryShopPageContainer />
            </PageContainer>
        </>
    );
};

export default CurryShopPage;
