import {useCallback} from "react";

export type SortableFieldType = string | number | boolean;

function useSortField<T>() {
    return useCallback(
        (arr: T[], field?: keyof T, reverse: boolean = false) => {
            if (!field)
                return arr
            return arr.slice().sort((a, b) => {
                const valueA = a[field];
                const valueB = b[field];

                if (typeof valueA === "string" && typeof valueB === "string") {
                    return reverse
                        ? valueB.localeCompare(valueA)
                        : valueA.localeCompare(valueB);
                }

                return reverse
                    ? valueB > valueA
                        ? 1
                        : valueB < valueA
                            ? -1
                            : 0
                    : valueA > valueB
                        ? 1
                        : valueA < valueB
                            ? -1
                            : 0;
            });
        },
        []
    );
}

export default useSortField;
