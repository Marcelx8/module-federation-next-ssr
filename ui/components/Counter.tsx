import React from "react";
import {
  Heading,
  Box,
  Center,
  Stack,
  Button,
} from '@chakra-ui/react';

const Counter = ({ count, onIncrement, onDecrement }: { count: number, onIncrement: () => void, onDecrement: () => void }) => {
  return (
    <>
      <Center py={2}>
        <Box
          maxW={'400px'}
          w={'full'}
          bg={'lightBlue'}
          rounded={'lg'}
          p={10}
          textAlign={'center'}>
          <Heading as="h2" mb={5} fontSize="3xl" className="heading">
            {count}
          </Heading>
          <Stack spacing={4} direction='row' justify="center" align='center'>
            <Button
              p={5} size='s' onClick={onIncrement}>
              Increment
            </Button>
            <Button
              p={5} size='s' onClick={onDecrement}>
              Decrement
            </Button>
          </Stack>
        </Box>
      </Center>

    </>
  )
}

export default Counter;