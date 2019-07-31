// ReturnType maps a function type to the type that function returns, or any if no return type can be inferred
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
// MockOf maps function types to a jest mock that wrap that function's return type, and non-function types to themself
type MockOf<T> = T extends Function ? jest.Mock<ReturnType<T>, any> : T;
// Turn all functions in a given type into mocks of those functions. Leave non-functions unnaffected
export type MockProxy<T> = { [TP in keyof T]: MockOf<T[TP]> };

export function MockProxy<T>(withBase: Partial<T> = {}): MockProxy<T>
{
    const handler = {
        // Angular uses '$quoted$' in the module compiler to find quoted properties
        // We don't need to worry about that here it just needs to be iterable
        get: (obj: any, prop: string) => prop === '$quoted$' ? [] : obj[prop] || (obj[prop] = jest.fn())
    };
    return new Proxy(withBase, handler);
}