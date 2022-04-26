import React, { FC, PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';
import style, { PageWrapper } from './style';
import { useWeb3React } from '@web3-react/core';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';

type ComponentProps = {};

const PageContainer: FC<PropsWithChildren<ComponentProps>> = ({ children }): JSX.Element => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const [appState, setAppState] = useAppContext();
    const router = useRouter();

    let footerHidden: boolean = router.pathname === '/mixology' && !!account && appState.mixologyCurStep < 3;

    return (
        <>
            <PageWrapper>
                <div className="site__header">
                    <Header />
                </div>
                <div className="site__main">{children}</div>
                <div className="site__footer">{!footerHidden && <Footer />}</div>
            </PageWrapper>
            <style jsx>{style}</style>
        </>
    );
};

export default PageContainer;
