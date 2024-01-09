import {renderHook} from "@testing-library/react";
import useSortField from "@/hooks/useSortField";
import {expect, test} from "@jest/globals";

type Item = {
    id: number
    name: string
    age: number
}

const initialArray: Item[] = [
    {id: 1, name: 'John', age: 25},
    {id: 2, name: 'Alice', age: 30},
    {id: 3, name: 'Bob', age: 22},
];

test('should sort array of objects by specified field in ascending order', () => {
    const {result} = renderHook(() => useSortField<Item>());

    const sortedArray = result.current(initialArray, 'name');

    expect(sortedArray).toEqual([
        {id: 2, name: 'Alice', age: 30},
        {id: 3, name: 'Bob', age: 22},
        {id: 1, name: 'John', age: 25},
    ]);
});

test('should sort array of objects by specified field in descending order', () => {
    const {result} = renderHook(() => useSortField<Item>());

    const sortedArray = result.current(initialArray, 'name', true);

    expect(sortedArray).toEqual([
        {id: 1, name: 'John', age: 25},
        {id: 3, name: 'Bob', age: 22},
        {id: 2, name: 'Alice', age: 30},
    ]);
});
