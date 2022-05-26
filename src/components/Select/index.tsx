import React, { forwardRef } from 'react';
import { ListItemsWrapper, ListItemsStack, ItemButton } from './styles';
import { Box, Typography } from '@mui/material';
import { SelectItemType } from '../../types';

interface ComponentProps {
    titlebox: React.ReactNode;
    selectedItem?: SelectItemType;
    options: Array<SelectItemType>;
    isOpen: number;
    width?: number;
    setOpen: (value: boolean) => void;
    handleClick: (value: string) => void;
    ref?: React.Ref<unknown>;
}

const Select = forwardRef<HTMLDivElement, ComponentProps>(
    ({ titlebox, selectedItem, options, isOpen, width, setOpen, handleClick }, ref) => {
        return (
            <Box
                position="relative"
                sx={{ width: width ? width : 'auto' }}
                onClick={() => {
                    setOpen(!isOpen);
                }}
                ref={ref}
            >
                <Box overflow="hidden">{titlebox}</Box>
                <ListItemsWrapper width="100%" isOpen={isOpen}>
                    <ListItemsStack>
                        {options.map((item, index) => (
                            <SelectItem
                                key={`sort-option-${index}`}
                                title={item.label}
                                value={item.value}
                                icon={item.icon}
                                selectedValue={selectedItem?.value}
                                handleClick={handleClick}
                            />
                        ))}
                    </ListItemsStack>
                </ListItemsWrapper>
            </Box>
        );
    }
);

interface SelectItemProps {
    handleClick: (value: string) => void;
    title: string;
    value: string;
    icon?: React.ReactNode;
    selectedValue?: string;
}

const SelectItem: React.FC<SelectItemProps> = ({ title, value, icon, selectedValue, handleClick }) => {
    return (
        <ItemButton
            fullWidth
            selected={value === selectedValue}
            sx={{ fontSize: 14, fontWeight: 500 }}
            onClick={(e) => handleClick(value)}
        >
            {icon}
            <Typography fontSize={16} fontWeight={400} marginLeft={icon ? 1 : 0}>
                {title}
            </Typography>
        </ItemButton>
    );
};

export default Select;
