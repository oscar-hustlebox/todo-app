import { ReactElement } from 'react';
import { Box, Heading, Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

type TextAreaFieldProps = {
    name: string;
    labelText: string;
    placeholderText: string;
    isInvalid: boolean;
};

export const TextAreaField = ({ name, labelText, placeholderText, isInvalid }: TextAreaFieldProps): ReactElement => {
    const { register } = useFormContext();
    return (
        <Box>
            {labelText && (
                <Heading size="xs" fontWeight="light" mb={1}>
                    {labelText}
                </Heading>
            )}
            <Textarea
                {...register(name)}
                placeholder={placeholderText}
                borderColor="gray.200"
                backgroundColor="#FFFFFF"
                errorBorderColor="red.300"
                isInvalid={isInvalid}
                minHeight="40px"
            />
        </Box>
    );
};
