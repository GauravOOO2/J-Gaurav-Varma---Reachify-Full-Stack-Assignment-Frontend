import React from 'react';
import { Box, Button, HStack, Text } from '@chakra-ui/react';

function TodoItem({ todo, onDelete, onEdit }) {
  return (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
      <HStack justifyContent="space-between">
        <Text>{todo.title}</Text>
        <HStack>
          <Button colorScheme="yellow" size="sm" onClick={() => onEdit(todo)}>
            Edit
          </Button>
          <Button colorScheme="red" size="sm" onClick={() => onDelete(todo._id)}>
            Delete
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}

export default TodoItem;
