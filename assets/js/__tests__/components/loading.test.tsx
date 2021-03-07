import React from "react"
import { render, act, waitFor } from "@testing-library/react"
import Loading from "~/components/loading"

describe("`<Loading />`", () => {
    let component

    beforeEach(async () => {
        act(() => {
            component = render(<Loading loading={true} message="Random alert message" />)
        })

        await waitFor(() => component)
    })

    it("renders correctly and matches snapshot", () => {
        expect(component).toMatchSnapshot()
    })
})