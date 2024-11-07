import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, useToast, HStack } from '@chakra-ui/react';

function TodoItem({ todo, onDelete }) {
  return (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
      <HStack justifyContent="space-between">
        <Text>{todo.title}</Text>
        <Button colorScheme="red" size="sm" onClick={() => onDelete(todo._id)}>
          Delete
        </Button>
      </HStack>
    </Box>
  );
}

export default TodoItem;
