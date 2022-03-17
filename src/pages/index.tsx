import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import Container from '../containers/Container';

interface ComponentProps {}

const Home: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Next.js MUI Project</title>
            </Head>
            <PageContainer>
                <Container>Content Box</Container>
            </PageContainer>
        </>
    );
};

export default Home;
