import React, { useEffect, PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import Container from '../containers/Container';
import { useRouter } from 'next/router';

interface ComponentProps {}

const Home: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        router.push('/currycounter');
    }, []);

    return <></>;
};

export default Home;
