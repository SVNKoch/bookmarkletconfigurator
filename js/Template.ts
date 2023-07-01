abstract class Template<H extends HtmlCode> {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract fillInTemplate(): void;
}

class CustomScriptTemplate extends Template<CustomScriptHtml> {
    fillInTemplate(): void {
        const node = "..."; //TODO: Retrive custom code from html element
        // node.settext = ...
    }

    private fillInCustomTemplate(customCode: string): string {
        //TODO: Turn costum script into real script
        return customCode;
    }
}

abstract class JiraCopyTemplates extends Template<JiraCopyHtml> {
    fillInTemplate(): void {
        var a, b, c = ""
        this.fillInJiraCopyTemplate(a,b,c);
    }

    abstract fillInJiraCopyTemplate(a: string, b: string, c: string): void;
    
}