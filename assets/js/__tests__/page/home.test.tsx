import React from "react"
import { render, act, waitFor } from "@testing-library/react"
import Home from "~/pages/home"

import { Provider } from 'react-redux'
import store from '~/store'

describe("`<Home />`", () => {
    let component
    beforeEach(async () => {
        act(() => {
            component = render(
                <Provider store={store}>
                    <Home />
                </Provider>
            )
        })

        await waitFor(() => component)
    })
    it("renders correctly and matches snapshot", () => {
        expect(component).toMatchSnapshot()
    })
})