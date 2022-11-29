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
    let price = element.querySelector('.price').textContent;
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
    <>
      <Box id="headliner" w='full' h={400} px={6} py={4}>
        <HStack w='full'>
          <Image 
            src={Logo} 
            alt="GothamForge" 
            h='34px'
            opacity={0.9}
          />

          <Heading className='branding'>
            GothamForge
          </Heading>
        </HStack>

        <HStack w='full' h='full' align='center' justify='flex-start' mx={20}>
          <VStack align='flex-start' maxWidth={460}>
            <Heading color='white' fontWeight='medium'>
              Providing props, accessories, cosplay and more for 
              creating your personas.
            </Heading>
            
            <Box h={2}/>

            <Button size='sm'>
              Contact us
            </Button>
          </VStack>
          <Box flex={1} minWidth={132}/>
        </HStack>
      </Box>

      <Box h={4}/>

      <Box w='full' h={400} px={10} py={4}>
        <Heading color="white" fontSize='2xl'>Prebuilt items available for purchase.</Heading>

        <Box h={8}/>

        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))' >
          {items.map((item, index) => (          
            <Card key={`item-${index}`} bg='whiteAlpha.900' m={0} p={0} overflow='hidden'>
              <CardBody m={0} p={0}>
                <HStack w='full' h='full' spacing={0} m={0} p={0}>
                  <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    h='full'
                    src={item.image}
                  />


                  <VStack w='full' h='full' justify='center' align='flex-start' p={4}>
                    <Spacer/>

                    <Heading size='sm'>{item.title}</Heading>
                    <Text>
                      {item.summary}
                    </Text>

                    <Text color='blue.600' fontSize='2xl'>
                      {'$' + item.price.replace('USD', '').replace(',', '.')}
                    </Text>
                  
                    <Spacer/>

                    <Box w='full'>
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

                    <Box h={2}/>

                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default Root;
