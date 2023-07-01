abstract class Script<T extends Template<H>, H extends HtmlCode> {
    name: string;
    templates: T[];
    html: H;

    constructor(name: string, templates: T[], html: H) {
        this.name = name;
        this.templates = templates;
        this.html = html;
    }

    abstract generateCode(): string;

    abstract getHtml(): string;
}

class CustomScript extends Script<CustomScriptTemplate, CustomScriptHtml> {
    constructor(){
        super("Custom Bookmarklet Javascript", [new CustomScriptTemplate("Base Template for Bookmarklet")], new CustomScriptHtml());
    }

    generateCode(): string {
        const customCode = ""; //TODO: Retrive custom code from html element
        return this.generateCustomScriptCode(customCode);
    }

    private generateCustomScriptCode(customCode: string): string {
        //TODO: Turn costum script into real script
        return customCode;
    }

    getHtml(): string {
        // TODO: Add custom javascript input field 
        return "<div>CustomScript HTML</div>";
    }
}


class JiraCopyScript extends Script<TemplateB> {
    generateCode(a: string, b: string, c: string): string {
        // Generate code logic specific to JiraCopyScript
        return `${a} ${b} ${c}`;
    }

    getHtml(): string {
        // Generate HTML logic specific to JiraCopyScript
        return "<div>JiraCopyScript HTML</div>";
    }
}


new CustomScript();
