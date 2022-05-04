import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import LabPageContainer from '../containers/Lab';

interface ComponentProps {}

const LabPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <PageContainer>
                <LabPageContainer />
            </PageContainer>
        </>
    );
};

export default LabPage;
