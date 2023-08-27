import { TemplateEngine } from "./TemplateEngine";
export declare class HandlebarsEngine implements TemplateEngine {
    render(template: string, data: any): Promise<string>;
}
