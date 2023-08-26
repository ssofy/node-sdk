import {TemplateEngine} from "./TemplateEngine";
import Handlebars from "handlebars";

export class HandlebarsEngine implements TemplateEngine {
    async render(template: string, data: any): Promise<string> {
        return Handlebars.compile(template)(data);
    }
}
