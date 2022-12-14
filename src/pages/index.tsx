import './index.scss';

import React, { useEffect } from 'react';
import Logo from '../assets/logo.png';

import {
  HStack,
  Box,
  Image,
  Heading,
  Text,
  VStack,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Center,
  Spacer,
  Link,
} from '@chakra-ui/react';

import {Functions} from 'appwrite';
import {useApi} from '../providers/hooks';
import List from './list';
const Root = () => {

  return (
    <Box>
      <List/>
    </Box>
  )
}

export default Root;