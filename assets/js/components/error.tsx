/*** 
 * this component should only be used to render errors coming from apollo client
 * @params error 
*/

import React from "react"
import { FaTimes } from 'react-icons/fa'

// @ts-ignore
const Error: React.FC<any> = ({ error }) => {
    if (!error || !error.message) return null

    const isNetworkError =
        error.networkError &&
        error.networkError.message &&
        error.networkError.statusCode

    const hasGraphQLErrors = error.graphQLErrors && error.graphQLErrors.length

    let errorMessage

    if (isNetworkError) {
        if (error.networkError.statusCode === 404) {
            errorMessage = (
                <h3>
                    <code>404: Not Found</code>
                </h3>
            )
        } else {
            errorMessage = (
                <>
                    <h3>Network Error!</h3>
                    <code>
                        {error.networkError.statusCode}: {error.networkError.message}
                    </code>
                </>
            )
        }
    } else if (hasGraphQLErrors) {
        errorMessage = (
            <>
                <ul className="list-disc pl-5 space-y-1">
                    {error.graphQLErrors.map(({ message, details }, i) => (
                        <li key={i}>
                            <span className="message">{message}</span>
                            {details && (
                                <ul>
                                    {Object.keys(details).map(key => (
                                        <li key={key}>
                                            {key} {details[key]}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </>
        )
    } else {
        errorMessage = (
            <>
                <h3>Whoops!</h3>
                <p>{error.message}</p>
            </>
        )
    }

    return <div className="rounded-md bg-red-50 p-4 fixed">
        <div className="flex">
            <div className="flex-shrink-0">
                <FaTimes />
            </div>
            <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                    Oops! some errors were found
                </h3>
                <div className="mt-2 text-sm text-red-700">
                    {errorMessage}
                </div>
            </div>
        </div>
    </div>
}

export default Error
