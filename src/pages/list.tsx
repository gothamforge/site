import './index.scss';

import React, { useEffect } from 'react';
import Logo from '../assets/logo.png';

import {
  HStack,
  Box,
  Heading,
  Text,
  VStack,
  Button,
  SimpleGrid,
  Spacer,
  Link,
  Divider,
  Center,
} from '@chakra-ui/react';

import {Functions} from 'appwrite';
import {useApi} from '../providers/hooks';

const createCard = (item, index) => (
  <VStack 
    key={`item-${index}`} 
    bg='whiteAlpha.900'
    w='100%'
    maxW={420}
    h={360}
    m={0}
    overflow='hidden'
    borderRadius={6}
    border="1px solid rgba(0, 0, 0, 0.08)"
    justify='flex-start'
    align='flex-start'
    spacing={0}
  >
    <Box w='full' p={4}>
      <Box
        className='etsy-item'
        backgroundImage={item.image}
        h={200}
        w='100%'
        borderRadius={6}
      >
      </Box>
    </Box>
    
    <HStack w='full' px={5} justify="flex-start" align="flex-start">
      <Heading size='md' fontWeight='medium' color='blackAlpha.700' pr={4}>{item.title}</Heading>
      
      <Spacer/>
      
      <Text fontWeight="semibold" color="green.600">{item.price}</Text>
    </HStack>

    <Spacer/>

    <Divider/>

    <Box w='full' p={4}>
      <Center>
        <Button 
          variant='link' 
          colorScheme='gray' 
          size='sm'
          w={100}
          borderRadius={0}
          as={Link}
          isExternals
          href={item.link}
        >
          More info
        </Button>
      </Center>
    </Box>
  </VStack>
)

const Root = () => {
  const api = useApi();
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    
    const fetchItems = async () => {
      const functions = new Functions(api);
      const result = await functions.createExecution('etsyfeed');
      const feed = JSON.parse(result.response);

      let items = (feed.items).map((item) => {
        return {
          ...item,
          title: item.title.replace('by GothamForge', '').replace('inspired', '').trim(),
          ...summary(item.content),
        }
      });

      setItems(items);
    };

    fetchItems();
  }, []);

  const summary = (text) => {
    let element = document.createElement('div');
    element.innerHTML = text;

    let image = element.querySelector('img').src;
    let price = ('$' + element.querySelector('.price').textContent).replace('USD', '').replace(',', '.');
    let description = element.querySelector('.description').innerHTML;
    let summary = 
      description
      .split('<br>')
      .filter((line) => line.length > 0)
      .map((line) => line.trim())
      .slice(0, 2);
      
      summary[summary.length - 1] = (summary[summary.length - 1] + '...').replace('....', '...');

    element = null;

    return {
      image,
      price,
      summary: summary[0]
    }
  }

  return (
    <SimpleGrid spacing={6} columns={{sm: 1, md: 2, lg: 3}} mt={10}>
      {items.map(createCard)}
    </SimpleGrid>
  );
}

export default Root;
