import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { Markup } from 'interweave';

type ComponentProps = {
    img: string;
    title: string;
    desc: React.ReactNode;
};

const ItemBox: React.FC<ComponentProps> = ({ img, title, desc }): JSX.Element => {
    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            padding={{ xs: 3, sm: 5 }}
            spacing={4}
            borderRadius={4}
            sx={{ background: '#1B1C22' }}
        >
            <Box position="relative" minWidth={{ xs: 'auto', sm: 240 }} height={144}>
                <Image src={img} alt="" layout="fill" objectFit="cover" style={{ borderRadius: 8 }} />
            </Box>
            <Stack spacing={2}>
                <Typography
                    fontSize={{ xs: 36, md: 48 }}
                    fontWeight={800}
                    lineHeight={1.1}
                    className="neueplak_condensed"
                >
                    {title}
                </Typography>
                {desc}
            </Stack>
        </Stack>
    );
};

export default ItemBox;
