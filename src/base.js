"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceholderReplacer = exports.Placeholder = exports.Template = exports.HtmlCode = exports.Script = void 0;
var Script = /** @class */ (function () {
    function Script(templates, htmlCode, placeholders) {
        if (placeholders === void 0) { placeholders = []; }
        this.templates = templates;
        this.htmlCode = htmlCode;
        this.placeholders = placeholders;
    }
    Script.prototype.getHtmlCode = function () {
        return this.htmlCode.getHtmlCode();
    };
    ;
    return Script;
}());
exports.Script = Script;
var HtmlCode = /** @class */ (function () {
    function HtmlCode() {
    }
    HtmlCode.prototype.injectHtml = function (targetElementId) {
        var targetElement = document.getElementById(targetElementId);
        if (targetElement) {
            targetElement.innerHTML = this.getHtmlCode();
        }
    };
    return HtmlCode;
}());
exports.HtmlCode = HtmlCode;
var Template = /** @class */ (function () {
    function Template(htmlCode) {
        this.htmlCode = htmlCode;
    }
    return Template;
}());
exports.Template = Template;
var Placeholder = /** @class */ (function () {
    function Placeholder(name, description, valueGetter) {
        this.name = name;
        this.variable = "${".concat(this.name, "}");
        this.description = description;
        this.valueGetter = valueGetter;
    }
    return Placeholder;
}());
exports.Placeholder = Placeholder;
var PlaceholderReplacer = /** @class */ (function () {
    function PlaceholderReplacer(placeholders) {
        this.usedPlaceholders = new Set();
        this.placeholders = placeholders;
    }
    PlaceholderReplacer.prototype.replacePlaceholder = function (input) {
        var _this = this;
        var result = input.replace('"', '\\"');
        this.placeholders.forEach(function (placeholder) {
            var replaced = result.replace(placeholder.variable, "\" + ".concat(placeholder.valueGetter.name, "() + \""));
            if (result !== replaced) {
                _this.usedPlaceholders.add(placeholder);
            }
            result = replaced;
        });
        return result;
    };
    PlaceholderReplacer.prototype.getUsedPlaceholderFunctions = function () {
        return Array.from(this.usedPlaceholders).map(function (placeholder) { return "".concat(placeholder.valueGetter.toString()); }).join("\n");
    };
    return PlaceholderReplacer;
}());
exports.PlaceholderReplacer = PlaceholderReplacer;
