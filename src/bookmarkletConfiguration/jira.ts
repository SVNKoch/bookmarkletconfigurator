import { Script, Template, HtmlCode, Placeholder, PlaceholderReplacer } from '../base.js';

const IssueKeyPlaceholder = new Placeholder('id', 'Replaced with Jira ID', getIssueId);
const SummaryPlaceholder = new Placeholder('summary', 'Replaced with Jira ID', getIssueSummary);
const IssueUrlPlaceholder = new Placeholder('issueUrl', 'Replaced with Jira ID', getIssueUrl);
const IssueComponentsPlaceholder = new Placeholder('components', 'issueComponentaced with Jira ID', getIssueComponents);

const placeholders: Placeholder[] = [
    IssueKeyPlaceholder, SummaryPlaceholder, IssueUrlPlaceholder, IssueComponentsPlaceholder
];

export class JiraCopyScript extends Script<JiraCopyTemplate, JiraCopyHtml> {
    name = "Copy Jira URL";

    constructor() {
        const htmlCode = new JiraCopyHtml();
        super([new JiraKeyTemplate(htmlCode), new JiraKeySummaryTemplate(htmlCode), new JiraComponentsSummaryTemplate(htmlCode)], htmlCode, placeholders);
    }

    generateBookmarkletSourceCode(): string {
        const replacer = new PlaceholderReplacer(this.placeholders);

        let htmlText = replacer.replacePlaceholder(this.htmlCode.getHtmlText());
        let htmlLink = replacer.replacePlaceholder(this.htmlCode.getHtmlLink());
        let plainText = replacer.replacePlaceholder(this.htmlCode.getPlainText());

        let functions = replacer.getUsedPlaceholderFunctions();

        new SourceCodeGenerator()
            .clipBoardData(`"${plainText}"`, `"${htmlText}"`, `"${htmlLink}"`)
            .extraFunctions(functions)
            .generate();
        return "" +
            "HtmlText: \"" + htmlText + "\"" + "\n" +
            "PlainText: \"" + plainText + "\"" + "\n" +
            "HtmlLink: \"" + htmlLink + "\"" + "\n" +
            functions;
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

        var htmlText = `${IssueKeyPlaceholder.variable} - ${SummaryPlaceholder.variable}`;
        var htmlLink = `${IssueUrlPlaceholder.variable}`;
        var plainText = htmlText;
        this.fillInJiraCopyTemplate(htmlText, htmlLink, plainText);
    }
}

export class JiraKeyTemplate extends JiraCopyTemplate {
    name = "Key";

    fillInTemplate(): void {
        var htmlText = `${IssueKeyPlaceholder.variable}`;
        var htmlLink = `${IssueUrlPlaceholder.variable}`;
        var plainText = htmlText;
        this.fillInJiraCopyTemplate(htmlText, htmlLink, plainText);
    }
}

export class JiraComponentsSummaryTemplate extends JiraCopyTemplate {
    name = "Components: Summary";

    fillInTemplate(): void {
        var htmlText = `${IssueComponentsPlaceholder.variable}: ${SummaryPlaceholder.variable}`;
        var htmlLink = `${IssueUrlPlaceholder.variable}`;
        var plainText = htmlText;
        this.fillInJiraCopyTemplate(htmlText, htmlLink, plainText);
    }
}

function getIssueId(): string {
    return "id"; //TODO: actual implementation
}

function getIssueSummary(): string {
    return "summary"; //TODO: actual implementation
}

function getIssueUrl(): string {
    return "url"; //TODO: actual implementation
}

function getIssueComponents(): string {
    return "components"; //TODO: actual implementation
}
