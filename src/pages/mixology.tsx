import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import MixologyPageContainer from '../containers/Mixology';

interface ComponentProps {}

const MixologyPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <PageContainer>
                <MixologyPageContainer />
            </PageContainer>
        </>
    );
};

export default MixologyPage;
