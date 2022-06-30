import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppContext } from '../../../context/AppContext';
import SerumBox from '../../../components/Mixology/SerumBox';
import { SerumTokenInfoType } from '../../../types';

type ComponentProps = {
    data: SerumTokenInfoType[];
};

const SelectSerum: React.FC<ComponentProps> = ({ data }): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    let totalSelectedCount =
        Object.keys(appState.selectedSerumCount).length > 0
            ? Object.values(appState.selectedSerumCount).reduce((prev, cur) => prev + cur)
            : 0;

    return (
        <Stack spacing={3}>
            <Stack spacing={2}>
                <Typography
                    fontSize={48}
                    fontWeight={800}
                    lineHeight={1}
                    textTransform="uppercase"
                    className="neueplak_condensed"
                >
                    Select up to 3 Serums
                </Typography>
                <Typography fontSize={16} fontWeight={500}>
                    <b>Note:</b> Every serum selected guarantees your avatar will have one trait from the serum type
                    selected, with a possibility of two traits.
                </Typography>
            </Stack>
            <Stack spacing={2}>
                <Typography fontSize={16} fontWeight={700}>
                    Currently <span style={{ color: '#FFCA21' }}>{`${totalSelectedCount} Serums`}</span> selected.
                </Typography>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent={{ xs: 'center', sm: 'flex-start' }}
                    paddingBottom={20}
                    columnGap={3}
                    rowGap={3}
                >
                    {data.map((item) => item.count > 0 && <SerumBox item={item} />)}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default SelectSerum;
