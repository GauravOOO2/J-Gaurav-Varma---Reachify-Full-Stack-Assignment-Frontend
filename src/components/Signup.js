import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, useToast, Spinner } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input fields
    if (!username || !password) {
      toast({
        title: 'Error',
        description: 'Both username and password are required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true); // Start loading

    try {
      // Sign up the user
      await axios.post('https://j-gaurav-varma-reachify-full-stack-assignment-backend.vercel.app/register', {
        username,
        password,
      });
      toast({
        title: 'Signup successful!',
        description: 'Please log in with the same credentials.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      


      // Redirect to login page
      navigate('/'); // Redirect to the login page
    } catch (error) {
      console.error('Signup failed:', error);
      const errorMessage = error.response?.data?.detail || 'Signup failed. Please try again.';
      toast({
        title: 'Signup failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <Box bg="white" p={8} rounded="md" shadow="md" maxWidth="400px" width="100%">
        <VStack spacing={4} align="flex-start" w="100%">
          <Heading>Sign up for Fodoist</Heading>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button colorScheme="blue" width="100%" onClick={handleSubmit} isLoading={loading}>
            {loading ? <Spinner size="sm" /> : 'Sign Up'}
          </Button>
          <Text>
            Already have an account? <Link as={RouterLink} to="/" color="blue.500">Login</Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default Signup;