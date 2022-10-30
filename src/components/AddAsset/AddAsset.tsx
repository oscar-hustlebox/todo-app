import React, { ReactElement } from 'react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react';
import { AssetForm } from '../AssetForm/AssetForm';

export const AddAsset = (): ReactElement => {
    return (
        <Box>
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <AccordionIcon />
                            <Box flex="1" textAlign="left">
                                <Text>Add Asset</Text>
                            </Box>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <AssetForm />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};
