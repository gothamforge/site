import React from 'react';

import {
  HStack,
  VStack,
  Box,
  Image,
  Button,
  Spacer,
  Icon,
  Heading,
  Text,
  Textarea,
  SimpleGrid,
  Link,
} from '@chakra-ui/react';

import {
  IoLogoInstagram,
} from 'react-icons/io5';

import {
  object,
  string,
} from 'yup';

import {Textfield} from '../components';

import {useDatabase} from '../providers/hooks';

import Logo from '../assets/logo.png';
import { useFormik } from 'formik';

const validationSchema = object({
  email: 
    string()
      .email('Invalid email address')
      .required('Email address is required'),
  name:
    string()
      .required('Name is required'),
  message:
    string()
      .required('Message is required'),
});

const Component = ({children}) => {
  const db = useDatabase();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const initialValues = {
    name: '',
    email: '',
    message: '',  
  };

  const handleSubmit = (fieldValues, actions) => {
    actions.setSubmitting(false);

    setIsSubmitting(true);

    let result = db.contactus.create(fieldValues.name, fieldValues.email, fieldValues.message)
    
    result
      .then((_res) => {
        alert("Thank you for your message! We'll get back to you as soon as possible.");
      }, (err) => {
        alert("There was an error sending your message. Please try again later.")
      });

      actions.resetForm();
      setIsSubmitting(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });


  return (
    <VStack w='full' h='100vh' align='flex-start' overflowY='auto' bg="#f7f6f2" m={0} p={0} spacing={0}>
      <HStack w='full' h='60px' px='6' py={0} m={0} align='center' borderBottom="1px solid #a1a09c">
        <VStack pr={6} py={0} m={0} h='full' justify='center' borderRight="1px solid #a1a09c">
          <Image
            height='40px'
            src={Logo}
            alt="GothamForge"
          />
        </VStack>
        
        <Spacer/>

        <VStack py={0} m={0} pl={6} h='full' align='center' justify='center' borderLeft="1px solid #a1a09c">
          <Link isExternal href="https://instagram.com/gothamforge">
            <Icon
              w={8}
              h={8}
              as={IoLogoInstagram}
            />
          </Link>
        </VStack>

      </HStack>

      <Box w='full' m={0} p={0} borderBottom="1px solid #A1A09C">
        <Heading id="gf-heading" fontWeight='normal' textAlign='center' p={0} m={0}>
          G O T H A M F O R G E
        </Heading>
      </Box>

      <HStack w='full' m={0} p={0} px={4} borderBottom="1px solid #A1A09C" spacing={6} align='center' justify='center'>
        {[
          ['DC Comics', 'DC'],
          ['Marvel Comics', 'Marvel'],
          ['Star Wars', 'Star Wars'],
          ['Lord of the Rings', 'LOTR'],
          ['Gaming', 'Gaming'],
        ].map((item, index) => (
          <Box key={`brand-item-${index}`} m={0} p={0}>
            <Text
              m={0} p={0}
              fontWeight='normal' 
              fontSize='2xl' 
              color="rgba(0, 0, 0, 0.6)" 
              className='banner-brand brand-label-lg'
              textTransform='uppercase'
              align='center'
              overflow='hidden'
              whiteSpace='nowrap'
              noOfLines={1}
            >
                {item[0]}
            </Text>

            <Text 
              m={0} p={0}
              fontWeight='normal' 
              fontSize='2xl' 
              color="rgba(0, 0, 0, 0.6)" 
              className='banner-brand brand-label-sm'
              textTransform='uppercase'
              align='center'
              overflow='hidden'
              whiteSpace='nowrap'
              noOfLines={1}
            >
                {item[1]}
            </Text>
          </Box>
        ))}
      </HStack>

      <VStack w='full' p={6} align='center' justify='center'>
        <SimpleGrid 
          w='full' 
          px={20} 
          py={10} 
          className='jumbotron' 
          spacing={100} 
          columns={{sm: 1, md: 2}}
          border='1px solid #a1a09c'
          borderRadius='8px'
        >
          <VStack align='flex-start' pt={12}>
            <Heading color='whiteAlpha.800'>Building personas</Heading>
            <Text color='white'>
              Supplying all your cosplay, props, and accessories
              that you need to build your persona. You can choose
              from our selection on your Etsy store, or reach out
              for any custom work.
            </Text>
          </VStack>

          <form onSubmit={formik.handleSubmit}>
            <VStack align='flex-start'>
              <Heading color='whiteAlpha.800'>Reach out</Heading>

              <Textfield 
                id="name" 
                name="name"
                placeholder='Your name'
                isDisabled={isSubmitting}
                value={formik.values['name']}
                onChange={formik.handleChange}
              />

              <Textfield 
                id="email" 
                name="email"
                type="email" 
                placeholder='Email address'
                isDisabled={isSubmitting}
                value={formik.values['email']}
                onChange={formik.handleChange}
              />

              <Textarea 
                id="message"
                name="message"
                colorScheme='whiteAlpha' 
                bg='white' 
                placeholder="Tell us your idea" 
                size="sm" 
                h={32} 
                focusBorderColor="black.400"
                borderRadius='0.4em'
                isDisabled={isSubmitting}
                value={formik.values['message']}
                onChange={formik.handleChange}
              />

              <HStack w='full'>
                <Spacer/>

                <Button 
                  type="submit" 
                  colorScheme='green' 
                  size='sm' 
                  isLoading={isSubmitting}
                >
                  Contact
                </Button>
              </HStack>
            </VStack>
          </form>
        </SimpleGrid>
      </VStack>

      <HStack w='full' m={0} p={0} px={4} borderTop="1px solid #A1A09C" spacing={6} align='center' justify='center'>
        <Text
          m={0} p={0}
          fontWeight='normal' 
          fontSize='2xl' 
          color="rgba(0, 0, 0, 0.6)" 
          className='banner-brand'
          textTransform='uppercase'
          align='center'
          overflow='hidden'
          whiteSpace='nowrap'
          noOfLines={1}
        >
          Available off the shelf
        </Text>
      </HStack>

      <HStack w='full' m={0} p={0} px={4} borderTop="1px solid #A1A09C" spacing={6} align='center' justify='center'>
      {children}
      </HStack>


      <Box w='full' pb={200}>&nbsp;</Box>
    </VStack>
  );
}

/*
<VStack py={0} m={0} pr={4} pl={6} h='full' align='center' justify='center' borderLeft="1px solid #a1a09c">
  <Button variant='link' size='sm' fontWeight='normal'>Clients</Button>
</VStack>

<VStack pr={4} pl={6} h='full' align='center' justify='center' borderLeft="1px solid #a1a09c">
  <Button variant='link' size='sm' fontWeight='normal'>Contact</Button>
</VStack>
*/

export default Component;