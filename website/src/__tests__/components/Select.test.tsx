import {afterAll, beforeAll, describe, expect, jest, test} from "@jest/globals";
import Select from "@/components/Select";
import {renderWithProviders} from "@/utils/test-utils";

const originalScrollTo = window.scrollTo;

beforeAll(() => {
    window.scrollTo = jest.fn();
})

afterAll(() => {
    window.scrollTo = originalScrollTo;
})

describe('Select', () => {
    test('should render select with string array', () => {
        const {getByTestId, getAllByTestId, queryByTestId} = renderWithProviders(<Select label="Select label"
                                                                                         selected={undefined}
                                                                                         setSelected={jest.fn()}
                                                                                         options={['1', '2']}/>)

        expect(getByTestId('select')).toBeInTheDocument()
        expect(getByTestId('select-label').textContent).toBe('Select label')
        expect(getAllByTestId('select-item').length).toBe(2)
        expect(getAllByTestId('select-item')[1].textContent).toBe('2')
        expect(queryByTestId('select-search')).not.toBeInTheDocument()
    })

    test('should render select with TSelect array', () => {
        const {getByTestId, getAllByTestId} = renderWithProviders(<Select label="Select label" selected={undefined}
                                                                          setSelected={jest.fn()}
                                                                          options={[
                                                                              {label: 'label1', value: 'value1'},
                                                                              {label: 'label2', value: 'value2'}
                                                                          ]}/>)

        expect(getByTestId('select')).toBeInTheDocument()
        expect(getByTestId('select-label').textContent).toBe('Select label')
        expect(getAllByTestId('select-item').length).toBe(2)
        expect(getAllByTestId('select-item')[1].textContent).toBe('label2')
    })

    test('should show select list', async () => {
        const scrollMock = jest.fn();
        Object.defineProperty(HTMLElement.prototype, 'scroll', { value: scrollMock });
        const {getByTestId, getAllByTestId, user, debug} = renderWithProviders(<Select label="Select label"
                                                                                          selected={undefined}
                                                                                          setSelected={jest.fn()}
                                                                                          options={['1', '2']}/>)
        expect(getByTestId('select-list')).not.toHaveStyle({ height: 'auto' })

        await user.click(getByTestId('select-label'))
        expect(scrollMock).toHaveBeenCalledTimes(1)
        expect(scrollMock).toHaveBeenCalledWith(0, 0)
        expect(getByTestId('select-list')).toHaveStyle({ height: 'auto' })
    })

    test('should select string value', async () => {
        const mockSetSelected = jest.fn()
        const {getByTestId, getAllByTestId, user, rerender} = renderWithProviders(<Select label="Select label"
                                                                                          selected={undefined}
                                                                                          setSelected={mockSetSelected}
                                                                                          options={['1', '2']}/>)

        await user.click(getAllByTestId('select-item')[1])
        expect(mockSetSelected).toBeCalledTimes(1)
        expect(mockSetSelected).toBeCalledWith('2')

        rerender(<Select label="Select label"
                         selected={'2'}
                         setSelected={mockSetSelected}
                         options={['1', '2']}/>)
        expect(getByTestId('select-label').textContent).toBe('2')
    })

    test('should select object value', async () => {
        const mockSetSelected = jest.fn()
        const {getByTestId, getAllByTestId, user, rerender} = renderWithProviders(<Select label="Select label"
                                                                                          selected={undefined}
                                                                                          setSelected={mockSetSelected}
                                                                                          options={[
                                                                                              {
                                                                                                  label: 'label1',
                                                                                                  value: 'value1'
                                                                                              },
                                                                                              {
                                                                                                  label: 'label2',
                                                                                                  value: 'value2'
                                                                                              }
                                                                                          ]}/>)

        await user.click(getAllByTestId('select-item')[1])
        expect(mockSetSelected).toBeCalledTimes(1)
        expect(mockSetSelected).toBeCalledWith({label: 'label2', value: 'value2'})

        rerender(<Select label="Select label" selected={{label: 'label2', value: 'value2'}}
                         setSelected={mockSetSelected}
                         options={[
                             {label: 'label1', value: 'value1'},
                             {label: 'label2', value: 'value2'}
                         ]}/>)
        expect(getByTestId('select-label').textContent).toBe('label2')
    })

    test('should render by search value', async () => {
        const {getByTestId, getAllByTestId, queryAllByTestId, user} = renderWithProviders(<Select label="Select label"
                                                                                         selected={undefined}
                                                                                         searchEnable
                                                                                         searchPlaceholder="search..."
                                                                                         setSelected={jest.fn()}
                                                                                         options={['1', '2', '3']}/>)
const searchInput = getByTestId('select-search')

        expect(getByTestId('select')).toBeInTheDocument()
        expect(getAllByTestId('select-item').length).toBe(3)
        expect(getAllByTestId('select-item')[1].textContent).toBe('2')
        expect(searchInput).toBeInTheDocument()
        expect(searchInput).toHaveAttribute('placeholder', 'search...')

        await user.type(searchInput, '2')

        expect(searchInput).toHaveValue('2')
        expect(getAllByTestId('select-item').length).toBe(1)
        expect(getAllByTestId('select-item')[0].textContent).toBe('2')

        await user.type(searchInput, '2')

        expect(searchInput).toHaveValue('22')
        expect(queryAllByTestId('select-item')?.length).toBe(0)
    })
})
