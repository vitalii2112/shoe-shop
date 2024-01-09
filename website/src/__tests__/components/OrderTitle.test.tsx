import {describe, expect, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import OrderTitle from "@/pages/Orders/components/OrderTitle";

describe('OrderTitle', () => {
    test('should render skeleton', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<OrderTitle id={1} amount={1000} isLoading={true}/>)

        expect(getByTestId('order-title-skeleton')).toBeInTheDocument()
        expect(queryByTestId('order-title')).not.toBeInTheDocument()

        expect(getByTestId('order-title-amount-skeleton')).toBeInTheDocument()
        expect(queryByTestId('order-title-amount')).not.toBeInTheDocument()
    })

    test('should render title without userId', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<OrderTitle id={1} amount={1000} />)

        expect(queryByTestId('order-title-skeleton')).not.toBeInTheDocument()
        expect(queryByTestId('order-user-link')).not.toBeInTheDocument()
        expect(queryByTestId('order-user-deleted')).not.toBeInTheDocument()
        expect(getByTestId('order-title')).toBeInTheDocument()
        expect(getByTestId('order-title').textContent).toBe('Заказ №1')

        expect(queryByTestId('order-title-amount-skeleton')).not.toBeInTheDocument()
        expect(getByTestId('order-title-amount')).toBeInTheDocument()
        expect(getByTestId('order-title-amount').textContent).toBe('1000 грн.')
    })

    test('should render title with userId', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<OrderTitle id={1} amount={1000} user_id={1}/>)

        expect(queryByTestId('order-title-skeleton')).not.toBeInTheDocument()
        expect(getByTestId('order-user-link')).toBeInTheDocument()
        expect(getByTestId('order-user-link').textContent).toBe('Клиент №1')
        expect(queryByTestId('order-user-deleted')).not.toBeInTheDocument()
        expect(getByTestId('order-title')).toBeInTheDocument()
        expect(getByTestId('order-title').textContent).toBe('Заказ №1')

        expect(queryByTestId('order-title-amount-skeleton')).not.toBeInTheDocument()
        expect(getByTestId('order-title-amount')).toBeInTheDocument()
        expect(getByTestId('order-title-amount').textContent).toBe('1000 грн.')
    })

    test('should render title with deleted user', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<OrderTitle id={1} amount={1000} user_id={null}/>)

        expect(queryByTestId('order-title-skeleton')).not.toBeInTheDocument()
        expect(queryByTestId('order-user-link')).not.toBeInTheDocument()
        expect(getByTestId('order-user-deleted')).toBeInTheDocument()
        expect(getByTestId('order-user-deleted').textContent).toBe('Клиент удален')
        expect(getByTestId('order-title')).toBeInTheDocument()
        expect(getByTestId('order-title').textContent).toBe('Заказ №1')

        expect(queryByTestId('order-title-amount-skeleton')).not.toBeInTheDocument()
        expect(getByTestId('order-title-amount')).toBeInTheDocument()
        expect(getByTestId('order-title-amount').textContent).toBe('1000 грн.')
    })
})
