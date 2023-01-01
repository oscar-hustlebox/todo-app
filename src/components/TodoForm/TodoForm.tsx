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
import { ErrorMessage } from './ErrorMessage';

export type FormValues = {
    name: string;
    isCompleted: boolean;
    favorite?: boolean;
};

/* Creating a schema that is used to validate the form values. */
const schema = yup
    .object({
        name: yup.string().required(),
        isCompleted: yup.boolean().notRequired(),
        favorite: yup.boolean().notRequired(),
    })
    .required();

type TodoFormProps = {
    todo?: TodoState;
    handleCancel?: () => void;
};

export const TodoForm = ({ todo, handleCancel }: TodoFormProps): ReactElement => {
    /* Using the `useForm` hook to create a form. */
    const methods = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: todo ? todo : { name: '', isCompleted: false },
    });

    const { reset, handleSubmit, formState } = methods;
    const dispatch = useDispatch();

    /**
     * The `onSubmit` function is a callback function that is called when the form is submitted. It takes
     * the form values as an argument and dispatches an action to the redux store
     * @param formValues - The values of the form.
     */
    const onSubmit: SubmitHandler<FormValues> = (formValues) => {
        /* Dispatching an action to the redux store. */
        if (todo && handleCancel) {
            dispatch(updateTodo({ ...todo, ...formValues }));
            handleCancel();
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
                        labelText={todo ? '' : 'Name'}
                        placeholderText="e.g. Wash the car, take out the trash"
                        isInvalid={!!formState.errors.name}
                    />
                    <Flex gap={2}>
                        <SubmitButton isEditing={!!todo} />
                        <CancelButton handleClose={handleCancel} />
                    </Flex>
                </SimpleGrid>
                {formState.errors && <ErrorMessage message={formState.errors?.name?.message?.toString() || ''} />}
            </form>
        </FormProvider>
    );
};
