import React from "react"
import { MockedProvider } from '@apollo/client/testing'
import { render, act, waitFor } from "@testing-library/react"
import CreateConversation from "~/components/create_conversation"

const user: User = {
    id: "1",
    email: "fakeemail@gmail.com"
}

describe("`<CreateConversation />`", () => {
    let component
    const mocks = []

    beforeEach(async () => {
        act(() => {
            component = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <CreateConversation user={user} />
                </MockedProvider>
            )
        })

        await waitFor(() => component)
    })
    it("renders correctly and matches snapshot", () => {
        expect(component).toMatchSnapshot()
    })
})