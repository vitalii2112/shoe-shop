import {describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import Modal from "@/components/Modal";

describe('Modal', () => {
    test('should not render modal', () => {
        const {queryByTestId} = renderWithProviders(<Modal onCloseModal={jest.fn()} opened={false}>123</Modal>)

        expect(queryByTestId('modal')).not.toBeInTheDocument()
        expect(document.documentElement.classList.contains('noScroll')).toBe(false)
    })

    test('should render modal', () => {
        const {getByTestId} = renderWithProviders(<Modal onCloseModal={jest.fn()} opened={true}>123</Modal>)

        expect(getByTestId('modal')).toBeInTheDocument()
        expect(getByTestId('modal-close')).toBeInTheDocument()
        expect(getByTestId('modal-body').textContent).toContain('123')
        expect(document.documentElement.classList.contains('noScroll')).toBe(true)
    })
    test('should close modal on click close button', async () => {
        const mockOnClose = jest.fn()
        const {getByTestId, user} = renderWithProviders(<Modal onCloseModal={mockOnClose} opened={true}>123</Modal>)

        expect(getByTestId('modal')).toBeInTheDocument()

        await user.click(getByTestId('modal-close'))

        expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    test('should close modal on press esc', async () => {
        const mockOnClose = jest.fn()
        const {getByTestId, user} = renderWithProviders(<Modal onCloseModal={mockOnClose} opened={true}>123</Modal>)

        expect(getByTestId('modal')).toBeInTheDocument()

        await user.keyboard('{Escape}')

        expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    test('should close modal on click overlay', async () => {
        const mockOnClose = jest.fn()
        const {getByTestId, user} = renderWithProviders(<Modal onCloseModal={mockOnClose} opened={true}>123</Modal>)

        const modal = getByTestId('modal')
        const modalBody = getByTestId('modal-body')

        expect(modal).toBeInTheDocument()

        await user.pointer([
            {keys: '[MouseLeft>]', target: modal},
            {pointerName: 'mouse', target: modalBody},
            {keys: '[/MouseLeft]'},
        ])
        expect(mockOnClose).toHaveBeenCalledTimes(0)

        await user.pointer([
            {keys: '[MouseLeft>]', target: modal},
            {pointerName: 'mouse', target: modal},
            {keys: '[/MouseLeft]'},
        ])
        expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
})
