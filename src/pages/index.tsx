import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import Container from '../containers/Container';

interface ComponentProps {}

const Home: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <PageContainer>
                <Container>Home</Container>
            </PageContainer>
        </>
    );
};

export default Home;
