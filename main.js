$(document).ready(function(){
$("#submit").click(function(){
$.ajax({
      type: "POST",
      url: "http://scilab-test.garudaindia.in/cloud/scilab_evaluate",
      data: { scilab_code: $("#input").val(),graphicsmode:'',external_user:'guest' },
                        
    }).done(function( msg ) {
    $("#output").val(msg["output"]);
    });
});
})
