import React, { ReactElement } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert, AlertIcon, Button, Grid, GridItem, Input } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { StatusSelect } from './StatusSelect';
import { QuantityInput } from './QuantityInput';
import { addAsset } from '../../redux/slices/assets/slice';

export type FormValues = {
    name: string;
    description: string;
    quantity: number;
    status: 'Online' | 'Offline' | 'Pending';
};

const schema = yup
    .object({
        name: yup.string().required(),
        description: yup.string().required(),
        quantity: yup.number().positive().integer().required(),
        status: yup.string().oneOf(['pending', 'online', 'offline']).required(),
    })
    .required();

export const AssetForm = (): ReactElement => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const onSubmit: SubmitHandler<FormValues> = (formValues) => {
        const { name } = formValues;

        /* Dispatching an action to the redux store. */
        dispatch(addAsset({ ...formValues, id: uuidv4(), key: name.toLowerCase() }));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%">
                    <Input
                        {...register('name')}
                        type="text"
                        placeholder="name"
                        borderColor="#D2D4D5"
                        errorBorderColor="red.300"
                        isInvalid={!!errors.name}
                    />
                    {errors?.name?.message && (
                        <Alert status="error">
                            <AlertIcon />
                            {errors.name.message}
                        </Alert>
                    )}
                </GridItem>
                <GridItem w="100%">
                    <Input
                        {...register('description')}
                        type="text"
                        placeholder="description"
                        borderColor="#D2D4D5"
                        errorBorderColor="red.300"
                        isInvalid={!!errors.name}
                    />
                    {errors?.description?.message && (
                        <Alert status="error">
                            <AlertIcon />
                            {errors.description.message}
                        </Alert>
                    )}
                </GridItem>
                <GridItem w="100%">
                    <QuantityInput control={control} name="quantity" />
                </GridItem>
                <GridItem w="100%">
                    <StatusSelect control={control} name="status" />
                </GridItem>
                <GridItem w="100%">
                    <Button type="submit" backgroundColor="#5D7599" color="white">
                        Add
                    </Button>
                </GridItem>
            </Grid>
        </form>
    );
};
