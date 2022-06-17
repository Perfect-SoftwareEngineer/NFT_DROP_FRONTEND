import { SelectItemType, SerumTokenInfoType } from '../types';

export const serumTokensList: { [key: string]: SelectItemType } = {
    '1': {
        label: 'Unanimous',
        value: '1',
        icon: (
            <img src="/assets/curryshop/serumtypes/unanimous.png" width={24} height={24} style={{ borderRadius: 24 }} />
        ),
    },
    '2': {
        label: 'Broken History',
        value: '2',
        icon: (
            <img
                src="/assets/curryshop/serumtypes/broken-history.png"
                width={24}
                height={24}
                style={{ borderRadius: 24 }}
            />
        ),
    },
    '3': {
        label: 'Flow',
        value: '3',
        icon: <img src="/assets/curryshop/serumtypes/flow.png" width={24} height={24} style={{ borderRadius: 24 }} />,
    },
    '4': {
        label: 'Warp',
        value: '4',
        icon: <img src="/assets/curryshop/serumtypes/warp.png" width={24} height={24} style={{ borderRadius: 24 }} />,
    },
    '5': {
        label: 'The Lab',
        value: '5',
        icon: (
            <img src="/assets/curryshop/serumtypes/the-lab.png" width={24} height={24} style={{ borderRadius: 24 }} />
        ),
    },
    '6': {
        label: 'Smilesss',
        value: '6',
        icon: (
            <img src="/assets/curryshop/serumtypes/smilesss.png" width={24} height={24} style={{ borderRadius: 24 }} />
        ),
    },
    '7': {
        label: 'Chibi Dinos',
        value: '7',
        icon: (
            <img
                src="/assets/curryshop/serumtypes/chibi-dinos.png"
                width={24}
                height={24}
                style={{ borderRadius: 24 }}
            />
        ),
    },
    '8': {
        label: 'Hape',
        value: '8',
        icon: <img src="/assets/curryshop/serumtypes/hape.png" width={24} height={24} style={{ borderRadius: 24 }} />,
    },
    '9': {
        label: 'CyberKongz',
        value: '9',
        icon: (
            <img
                src="/assets/curryshop/serumtypes/cyberkongz.png"
                width={24}
                height={24}
                style={{ borderRadius: 24 }}
            />
        ),
    },
    '10': {
        label: 'Under Armour',
        value: '10',
        icon: (
            <img
                src="/assets/curryshop/serumtypes/under-armour.png"
                width={24}
                height={24}
                style={{ borderRadius: 24 }}
            />
        ),
    },
    '11': {
        label: 'Curry Brand',
        value: '11',
        icon: (
            <img
                src="/assets/curryshop/serumtypes/curry-brand.png"
                width={24}
                height={24}
                style={{ borderRadius: 24 }}
            />
        ),
    },
};

export const serumTokenInfoData: SerumTokenInfoType[] = [
    {
        title: 'Unanimous',
        tokenId: '1',
        count: 0,
        image: 'https://luna-bucket.s3.us-east-2.amazonaws.com/Unanimous.png',
    },
    {
        title: 'Broken History',
        tokenId: '2',
        count: 0,
        image: 'https://luna-bucket.s3.us-east-2.amazonaws.com/Broken_History.png',
    },
    {
        title: 'Flow',
        tokenId: '3',
        count: 0,
        image: 'https://luna-bucket.s3.us-east-2.amazonaws.com/Flow.png',
    },
    {
        title: 'Warp',
        tokenId: '4',
        count: 0,
        image: 'https://luna-bucket.s3.us-east-2.amazonaws.com/Wrap.png',
    },
    {
        title: 'The Lab',
        tokenId: '5',
        count: 0,
        image: 'https://luna-bucket.s3.amazonaws.com/The_Lab.png',
    },
    {
        title: 'Smilesss',
        tokenId: '6',
        count: 0,
        image: 'https://luna-bucket.s3.amazonaws.com/Smilesss.png',
    },
    {
        title: 'Chibi Dinos',
        tokenId: '7',
        count: 0,
        image: 'https://luna-bucket.s3.us-east-2.amazonaws.com/Chibi_Dinos.png',
    },
    {
        title: 'Hape',
        tokenId: '8',
        count: 0,
        image: 'https://luna-bucket.s3.us-east-2.amazonaws.com/Hape.png',
    },
    {
        title: 'CyberKongz',
        tokenId: '9',
        count: 0,
        image: 'https://luna-bucket.s3.us-east-2.amazonaws.com/CyberKongz.png',
    },
    {
        title: 'Under Armour',
        tokenId: '10',
        count: 0,
        image: 'https://luna-bucket.s3.us-east-2.amazonaws.com/Under_Armour.png',
    },
    {
        title: 'Curry Brand',
        tokenId: '11',
        count: 0,
        image: 'https://luna-bucket.s3.us-east-2.amazonaws.com/Curry_Brand.png',
    },
];

export const serumTokensColor: { [key: string]: string } = {
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
    '6': '#FD0021',
    '7': '#EF00DA',
    '8': '#0015DD',
    '9': '#0BAF00',
    '10': '#607A7F',
    '11': '#B2B065',
};

export default serumTokensList;
