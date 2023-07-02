export abstract class HtmlCode {
    abstract getHtmlCode(): string;

    injectHtml(targetElementId: string): void {
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
            targetElement.innerHTML = this.getHtmlCode();
        }
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

export class JiraCopyHtml extends HtmlCode {
    private htmlTextId = 'html-text';
    private htmlLinkId = 'html-link';
    private plainTextId = 'plain-text';

    getHtmlCode(): string {
        return `
            <div class="input-group">
                <label for="${this.htmlTextId}">HTML Text:</label>
                <input type="text" id="${this.htmlTextId}">
            </div>
            <div class="input-group">
                <label for="${this.plainTextId}">Plain Text:</label>
                <input type="text" id="${this.plainTextId}">
            </div>
            <div class="input-group">
                <label for="${this.htmlLinkId}">HTML Link:</label>
                <input type="text" id="${this.htmlLinkId}">
            </div>
        `;
    }

    private getHtmlTextInputField(): HTMLInputElement {
        return document.getElementById(this.htmlTextId) as HTMLInputElement;
    }

    private getHtmlLinkInputField(): HTMLInputElement {
        return document.getElementById(this.htmlLinkId) as HTMLInputElement;
    }

    private getPlainTextInputField(): HTMLInputElement {
        return document.getElementById(this.plainTextId) as HTMLInputElement;
    }

    getHtmlText(): string {
        const htmlTextInputField = this.getHtmlTextInputField();
        return htmlTextInputField?.value || '';
    }

    getHtmlLink(): string {
        const htmlLinkInputField = this.getHtmlLinkInputField();
        return htmlLinkInputField?.value || '';
    }

    getPlainText(): string {
        const plainTextInputField = this.getPlainTextInputField();
        return plainTextInputField?.value || '';
    }

    setHtmlText(htmlText: string): void {
        const htmlTextInputField = this.getHtmlTextInputField();
        htmlTextInputField.value = htmlText;
    }

    setHtmlLink(htmlLink: string): void {
        const htmlLinkInputField = this.getHtmlLinkInputField();
        htmlLinkInputField.value = htmlLink;
    }

    setPlainText(plainText: string): void {
        const plainTextInputField = this.getPlainTextInputField();
        plainTextInputField.value = plainText;
    }
}