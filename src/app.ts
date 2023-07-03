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

const scriptSelect = document.getElementById('script-select') as HTMLSelectElement;
const templateSelect = document.getElementById('template-select') as HTMLSelectElement;
const downloadButton = document.getElementById('download-btn') as HTMLButtonElement;
const resetButton = document.getElementById('reset-btn') as HTMLButtonElement;


templateSelect.disabled = true;
downloadButton.disabled = true;

setupScriptOptions();
onScriptChangeUpdateTemplates();

onTemplateSelectionFillInTemplate();

onDownloadCreateFileAndDownload();

onResetButtonResetScript();


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
        templateSelect.disabled = false;
        downloadButton.disabled = false;

        let contentDiv = document.getElementById("script-specific-html")!;

        let selectedScript = getSelectedScript();
        contentDiv.innerHTML = selectedScript.getHtmlCode();

        setupTemplateOptionsForSelectedScript(selectedScript);
    };
}

function setupTemplateOptionsForSelectedScript(selectedScript: Script<Template<HtmlCode>, HtmlCode>): void {
    clearInnerHtml();

    templateSelect.add(createDefaultOption('None'));

    selectedScript.templates.forEach((template, index) => {
        let option = document.createElement('option');
        option.value = index.toString();
        option.text = template.name;
        templateSelect.add(option);
    });
}

function clearInnerHtml() {
    templateSelect.innerHTML = '';
}

function onTemplateSelectionFillInTemplate(): void {
    templateSelect.onchange = (event) => {
        let selectedTemplate = getSelectedTemplate();
        selectedTemplate.fillInTemplate();
    };
}

function getSelectedTemplate(): Template<HtmlCode> {
    let selectedTemplateIndex = Number((document.getElementById('template-select') as HTMLSelectElement).value);
    let selectedScript = getSelectedScript();
    let selectedTemplate = selectedScript.templates[selectedTemplateIndex];
    return selectedTemplate;
}

function getSelectedScript(): Script<Template<HtmlCode>, HtmlCode> {
    let selectedScriptIndex = Number((document.getElementById('script-select') as HTMLSelectElement).value);
    let selectedScript = scripts[selectedScriptIndex];
    return selectedScript;
}

function onDownloadCreateFileAndDownload() {
    downloadButton.addEventListener('click', function () {
        var fileContent = getSelectedScript().generateBookmarkletSourceCode();
        var data = new Blob([fileContent], { type: 'text/plain' });
        var url = window.URL.createObjectURL(data);

        var link = document.createElement('a');
        link.download = 'file.txt';
        link.href = url;
        link.click();
    });
}

function onResetButtonResetScript() {
    resetButton.addEventListener('click', function () {
        scriptSelect.selectedIndex = -1
        scriptSelect.dispatchEvent(new Event('change'));
        templateSelect.selectedIndex = -1
        templateSelect.dispatchEvent(new Event('change'));
        clearInnerHtml();
    });
}