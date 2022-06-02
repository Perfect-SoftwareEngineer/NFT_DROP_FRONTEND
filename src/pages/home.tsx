import React, { useEffect, PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import HomePageContainer from '../containers/Home';
import { useRouter } from 'next/router';

interface ComponentProps {}

const HomePage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        router.push('/currycounter');
    }, []);

    return (
        // <PageContainer>
        //     <HomePageContainer />
        // </PageContainer>
        <></>
    );
};

export default HomePage;
