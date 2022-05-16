import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import FTXHoldersPageContainer from '../containers/FTXHolders';

interface ComponentProps {}

const FTXHoldersPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <PageContainer>
                <FTXHoldersPageContainer />
            </PageContainer>
        </>
    );
};

export default FTXHoldersPage;
