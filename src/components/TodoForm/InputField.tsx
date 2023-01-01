import { ReactElement } from 'react';
import { Box, Heading, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

type InputFieldProps = {
    name: string;
    labelText: string;
    placeholderText: string;
    isInvalid: boolean;
};

export const InputField = ({ name, labelText, placeholderText, isInvalid }: InputFieldProps): ReactElement => {
    const { register } = useFormContext();
    return (
        <Box>
            {labelText && (
                <Heading size="xs" fontWeight="light" mb={1}>
                    {labelText}
                </Heading>
            )}
            <Input
                {...register(name)}
                type="text"
                placeholder={placeholderText}
                borderColor="gray.200"
                backgroundColor="#FFFFFF"
                errorBorderColor="red.300"
                isInvalid={isInvalid}
            />
        </Box>
    );
};
