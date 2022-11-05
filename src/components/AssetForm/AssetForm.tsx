import React, { ReactElement } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { SimpleGrid } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { StatusSelect } from './StatusSelect';
import { QuantityInput } from './QuantityInput';
import { addTodo } from '../../redux/slices/todos/slice';
import { InputField } from './InputField';
import { SubmitButton } from './SubmitButton';

export type FormValues = {
    name: string;
    description: string;
    quantity: number;
    status: 'online' | 'offline' | 'pending';
};

/* Creating a schema that is used to validate the form values. */
const schema = yup
    .object({
        name: yup.string().required(),
        description: yup.string().required(),
        quantity: yup.number().positive().integer().required(),
        status: yup.string().oneOf(['pending', 'online', 'offline']).required(),
    })
    .required();

export const AssetForm = (): ReactElement => {
    /* Using the `useForm` hook to create a form. */
    const methods = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            quantity: 1,
            status: 'pending',
        },
    });
    const { reset, handleSubmit, control } = methods;
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
                <SimpleGrid columns={{ base: 1, sm: 5 }} spacing={2}>
                    <InputField name="name" labelText="Name" placeholderText="e.g. Todoist, Google Docs, etc." />
                    <InputField
                        name="description"
                        labelText="Description"
                        placeholderText="Create, collaborate, and get organized."
                    />
                    <QuantityInput control={control} name="quantity" labelText="Quantity" />
                    <StatusSelect control={control} name="status" labelText="Status" />
                    <SubmitButton />
                </SimpleGrid>
            </form>
        </FormProvider>
    );
};
