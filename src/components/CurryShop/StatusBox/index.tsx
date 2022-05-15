import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';

type ComponentProps = {
    img: string;
    title: string;
    desc: string;
    dateList: string[];
    selected?: boolean;
};

const StatusBox: React.FC<ComponentProps> = ({ img, title, desc, dateList, selected = false }): JSX.Element => {
    return (
        <Stack
            direction="row"
            alignItems="flex-start"
            padding={2}
            spacing={2}
            borderRadius={2}
            sx={{ background: selected ? '#FFCA21' : '#1B1C22' }}
        >
            <Image src={img} width={80} height={80} alt="" style={{ borderRadius: 8 }} />
            <Stack color={selected ? 'black' : 'white'}>
                <Typography fontSize={20} fontWeight={800} marginTop={-1}>
                    {title}
                </Typography>
                <Typography>{desc}</Typography>
                <Stack marginTop={2}>
                    {dateList.map((item, index) => (
                        <Typography fontWeight={700} key={`date_key${index}`}>
                            {item}
                        </Typography>
                    ))}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default StatusBox;
