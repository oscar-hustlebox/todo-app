import React, { ReactElement } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { SimpleGrid } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { addTodo } from '../../redux/slices/todos/slice';
import { InputField } from './InputField';
import { SubmitButton } from './SubmitButton';

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

export const TodoForm = (): ReactElement => {
    /* Using the `useForm` hook to create a form. */
    const methods = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            isCompleted: false,
        },
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
        dispatch(addTodo({ ...formValues, id: uuidv4() }));
        reset();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2}>
                    <InputField name="name" labelText="Name" placeholderText="e.g. Wash the car, take out the trash" />
                    <SubmitButton />
                </SimpleGrid>
            </form>
        </FormProvider>
    );
};
