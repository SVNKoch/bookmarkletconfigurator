document.getElementById('content-tab').addEventListener('click', function() {
    document.getElementById('content').style.display = 'block';
    document.getElementById('icon').style.display = 'none';
    document.getElementById('content-tab').classList.add('active');
    document.getElementById('icon-tab').classList.remove('active');
});

document.getElementById('icon-tab').addEventListener('click', function() {
    document.getElementById('content').style.display = 'none';
    document.getElementById('icon').style.display = 'block';
    document.getElementById('icon-tab').classList.add('active');
    document.getElementById('content-tab').classList.remove('active');
});

document.getElementById('script-select').addEventListener('change', function() {
    var script = document.getElementById('script-select').value;
    if (script === 'jira-copy') {
        document.getElementById('jira-copy').style.display = 'block';
        document.getElementById('custom-script').style.display = 'none';
    } else if (script === 'custom') {
        document.getElementById('jira-copy').style.display = 'none';
        document.getElementById('custom-script').style.display = 'block';
    }
});

document.getElementById('download-btn').addEventListener('click', function() {
    var htmlText = document.getElementById('html-text').value;
    var htmlLink = document.getElementById('html-link').value;
    var plainText = document.getElementById('plain-text').value;

    var data = new Blob([htmlText + '\n' + htmlLink + '\n' + plainText], { type: 'text/plain' });
    var url = window.URL.createObjectURL(data);

    var link = document.createElement('a');
    link.download = 'file.txt';
    link.href = url;
    link.click();
});
