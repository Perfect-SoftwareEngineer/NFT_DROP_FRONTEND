import React from 'react';
import { Stack, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type ComponentProps = {};

const HowItWorks: React.FC<ComponentProps> = (): JSX.Element => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Grid width="100vw" container padding={5} columnSpacing={6} rowGap={6}>
            <Grid item xs={12} md={6}>
                <Typography
                    fontSize={{ xs: 32, md: 48 }}
                    fontWeight={700}
                    lineHeight={1}
                    className="neueplak_condensed"
                >
                    HOW IT WORKS
                </Typography>
                <Typography
                    fontSize={{ xs: 24, md: 32 }}
                    fontWeight={800}
                    lineHeight={1}
                    marginTop={7}
                    className="neueplak_condensed"
                >
                    CREATING YOUR BASKETBALL HEADZ AVATAR
                </Typography>
                <Typography fontSize={{ xs: 16, md: 20 }} fontWeight={600} lineHeight={1} marginTop={2}>
                    Combine your NF3 Basketball with up to 3 Serums to determine how your avatar is made
                </Typography>
                <Stack direction="row" alignItems="center" marginTop={5}>
                    <img src="/assets/home/howitworks/nf3-basketball.png" width={matchDownMd ? 60 : 100} alt="" />
                    <AddIcon sx={{ fontSize: 32, marginLeft: { xs: 1, md: 2 } }} />
                    <Stack direction="row" spacing={1} marginLeft={{ xs: 2, md: 4 }}>
                        {[...Array(3).keys()].map((item) => (
                            <img
                                src="/assets/home/howitworks/serum.png"
                                width={matchDownMd ? 60 : 100}
                                style={{ borderRadius: '0px 8px 8px 0px' }}
                                alt=""
                            />
                        ))}
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography
                    fontSize={{ xs: 32, md: 48 }}
                    fontWeight={700}
                    lineHeight={1}
                    className="neueplak_condensed"
                >
                    IMPORTANT DATES
                </Typography>
                <Typography fontSize={20} lineHeight={1.2} marginTop={3}>
                    <span style={{ fontWeight: 600 }}>Genesis Curry Flow Freebies for NF3 Basketballs:</span>
                    <br />
                    <br />
                    Snapshot Date: <span style={{ color: '#FFCA21' }}>June 9th at 4:00:00 PM PST</span>
                    <br />
                    Start Date: <span style={{ color: '#FFCA21' }}>June 9th at 5:00:00 PM PST</span>
                    <br />
                    End Date: <span style={{ color: '#FFCA21' }}>June 11th at 5:00:00 PM PST</span>
                    <br />
                    <br />
                    <span style={{ fontWeight: 600 }}>Early Purchase (Mintlist) for NF3 Basketballs and Serums:</span>
                    <br />
                    <span style={{ fontWeight: 600 }}>Genesis Curry Flow Freebies for Serums:</span>
                    <br />
                    <br />
                    Start Date: <span style={{ color: '#FFCA21' }}>June 19th at 5:00:00 PM PST</span>
                    <br />
                    Mintlist End Date: <span style={{ color: '#FFCA21' }}>June 21st at 5:00:00 PM PST</span>
                    <br />
                    <br />
                    <span style={{ fontWeight: 600 }}>General Purchase for NF3 Basketballs and Serums:</span>
                    <br />
                    <br />
                    NF3 Basketball Start Date: <span style={{ color: '#FFCA21' }}>June 29th at 5:00:00 PM PST</span>
                    <br />
                    Serum Start Date: <span style={{ color: '#FFCA21' }}>June 29th at 5:00:00 PM PST</span>
                </Typography>
            </Grid>
        </Grid>
    );
};

export default HowItWorks;
