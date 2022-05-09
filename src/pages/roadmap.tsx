import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import RoadmapPageContainer from '../containers/Roadmap';

interface ComponentProps {}

const RoadmapPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <PageContainer>
                <RoadmapPageContainer />
            </PageContainer>
        </>
    );
};

export default RoadmapPage;
