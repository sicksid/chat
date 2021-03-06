import React from 'react'
import {
  Link, useHistory
} from 'react-router-dom'
import { useApolloClient, useMutation } from '@apollo/client'
import { useForm, useField } from 'react-final-form-hooks'
import LOGIN_MUTATION from '~/api/mutations/login.gql'
import Layout from '~/shared/layout'
import Error from '~/components/error'
import Loading from '~/components/loading'

interface LoginMutation {
  login: {
    user: User,
    token: AuthToken
  }
}

type Required = "Required"
type InvalidEmail = "Invalid Email"

interface FormErrors {
  email?: Required | InvalidEmail
  password?: Required
}

export default () => {
  const [login, { error, loading, data }] = useMutation<LoginMutation>(LOGIN_MUTATION)
  const history = useHistory()
  const client = useApolloClient()
  const onSubmit = ({ email, password }: User) => {
    login({ variables: { email, password } })
  }

  const validate = ({ email, password }: User) => {
    const errors: FormErrors = {}
    const isEmailValid = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    if (!isEmailValid.test(email)) {
      errors.email = "Invalid Email"
    }

    if (!email) {
      errors.email = "Required"
    }


    if (!password) {
      errors.password = "Required"
    }

    return errors
  }

  const { form, handleSubmit, pristine, submitting } = useForm({
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

  return <Layout>
    <Error error={error} />
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
    			</h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Or <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            create a new one right here
					</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
							</label>
              <div className="mt-1">
                <input
                  {...email.input}
                  type="email"
                  className={`${email.meta.touched && email.meta.error && "text-red-900 placeholder-red-300"}appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`} />
                {email.meta.touched && email.meta.error && <p className="mt-2 text-sm text-red-600">{email.meta.error}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  {...password.input}
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  {...rememberMe.input}
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in <Loading loading={loading} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Layout >
}