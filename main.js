
//MAIN FUNCTION ---------------

//localStorage.setItem("text", " ");
(function (){
    var from_storage = localStorage.getItem("text");
    var text_input =  $("#text_input").val();
    if(from_storage != null && text_input == ""){
        $("#text_input").val(from_storage);
        main();
    } else {
        help();
    }
})();

function main() {
    update_qt_list();
    var before = glob_len;
    
    errors = [];
    
    //var from_storage = localStorage.getItem("text");
    var text_input =  $("#text_input").val();

    localStorage.setItem("text", text_input);

    
    
    glob_len = text_input.length;
    var after = glob_len;
    var caret_pos = document.getElementById("text_input").selectionStart;
    
    var prev = text_input.slice(caret_pos-1,caret_pos);
    var next = text_input.slice(caret_pos,caret_pos+1);
    
    if( prev == "<" && next != ">" && after > before){
 
        var upd = text_input.substring(0,caret_pos)+">"+text_input.substring(caret_pos,text_input.length);
        
        $("#editorView").html( color_code(upd) );
        $("#text_input").val(upd);
        $("#text_input").caretTo(caret_pos);
//        var input = document.getElementById('text_input');
//        input.focus();
//        input.setSelectionRange(caret_pos-1, caret_pos+1);
       
        
    } else {
        $("#editorView").html( color_code(text_input) );

    }
    

    //var lines = break_into_lines(text_input)[0];
    var l_count = break_into_lines(text_input)[1];
 
    $("#line_count").empty().append(l_count);//line_counter(line_count));
   
    $(".tip").on("click", function(){ tooltip( event )});
    
    
    
}


//IF body width changes run main


//$("#qt").change(function(){
//    console.log($("#qt :selected").attr("value"));
//    //json_question_types
//})
/* 
================= T A S K S =======
   > LIST errors and descriptions [DONE]
   > DEFINE question types [DONE]
   > MAKE template JSON [DONE] - reused question type tempates
   - - - - - - - - - - - - 
   > READ text from text area text_input
   > CHECK for errors
   > RECOGNISE question type based on data
   > LOG errors
   > PARSE the text to the template
   - - - - - - - - - - - - 
   > COLOR data from the template
   > UPDATE the text from the template in the editor
   > DISPLAY the formatted JSON
================= E N D ======= 
*/


