$(document).ready(function(){
	var editorout = CodeMirror.fromTextArea(document.getElementById("output"), {
					lineNumbers: true			
	});
	var editorin = CodeMirror.fromTextArea(document.getElementById("input"), {
					lineNumbers: true			
	});
	
	var languages = {
    'c': {
        value: '11',
        display: 'C',
        mode: 'text/x-csrc',
        sample:
            '#include <stdio.h>\n' +
            '\n' +
            'int main(int argc, char** argv) {\n' +
            '  printf("Hello world!\\n");\n' +
            '}\n'
    },
    'c++': {
        value: '1',
        display: 'C++',
        mode: 'text/x-c++src',
        sample:
            '#include <iostream>\n' +
            '\n' +
            'int main(int argc, char** argv) {\n' +
            '  std::cout << "Hello world!" << std::endl;\n' +
            '}\n'
    },
    'c++11': {
        value: '44',
        display: 'C++11',
        mode: 'text/x-c++src',
        sample:
            '#include <iostream>\n' +
            '\n' +
            'int main(int argc, char** argv) {\n' +
            '  std::cout << "Hello world!" << std::endl;\n' +
            '}\n'
    },
    'd': {
        value: '102',
        display: 'D',
        mode: ''
    },
    'haskell': {
        value: '21',
        display: 'Haskell',
        mode: 'text/x-haskell'
    },
    'lua': {
        value: '26',
        display: 'Lua',
        mode: 'text/x-lua'
    },
    'ocaml': {
       value: '8',
       display: 'OCaml',
       mode: ''
    },
    'php': {
        value: '29',
        display: 'PHP',
        mode: 'text/x-php'
    },
    'perl': {
        value: '3',
        display: 'Perl',
        mode: 'text/x-perl'
    },
    'perl6': {
        value: '54',
        display: 'Perl',
        mode: 'text/x-perl'
    },
    'plain': {
        value: '62',
        display: 'Plain Text',
        mode: ''
    },
    'python': {
        value: '4',
        display: 'Python',
        mode: 'text/x-python'
    },
    'python3': {
        value: '116',
        display: 'Python 3',
        mode: 'text/x-python'
    },
    'ruby': {
        value: '17',
        display: 'Ruby',
        mode: 'text/x-ruby'
    },
    'scheme': {
        value: '33',
        display: 'Scheme',
        mode: 'text/x-scheme'
    },
    'tcl': {
        value: '38',
        display: 'Tcl',
        mode: ''
    },
    'java' : {
        value: '10',
        display: 'Java',
        mode: 'text/x-java',
        sample:
             'class Main {\n' +
             '  public static void main (String[] args) throws java.lang.Exception {\n' +
             '    System.out.println("Hello world!");\n' +
             '  }\n' +
             '}\n'
    },
    'js' : {
        value: '112',
        display: 'Javascript',
        mode: 'text/javascript'
    },
    'scilab':{
		value: '',
        display: 'Scilab',
        mode: 'text/clike'
	},
};

var language_order = [
  'scilab',
  'c',
  'c++',
  'c++11',
  'd',
  'haskell',
  'lua',
  'ocaml',
  'php',
  'perl',
  'perl6',
  'plain',
  'python',
  'python3',
  'ruby',
  'scheme',
  'tcl',
  'java',
  'js',
];
function onload(){
		tmp = document.createElement('div'),
		tmp.innerHTML = request.responseText;
		console.log(request.responseText);
		var linkEl = tmp.querySelector("#link_presentation");
		checkStatus(linkEl);
}
function checkStatus(linkEl){
	if(linkEl)  {
		link = linkEl.value;
		result = "Error Occured";
		var id = link.split('/').pop();
		var r = new XMLHttpRequest();
		var result_code;
		var json;
		var retries = 20;
		while (retries >= 0) {
			r.open("POST",
				   "http://ideone.com/ideone/Index/view/id/"
									   + id + "/ajax/1/lp/1",
				   false);
			r.send();
			json = JSON.parse(r.responseText);
			if (json.status !== "0") {
				retries--;
				continue;
			}

			var inouterr = document.createElement('div');
			inouterr.innerHTML = json.inouterr;
			var outputEl = inouterr.querySelector('pre');
			if (outputEl) {
				result = outputEl.innerHTML;
			}
			break;
		}
	}
	$("#run-code").html("Run");
	$("#code-out").html("<h3>Output</h3><hr/>Link: <a href=\""+link+"\">"+link+"</a><br/>");
	editorout.setValue(result);
	
	}
var all_languages_option = "<select name=\"lang\" id=\"lang\">";
for(i=0;i<language_order.length;i++){
	all_languages_option+="<option value=\""+language_order[i]+"\">"+language_order[i]+"</option>";
}
all_languages_option+="</select>";
$("#languages").html(all_languages_option);
$("#run-code").click(function(){
	var lang = $("#lang").val();
	if (lang=="scilab"){
		//alert(editorin.getValue())
		$("#run-code").html("<img src=\"images/spinner.gif\">Running....");
		$.ajax({
			type: "POST",
			url: "http://scilab-test.garudaindia.in/cloud/scilab_evaluate",
			data: { scilab_code: editorin.getValue(),graphicsmode:1,external_user:'guest' },
                        
			}).done(function( msg ) {
				$("#run-code").html("Run")
				editorout.setValue(msg["output"]);
				if (msg["graph"]!="")
				{
					//alert("graph");
					content = "<img src=\""+"http://scilab-test.garudaindia.in/cloud/graphs/3/"+"/"+msg["graph"]+".png"+"\">"
					$("#scilab-graph").html(content);
				}
				});
		}
	else{
		$("#run-code").html("<img src=\"images/spinner.gif\">Running....");
		request = new XMLHttpRequest();       
        request.onload = onload;       
        request.open("POST", "http://ideone.com/ideone/Index/submit/", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.send([
            'lang=' + encodeURIComponent(languages[$("#lang").val()].value),
            'run=1',
            'file=' + encodeURIComponent(editorin.getValue()),
        ].join('&'));
	}


});
});
