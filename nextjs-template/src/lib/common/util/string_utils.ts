export namespace StringUtils {
    export function nvl(src: any): string {
        if (src === undefined || src === null || src === '') {
            return ''
        }
        return src
    }
}