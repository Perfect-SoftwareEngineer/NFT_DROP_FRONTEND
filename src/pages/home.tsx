import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import HomePageContainer from '../containers/Home';

interface ComponentProps {}

const HomePage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <PageContainer>
            <HomePageContainer />
        </PageContainer>
    );
};

export default HomePage;
