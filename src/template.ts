import { HtmlCode, CustomScriptHtml, JiraCopyHtml } from './htmlCode';

export abstract class Template<H extends HtmlCode> {
    abstract name: string;

    protected htmlCode: H;

    constructor(htmlCode: H) {
        this.htmlCode = htmlCode;
    }

    abstract fillInTemplate(): void;
}

export class CustomScriptTemplate extends Template<CustomScriptHtml> {
    name = "Base Template for Bookmarklet";

    fillInTemplate(): void {
        this.htmlCode.setJavascriptInputFieldText(`javascript:(function(s){
	
})();`);
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