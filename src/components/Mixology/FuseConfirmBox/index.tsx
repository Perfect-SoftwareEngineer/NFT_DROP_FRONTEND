import React from 'react';
import { Stack, Typography, FormControlLabel, Checkbox } from '@mui/material';
import Link from 'next/link';
import { CancelBtn, FuseBtn } from './styles';

type ComponentProps = {
    onFuse: () => void;
    onClose: () => void;
};

const FuseConfirmBox: React.FC<ComponentProps> = ({ onFuse, onClose }): JSX.Element => {
    const [agreeIrreversible, setAgreeIrreversible] = React.useState(false);
    const [agreeTermsConditions, setAgreeTermsConditions] = React.useState(false);

    return (
        <Stack
            width={{ xs: 'auto', md: 680 }}
            padding={{ xs: 3, md: 5 }}
            border="1px solid #FFCA21"
            borderRadius={2}
            boxShadow="0px 0px 16px rgba(255, 202, 33, 0.5)"
            sx={{ background: '#1B1C22' }}
        >
            <Typography
                fontSize={48}
                fontWeight={700}
                color="#FFCA21"
                lineHeight={1}
                textTransform="uppercase"
                className="neueplak_condensed"
            >
                ARE YOU SURE?
            </Typography>
            <Typography color="white" marginTop={2}>
                <b>This action CANNOT be undone.</b> This will burn your selected NFTs to create your Basketball Headz
                Avatar.
            </Typography>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={agreeIrreversible}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setAgreeIrreversible(event.target.checked);
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                        sx={{ color: '#9E9E9E' }}
                    />
                }
                label={
                    <Typography color="white" marginBottom="6px">
                        I am aware that this is an irreversible action.
                    </Typography>
                }
                sx={{ marginTop: 3 }}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={agreeTermsConditions}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setAgreeTermsConditions(event.target.checked);
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                        sx={{ color: '#9E9E9E' }}
                    />
                }
                label={
                    <Typography color="white" marginBottom="6px">
                        I agree that by checking this box, I agree to Under Armour's{' '}
                        <Link href="/legal/terms-and-conditions" passHref>
                            <a rel="noopener noreferrer" target="_blank">
                                <Typography color="#FFCA21" display="inline">
                                    {`Terms & Conditions`}
                                </Typography>
                            </a>
                        </Link>
                        .
                    </Typography>
                }
                sx={{ marginTop: 0 }}
            />
            <Stack direction="row" justifyContent="flex-end" spacing={2} marginTop={5}>
                <CancelBtn onClick={onClose}>CANCEL</CancelBtn>
                <FuseBtn disabled={!agreeIrreversible || !agreeTermsConditions} onClick={onFuse}>
                    FUSE
                </FuseBtn>
            </Stack>
        </Stack>
    );
};

export default FuseConfirmBox;
