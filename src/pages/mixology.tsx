import React, { useEffect, PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import MixologyPageContainer from '../containers/Mixology';
import { useRouter } from 'next/router';

interface ComponentProps {}

const MixologyPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    const router = useRouter();

    // useEffect(() => {
    //     router.push('/');
    // }, []);

    return (
        <>
            <PageContainer>
                <MixologyPageContainer />
            </PageContainer>
        </>
    );
};

export default MixologyPage;
