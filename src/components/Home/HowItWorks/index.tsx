import React from 'react';
import { Stack, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type ComponentProps = {};

const HowItWorks: React.FC<ComponentProps> = (): JSX.Element => {
    return (
        <Grid width="100vw" container padding={5} columnSpacing={6}>
            <Grid item xs={6}>
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
                <Typography fontSize={20} fontWeight={600} lineHeight={1} marginTop={2}>
                    Combine your NF3 Basketball with up to 3 Serums to determine how your avatar is made
                </Typography>
                <Stack direction="row" alignItems="center" marginTop={5}>
                    <img src="/assets/home/howitworks/nf3-basketball.png" width={100} alt="" />
                    <AddIcon sx={{ fontSize: 32, marginLeft: 2 }} />
                    <Stack direction="row" spacing={1} marginLeft={4}>
                        {[...Array(3).keys()].map((item) => (
                            <img
                                src="/assets/home/howitworks/serum.png"
                                width={100}
                                style={{ borderRadius: '0px 8px 8px 0px' }}
                                alt=""
                            />
                        ))}
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Typography
                    fontSize={{ xs: 32, md: 48 }}
                    fontWeight={700}
                    lineHeight={1}
                    className="neueplak_condensed"
                >
                    IMPORTANT DATES
                </Typography>
                <Typography
                    fontSize={{ xs: 24, md: 32 }}
                    fontWeight={800}
                    lineHeight={1}
                    marginTop={7}
                    className="neueplak_condensed"
                >
                    NF3 BASKETBALL
                </Typography>
                <Typography fontSize={20} lineHeight={1.2} marginTop={2}>
                    <span style={{ fontWeight: 600 }}>Genesis Curry Flow Freebies:</span>
                    <br />
                    <br />
                    Snapshot Date: <span style={{ color: '#FFCA21' }}>June 9th at 4:00:00 PST</span>
                    <br />
                    Start Date: <span style={{ color: '#FFCA21' }}>June 9th at 5:00:00 PST</span>
                    <br />
                    End Date: <span style={{ color: '#FFCA21' }}>June 11th at 5:00:00 PST.</span>
                    <br />
                    <br />
                    <span style={{ fontWeight: 600 }}>Early Purchase (Mintlist):</span>
                    <br />
                    <br />
                    Start Date: <span style={{ color: '#FFCA21' }}>June 13th at 5:00:00 PST</span>
                    <br />
                    End Date: <span style={{ color: '#FFCA21' }}>June 15th at 5:00:00 PST.</span>
                    <br />
                    <br />
                    <span style={{ fontWeight: 600 }}>General Purchase:</span>
                    <br />
                    <br />
                    Start Date: <span style={{ color: '#FFCA21' }}>June 16th at 5:00:00 PST.</span>
                </Typography>
                <Typography
                    fontSize={{ xs: 24, md: 32 }}
                    fontWeight={800}
                    lineHeight={1}
                    marginTop={6}
                    className="neueplak_condensed"
                >
                    SERUM
                </Typography>
                <Typography fontSize={20} lineHeight={1.2} marginTop={2}>
                    <span style={{ fontWeight: 600 }}>Early Purchase (Mintlist):</span>
                    <br />
                    <br />
                    Start Date: <span style={{ color: '#FFCA21' }}>June 25th at 5:00:00 PST</span>
                    <br />
                    End Date: <span style={{ color: '#FFCA21' }}>June 27th at 5:00:00 PST.</span>
                    <br />
                    <br />
                    <span style={{ fontWeight: 600 }}>General Purchase & Genesis Curry Flow Freebies:</span>
                    <br />
                    <br />
                    Genesis Curry Flow Snapshot Date: <span style={{ color: '#FFCA21' }}>June 28th at 4:00:00 PST</span>
                    <br />
                    Start Date: <span style={{ color: '#FFCA21' }}>June 28th at 5:00:00 PST</span>
                </Typography>
            </Grid>
        </Grid>
    );
};

export default HowItWorks;
