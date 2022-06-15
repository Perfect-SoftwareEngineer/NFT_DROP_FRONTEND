import React, { useEffect, PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import LabPageContainer from '../containers/Lab';
import { useRouter } from 'next/router';

interface ComponentProps {}

const LabPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    const router = useRouter();

    // useEffect(() => {
    //     router.push('/');
    // }, []);

    return (
        <>
            <PageContainer>
                <LabPageContainer />
            </PageContainer>
        </>
    );
};

export default LabPage;
