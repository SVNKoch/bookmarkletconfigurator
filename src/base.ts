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

export abstract class HtmlCode {
    abstract getHtmlCode(): string;

    injectHtml(targetElementId: string): void {
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
            targetElement.innerHTML = this.getHtmlCode();
        }
    }
}

export abstract class Template<H extends HtmlCode> {
    abstract name: string;

    protected htmlCode: H;

    constructor(htmlCode: H) {
        this.htmlCode = htmlCode;
    }

    abstract fillInTemplate(): void;
}

