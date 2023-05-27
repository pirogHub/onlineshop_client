export const getStoreLocal = (name: string) => {
    if (typeof localStorage !== "undefined") {
        const ls = localStorage.getItem(name)

        if (ls) {
            try {
                const parsed = JSON.parse(ls)
                return parsed
            } catch (error) { }
        }
        return null
    }

    return null
}