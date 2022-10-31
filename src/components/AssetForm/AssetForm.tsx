import React, { ReactElement } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert, AlertIcon, Button, Grid, GridItem, Heading, Input } from '@chakra-ui/react';
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
    status: 'online' | 'offline' | 'pending';
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
        defaultValues: {
            name: '',
            description: '',
            quantity: 1,
            status: 'pending',
        },
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
                    <Heading size="xs" fontWeight="light">
                        Name
                    </Heading>
                    <Input
                        {...register('name')}
                        type="text"
                        placeholder="name"
                        borderColor="gray.200"
                        backgroundColor="#FFFFFF"
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
                    <Heading size="xs" fontWeight="light">
                        Description
                    </Heading>
                    <Input
                        {...register('description')}
                        type="text"
                        placeholder="description"
                        borderColor="gray.200"
                        backgroundColor="#FFFFFF"
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
                    <Heading size="xs" fontWeight="light">
                        Quantity
                    </Heading>
                    <QuantityInput control={control} name="quantity" />
                </GridItem>
                <GridItem w="100%">
                    <Heading size="xs" fontWeight="light">
                        Status
                    </Heading>
                    <StatusSelect control={control} name="status" />
                </GridItem>
                <GridItem w="100%">
                    <Heading size="xs" fontWeight="light">
                        &nbsp;
                    </Heading>
                    <Button type="submit" backgroundColor="gray.500" color="white" borderRadius={2}>
                        <Heading size="xs" textTransform="uppercase">
                            Add
                        </Heading>
                    </Button>
                </GridItem>
            </Grid>
        </form>
    );
};
