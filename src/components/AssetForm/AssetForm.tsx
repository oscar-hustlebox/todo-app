import React, { ReactElement } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Grid, GridItem, Input } from '@chakra-ui/react';
import { QuantityInput } from './QuantityInput';
import { StatusSelect } from './StatusSelect';

export type FormValues = {
    name: string;
    description: string;
    quantity: number;
    status: 'Online' | 'Offline' | 'Pending';
};

export const AssetForm = (): ReactElement => {
    const { register, handleSubmit, control } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%">
                    <Input {...register('name')} type="text" placeholder="name" borderColor="#D2D4D5" />
                </GridItem>
                <GridItem w="100%">
                    <Input {...register('description')} type="text" placeholder="description" borderColor="#D2D4D5" />
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
