import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface ComponentProps {
    title: string;
}

const FAQItem: React.FC<ComponentProps> = ({ title, children }): JSX.Element => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    return (
        <Accordion
            expanded={expanded}
            sx={{ borderRadius: '8px !important', color: expanded ? 'white' : '#969AA1', background: '#1B1C22' }}
            onChange={handleChange}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#9E9E9E' }} />}>
                <Typography fontSize={32} fontWeight={700} lineHeight={1.2}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};

export default FAQItem;
