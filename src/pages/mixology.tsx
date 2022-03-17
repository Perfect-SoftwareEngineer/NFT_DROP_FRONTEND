import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import Container from '../containers/Container';

interface ComponentProps {}

const Home: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Curry Part 2 - Mixology</title>
            </Head>
            <PageContainer>
                <Container>Mixology Room</Container>
            </PageContainer>
        </>
    );
};

export default Home;
