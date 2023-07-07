"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_js_1 = require("./base.js");
var greeting = replacePlaceholder("Hello ${name}!");
var final = "Result: \"" + greeting + "\"";
function replacePlaceholder(input) {
    var placeholders = [
        new base_js_1.Placeholder('name', 'name of friend', getName)
    ];
    var usedPlaceholders = new Set();
    var result = input.replace('"', '\\"');
    placeholders.forEach(function (placeholder) {
        var replaced = result.replace(placeholder.variable, "\" + ".concat(placeholder.valueGetter.name, "() + \""));
        if (result !== replaced) {
            usedPlaceholders.add(placeholder);
        }
        result = replaced;
    });
    return result;
}
function getName() {
    return "Paul";
}
