export function getTimeTransformer() {
    return {
        from(value: string): string {
            const s = value.split('.')[0]
            return s
        },
        to(value: string): string {
            return value
        }
    }
}
