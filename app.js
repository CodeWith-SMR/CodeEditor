function getUserCode() {
    return htmlEditor.getValue() + "\n" + "<style>" + "\n" + cssEditor.getValue() + "\n" + "</style>" + "\n" +  "<script>" + "\n" + jsEditor.getValue() + "\n" + "</script>";
}
function update() {
    var code = document.getElementById('iframe').contentWindow.document;
    code.open();
    code.write(getUserCode());
    code.close();
}
function loadHTMLEditor() {
    defaultHTMLValue = "<!DOCTYPE html>\n\n<html>\n\n    <!-- Your HTML code goes right here -->\n\n</html>"
    window.htmlEditor = ace.edit("htmlEditor");
    htmlEditor.setTheme("ace/theme/dracula");
    htmlEditor.getSession().setMode("ace/mode/html");
    htmlEditor.setValue(defaultHTMLValue,1); 
    htmlEditor.getSession().on('change', function() {
        update();
    });

    htmlEditor.focus();
    
    htmlEditor.setOptions({
        fontSize: "12.5pt",
        showLineNumbers: true,
        vScrollBarAlwaysVisible:false,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });

    htmlEditor.setShowPrintMargin(false);
}
function loadCSSEditor() {
    defaultCSSValue = "/*        Your CSS Code Goes Here           */"
    window.cssEditor = ace.edit("cssEditor");
    cssEditor.resize();
    cssEditor.renderer.updateFull();
    cssEditor.setTheme("ace/theme/dracula");
    cssEditor.getSession().setMode("ace/mode/css");
    cssEditor.setValue(defaultCSSValue,1); 
    cssEditor.getSession().on('change', function() {
        update();
    });
    cssEditor.focus();

    cssEditor.setOptions({
        fontSize: "12.5pt",
        showLineNumbers: true,
        vScrollBarAlwaysVisible:true,
        
    });

    cssEditor.setShowPrintMargin(false);
}
function loadJSEditor() {
    defaultJSValue = "/*     Your JAVASCRIPT Code Goes Here       */"
    window.jsEditor = ace.edit("jsEditor");
    jsEditor.setTheme("ace/theme/dracula");
    jsEditor.getSession().setMode("ace/mode/javascript");
    jsEditor.setValue(defaultJSValue,1);
    jsEditor.getSession().on('change', function() {
        update();
    });
    jsEditor.focus();
    
    jsEditor.setOptions({
        fontSize: "12.5pt",
        showLineNumbers: true,
        vScrollBarAlwaysVisible:true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });

    jsEditor.setShowPrintMargin(false);
}
function setupEditor() {
    loadHTMLEditor();
    loadCSSEditor();
    loadJSEditor();
}
function ready() {
    setupEditor();
}

function maximizeIFrame() {
    let iframe = document.getElementById("iframe");
    iframe.style.height = "98%";
    iframe.style.width = "100%";
    let htmlEditor = document.getElementById("htmlEditor");
    htmlEditor.style.height = "0%";
    htmlEditor.style.width = "0%";
    let cssEditor = document.getElementById("cssEditor");
    cssEditor.style.height = "0%";
    cssEditor.style.width = "0%";
    let jsEditor = document.getElementById("jsEditor");
    jsEditor.style.height = "0%";
    jsEditor.style.width = "0%";
    let allEditors = document.getElementById("editors");
    allEditors.style.height = "5%";
    allEditors.style.width = "100%";
}
function minimizeIframe() {
    let editors = document.getElementById("editors");
    editors.style.height = "50%";
    editors.style.width = "100%";
    let htmlEditor = document.getElementById("htmlEditor");
    htmlEditor.style.height = "90%";
    htmlEditor.style.width = "32%";
    let cssEditor = document.getElementById("cssEditor");
    cssEditor.style.height = "90%";
    cssEditor.style.width = "32%";
    let jsEditor = document.getElementById("jsEditor");
    jsEditor.style.height = "90%";
    jsEditor.style.width = "32%";
    var iframe = document.getElementById("iframe");
    iframe.style.height = "50%";
    iframe.style.width = "100%";
}

function downloadCode() {
     const userCode = getUserCode();
     const blob = new Blob([userCode], {type: "text/html"});
     downloadFile(blob,"index.html");
}
function downloadFile(blob,fileName) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    //remove anchor tag
    a.remove();

    document.addEventListener("focus",w=>{window.URL.revokeObjectURL(url)})
}
