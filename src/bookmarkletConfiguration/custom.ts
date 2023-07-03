import { Script, Template, HtmlCode } from '../base.js';

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

export class CustomScriptHtml extends HtmlCode {
    private textareaId = 'custom-javascript';

    getHtmlCode(): string {
        return `
            <div class="input-group">
                <label for="${this.textareaId}">Javascript Code:</label>
                <textarea id="${this.textareaId}"></textarea>
            </div>
        `;
    }

    private getJavascriptInputField(): HTMLTextAreaElement {
        return document.getElementById(this.textareaId) as HTMLTextAreaElement;
    }

    getJavascriptInputFieldText(): string {
        const textareaElement = this.getJavascriptInputField();
        return textareaElement?.value || '';
    }

    setJavascriptInputFieldText(javascript: string): void {
        const textareaElement = this.getJavascriptInputField();
        textareaElement.value = javascript;
    }
}

export class CustomScriptTemplate extends Template<CustomScriptHtml> {
    name = "Base Template for Bookmarklet";

    fillInTemplate(): void {
        this.htmlCode.setJavascriptInputFieldText(`javascript:(function(s){
	
})();`);
    }
}
