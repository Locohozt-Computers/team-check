import { getRole } from "../getRole"

describe("helper functions - GET ROLES", () => {
    test("array of string", () => {
        const role = getRole(["a"])

        expect(role).toBe(-1)
    })
    test("array of number", () => {
        const role = getRole(["2"])

        expect(role).toBe(2)
    })
    test("array greater than 1", () => {
        const role = getRole(["2", "3"])

        expect(role).toBe(-1)
    })
    test("is not an array", () => {
        const role = getRole("a")

        expect(role).toBe(-1)
    })
    test("is not an array and it is a number or when parse to int is a number", () => {
        const role = getRole("2")

        expect(role).toBe(2)
    })
})