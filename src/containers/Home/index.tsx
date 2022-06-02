import React, { useState, useEffect, useRef } from 'react';
import { Stack } from '@mui/material';
import ReactPlayer from 'react-player';
import style from './style';
import disableScroll from 'disable-scroll';

const HomePageContainer: React.FC = (): JSX.Element => {
    const playerRef = useRef<ReactPlayer>(null);

    const [seekPos, setSeekPos] = useState<number>(0);

    const handleScroll = (event: any) => {
        if (event.deltaY < 0) {
            // console.log('scrolling up, seekPos:', seekPos);
            setSeekPos(Math.max(seekPos - 0.01, 0));
        } else if (event.deltaY > 0) {
            // console.log('scrolling down, seekPos:', seekPos);
            setSeekPos(Math.min(seekPos + 0.01, 1));
        }
    };

    useEffect(() => {
        // if (seekPos < 1) {
        //     disableScroll.on();
        // } else {
        //     disableScroll.off();
        // }

        window.addEventListener('wheel', handleScroll);

        return () => window.removeEventListener('wheel', handleScroll);
    }, [seekPos]);

    useEffect(() => {
        // console.log('seekPos:', seekPos);
        playerRef.current?.seekTo(seekPos, 'fraction');
    }, [seekPos]);

    return (
        <>
            <ReactPlayer
                ref={playerRef}
                url="/assets/home/video.mp4"
                muted={false}
                playing={false}
                width="100%"
                height="calc(100vh - 222px)"
            />
            <Stack height={1000}>afdasdfasdf</Stack>
            <style jsx>{style}</style>
        </>
    );
};

export default HomePageContainer;
