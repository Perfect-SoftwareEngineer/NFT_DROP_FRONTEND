import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { CancelBtn, SaveBtn, NameTextField } from './styles';
import { BasketballHeadzTokenInfoType } from '../../../types';

type ComponentProps = {
    item?: BasketballHeadzTokenInfoType;
    onSave: (value: string) => void;
    onCancel: () => void;
};

const ChangeNameBox: React.FC<ComponentProps> = ({ item, onSave, onCancel }): JSX.Element => {
    const [name, setName] = useState<string>('');

    return (
        <Stack
            width={{ xs: 'auto', md: 640 }}
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            padding={{ xs: 2, md: 4 }}
            border="1px solid #FFCA21"
            borderRadius={2}
            boxShadow="0px 0px 16px rgba(255, 202, 33, 0.5)"
            sx={{ background: '#1B1C22' }}
        >
            <Box width={166} minWidth={166} height={210}>
                {!!item && (!!item.image || !!item.animation) && (
                    <img
                        src={!!item.image ? item.image : item.animation}
                        width="100%"
                        height="100%"
                        alt=""
                        className="img"
                    />
                )}
            </Box>
            <Stack>
                <Typography
                    fontSize={48}
                    fontWeight={700}
                    color="#FFCA21"
                    lineHeight={1}
                    textTransform="uppercase"
                    className="neueplak_condensed"
                >
                    CHANGE NAME
                </Typography>
                <Typography color="white" marginTop={2}>
                    Personalize your Basketball Headz by renaming it. Input a new name below.
                </Typography>
                <Typography color="white" fontSize={14} marginTop={4}>
                    Name
                </Typography>
                <NameTextField
                    fullWidth
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setName(event.target.value);
                    }}
                    sx={{ marginTop: 1 }}
                />
                <Stack direction="row" justifyContent="flex-end" spacing={2} marginTop={5}>
                    <CancelBtn onClick={onCancel}>CANCEL</CancelBtn>
                    <SaveBtn disabled={!name} onClick={() => onSave(name)}>
                        SAVE
                    </SaveBtn>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ChangeNameBox;
