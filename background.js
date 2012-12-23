

var seltext = null;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
{
	
	
	switch(request.message)
	{
		case 'setText':
			window.seltext = request.data
		break;
		
	
		
		default:
			sendResponse({data: 'Invalid arguments'});
		break;
	}

});


function savetext(info,tab)

{
	//$.fancybox.close();
	//$("a#scilab-on-cloud-inline").trigger("click");
	
	chrome.tabs.getSelected(null, function(tab) {
		
	chrome.tabs.sendMessage(tab.id, {typeofrequest: "input",data:seltext}, function(response) {
		var resp = response.farewell;
		//alert(resp);
		
		console.log(response.farewell);
		});
	});
	
	
}

function runOnScilab(info,tab)

{
	//$.fancybox.close();
	//$("a#scilab-on-cloud-inline").trigger("click");
	
	chrome.tabs.getSelected(null, function(tab) {
		
	chrome.tabs.sendMessage(tab.id, {typeofrequest: "scilab",data:seltext}, function(response) {
		var resp = response.farewell;
		//alert(resp);
		
		console.log(response.farewell);
		});
	});
	
	
}


var context = "selection";
var title = "Run on Ideone";
/*chrome.contextMenus.create({"title": title, "id":"myparent","contexts":[context],"onclick": savetext},function(){
	console.log("parentID ");
	var id2 = chrome.contextMenus.create(
     {'title': 'child1', 'parentId': "myparent", "type":"checkbox","enabled":true}
  ); console.log("child id "+id2);
  });*/
  
  var contextMenuCallback = function(info, tab) {
  console.log(info);
  console.log(tab);
  // we can do other stuff here.
}

var first_params = {
  "id": "first_id",
  "title": "Run On Ideone",
  "type": "normal",
 "contexts":["selection"], 
  "onclick": savetext
};
var second_params = {
 "id": "second_id",
 "title": "Run as Scilab Code",
 "type": "normal",
 "contexts":["selection"],
 "onclick": runOnScilab
};  
chrome.contextMenus.create(first_params);
chrome.contextMenus.create(second_params);
//console.log("parentID " +ids);



