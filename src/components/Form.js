"use client"

import { Button, Field, Input, Stack, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

export default function Form (){
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" width="full" pt={6}>
        <Field.Root invalid={!!errors.name}>
          <Field.Label colour='white'>
            <Text 
            fontFamily='Poppins'
            fontSize='0.75rem' // 30px
            lineHeight='normal' // 30px
            fontWeight='400'
            fontStyle='normal'
            color='#CCCED1'
            >
                Name
            </Text>
            </Field.Label>
          <Input {...register("name")} 
            placeholder='John Appleseed' 
            fontFamily='Poppins' 
            fontSize={'0.875rem'}
            color='white'          
          />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.email}>
          <Field.Label>
            <Text
                fontFamily='Poppins'
                fontSize='0.75rem' // 30px
                lineHeight='normal' // 30px
                fontWeight='400'
                fontStyle='normal'
                color='#CCCED1'            
            >
            Email
            </Text>
            </Field.Label>
          <Input {...register("email")}
            name="email"  
            color='white' 
            type="email" 
            placeholder='john.appleseed@ac.co.uk' 
            fontFamily='Poppins' 
            fontSize={'0.875rem'}
          />
          <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.phoneNumber}>
          <Field.Label>
            <Text
                fontFamily='Poppins'
                fontSize='0.75rem' // 30px
                lineHeight='normal' // 30px
                fontWeight='400'
                fontStyle='normal'
                color='#CCCED1'            
            >
            Phone Number
            </Text>
            </Field.Label>
          <Input {...register("phoneNumber")}
            name="phoneNumber"  
            color='white' 
            placeholder='+447123456789' 
            fontFamily='Poppins' 
            fontSize={'0.875rem'}          
          />
          <Field.ErrorText>{errors.phoneNumber?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.userMessage}>
          <Field.Label>
            <Text
                fontFamily='Poppins'
                fontSize='0.75rem' // 30px
                lineHeight='normal' // 30px
                fontWeight='400'
                fontStyle='normal'
                color='#CCCED1'            
            >
            Message
            </Text>
            </Field.Label>
          <Input {...register("userMessage")}
            name="message" 
            placeholder='Leave your message here...' 
            fontFamily='Poppins' 
            fontSize={'0.875rem'}
            color='white'          
          />
          <Field.ErrorText>{errors.lastName?.userMessage}</Field.ErrorText>
        </Field.Root>

        <Button 
            type="submit"
            variant={'outline'}
            bgColor={'#00DEE3'}
            borderColor={'#00DEE3'}
            _hover={{ bg: 'rgba(0, 222, 227, 0.1)', color: '#00DEE3' }}
            fontFamily="Poppins"
            fontWeight={500} 
            
            position='absolute'
            // right={6}
            // bottom={6}

            right={0}
            bottom={0}
            mb={'1.5rem'}
            mr={'2rem'}
        >
            Send Message
            </Button>
      </Stack>
    </form>
  )
}