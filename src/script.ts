import { HtmlCode, CustomScriptHtml, JiraCopyHtml } from './htmlCode.js';
import { Template, CustomScriptTemplate, JiraCopyTemplate, JiraKeyTemplate, JiraKeySummaryTemplate, JiraComponentsSummaryTemplate } from './template.js';

export abstract class Script<T extends Template<H>, H extends HtmlCode> {
    abstract name: string;
    templates: T[];
    htmlCode: H;

    constructor(templates: T[], htmlCode: H) {
        this.templates = templates;
        this.htmlCode = htmlCode;
    }

    getHtmlCode(): string {
        return this.htmlCode.getHtmlCode();
    };

    abstract generateBookmarkletSourceCode(): string;
}

export class CustomScript extends Script<CustomScriptTemplate, CustomScriptHtml> {
    name = "Custom Bookmarklet Javascript";

    constructor() {
        const htmlCode = new CustomScriptHtml();
        super([new CustomScriptTemplate(htmlCode)], htmlCode);
    }

    generateBookmarkletSourceCode(): string {
        return "javascript(" + this.htmlCode.getJavascriptInputFieldText() + ");";
    }
}

export class JiraCopyScript extends Script<JiraCopyTemplate, JiraCopyHtml> {
    name = "Copy Jira URL";

    constructor() {
        const htmlCode = new JiraCopyHtml();
        super([new JiraKeyTemplate(htmlCode), new JiraKeySummaryTemplate(htmlCode), new JiraComponentsSummaryTemplate(htmlCode)], htmlCode);
    }

    generateBookmarkletSourceCode(): string {
        return this.htmlCode.getHtmlText() + "\n" +
            this.htmlCode.getHtmlLink() + "\n" +
            this.htmlCode.getPlainText();
    }
}
