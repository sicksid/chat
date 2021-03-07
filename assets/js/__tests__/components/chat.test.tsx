import React from "react"
import { MockedProvider } from '@apollo/client/testing'
import { render, act, waitFor } from "@testing-library/react"
import CREATE_MESSAGE_MUTATION from "~/api/mutations/create_message.gql"
import Chat, { Form, Uploads } from "~/components/chat"

jest.useFakeTimers()

const conversation: Conversation = {
    id: "1",
    title: "Random conversation",
    messages: []
}
const mocks = [{
    request: {
        query: CREATE_MESSAGE_MUTATION,
        variables: {
            content: "New Message",
            conversationId: conversation.id
        }
    }
}]

describe("`<Chat />`", () => {
    let component

    beforeEach(async () => {
        act(() => {
            component = render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <Chat conversation={conversation} />
                </MockedProvider>
            )
        })
        await waitFor(() => component)
    })

    it("renders correctly and matches snapshot", () => {
        expect(component).toMatchSnapshot()
    })

    it("sends graphql mutation on submit", () => {
        component = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Chat conversation={conversation} />
            </MockedProvider>
        )
        const textarea = component?.find('textarea')
        textarea?.simulate('change', { target: { value: 'Hello' } })
        const submit = component?.find('button[type="submit"]')
        submit?.simulate('click')
        expect(component).toMatchSnapshot()
    })

    it("shows attachments above form when dropping them", () => {
        const file = new File([
            JSON.stringify({ ping: true })
        ], 'img.png', { type: 'image/png' })

        const mockedData = {
            dataTransfer: {
                files: [file],
                items: [{
                    kind: 'file',
                    type: file.type,
                    getAsFile: () => file
                }],
                types: ['Files']
            }
        }

        const form = component?.find(Form)
        form?.simulate('drop', mockedData)
        expect(component?.find(Uploads)).toBeTruthy()
    })
})