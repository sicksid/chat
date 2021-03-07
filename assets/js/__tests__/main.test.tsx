import React from "react"
import { render, act, waitFor } from "@testing-library/react"
import App from "~/main"


describe("`<App />`", () => {
    let component

    beforeEach(async () => {
        act(() => {
            component = render(<App />)
        })

        await waitFor(() => component)
    })

    it("renders correctly and matches snapshot", () => {
        expect(component).toMatchSnapshot()
    })
})