import React, { ReactElement } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { addTask, TaskState, updateTask } from '../../redux/slices/tasks/slice';
import { InputField } from './components/fields/InputField';
import { SubmitButton } from './components/SubmitButton';
import { ErrorMessage } from './components/ErrorMessage';
import { TextAreaField } from './components/fields/TextAreaField';
import { CancelButton } from './components/CancelButton';

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

type TaskFormProps = {
    task?: TaskState;
    handleCancel?: () => void;
};

export const TaskForm = ({ task, handleCancel }: TaskFormProps): ReactElement => {
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
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <Flex flexDirection="column" alignItems="flex-start" gap={4}>
                    <InputField
                        name="name"
                        labelText={task ? '' : 'Name *'}
                        placeholderText="e.g. Wash the car"
                        isInvalid={!!formState.errors.name}
                        isEditing={Boolean(isEditing)}
                    />
                    <TextAreaField
                        name="description"
                        labelText={task ? '' : 'Description (optional)'}
                        placeholderText="e.g. Wash the car with soap and water"
                        isInvalid={!!formState.errors.name}
                        isEditing={Boolean(isEditing)}
                    />
                    <Flex gap={2} alignItems="center" width="full">
                        {formState.errors && (
                            <ErrorMessage message={formState.errors?.name?.message?.toString() || ''} />
                        )}
                        <CancelButton handleClose={handleCancel} isEditing={Boolean(isEditing)} />
                        <SubmitButton isEditing={Boolean(isEditing)} />
                    </Flex>
                </Flex>
            </form>
        </FormProvider>
    );
};
