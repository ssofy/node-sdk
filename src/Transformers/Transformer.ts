export interface Transformer {
    transform(data: any): Promise<any>;
}
