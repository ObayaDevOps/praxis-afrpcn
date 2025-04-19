import {
  Box,
  Button,
  Dialog,
  Text,
  Portal,
} from '@chakra-ui/react';
import Form from '@/components/Form'

const ContactModal = ({ buttonText = "Get in Touch" }) => {
  return (
    <Dialog.Root placement={'center'} >
      <Dialog.Trigger asChild>
        <Button
        variant={'outline'}
        color={'#00DEE3'}
        borderColor={'#00E2E5'}
        _hover={{ bg: 'rgba(0, 222, 227, 0.1)', color: '#00DEE3' }}
        fontFamily="Poppins"
        fontWeight={500}
        >
          {buttonText}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop  />
        <Dialog.Positioner >
          <Dialog.Content
            bg='#000819'
            borderWidth={'2px'}
            borderRadiud={'12px'}
            borderColor='#00E2E5'
            p={'0.5rem'}
          >
            <Dialog.Header>
              <Dialog.Title>
                <Text
                  fontFamily='Poppins'
                  fontSize={'1.25rem'}
                  lineHeight='normal' // 30px
                  fontWeight='500'
                  letterSpacing={'0.025rem'}
                  fontStyle='normal'
                  color='white'
                >
                Contact Us
                </Text>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text
                fontFamily='Poppins'
                fontSize='0.875rem' // 30px
                lineHeight='1.875rem' // 30px
                fontWeight='400'
                fontStyle='normal'
                color='#FFF'
              >
              Want to reach out?
              Enter your details below and provide a
              message to Ashton & Carrington
              and we'll respond as soon as we can.
              </Text>

              <Box>
                <Form />
              </Box>



            </Dialog.Body>
            <Dialog.Footer mt={'3.5rem'}>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant={'solid'}
                  color={'#00E2E5'}
                  borderColor={'#00DEE3'}
                  _hover={{ bg: 'rgba(0, 222, 227, 0.1)', color: '#00DEE3' }}
                  fontFamily="Poppins"
                  fontWeight={500}

                  position='absolute'
                  right={0}
                  bottom={0}
                  mb={'1.5rem'}
                  mr={'12rem'}
                >
                  Close
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default ContactModal; 