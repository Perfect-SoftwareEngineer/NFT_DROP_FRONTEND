import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

const HomePageContainer: React.FC = (): JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<ReactPlayer>(null);

    const [isReady, setIsReady] = React.useState(false);
    // const [videoLen, setVideoLen] = React.useState<number>(0);
    const [maxScrollY, setMaxScrollY] = React.useState<number>(0);

    useEffect(() => {
        const onScroll = (e: any) => {
            playerRef.current?.seekTo(window.scrollY / maxScrollY, 'fraction');
        };
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    });

    const onReady = React.useCallback(() => {
        if (!isReady) {
            // setVideoLen(playerRef.current ? playerRef.current.getDuration() : 0);
            setMaxScrollY(document.documentElement.scrollHeight - document.documentElement.clientHeight);

            setIsReady(true);
        }
    }, [isReady]);

    return (
        <div ref={containerRef}>
            <ReactPlayer
                ref={playerRef}
                url="/assets/currycounter/background-mobile.mp4"
                muted={false}
                playing={false}
                width="100%"
                height="100%"
                onReady={onReady}
            />
        </div>
    );
};

export default HomePageContainer;
