import React from 'react';

import {
  HStack,
  VStack,
  Box,
} from '@chakra-ui/react';

import Nav from './nav';

const Component = ({children}) => {
  return (
    <VStack w='full' h='100vh' align='flex-start' overflowY='auto'>
      {children}
    </VStack>
  );
}

export default Component;