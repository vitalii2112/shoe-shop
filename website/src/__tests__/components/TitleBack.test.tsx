import {describe, expect, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import TitleBack from "@/components/TitleBack";

describe('TitleBack', () => {
    test('should return back', async () => {
        const {getByTestId, user} = renderWithProviders(<TitleBack title="Back"/>, {route: '/test-route'})

        const title = getByTestId('title-back')


        expect(title).toBeInTheDocument()
        expect(title.textContent).toContain('Back')

        await user.click(title)

        expect(window.location.pathname).toBe('/')
    })
})
