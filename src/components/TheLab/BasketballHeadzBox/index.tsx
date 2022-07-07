import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Container } from './styles';
import { BasketballHeadzTokenInfoType } from '../../../types';
import { Icon } from '@iconify/react';
import { MenuBtn } from './styles';
import Link from 'next/link';
import AWS from 'aws-sdk';
import { SxProps } from '@mui/system';

type ComponentProps = {
    item: BasketballHeadzTokenInfoType;
    selectedBasketballHeadzTokenId: string;
    setSelectedBasketballHeadzTokenId: (value: string) => void;
    sx?: SxProps;
};

const BasketballHeadzBox: React.FC<ComponentProps> = ({
    item,
    selectedBasketballHeadzTokenId,
    setSelectedBasketballHeadzTokenId,
    sx
}): JSX.Element => {
    function downloadBlob(blob: any, name: string) {
        // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
        const blobUrl = URL.createObjectURL(blob);
        // Create a link element
        const link = document.createElement('a');
        // Set link's href to point to the Blob URL
        link.href = blobUrl;
        link.setAttribute('download', name);

        // Append link to the body
        document.body.appendChild(link);
        // Dispatch click event on the link
        // This is necessary as link.click() does not work on the latest firefox
        link.click();

        // Remove link from body
        document.body.removeChild(link);
    }
    const handleDownload = (url: string) => {
        console.log('download image: ', url);
        var AWS = require('aws-sdk');
        AWS.config.update({
            accessKeyId: 'AKIATRYTS26ZZZTWY6O7',
            secretAccessKey: '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',
            region: 'us-east-1'
        });
        let fileName = url.split('/').pop() || '';

        var s3 = new AWS.S3({ params: { Bucket: 'luna-bucket' } });
        s3.getObject({ Bucket: 'luna-bucket', Key: `3d-avatar-dev/${fileName}` }, function(error: any, data: any) {
            if (error != null) {
                console.log('Failed to retrieve an object: ' + error);
            } else {
                console.log('Loaded ' + data.ContentLength + ' bytes');
                if (data.ContentLength) {
                    const imageBlob = new Blob([data.Body]);
                    downloadBlob(imageBlob, fileName);
                }

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
            sx={{ ...sx }}
        >
            <Box width={166} height={210}>
                {(!!item.image || !!item.animation) && (
                    <img
                        src={!!item.image ? item.image : item.animation}
                        width="100%"
                        height="100%"
                        alt=""
                        className="img"
                    />
                )}
            </Box>
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    Basketball Headz
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
                    <MenuBtn
                        onClick={() =>
                            window.open(
                                !!item.image
                                    ? `https://testnets.opensea.io/assets/rinkeby/0x75893670f873fdee8bce2ef5399f6ba07b48fb21/${item.tokenId}`
                                    : 'https://opensea.io/collection/basketball-headz-official',
                                '_blank',
                                'noopener,noreferrer'
                            )
                        }
                    >
                        <Icon icon="ic:baseline-discord" fontSize={24} />
                        <Typography fontSize={14} fontWeight={600} marginLeft={1} padding="0 0 4px">
                            OpenSea
                        </Typography>
                    </MenuBtn>
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
