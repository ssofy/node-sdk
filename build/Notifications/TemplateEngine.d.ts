export declare abstract class TemplateEngine {
    abstract render(template: string, data: any): Promise<string>;
}
