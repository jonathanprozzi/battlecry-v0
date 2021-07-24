import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue as mode,
  UnorderedList,
  ListItem,
  FormErrorMessage,
  FormLabel,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const SendForm = () => {
  const [isSending, setSending] = useState(false);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    setSending(false);

    const res = await fetch("/api/create-issue", {
      method: "POST",
      body: JSON.stringify({
        issueTitle: values.title,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const apiResponse = await res.json();
    if (apiResponse) {
      toast({
        title: "Issue Submitted",
        description: "Your issue has been submitted. Thank you!",
        status: "success",
        duration: 3000,
        isClosable: true,
      }),
        setSending(false);
    }
  }

  return (
    <Box as='section'>
      <Box
        bg='gray.800'
        shadow='lg'
        maxW={{ base: "xl", md: "3xl" }}
        marginX='auto'
        paddingX={{ base: "6", md: "8" }}
        paddingY='6'
        rounded='lg'
      >
        <Box maxW='md' marginX='auto'>
          <Text color='brand.blue' fontWeight='bold' letterSpacing='wide'>
            Send your issue!{" "}
          </Text>
          <Heading mt='4' fontWeight='extrabold'></Heading>
          <Box marginY='6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack marginTop={6}>
                <FormControl isInvalid={errors.title}>
                  <FormLabel htmlFor='title'>Issue title</FormLabel>
                  <Input
                    id='title'
                    aria-label='Enter issue title'
                    placeholder='Enter issue title'
                    {...register("title", {
                      required: "Issue title is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 2",
                      },
                    })}
                    rounded='base'
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  isLoading={isSubmitting}
                  type='submit'
                  w='full'
                  colorScheme='brandGreen'
                  size='md'
                  textTransform='uppercase'
                  fontSize='sm'
                  fontWeight='bold'
                >
                  Send issue
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SendForm;
