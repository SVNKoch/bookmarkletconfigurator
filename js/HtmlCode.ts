abstract class HtmlCode {
    abstract getHtmlCode(): string;
}

class CustomScriptHtml extends HtmlCode {
    getHtmlCode(): string {
        return "" // TODO: Add custom javascript input field (label: "Custom Javascript", minimum 20 lines vertically high, gets longer when more content is written inside)
    }

    fillIn(customCode: string): void {

    }
    
}

class JiraCopyHtml extends HtmlCode {
    getHtmlCode(): string {
        throw new Error("Method not implemented.");
    }

    getHtmlText(): string {
        return "" //TODO: retrive actual HtmlText string
    }

    getHtmlLink(): string {
        return "" //TODO: retrive actual HtmlLink string
    }

    getPlainText(): string {
        return "" //TODO: retrive actual PlainText string
    }

    setHtmlText(htmlText: string): void {
        //TODO: retrive actual HtmlText Input Fieldand set Text
    }
    
    setHtmlLink(htmlLink: string): void {
        //TODO: retrive actual HtmlLink Input Fieldand set Text
    }
    
    setPlainText(plainText: string): void {
        //TODO: retrive actual PlainText Input Fieldand set Text
    }
    
}