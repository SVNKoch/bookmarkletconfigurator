export class SourceCodeGenerator {
    constructor(sourceCode: string) {

    }

}



var txtType = "text/plain";
var txtBlob = new Blob([plainText], {
    type: txtType
});


var htmlTextWithLink = `<a href=%27${htmlLink}%27>${htmlText}</a>`;
var htmlType = "text/html";
var htmlBlob = new Blob([htmlTextWithLink], {
    type: htmlType
});


var data = new ClipboardItem({
    [txtType]: txtBlob,
    [htmlType]: htmlBlob
});
navigator.clipboard.write([data]);