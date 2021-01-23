function test_decoy() { //String -input text
    var txt_in = $("#text_input").val();
    
    if(txt_in){
        var test = false;
        //console.log("FFF",fix_gaps(txt_in));
        var sub_test = fix_gaps(txt_in)[3] != undefined;
        var sub_test2 = fix_gaps(txt_in)[3][0].decoy != undefined;
        
        var help = sub_test ? fix_gaps(txt_in)[3][0].decoy.length : 0;
        test = help > 0 ? true : false;
    }
    
    //The first gap contains distractors (decoy)
    return test;
}

function test_cloze() { //String -input text
    var txt_in = $("#text_input").val();
    var test = color_code(txt_in)[1].length == 1 ? true : false;
    //Item contains a single question widget
    return test;
}


function test_extra(x) { //String -input text
    //NOT IMPLEMENTED!
    //
    //fix gaps 
    //get first gap
    //check if the first gap has defined extras
    if(0){
       return true;
    } else {
       return false;
    }
}