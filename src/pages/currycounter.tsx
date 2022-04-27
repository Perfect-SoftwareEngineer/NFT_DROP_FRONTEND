import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import CurryCounterPageContainer from '../containers/CurryCounter';

interface ComponentProps {}

const CurryCounterPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <PageContainer>
                <CurryCounterPageContainer />
            </PageContainer>
        </>
    );
};

export default CurryCounterPage;
