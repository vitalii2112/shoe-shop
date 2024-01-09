import {describe, expect, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import Loading from "@/components/Loading";

describe('Loading', () => {
    test('should render loading', () => {
        const {getByTestId, queryByTestId, rerender} = renderWithProviders(<Loading/>)

        expect(getByTestId('loading')).toBeInTheDocument()
        expect(queryByTestId('loading-text')).not.toBeInTheDocument()

        rerender(<Loading text="some text" absolute modal/>)

        expect(queryByTestId('loading-text')).toBeInTheDocument()
        expect(getByTestId('loading').classList.contains('absolute')).toBe(true)
        expect(getByTestId('loading').classList.contains('modal')).toBe(true)
        expect(document.documentElement.classList.contains('noScroll')).toBe(false)
    })

    test('should block document scroll', () => {
        const {getByTestId, queryByTestId, rerender, unmount} = renderWithProviders(<Loading/>)

        expect(getByTestId('loading')).toBeInTheDocument()
        expect(queryByTestId('loading-text')).not.toBeInTheDocument()

        expect(document.documentElement.classList.contains('noScroll')).toBe(true)

        unmount()

        expect(document.documentElement.classList.contains('noScroll')).toBe(false)
    })
})
