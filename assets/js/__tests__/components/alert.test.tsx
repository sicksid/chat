import React from "react"
import { render, act, waitFor } from "@testing-library/react"
import Alert from "~/components/alert"



describe("`<Alert />`", () => {
    let component

    beforeEach(async () => {
        act(() => {
            component = render(<Alert type="error" message="Random alert message" />)
        })
        await waitFor(() => component)
    })
    it("renders correctly and matches snapshot", () => {
        expect(component).toMatchSnapshot()
    })
})