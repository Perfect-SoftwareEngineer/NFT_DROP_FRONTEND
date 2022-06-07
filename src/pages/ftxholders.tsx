import React, { useEffect, PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import FTXHoldersPageContainer from '../containers/FTXHolders';
import { useRouter } from 'next/router';

interface ComponentProps {}

const FTXHoldersPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    const router = useRouter();

    // useEffect(() => {
    //     router.push('/');
    // }, []);

    return (
        <>
            <PageContainer>
                <FTXHoldersPageContainer />
            </PageContainer>
        </>
    );
};

export default FTXHoldersPage;
