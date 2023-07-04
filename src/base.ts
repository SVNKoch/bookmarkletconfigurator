export abstract class Script<T extends Template<H>, H extends HtmlCode> {
    abstract name: string;
    templates: T[];
    htmlCode: H;
    placeholders: Placeholder[];

    constructor(templates: T[], htmlCode: H, placeholders: Placeholder[] = []) {
        this.templates = templates;
        this.htmlCode = htmlCode;
        this.placeholders = placeholders;
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

export class Placeholder {
    name: string;
    variable: string;
    description: string;
    valueGetter: () => string;

    constructor(name: string, description: string, valueGetter: () => string) {
        this.name = name;
        this.variable = `\$\{${this.name}\}`;
        this.description = description;
        this.valueGetter = valueGetter;
    }
}

export class PlaceholderReplacer {
    placeholders: Placeholder[];
    usedPlaceholders: Set<Placeholder> = new Set();

    constructor(placeholders: Placeholder[]) {
        this.placeholders = placeholders;
    }

    replacePlaceholder(input: string): string {
        let result = input.replace('"', '\\"');
        this.placeholders.forEach(placeholder => {
            const replaced = result.replace(placeholder.variable, `\" + ${placeholder.valueGetter.name}() + \"`);
            if (result !== replaced) {
                this.usedPlaceholders.add(placeholder);
            }
            result = replaced;
        });
        return result;
    }

    getUsedPlaceholderFunctions(): string {
        return Array.from(this.usedPlaceholders).map(placeholder => `${placeholder.valueGetter.toString()}`).join("\n");
    }
}