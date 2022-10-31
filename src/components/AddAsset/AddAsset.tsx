import React, { ReactElement } from 'react';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react';
import { AssetForm } from '../AssetForm/AssetForm';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/arrow-up.svg';

export const AddAsset = (): ReactElement => {
    return (
        <Accordion allowToggle>
            <AccordionItem borderStyle="none">
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton py={6} _hover={{ backgroundColor: 'transparent' }} gap={4}>
                                {isExpanded ? <ArrowUp /> : <ArrowDown />}
                                <Box flex="1" textAlign="left">
                                    <Text>Add Asset</Text>
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <AssetForm />
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
};
