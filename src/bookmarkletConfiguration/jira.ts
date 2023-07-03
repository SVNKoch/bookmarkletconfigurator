import { Script, Template, HtmlCode } from '../base.js';

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

export abstract class JiraCopyTemplate extends Template<JiraCopyHtml> {
    fillInJiraCopyTemplate(htmlText: string, htmlLink: string, plainText: string): void {
        this.htmlCode.setHtmlText(htmlText);
        this.htmlCode.setHtmlLink(htmlLink);
        this.htmlCode.setPlainText(plainText);
    }
}

export class JiraKeySummaryTemplate extends JiraCopyTemplate {
    name = "Key - Summary";

    fillInTemplate(): void {
        var htmlText = "${issueKey} - ${summary}";
        var htmlLink = "${issueUrl}";
        var plainText = htmlText;
        this.fillInJiraCopyTemplate(htmlText, htmlLink, plainText);
    }
}

export class JiraKeyTemplate extends JiraCopyTemplate {
    name = "Key";

    fillInTemplate(): void {
        var htmlText = "${issueKey}";
        var htmlLink = "${issueUrl}";
        var plainText = htmlText;
        this.fillInJiraCopyTemplate(htmlText, htmlLink, plainText);
    }
}

export class JiraComponentsSummaryTemplate extends JiraCopyTemplate {
    name = "Components: Summary";

    fillInTemplate(): void {
        var htmlText = "${issueComponents}: ${summary}";
        var htmlLink = "${issueUrl}";
        var plainText = htmlText;
        this.fillInJiraCopyTemplate(htmlText, htmlLink, plainText);
    }
}