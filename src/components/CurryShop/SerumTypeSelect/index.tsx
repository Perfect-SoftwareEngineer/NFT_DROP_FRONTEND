import React, { useState, useRef } from 'react';
import { Stack, Typography } from '@mui/material';
import Select from '../../Select';
import { SelectBtn } from './styles';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SelectItemType } from '../../../types';

type ComponentProps = {
    serumType?: SelectItemType;
    setSerumType: (value: SelectItemType) => void;
    serumTypeOptions: Array<SelectItemType>;
};

const SerumTypeSelect: React.FC<ComponentProps> = ({ serumType, setSerumType, serumTypeOptions }): JSX.Element => {
    const [serumTypeSelectOpen, setSerumTypeSelectOpen] = useState(false);
    const nodeSerumTypeSelect = useRef<HTMLDivElement>(null);
    useOnClickOutside(nodeSerumTypeSelect, () => setSerumTypeSelectOpen(false));

    return (
        <Select
            titlebox={
                <SelectBtn
                    fullWidth
                    isopen={serumTypeSelectOpen ? 1 : 0}
                    sx={{ justifyContent: !!serumType?.label ? 'space-between' : 'flex-end' }}
                >
                    {!!serumType?.label ? (
                        <Stack direction="row" alignItems="center" spacing={1}>
                            {serumType.icon}
                            <Typography padding="2px 0 6px" color="white">
                                {serumType.label}
                            </Typography>
                        </Stack>
                    ) : (
                        ''
                    )}
                    <ArrowDownIcon sx={{ color: '#9E9E9E' }} className="arrow-icon" />
                </SelectBtn>
            }
            width={220}
            options={serumTypeOptions}
            isOpen={serumTypeSelectOpen ? 1 : 0}
            handleClick={(value: string) => {
                const item = serumTypeOptions.find((option) => option.value === value);
                setSerumType(item || { label: '', value: '' });
            }}
            setOpen={setSerumTypeSelectOpen}
            ref={nodeSerumTypeSelect}
        />
    );
};

export default SerumTypeSelect;
