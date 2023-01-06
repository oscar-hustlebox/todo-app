import React from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { FiTrello } from 'react-icons/fi';
import { TaskForm } from '../TaskForm/TaskForm';

export const TopBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex paddingX={4} paddingY={4} flexDir="row" alignItems="center" justifyContent="space-between" gap={4}>
                <Flex flexDir="row" alignItems="center">
                    <Box background="green.50" padding={2} borderRadius={8}>
                        <IconButton
                            size="lg"
                            colorScheme="teal"
                            aria-label="edit task"
                            icon={<FiTrello size="32px" />}
                        />
                    </Box>

                    <Heading as="h1" size="md" fontWeight="medium">
                        Kanban
                    </Heading>
                </Flex>
                <Button colorScheme="teal" variant="outline" onClick={onOpen}>
                    Create Task
                </Button>
            </Flex>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TaskForm />
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
        </>
    );
};
