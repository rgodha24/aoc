declare module "dict" {
    export default function dict<T> (): {
        get(key: string): T | undefined
        set(key: string, value: T): void
        has(key:string): boolean; 
        delete(key:string): void;
        clear(): void;
        size(): number;
    }
}