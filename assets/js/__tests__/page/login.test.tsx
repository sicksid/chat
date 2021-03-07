import React from "react"
import { render, screen } from "@testing-library/react"

import { MockedProvider } from '@apollo/client/testing'
import Login from "~/pages/login"
const mocks = []

describe("`<Login />`", () => {
    beforeEach(() => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Login />
            </MockedProvider>
        )
    })

    it("renders correctly and matches snapshot", () => {
        expect(screen.getByTestId('login-form')).toMatchSnapshot()
    })
})