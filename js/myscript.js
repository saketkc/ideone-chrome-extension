var inputdata;
var scilabeditor;
var normaleditor;
document.addEventListener('mouseup',function(event)
{
	var sel = window.getSelection().toString();
	if(sel.length)
		chrome.extension.sendRequest({'message':'setText','data': sel},function(response){})
})

$(document).ready(function(){
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
};

var language_order = [
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
		
    var imgUrl = chrome.extension.getURL("images/fancybox.png");
	$("#fancybox-loading div").css('background-image',imgUrl);
	$("#fancybox-left-ico").css('background-image',imgUrl);
	$("#fancybox-right-ico").css('background-image',imgUrl);
	$("#fancybox-bg-ne").css('background-image',imgUrl);
	$("#fancybox-bg-se").css('background-image',imgUrl);
	$("#fancybox-bg-sw").css('background-image',imgUrl);
	$("#fancybox-bg-nw").css('background-image',imgUrl);
	$("#fancybox-title-float-left").css("background", imgUrl+" -40px -90px no-repeat");
	$("#fancybox-title-float-right").css("background", imgUrl+" -55px -90px no-repeat");
	$("#fancybox-close").css("background", "transparent "+imgUrl+" -40px 0px");	
	imgUrl = chrome.extension.getURL("images/blank.gif");
	$("#fancybox-left").css("background","transparent "+imgUrl)

		var html;
	  if (document.documentElement) {
		html = $(document.documentElement); //just drop $ wrapper if no jQuery
	  } else if (document.getElementsByTagName('html') && document.getElementsByTagName('html')[0]) {
		html = $(document.getElementsByTagName('html')[0]);
	  } else if ($('html').length > -1) {//drop this branch if no jQuery
		html = $('html');
	  } else {
		alert('no html tag retrieved...!');
		throw 'no html tag retrieved son.';
	  }
  var content = "<a id=\"scilab-on-cloud-inline\" href=\"#scilab-on-cloud-data\" style=\"display:none;\">This shows content of element who has id=\"data\"</a><div><div id=\"scilab-on-cloud-data\"></div></div>";
  html.append(content);
  $("a#scilab-on-cloud-inline").fancybox({
		'hideOnContentClick': true,
		'hideOnOverlayClick' : false,
		'hideOnContentClick': false
	});

$("#scilab-run-code").live("click",function(){
	var imgUrl = chrome.extension.getURL("images/spinner.gif");
	$("#scilab-run-code").html("<img src=\""+imgUrl+"\"> Running.....");
	
	var scilabinput = scilabeditor.getValue();//$("#scilab-code").val();
	//alert(scilabinput);
	$.post(
      
      "http://scilab-test.garudaindia.in/cloud/scilab_evaluate",
      { scilab_code:scilabinput,graphicsmode:1,external_user:'guest' },
      
    function( msg ){
		
		$("#scilab-run-code").html("Run");
		//alert(JSON.parse(msg).output)
		//content = "<img src=\""+"http://scilab-test.garudaindia.in/cloud/graphs/3/"+"/"+msg["graph"]+".png"+"\">"
		
		var content = "<br/><hr/><h3>Results:<br/> </h3>"+ "<textarea id=\"code-output\">"+JSON.parse(msg).output+"</textarea>";
		if (JSON.parse(msg).graph!=""){
			content += "<img src=\""+"http://scilab-test.garudaindia.in/cloud/graphs/3/"+JSON.parse(msg).graph+".png"+"\">"
		}
		console.log(msg);
	    $("#scilab-output").html(content);
	    var editorout = CodeMirror.fromTextArea(document.getElementById("code-output"), {
					lineNumbers: true			
		});
		
	});
});
$("#run-code").live("click",function(){
	var imgUrl = chrome.extension.getURL("images/spinner.gif");
	$("#run-code").html("<img src=\""+imgUrl+"\"> Running.....");
	
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
	$("#run-code").html("Run");
	var content = "<br/><hr/><h3>Results:</h3><a href=\""+link+"\">"+link+"</a>"+"<br/>"+ "<textarea id=\"code-output\">"+result+"</textarea>";
	$("#normal-code-output").html(content);
	var editorout = CodeMirror.fromTextArea(document.getElementById("code-output"), {
					lineNumbers: true			
	});

	}
}
	request = new XMLHttpRequest();
       
        request.onload = onload;
       
        request.open("POST", "http://ideone.com/ideone/Index/submit/", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.send([
            'lang=' + encodeURIComponent(languages[$("#lang").val()].value),
            'run=1',
            'file=' + encodeURIComponent(normaleditor.getValue()),
        ].join('&'));
        
        

	});
  	
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.typeofrequest == "scilab")
		{ 
			
			
			inputdata = request.data;
			content = "<h3>Input</h3><br/>"+"<br><div id=\"codeblock\"><textarea id=\"scilab-code\">"+inputdata+"</textarea><br/><button id='scilab-run-code'>Run </button> </div><div id=\"scilab-output\"></div><div id=\"scilab-graph\"></div>";			
			$("#scilab-on-cloud-data").html(content);
			scilabeditor = CodeMirror.fromTextArea(document.getElementById("scilab-code"), {
				lineNumbers: true,
				mode: "clike"
			});
			//alert(scilabeditor.getValue())
			
			$("a#scilab-on-cloud-inline").trigger("click");
			
			sendResponse({farewell: "done"});
		}	
			else
		{
			
			all_languages_option = "<select name=\"lang\" id=\"lang\">";
			//console.log(language_order[0]);
			
			//console.log(languages.language_order[0].display);
			for(i=0;i<language_order.length;i++){
				all_languages_option+="<option value=\""+language_order[i]+"\">"+language_order[i]+"</option>";
				
			}
			
			all_languages_option+="</select>";
			inputdata = request.data;
			//data = request.data.replace(/\n/g, "<br />").replace(/\t/g,"&nbsp&nbsp").replace(/\r/g,"&nbsp&nbsp")
			content = "<h3>Input</h3><br/>"+all_languages_option+"<br><div id=\"codeblock\"><textarea id=\"code\">"+inputdata+"</textarea><br/><button id='run-code'>Run </button> </div><div id=\"normal-code-output\"></div>";			
			$("#scilab-on-cloud-data").html(content);
			normaleditor = CodeMirror.fromTextArea(document.getElementById("code"), {
				lineNumbers: true,
				mode: "clike"
			});
			$("a#scilab-on-cloud-inline").trigger("click");
			sendResponse({farewell: "done"});
  
		}
	});
});
