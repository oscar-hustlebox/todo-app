import React, { ReactElement } from 'react';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/arrow-up.svg';
import { TodoForm } from '../TodoForm/TodoForm';

export const AddTodo = (): ReactElement => {
    return (
        <Accordion allowToggle>
            <AccordionItem borderStyle="none">
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton py={6} _hover={{ backgroundColor: 'transparent' }} gap={4}>
                                {isExpanded ? <ArrowUp /> : <ArrowDown />}
                                <Box flex="1" textAlign="left">
                                    <Text>Add Todo</Text>
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <TodoForm />
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
};
