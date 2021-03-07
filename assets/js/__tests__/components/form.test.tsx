import React from "react"
import { render, act, waitFor } from "@testing-library/react"
import Form from "~/components/form"

const submitMock = jest.fn()

describe("`<Form />`", () => {
    let component
    beforeEach(async () => {
        act(() => {
            component = render(<Form action="/url" method="get" submit={submitMock} />)
        })

        await waitFor(() => component)
    })
    it("renders correctly and matches snapshot", () => {
        expect(component).toMatchSnapshot()
    })
})