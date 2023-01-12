import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { GradientBox } from './styles';
import { SxProps } from '@mui/system';
import Container from '../../../Container';

export interface ComponentProps {
    sx?: SxProps;
}

const steps = [
    {
        step_title: 'Select an NF3 Basketball',
        url: '/assets/mixology/howitworks/step1.mp4',
        isImg: false,
        title: 'STEP 1: SELECT AN NF3 BASKETBALL',
        desc: (
            <Typography fontSize={20} fontWeight={600} lineHeight={1.2}>
                The NF3 basketball does not hold any community traits, but it can still produce an avatar without any
                serums.
                <br />
                <br />
                <br />
                If you do not own an NF3 Basketball, you may purchase one through{' '}
                <a href="https://opensea.io/" target="_blank" style={{ color: '#FFCA21' }}>
                    Opensea
                </a>
                .
            </Typography>
        )
    },
    {
        step_title: 'Choose up to 3 Serums',
        url: '/assets/mixology/howitworks/step2.gif',
        isImg: true,
        title: 'STEP 2: SELECT UP TO 3 SERUMS',
        desc: (
            <Typography fontSize={20} fontWeight={600} lineHeight={1.2}>
                Choose up to 3 community serums to apply to your avatar - the order of Serum selection does not impact
                final outcome. Each Serum guarantees one trait, with a possibility of two.
                <br />
                <br />
                If you do not own any serums, you can purchase through{' '}
                <a href="https://opensea.io/" target="_blank" style={{ color: '#FFCA21' }}>
                    Opensea
                </a>{' '}
                to customize your avatar. You can also proceeds to the next step and build your avatar without Serums,
                as they are not required.
            </Typography>
        )
    },
    {
        step_title: 'Fuse',
        url: '/assets/mixology/howitworks/step3.png',
        isImg: true,
        title: 'STEP 3: FUSE',
        desc: (
            <Typography fontSize={20} fontWeight={600} lineHeight={1.2}>
                Make sure you have selected the NF3 Basketball and community partner serums that you would like to apply
                to your avatar. Fusing is an irreversible action that will burn your selected NFTs, so be sure to
                double-check.
                <br />
                <br />
                When you are ready, click Fuse.
            </Typography>
        )
    },
    {
        step_title: 'Basketball Headz Avatar Created',
        url: '/assets/mixology/howitworks/step4.gif',
        isImg: true,
        title: 'BASKETBALL HEADZ AVATAR CREATED',
        desc: (
            <Typography fontSize={20} fontWeight={600} lineHeight={1.2}>
                You have created a Basketball Headz Avatar!
                <br />
                <br />
                You will not see your Basketball Headz Avatar immediately. Please wait up to 48 hours for the metadata
                to load.
            </Typography>
        )
    }
];

const HowItWorks: React.FC<ComponentProps> = ({ sx }): JSX.Element => {
    const [curStep, setCurStep] = useState<number>(0);

    return (
        <Stack position="relative">
            <Box width="100%" height={{ xs: 1440, md: 720 }}></Box>
            <Stack position="relative">
                <img src="/assets/mixology/background1.png" width="100%" />
                <GradientBox />
            </Stack>
            <Container sx={{ position: 'absolute', inset: 0, paddingY: 16 }}>
                <Stack alignItems="center">
                    <Typography
                        fontSize={{ xs: 32, md: 48 }}
                        fontWeight={800}
                        lineHeight={1}
                        className="neueplak_condensed"
                    >
                        CREATE YOUR BASKETBALL HEADZ AVATAR
                    </Typography>
                    <Typography
                        fontSize={{ xs: 72, md: 128 }}
                        fontWeight={800}
                        lineHeight={1}
                        sx={{ textDecoration: 'underline', textDecorationThickness: 'from-font' }}
                        className="neueplak_condensed"
                    >
                        HOW IT WORKS
                    </Typography>
                    <Typography fontSize={20} fontWeight={600} lineHeight={1} marginTop={6}>
                        Combine your NF3 Basketball with up to three Serums to unlock your custom avatar's unique
                        traits.
                    </Typography>
                    <Stack
                        width="80%"
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        marginTop={8}
                        paddingBottom={2}
                        sx={{ overflowY: 'hidden', overflowX: 'auto' }}
                    >
                        {steps.map((step, index) => (
                            <>
                                <Stack
                                    alignItems="center"
                                    spacing={2}
                                    onClick={() => setCurStep(index)}
                                    sx={{ cursor: 'pointer' }}
                                    key={`step_key${index}`}
                                >
                                    <Stack
                                        width={28}
                                        height={28}
                                        justifyContent="center"
                                        alignItems="center"
                                        borderRadius="100%"
                                        sx={{ background: curStep === index ? '#FFCA21' : '#979797' }}
                                    >
                                        <Typography
                                            fontSize={12}
                                            fontWeight={600}
                                            color={curStep === index ? 'black' : 'white'}
                                            marginBottom="2px"
                                        >
                                            {index + 1}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        fontSize={14}
                                        fontWeight={500}
                                        color={curStep === index ? 'white' : '#979797'}
                                        whiteSpace="nowrap"
                                    >
                                        {step.step_title}
                                    </Typography>
                                </Stack>
                                <Box
                                    minWidth={100}
                                    flexGrow={1}
                                    height="1px"
                                    display={index === steps.length - 1 ? 'none' : 'block'}
                                    sx={{ background: '#BDBDBD' }}
                                />
                            </>
                        ))}
                    </Stack>
                    <Stack
                        width="80%"
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={6}
                        padding={4}
                        border="1px solid #BDBDBD"
                        borderRadius={2}
                        marginTop={8}
                    >
                        <Box width={224} minWidth={224} height={224} borderRadius={2} overflow="hidden">
                            {steps[curStep].isImg ? (
                                <img src={steps[curStep].url} width="100%" />
                            ) : (
                                <video autoPlay muted loop style={{ width: '100%' }}>
                                    <source src={steps[curStep].url} type="video/mp4" />
                                </video>
                            )}
                        </Box>
                        <Stack spacing={2}>
                            <Typography
                                fontSize={{ xs: 32, md: 48 }}
                                fontWeight={800}
                                lineHeight={1}
                                className="neueplak_condensed"
                            >
                                {steps[curStep].title}
                            </Typography>
                            {steps[curStep].desc}
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    );
};

export default HowItWorks;
