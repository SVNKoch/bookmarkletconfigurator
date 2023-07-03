document.getElementById('content-tab')!.addEventListener('click', function () {
    document.getElementById('content')!.style.display = 'block';
    document.getElementById('icon')!.style.display = 'none';
    document.getElementById('content-tab')!.classList.add('active');
    document.getElementById('icon-tab')!.classList.remove('active');
});

document.getElementById('icon-tab')!.addEventListener('click', function () {
    document.getElementById('content')!.style.display = 'none';
    document.getElementById('icon')!.style.display = 'block';
    document.getElementById('icon-tab')!.classList.add('active');
    document.getElementById('content-tab')!.classList.remove('active');
});


import { Script, HtmlCode, Template } from './base.js';
import { CustomScript } from './bookmarkletConfiguration/custom.js';
import { JiraCopyScript } from './bookmarkletConfiguration/jira.js';

const scripts: Script<Template<HtmlCode>, HtmlCode>[] = [new CustomScript(), new JiraCopyScript()];

const templateSelect = document.getElementById('template-select') as HTMLSelectElement;
const scriptSelect: HTMLSelectElement = document.getElementById('script-select') as HTMLSelectElement;

setupScriptOptions();
onScriptChangeUpdateTemplates();

onTemplateSelectionFillInTemplate();


document.getElementById('download-btn')!.addEventListener('click', function () {
    var data = new Blob(["placeholder text"], { type: 'text/plain' }); //TODO: generate download file content
    var url = window.URL.createObjectURL(data);

    var link = document.createElement('a');
    link.download = 'file.txt';
    link.href = url;
    link.click();
});

function setupScriptOptions(): void {
    scriptSelect.add(createDefaultOption('Please select one', true));

    scripts.forEach((script, index) => {
        let option = document.createElement('option');
        option.value = index.toString();
        option.text = script.name;
        scriptSelect.add(option);
    });
}

function createDefaultOption(title: string, disabled: boolean = false) {
    let option = document.createElement('option');
    option.value = '-1';
    option.text = title;
    option.disabled = disabled;
    option.selected = true;
    return option;
}

function onScriptChangeUpdateTemplates(): void {
    scriptSelect.onchange = (event) => {
        let contentDiv = document.getElementById("script-specific-html")!;

        let selectedScript = scripts[Number((event.target as HTMLSelectElement).value)];
        contentDiv.innerHTML = selectedScript.getHtmlCode();

        setupTemplateOptionsForSelectedScript(selectedScript);
    };
}

function setupTemplateOptionsForSelectedScript(selectedScript: Script<Template<HtmlCode>, HtmlCode>): void {
    templateSelect.innerHTML = '';

    templateSelect.add(createDefaultOption('None'));

    selectedScript.templates.forEach((template, index) => {
        let option = document.createElement('option');
        option.value = index.toString();
        option.text = template.name;
        templateSelect.add(option);
    });
}

function onTemplateSelectionFillInTemplate(): void {
    templateSelect.onchange = (event) => {
        let selectedScriptIndex = Number((document.getElementById('script-select') as HTMLSelectElement).value);
        let selectedScript = scripts[selectedScriptIndex];
        let selectedTemplate = selectedScript.templates[Number((event.target as HTMLSelectElement).value)];
        selectedTemplate.fillInTemplate();
    };
}

