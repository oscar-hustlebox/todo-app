import React, { ReactElement } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Divider, Flex, SimpleGrid } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { addTask, TaskState, updateTask } from '../../redux/slices/tasks/slice';
import { InputField } from './InputField';
import { SubmitButton } from './SubmitButton';
import { CancelButton } from './CancelButton';
import { ErrorMessage } from './ErrorMessage';
import { TextAreaField } from './TextAreaField';

export type FormValues = {
    name: string;
    isCompleted: boolean;
    description?: string;
    favorite?: boolean;
    boardID?: string;
};

/* Creating a schema that is used to validate the form values. */
const schema = yup
    .object({
        name: yup.string().required(),
        isCompleted: yup.boolean().notRequired(),
        description: yup.string().notRequired(),
        favorite: yup.boolean().notRequired(),
        boardID: yup.string().notRequired(),
    })
    .required();

type TaskFormCardProps = {
    task?: TaskState;
    handleCancel?: () => void;
};

export const TaskFormCard = ({ task, handleCancel }: TaskFormCardProps): ReactElement => {
    /* Using the `useForm` hook to create a form. */
    const methods = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: task ? task : { name: '', isCompleted: false, boardID: '1' },
    });

    const { reset, handleSubmit, formState } = methods;
    const dispatch = useDispatch();

    const isEditing = task && handleCancel;
    /**
     * The `onSubmit` function is a callback function that is called when the form is submitted. It takes
     * the form values as an argument and dispatches an action to the redux store
     * @param formValues - The values of the form.
     */
    const onSubmit: SubmitHandler<FormValues> = (formValues) => {
        /* Dispatching an action to the redux store. */
        if (isEditing) {
            dispatch(updateTask({ ...task, ...formValues }));
            handleCancel();
        } else {
            dispatch(addTask({ ...formValues, id: uuidv4() }));
        }
        reset();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    name="name"
                    labelText={task ? '' : 'Name *'}
                    placeholderText="e.g. Wash the car, take out the trash"
                    isInvalid={!!formState.errors.name}
                    isEditing={Boolean(isEditing)}
                />
                <Divider marginY={4} />
                <TextAreaField
                    name="description"
                    labelText={task ? '' : 'Description (optional)'}
                    placeholderText="e.g. Wash the car, take out the trash"
                    isInvalid={!!formState.errors.name}
                    isEditing={Boolean(isEditing)}
                />
                <Divider marginBottom={4} />
                <Flex gap={2} alignItems="center" width="full">
                    <CancelButton handleClose={handleCancel} isEditing={Boolean(isEditing)} />
                    <SubmitButton isEditing={Boolean(isEditing)} />
                </Flex>
                {formState.errors && <ErrorMessage message={formState.errors?.name?.message?.toString() || ''} />}
            </form>
        </FormProvider>
    );
};
