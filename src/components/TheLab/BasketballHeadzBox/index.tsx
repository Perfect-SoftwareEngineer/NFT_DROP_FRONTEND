import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Container } from './styles';
import { BasketballHeadzTokenInfoType } from '../../../types';
import { Icon } from '@iconify/react';
import { MenuBtn } from './styles';
import Link from 'next/link';
import AWS from 'aws-sdk';

type ComponentProps = {
    item: BasketballHeadzTokenInfoType;
    selectedBasketballHeadzTokenId: string;
    setSelectedBasketballHeadzTokenId: (value: string) => void;
};

const BasketballHeadzBox: React.FC<ComponentProps> = ({
    item,
    selectedBasketballHeadzTokenId,
    setSelectedBasketballHeadzTokenId,
}): JSX.Element => {
    const handleDownload = (url: string) => {
        var AWS = require('aws-sdk');
        AWS.config.update({
            accessKeyId: 'AKIATRYTS26Z4ZJK5DFK',
            secretAccessKey: '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',
            region: 'us-east-2',
        });
        let fileName = url.split('/').pop();

        var s3 = new AWS.S3({ params: { Bucket: 'luna-bucket' } });
        s3.getObject({ Bucket: 'luna-bucket', Key: `3d-avatar-dev/${fileName}` }, function (error: any, data: any) {
            if (error != null) {
                console.log('Failed to retrieve an object: ' + error);
            } else {
                console.log('Loaded ' + data.ContentLength + ' bytes');
                // do something with data.Body
            }
        });
    };

    const onClickItem = () => {
        if (selectedBasketballHeadzTokenId === item.tokenId) {
            setSelectedBasketballHeadzTokenId('');
        } else {
            setSelectedBasketballHeadzTokenId(item.tokenId);
        }
    };

    return (
        <Container
            rowGap={2}
            selectable
            selected={selectedBasketballHeadzTokenId === item.tokenId}
            onClick={onClickItem}
        >
            <img src={item.image} width={166} height={210} alt="" className="img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    {item.title}
                </Typography>
                {/* <Typography fontSize={16} fontWeight={400} color="#979797">
                    {item.count}
                </Typography> */}
            </Stack>
            {selectedBasketballHeadzTokenId === item.tokenId && (
                <Stack
                    position="absolute"
                    top="102%"
                    left={0}
                    right={0}
                    paddingY={1}
                    borderRadius={2}
                    sx={{ background: '#1B1C22' }}
                >
                    <Link href="https://opensea.io/collection/basketball-headz-serums" passHref>
                        <a target="_blank" rel="noopener noreferrer">
                            <MenuBtn sx={{ width: '100%' }}>
                                <Icon icon="ic:baseline-discord" fontSize={24} />
                                <Typography fontSize={14} fontWeight={600} marginLeft={1} padding="0 0 4px">
                                    OpenSea
                                </Typography>
                            </MenuBtn>
                        </a>
                    </Link>
                    {/* <a href="" download={item.image}> */}
                    <MenuBtn onClick={() => handleDownload(item.image)}>
                        <Icon icon="ic:outline-file-download" fontSize={24} />
                        <Typography fontSize={14} fontWeight={600} marginLeft={1} padding="0 0 4px">
                            Download
                        </Typography>
                    </MenuBtn>
                    {/* </a> */}
                </Stack>
            )}
        </Container>
    );
};

export default BasketballHeadzBox;
