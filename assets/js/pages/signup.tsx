import React from 'react'
import {
	Link as RouterLink
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
import { useForm, useField } from 'react-final-form-hooks'
import SIGN_UP_MUTATION from '~/api/mutations/sign-up.gql'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import Error from '~/components/error'

enum FormErrors {
	FIELD_REQUIRED = "Required",
	INVALID_EMAIL = "Invalid Email",
	PASSWORD_SHOULD_MATCH = "Passwords should match"
}

interface ValidationErrors {
	email?: FormErrors.FIELD_REQUIRED | FormErrors.INVALID_EMAIL
	password?: FormErrors.FIELD_REQUIRED
	passwordConfirmation?: FormErrors.FIELD_REQUIRED | FormErrors.PASSWORD_SHOULD_MATCH
}

export default () => {
	const [sign_up, { error, loading: isLoading, data }] = useMutation(SIGN_UP_MUTATION)
	const history = useHistory()
	const onSubmit = ({ email, password, passwordConfirmation }) => {
		sign_up({ variables: { email, password, passwordConfirmation } })
			.then(() => form.reset())
			.catch(error => console.error(error))
	}

	const validate = ({ email, password, passwordConfirmation }) => {
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

		if (!passwordConfirmation) {
			errors.passwordConfirmation = FormErrors.FIELD_REQUIRED
		}

		if (password != passwordConfirmation) {
			errors.passwordConfirmation = FormErrors.PASSWORD_SHOULD_MATCH
		}

		return errors
	}

	const { form, handleSubmit, submitting } = useForm({
		onSubmit,
		validate
	})

	const email = useField('email', form)
	const password = useField('password', form)
	const passwordConfirmation = useField('passwordConfirmation', form)
	const rememberMe = useField('rememberMe', form)

	React.useEffect(() => {
		if (data && data.signUp) {
			localStorage.setItem("auth-token", data.signUp.token)
			history.push("/")
		}
	}, [data])


	return <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
		<Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
			<Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
				Create a new Account
			</Heading>
			<Error error={error} />
			<Text mt="4" align="center" maxW="md" fontWeight="medium">
				<span>Already have an account?</span>
				<Box
					marginStart="1"
					color={mode('blue.600', 'blue.200')}
					_hover={{ color: 'blue.600' }}
					display={{ base: 'block', sm: 'revert' }}
					to="/login"
					as={RouterLink}>
					sign in to yours
				</Box>
			</Text>

			<Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
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
						<FormControl>
							<FormLabel htmlFor="passwordConfirmation">
								Password Confirmation
						</FormLabel>
							<Input
								type="password"
								{...passwordConfirmation.input} />
							{passwordConfirmation.meta.touched && passwordConfirmation.meta.error && <FormErrorMessage>{passwordConfirmation.meta.error}</FormErrorMessage>}
						</FormControl>
						<Checkbox {...rememberMe.input}>
							Remember Me
					</Checkbox>

						<Button
							type="submit"
							isLoading={isLoading}
							colorScheme="blue"
							size="lg"
							fontSize="md"
							disabled={submitting}>
							Sign in
					</Button>
					</Stack>
				</form>
			</Box>
		</Box>
	</Box >
}