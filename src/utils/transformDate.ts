export function getTimeTransformer() {
    return {
        from(value: string): string {
            const s = !!value ? value.split('.')[0] : value
            return s
        },
        to(value: string): string {
            return value
        }
    }
}
