import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import TodoItem from './TodoItem';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/todos/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      toast({
        title: "Error",
        description: "Please describe your todo task.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/todos/', {
        title: newTodo,
        description: '',
        completed: false
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
      toast({
        title: "Todo added.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const editTodo = (todo) => {
    setEditTodoId(todo._id);
    setEditTitle(todo.title);
  };

  const updateTodo = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/todos/${editTodoId}`, {
        title: editTitle,
        description: '',
        completed: false
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTodos(todos.map(todo => (todo._id === editTodoId ? response.data : todo)));
      setEditTodoId(null);
      setEditTitle('');
      toast({
        title: "Todo updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTodos(todos.filter(todo => todo._id !== id));
      toast({
        title: "Todo deleted.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <Box minHeight="100vh" bg="gray.50" py={10}>
      <VStack spacing={8} maxWidth="600px" margin="auto" bg="white" p={8} rounded="md" shadow="md">
        <Heading>Fodoist</Heading>
        <Box width="100%">
          <Input
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            mr={2}
          />
          <Button colorScheme="blue" onClick={addTodo} mt={2}>
            Add Todo
          </Button>
        </Box>
        {editTodoId && (
          <Box width="100%" mt={4}>
            <Input
              placeholder="Edit todo title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              mr={2}
            />
            <Button colorScheme="green" onClick={updateTodo} mt={2}>
              Update Todo
            </Button>
          </Box>
        )}
        <VStack spacing={4} width="100%" align="stretch">
          {todos.map(todo => (
            <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo} onEdit={editTodo} />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

export default TodoList;