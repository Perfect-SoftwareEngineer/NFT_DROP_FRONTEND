import React from 'react';
import { Stack, Typography, Button } from '@mui/material';

interface WalletConnectBtnProps {
    name: string;
    icon: string;
    onClick?: () => void;
}

const WalletConnectButton = ({ name, icon, onClick }: WalletConnectBtnProps) => {
    return (
        <Button
            startIcon={<img src={icon} width={60} height={60} alt="" />}
            sx={{
                justifyContent: 'flex-start',
                color: 'black',
                fontSize: '32px',
                fontWeight: 500,
                border: '1px solid #C4C4C4',
                borderRadius: '8px',
                padding: '16px',
                textTransform: 'capitalize',
            }}
            onClick={onClick}
        >
            {name}
        </Button>
    );
};

interface WalletConnectDlgProps {
    onChange: (data: any) => void;
}

const WalletConnectDlg = (props: WalletConnectDlgProps) => {
    const { onChange } = props;

    const walletConnectButtons = [
        { name: 'Metamask', icon: '/assets/wallet/metamask.png' },
        { name: 'Coinbase Wallet', icon: '/assets/wallet/coinbase.png' },
    ];

    return (
        <Stack>
            <Typography variant="body1" fontSize={16} fontWeight={400} color="black">
                Connect with one of our available wallet providers or create a new one.
            </Typography>
            <Stack marginTop={2} spacing={2}>
                {walletConnectButtons.map((item, index) => (
                    <WalletConnectButton
                        key={index}
                        {...item}
                        onClick={() => onChange({ type: item.name })}
                    ></WalletConnectButton>
                ))}
            </Stack>
        </Stack>
    );
};

export default WalletConnectDlg;
