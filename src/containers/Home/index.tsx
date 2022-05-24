import React, { useEffect, useRef } from 'react';

const HomePageContainer: React.FC = (): JSX.Element => {
    const vidRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const onScroll = (e: any) => {
            vidRef.current?.play();
        };
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    });

    return (
        <div>
            <video ref={vidRef} muted loop style={{ width: '100%' }}>
                <source src={'/assets/currycounter/background-mobile.mp4'} type="video/mp4" />
            </video>
        </div>
    );
};

export default HomePageContainer;
