import {expect, test} from "@jest/globals";
import color from "../../utils/color";

test('should convert short hex to rgba', () => {
    const rgba = color.convertHexToRGBA('#fff', 0.5)

    expect(rgba).toBe('rgba(255,255,255,0.5)')
})

test('should convert hex to rgba', () => {
    const rgba = color.convertHexToRGBA('#ffffff', 0.5)

    expect(rgba).toBe('rgba(255,255,255,0.5)')
})

test('should throw error', () => {
    expect(() => color.convertHexToRGBA('#asdc', 0.5)).toThrowError('Incorrect hex value');
    expect(() => color.convertHexToRGBA('#fff', -1)).toThrowError('Incorrect opacity value');
    expect(() => color.convertHexToRGBA('#fff', 101)).toThrowError('Incorrect opacity value');
})

