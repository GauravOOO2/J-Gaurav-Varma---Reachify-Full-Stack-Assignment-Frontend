import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, useToast } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://j-gaurav-varma-reachify-full-stack-assignment-backend.vercel.app/token',
        new URLSearchParams({
          username: username,
          password: password,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        toast({
          title: 'Login successful!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/todos');
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <Box bg="white" p={8} rounded="md" shadow="md" maxWidth="400px" width="100%">
        <VStack spacing={4} align="flex-start" w="100%">
          <Heading>Login to Fodoist</Heading>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button colorScheme="blue" width="100%" onClick={handleSubmit}>Login</Button>
          <Text>
            Don't have an account? <Link as={RouterLink} to="/signup" color="blue.500">Sign up</Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default Login;
