import { Placeholder } from './base.js';

let greeting = replacePlaceholder("Hello ${name}!");
let final = "Result: \"" + greeting + "\""



function replacePlaceholder(input: string) {
    let result = input.replace('"', '\\"');
    placeholders.forEach(placeholder => {
        const replaced = result.replace(placeholder.variable, `\" + ${placeholder.valueGetter.name}() + \"`);
        if (result !== replaced) {
            usedPlaceholders.add(placeholder);
        }
        result = replaced;
    });
    return result;
}


new Placeholder('name', 'name of friend', getName)
function getName() {
    return "Paul";
}