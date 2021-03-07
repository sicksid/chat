import React from 'react'
import {
  Link as RouterLink,
  useHistory
} from 'react-router-dom'
import {
  useColorModeValue as mode,
  FormControl,
  FormErrorMessage,
  FormLabel, Stack,
  Box,
  Input,
  Checkbox,
  Button,
  Text,
  Heading,
  Link
} from '@chakra-ui/react'
import { useApolloClient, useMutation } from '@apollo/client'
import { useForm, useField } from 'react-final-form-hooks'
import LOGIN_MUTATION from '~/api/mutations/login.gql'
import Error from '~/components/error'

interface LoginMutation {
  login: {
    user: User,
    token: AuthToken
  }
}

enum FormErrors {
  FIELD_REQUIRED = "Required",
  INVALID_EMAIL = "Invalid Email"
}

interface ValidationErrors {
  email?: FormErrors.FIELD_REQUIRED | FormErrors.INVALID_EMAIL
  password?: FormErrors.FIELD_REQUIRED
}

export default () => {
  const [login, { error, loading: isLoading, data }] = useMutation<LoginMutation>(LOGIN_MUTATION)
  const history = useHistory()
  const client = useApolloClient()
  const onSubmit = ({ email, password }: User) => {
    login({ variables: { email, password } })
  }

  const validate = ({ email, password }: User) => {
    const errors: ValidationErrors = {}
    const isEmailValid = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    if (!isEmailValid.test(email)) {
      errors.email = FormErrors.INVALID_EMAIL
    }

    if (!email) {
      errors.email = FormErrors.FIELD_REQUIRED
    }


    if (!password) {
      errors.password = FormErrors.FIELD_REQUIRED
    }

    return errors
  }

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate
  })

  const email = useField('email', form)
  const password = useField('password', form)
  const rememberMe = useField('rememberMe', form)

  React.useEffect(() => {
    if (data && data.login) {
      client.resetStore()
      localStorage.setItem("auth-token", data.login.token)
      history.push("/")
    }
  }, [data])

  return <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
    <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
      <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
        Sign in to your account
      </Heading>
      <Text mt="4" align="center" maxW="md" fontWeight="medium">
        <span>Don&apos;t have an account?</span>
        <Box
          marginStart="1"
          href="#"
          color={mode('blue.600', 'blue.200')}
          _hover={{ color: 'blue.600' }}
          display={{ base: 'block', sm: 'revert' }}
          to="/sign-up"
          as={RouterLink}>
          create a new one right here
        </Box>
      </Text>

      <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
        <Error error={error} />
        <form onSubmit={handleSubmit}>
          <Stack spacing="6">
            <FormControl>
              <FormLabel htmlFor="email">
                Email Address
              </FormLabel>
              <Input {...email.input} />
              {email.meta.touched && email.meta.error && <FormErrorMessage>{email.meta.error}</FormErrorMessage>}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">
                Password
              </FormLabel>
              <Input
                type="password"
                {...password.input} />
              {password.meta.touched && password.meta.error && <FormErrorMessage>{password.meta.error}</FormErrorMessage>}
            </FormControl>

            <Checkbox {...rememberMe.input}>
              Remember Me
            </Checkbox>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              fontSize="md"
              isLoading={isLoading}
              disabled={submitting}>
              Sign in
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  </Box>
}