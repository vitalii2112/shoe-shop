import {useMediaQuery} from "@/hooks/useMediaQuery";
import {expect, test, jest} from '@jest/globals';
import {act, renderHook} from "@testing-library/react";

test('should update matches state on media query change', () => {
    const matchMediaMock = jest.fn();
    window.matchMedia = matchMediaMock as any;

    const mediaQueryListMock = {
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
    };

    matchMediaMock.mockReturnValue(mediaQueryListMock);

    let result = {current: false};
    act(() => {
        result = renderHook(() => useMediaQuery('(min-width: 600px)')).result;
    });

    expect(result.current).toBe(false);

    act(() => {
        mediaQueryListMock.matches = true;
    });

    act(() => {
        result = renderHook(() => useMediaQuery('(min-width: 600px)')).result;
    });

    expect(result.current).toBe(true);
});
