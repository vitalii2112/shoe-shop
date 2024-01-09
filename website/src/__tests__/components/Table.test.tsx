import {describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import Table from "@/components/Table";

const items = [
    {id: 1, name: 'name1', desc: 'desc1'},
    {id: 2, name: 'name2', desc: 'desc2'},
    {id: 3, name: 'name3', desc: 'desc3'},
    {id: 4, name: 'name4', desc: 'desc4'},
]

const headers = ['id', 'name', 'desc']

const TableItems = () => {
    return (
        <>
            {items.map(item => <div key={item.id} data-testid="table-item">
                <div data-testid={`item-id-${item.id}`}>{item.id}</div>
                <div data-testid={`item-name-${item.name}`}>{item.name}</div>
                <div data-testid={`item-desc-${item.desc}`}>{item.desc}</div>
            </div>)}
        </>
    )
}

describe('Table', () => {
    test('should render table', () => {
        const {getByTestId, getAllByTestId, queryByTestId} = renderWithProviders(<Table headers={headers} fontSize={20}><TableItems/></Table>)

        expect(getByTestId('table')).toBeInTheDocument()
        expect(getByTestId('table')).toHaveStyle({fontSize: '20px'})
        expect(getByTestId('table-headers')).toBeInTheDocument()
        expect(getByTestId('table-headers')).toHaveStyle({fontSize: '22px'})
        expect(getAllByTestId('table-header').length).toBe(headers.length)
        expect(getAllByTestId('table-item').length).toBe(items.length)
        expect(getAllByTestId('table-item')[0].childElementCount).toBe(Object.keys(items[0]).length)
        expect(queryByTestId('table-select')).not.toBeInTheDocument()
        expect(queryByTestId('table-unselect')).not.toBeInTheDocument()
    })

    test('should render selectable table', async () => {
        const mockSelectAll = jest.fn()
        const mockUnSelectAll = jest.fn()
        const {getByTestId, queryByTestId, user, rerender} = renderWithProviders(<Table headers={headers} selectable={{
            show: false,
            selectAll: mockSelectAll,
            unselectAll: mockUnSelectAll
        }}><TableItems/></Table>)

        expect(getByTestId('table-select')).toBeInTheDocument()
        expect(queryByTestId('table-unselect')).not.toBeInTheDocument()

        await user.click(getByTestId('table-select'))

        expect(mockSelectAll).toHaveBeenCalledTimes(1)

        rerender(<Table headers={headers}
                        selectable={{show: true, selectAll: mockSelectAll, unselectAll: mockUnSelectAll}}><TableItems/></Table>)

        expect(queryByTestId('table-select')).not.toBeInTheDocument()
        expect(getByTestId('table-unselect')).toBeInTheDocument()

        await user.click(getByTestId('table-unselect'))

        expect(mockUnSelectAll).toHaveBeenCalledTimes(1)
    })

    test('should render sortable table', async () => {
        const mockCb = jest.fn()
        const {getByTestId, getAllByTestId, user} = renderWithProviders(<Table cb={mockCb} headers={[{
            name: 'header1',
            field: 'id'
        }, {name: 'header2', field: 'name'}, {name: 'header3', field: 'desc'}]}><TableItems/></Table>)

        const tableHeaders = getAllByTestId('table-header')

        expect(getByTestId('table-headers')).toBeInTheDocument()
        expect(tableHeaders.length).toBe(3)
        expect(tableHeaders[1].textContent).toBe('header2')

        await user.click(tableHeaders[1])
        expect(mockCb).toHaveBeenCalledTimes(1)
        expect(mockCb).toHaveBeenCalledWith('name')
        expect(tableHeaders[1].classList.contains('sorted')).toBe(true)

        await user.click(tableHeaders[1])
        expect(mockCb).toHaveBeenCalledTimes(2)
        expect(mockCb).toHaveBeenCalledWith(undefined)
        expect(tableHeaders[1].classList.contains('sorted')).toBe(false)
    })
})
