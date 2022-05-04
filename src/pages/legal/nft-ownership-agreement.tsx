import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../../containers/PageContainer';
import OwnershipAgreementPageContainer from '../../containers/OwnershipAgreement';

interface ComponentProps {}

const OwnershipAgreementPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <PageContainer>
                <OwnershipAgreementPageContainer />
            </PageContainer>
        </>
    );
};

export default OwnershipAgreementPage;
