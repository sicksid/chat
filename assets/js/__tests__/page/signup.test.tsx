import React from "react"
import { render, act, waitFor } from "@testing-library/react"
import { MockedProvider } from '@apollo/client/testing'
import SignUp from "~/pages/signup"

describe("`<SignUp />`", () => {
    const mocks = []
    let component
    beforeEach(async () => {
        act(() => {
            component = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <SignUp />
                </MockedProvider>
            )
        })

        await waitFor(() => component)
    })

    it("renders correctly and matches snapshot", () => {
        expect(component).toMatchSnapshot()
    })
})