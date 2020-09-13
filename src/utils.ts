export const uniqueId = function (): number {
    return Number(new Date().toString().replace(/[^0-9]/g,'') + Math.round(Math.random() * 1000000000))
}

export const uniqueName = function(): string {
    return (uniqueId() + 
    String(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
    .charAt(Math.floor(Math.random() * 61))));
}