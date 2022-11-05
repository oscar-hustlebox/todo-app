import React, { ReactElement } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { addTodo, TodoState, updateTodo } from '../../redux/slices/todos/slice';
import { InputField } from './InputField';
import { SubmitButton } from './SubmitButton';
import { CancelButton } from './CancelButton';

export type FormValues = {
    name: string;
    isCompleted: boolean;
};

/* Creating a schema that is used to validate the form values. */
const schema = yup
    .object({
        name: yup.string().required(),
        isCompleted: yup.boolean().notRequired(),
    })
    .required();

export const TodoForm = ({ selectedTodo, cb }: { selectedTodo?: TodoState; cb?: () => void }): ReactElement => {
    /* Using the `useForm` hook to create a form. */
    const methods = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: selectedTodo ? selectedTodo : { name: '', isCompleted: false },
    });
    const { reset, handleSubmit } = methods;
    const dispatch = useDispatch();

    /**
     * The `onSubmit` function is a callback function that is called when the form is submitted. It takes
     * the form values as an argument and dispatches an action to the redux store
     * @param formValues - The values of the form.
     */
    const onSubmit: SubmitHandler<FormValues> = (formValues) => {
        /* Dispatching an action to the redux store. */
        if (selectedTodo && cb) {
            dispatch(updateTodo({ ...selectedTodo, ...formValues }));
            cb();
        } else {
            dispatch(addTodo({ ...formValues, id: uuidv4() }));
        }
        reset();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2} alignItems="center">
                    <InputField
                        name="name"
                        labelText={selectedTodo ? '' : 'Name'}
                        placeholderText="e.g. Wash the car, take out the trash"
                    />
                    <Flex gap={2}>
                        <SubmitButton isEditing={!!selectedTodo} />
                        {cb && <CancelButton handleClose={cb} />}
                    </Flex>
                </SimpleGrid>
            </form>
        </FormProvider>
    );
};
