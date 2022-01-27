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
      <Center py={6}>
        <Box
          maxW={'500px'}
          w={'full'}
          bg={'lightgray'}
          rounded={'lg'}
          p={20}
          textAlign={'center'}>
          <Heading as="h2" fontSize="2xl" className="heading">
            {count}
          </Heading>
          <Stack spacing={4} direction='row' align='center'>
            <Button
              size='xs' onClick={onIncrement}>
              Increment
            </Button>
            <Button
              size='xs' onClick={onDecrement}>
              Decrement
            </Button>
          </Stack>
        </Box>
      </Center>

    </>
  )
}

export default Counter;