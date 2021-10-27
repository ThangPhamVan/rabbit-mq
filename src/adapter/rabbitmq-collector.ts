export class RabbitmqCollector {
    name: string;
    callback: Function;
}

export interface HashTable<T> {
    [key: string]: T;
}
