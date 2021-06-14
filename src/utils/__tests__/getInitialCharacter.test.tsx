import { getInitialCharacter } from "utils/getInitialCharacter"

test('should display initial username character in cap letter - PASS', () => {
    const user = {
        email: "test@gmail.com",
        username: "test",
    }
    const result = getInitialCharacter(user)

    expect(result).toEqual("T")
})

test('should display initial username character in cap letter - FAIL', () => {
    const user = {
        email: "test@gmail.com",
        username: "test",
    }
    const result = getInitialCharacter(user)

    expect(result).not.toEqual("t")
})

test('should display initial email character in cap letter - PASS', () => {
    const user = {
        email: "test@gmail.com",
        username: "",
    }
    const result = getInitialCharacter(user)

    expect(result).toEqual("T")
})