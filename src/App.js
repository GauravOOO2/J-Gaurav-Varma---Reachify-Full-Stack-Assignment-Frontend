import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TodoList from './components/TodoList';

function App() {
  const isAuthenticated = localStorage.getItem('token'); // Check for token

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Protect the /todos route */}
          <Route 
            path="/todos" 
            element={isAuthenticated ? <TodoList /> : <Navigate to="/" replace />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
