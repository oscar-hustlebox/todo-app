import React, { ReactElement } from 'react';
import { Button, Grid, GridItem, Input } from '@chakra-ui/react';
import { QuantityInput } from './QuantityInput';
import { StatusSelect } from './StatusSelect';

export const AssetForm = (): ReactElement => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
    };
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%">
                    <Input type="name" placeholder="name" borderColor="#D2D4D5" />
                </GridItem>
                <GridItem w="100%">
                    <Input type="description" placeholder="description" borderColor="#D2D4D5" />
                </GridItem>
                <GridItem w="100%">
                    <QuantityInput name="quantity" />
                </GridItem>
                <GridItem w="100%">
                    <StatusSelect name="status" />
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
