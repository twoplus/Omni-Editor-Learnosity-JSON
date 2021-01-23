var theme = {
    rubric: "",
    normal: "",
    correct: "",
}
var response = {
    answer: [],
    decoy: [],
    hint: [],
    feedback: {
        positive: [],
        negative: []
    }
    //,extra: []
};
var omni = [];
var glob_len = 0;
var omni_template = {
    rubric: "empty",
    tags: ["GSE: 13"],
    questions: [
        {
            stimulus_template: "Text text @.",
            responses: [ 
                {
                    answer: ["ans_1","ans_1A"],
                    decoy: ["dec_1","dec_2"],
                    hint: "(hint text)",
                    feedback: {
                        positive: "positive feedback",
                        negative: "negative feedback"
                    }
                }  
            ]
        }
    ]
}




var errors = [];


var testA = ["","323",23,"","s"]
function isString(x) {
    var out = typeof x == "string"? 1 : 0;
    return !!out;
}
//function log(){
//    for (a of arguments){
//        console.log(a);
//    }
//    
//}

function logErr(x) {
    //console.log("START:", errors);
    errors.push(x);
    errors = uniq(errors);
    //console.log("END:", errors);
} 
function action() {
    //alert("crap")
    var txtIn = $("#app textarea").val();

    var txtIn2 = txtIn.replace(/\n/g,"&&");
    txtIn2 = txtIn2.replace(/\s{2,}/g," ");
    txtIn2 = txtIn2.replace(/&{2}/g,"\n");

    $("#app textarea").val(txtIn2);
    $("#editorView").html( color_code(txtIn2) );
    if(txtIn == txtIn2) {
        openModal("Nothing to remove!","<i>No double spaces or underscores detected in the input text. </i>")
    } 
}
function openModal(x,y) {
    var modal = `
    <div class='modal'>
<div>
    <div class="modal_title">
        <p>${x}</p>
        <div onclick='closeModal()'><i class="fas fa-times-circle"></i></div>
    </div>
    <div class="modal_body">
        <p>${y}</p>
    </div>
</div>
    </div>`;
    $("body").append(modal)
}
function closeModal() {
    $(".modal").remove();
}
function help() {
    openModal("Getting Started",helpTxt);
}
function save() {
    openModal("Info","<img src='under.png' alt='under construction' style='width:100%; height: 300px; object-fit: contain;'><p>Feature not implemented</p>");
}
function timesIn(x,what) {
    if(isString(x)) {
        var i = 0, idx = 0;
        var times = [];
        while( i < (x.length) ) {
            idx = x.indexOf(what,idx);
            idx >= 0 ? times.push(idx): i = x.length;
            i++;
            idx += 1;
        } 
        var res = arguments[2] == undefined ? times.length : arguments[2] ?  [times.length,times] : false;
        return res;
    } else {
        return false;
    }
}
//-----------

function testTags(x,y,z) {
    var result = timesIn(x,y) == timesIn(x,z) ? true: false;
    return result;
}

function allTrue(x) {
    return x == true;
}

function tagOrder(x,y,z) {//y - opening tag, z - closing tag
    var open = timesIn(x,y,true), close = timesIn(x,z,true);
    if(open[0] == close[0]) {
        var i = 0, one = false, two = [];

        for (i; i < open[0]; i++) {
            one = open[1][i] < close[1][i];
            if(open[1][i+1] != undefined) {
                two.push( open[1][i+1] > close[1][i] );
            } else {
                i++;
            }
        }
        two = two.every(allTrue);
        return one && two;
    }
    //errors.push(errorList.e006);
    logErr(errorList.e006);
    return false;
}

var aa = `#rubric [one|two] |question1<gap1|decoy1> question cont'd|question2<gap2|decoy2> question cont'd
#rubric2 [one|two] |question1<gap1|decoy1> question cont'd|question2<gap2|decoy2> question cont'd`;

function wrapp(x, y) {
    return y.slice(0,1) + x + y.slice(1);
}


function getBox(x) {
  if (x != undefined) {
    var test1 = x.search("[[]");
    var test2 = x.search("]");
    var test3 = x.indexOf("[", test1+1);
    var test4 = x.indexOf("]", test2+1);

    if( test1 >= 0 ) {
        if(test3 >=0 || test4 >= 0) {
           //errors.push(errorList.e001);
           logErr(errorList.e001);
        }

        var op = x.split("[")[1];
        var box = op.split("]")[0];
        var oldBox = wrapp(box, "[]");

        var out = x.replace(oldBox, "");
        box = box.split("|");

        //console.log(remove_empty_items_from_array(box).length, box[0],box)
        if( test2 >= 0 ) {
            if ( !tagOrder(x,"[","]") ) {
                //errors.push(errorList.e006);
                logErr(errorList.e006);
            };

            if (box.length > 1 && remove_empty_items_from_array(box).length == box.length) {
                return [out,box];
            } else {
                //errors.push(errorList.e007);
                logErr(errorList.e007);
                return [out];
            }

        } else {
            //errors.push(errorList.e002);
            logErr(errorList.e002);
            return [out];
        }
    } else {
        if( test2 >= 0 ) {
            //errors.push(errorList.e003);
            logErr(errorList.e003);
        }
        return [x];
    }
    }
}

function uniq(x) {//Array
    function uniArr(val, idx, self) { 
        return self.indexOf(val) === idx;
    }
    var out = x.filter(uniArr);
    return out;//array with unique values
}

function duplicates(x) {//test
    var unii = uniq(x);
    var out = x.length === unii.length ? false : true;

    return out;//boolean
}

//Trims a string and reduces spaces to a single space 
function trim_all(y) {//String
    
    if (y == undefined) {
        console.warn("y is undefined",y);
        return "Y IS NOT DEFINED!";
    } else {
        var z = y.replace(/\s+/g," ");
    
        return z.trim();
    }
}


//Trims all strings in an array
function trim_allInArray(x) {//Array
    return x.map(trim_all);
}

function gapHelper(x) {//String
    var nX = [];
    x = x == undefined ? "" : x;
    if (x.search("/") ) {
        var alts = x.split("/");
        alts = uniq(alts);
        nX = trim_allInArray(alts);
        if(duplicates(nX)) {
           //errors.push(errorList.e009);
            //console.log("EEEEEEE");
           logErr(errorList.e009);
           }
    } else {
        nX.push(trim_all(x));
    }
    return nX;
}
function line_cutter(x,y) {//String, Int
    var test = x.length/y *100 ;

    var size = parseInt(y/10.95);
    console.log(x.length," -=- ", size);
    var len = x.length;
    var sublines = [];
    for (var i = 0 ; i < len/y; i++ ){
        sublines.push(x.substring(i*y,y+(i*y)))
    }
    console.log("SUBS:", sublines.length);
    return sublines;
}


function break_into_lines(x) { //String - text from # 
    var lines = x.split("\n");
    var text_width = document.getElementById("text_input").clientWidth;
    var line_count = [];
    var line_counter = "";
    for(var u = 0; u < lines.length; u++) {
    //for (line of lines) {
        //console.log( lines[u]);//,lines.indexOf(line) );
        line_counter += u+1 + "<br/>";
        if(lines[u].length/text_width *100 > 9) {
            console.log("teraz",text_width,lines[u].length/text_width *100, lines[u].length);
            var added = line_cutter(lines[u],text_width)
            for (aa of added) {
                line_count.push(aa);
            }
            
            //for(var u = 1; u < added.length; u++){
            for(n of added){
                line_counter += "<br/>";
            }
            
        } else {
            line_count.push(lines[u]);
        }
    }
    //var width_check = text_with/letter_count <= 10 ? true: false;
    return [line_count,line_counter];
}

function list_gaps(x){ //Array
    var list_of_gaps = [];
    for ( y of x) {
        list_of_gaps.push( y.split(">")[0] );
    }
    return list_of_gaps;
}

function explode_gap_components(){//Array variable length
    var x = arguments;
    
    var comps = [];
    for (gap of x) {
        for (gap_component of gap) {
            var holder = gap_component.split("/");
            //console.log("Gap Comp: ",gap_component);
            comps.push(holder);
        }
    }
    //console.log("ARGS:",comps);
    return comps;
}

//input from parse_gaps(list_of_gaps)
function gaps_obj_to_arr(x){//Array of Objects
    //console.log("XXX:", x);
    var color_out = [];
    //var plain_out = [];
    for (z of x){//Array
        var sub = [];
        var sub2 = [];
        for (o in z){//Object
            //var v = o == "answer"? "":"====";
            //console.log("   GO:",z[o],o);
            var new_gap_el = '<span class="' + o +'">' + z[o].join("/") + "</span>";
            z[o].length > 0 ? sub.push(new_gap_el) : false;
            z[o].length > 0 ? sub2.push(z[o].join("/")) : false;

        }
        color_out.push("&lt;" +sub.join("|")+ "&gt;");
        //plain_out.push(sub2.join("|"))
    }
    //console.warn(" -- >  OUT:",color_out, plain_out);
    return  color_out;//, plain_out];
}

//old color gaps approach
//function color_gaps(x){//Array of Ojects
//    var colors = ["answer","decoy","hint","feedback"];
//    var s = ['<span class="','">','</span>']
//    var outer_out = [];
////    var preceed = '<span class="mark">&lt;</span>';
////    var succeed = '<span class="mark">&gt;</span>';
//    //console.log("colorGAPS:",x);
//    //console.warn(" >:", gaps_obj_to_arr(x));
//    for (gap_object of x){
//        var inner_out = [];
//        var i = 0;
//        while (4 > i) {//Object.keys(gap_object)
//            var colored =  s[0] + colors[i] + s[1] + gap_object[colors[i]] + s[2];
//            inner_out.push(colored );
//            //console.warn("groch");
//            i++;
//        }
//        var out = inner_out;
//        //console.warn("C OUT:",out);
//        var colored_out = "&lt;" + out[0];
//        if (out.length > 1){
//            for( var i = 1; i <= out.length; i++){
//                colored_out += "?" + out[i];
//            }
//        }
//        colored_out += "&gt;";
//        //console.warn("gap obj:",gap_object);
//        outer_out.push(colored_out);
//    }
//    return outer_out;//Array of Strings
//}
function limit_gaps(x){
    var lines = x.split("\n");
    var new_lines = [];
    for (line of lines){
        if(if_gap_in_string(line)) {
            var gaps = line.split("<");
            var first = gaps[0];
            gaps.shift();
            var new_gaps = [];
            var mid_text = [];
            for(gap of gaps) {
                new_gaps.push(gap.split(">")[0]);
            }
            var fin_gaps = [];
            for (g of new_gaps) {
                fin_gaps.push(g.split("|").slice(0,4))
            }
        } else {
            new_lines.push(line)
        }
    }
}

function parse_gaps(x) {//Array of gaps stings with markup
    //console.log("PARSE:",x)
    var processed_gaps = [];
    //var gap_comp_check = [];
    //A - answer
    //D - distractors
    //H - hints
    //F - feedback
    //E - extra for classification -PARKED
    //GAP - a list of ADHF delimited with |
    
    for (gap of x) {
        var template = {
            answer: [],
            decoy: [],
            hint: [],
            feedback: []
            //,extra: []
        }
        var processing_gap = gap.split("|");
        processing_gap = processing_gap.slice(0,4);
        var component_count = processing_gap.length;
        var exploded_gap = explode_gap_components(processing_gap);
        //console.log(">-",exploded_gap);
        //gap_comp_check.push(component_count);
        
        template.answer = exploded_gap[0];
        
        if (component_count > 1) {
            template.decoy = exploded_gap[1];
        }
        if (component_count > 2) {
            template.hint = exploded_gap[2];
        }
        if (component_count == 4) {
            template.feedback = exploded_gap[3];
        }
//        if (component_count == 5) {
//            template.extra = exploded_gap[5];
//        }
            
        processed_gaps.push(template);
        //console.log("GAP template:", template);
    }
    //color gaps in editor
    //console.log("all gaps:",processed_gaps);
    //return color_gaps(processed_gaps);//Array
    return processed_gaps;//Array of Objects
    //tests if all gaps have the same number of components
//    var gap_test = uniq(gap_comp_check).length > 1 ? 0 : 1;
//    if(gap_test){
//        
//        //send the data to learnosity json
//        //return processed_gaps;//Array of Objects
//    }
    //console.error("gap check:", !!gap_test);
    //return processed_gaps;
}


function gap_replacer(x,gaps) {//Sting,Array
    var old_x = x;
    for (gap of gaps){
        //console.warn(" - GAP:",gap);
        old_x = old_x.replace(wrapp(gap,"<>"), "@");
    }
    return old_x;
}

function gap_pickler(line_string,gap_array){
    var out = line_string;
    for (gap of gap_array){
        out = out.replace(/@/,gap);
    }
    return out;//String
}

function if_gap_in_string(x){//String
    if( tagOrder(x,"<",">")) {//  && x.search("<") >= 0
        return true;
    } else {
        return false;
    }
}



function fix_gaps(x) {//String line with question including gaps
    //console.log("FIX",x);
    if( if_gap_in_string(x) ) {
        var temp = x.split("<");
        temp.shift();
        var list_of_gaps = list_gaps(temp);
        //Array of gaps as objects
       
        var question_with_ats = gap_replacer(x,list_of_gaps);//String
        //question with @s
        
        
        var gap_objs = parse_gaps(list_of_gaps);
        //console.log("gap_objs",gap_objs);
        var ready_gaps = gaps_obj_to_arr(gap_objs);
        //parsed gaps
        
        var fin_out = gap_pickler(question_with_ats,ready_gaps);
        //HTML output for editorView
        
        return [fin_out, ready_gaps, question_with_ats, gap_objs];
        // Array
    } else {
        return [x,[x],"",[{answer:[], decoy:[],hint:[],feedback:[]}]];
    }
}
//function fixGaps(x) {//String
//    //<answer|decoy|hint|feedback> = "ans^ans§dec#dec$hint%feed"
//
//    //timesIn(x,"|"));
//    if(x.search("<") >= 0 && tagOrder(x,"<",">")) {
//        var temp = x.split("<");
//        temp.shift();
//        var newTemp = [];
//        var old = x;
//
//        for (n of temp) {
//            var sub = n.split(">")[0];
//            var oldsub = sub;
//            var gap = {};
//            if ( timesIn(sub,"|") > 0 ) {
//                sub = sub.split("|");
//                var answer = sub[0] != undefined ? sub[0] : "";
//                var decoy = sub[1] != undefined ? sub[1] : "";
//                var hint = sub[2] != undefined ? sub[2] : "";
//                var feed = sub[3] != undefined ? sub[3] : "";
//                //console.log(">> >>",answer," ",decoy);
//                var regSlash = /\//g;
//
//                var nAnswer = gapHelper(answer);
//                //console.warn("D E C O Y:",decoy);
//                var nDecoy = gapHelper(decoy);
//
//                gap = { 
//                    answers: nAnswer,
//                    distractors: nDecoy,
//                    hint: hint,
//                    feedback: feed
//                } 
//                //var nAnswer =
////                        sub = sub[0].replace(regSlash,"^") + "§" + sub[1] + "$" + hint + "%" + feed;
////                        
////                        sub = sub.replace(regSlash,"#");
////                        console.warn(sub);
//
//                old = old.replace(wrapp(oldsub,"<>"), "@");
//            } else {
//
////                var gaptxt = gapHelper(answer);
////                gap = { answers: gaptxt };
////
////                old = old.replace(wrapp(oldsub,"<>"), "@");
//            }
//
//
//            newTemp.push(gap);//sub);
//        }
//        old = old.split("\n");
//        return [old, newTemp];
//    } else {
//
//        if(x.search(">") >= 0 ) {
//            //errors.push(errorList.e006);
//            logErr(errorList.e006);
//        } else {
//            //errors.push(errorList.e005);
//            logErr(errorList.e005);
//        }
//
//        return ["Please correct the errors."];
//    }
//
//}

function remove_empty_items_from_array(x) {
    var o = [];
    for (n of x) {
        n ? o.push(n): false;
    }
    return o;
}

function getQ(x) {
    if(x != undefined && x != "" ) {
        //console.log(x);
        //var out = x.split("|")[0].slice(0,1) == "#" ? x.split("|")[0] : "";
        var out = remove_empty_items_from_array(x.split("|"));
        return out;
    } else {
        //errors.push(errorList.e004);
        logErr(errorList.e004);
        return "---";
    }

}

function wrapTag(x,w) {
    var r = w.split("");
    r.splice(1, 0, "/");
    return w+x+r.join("");
}
function add_italics(txt) {
    var mapping = [
        [/[{]/gi,"<i>"],
        [/[}]/gi,"</i>"]
    ]
    for (n of mapping) {
        //console.log(n);
        txt = txt.replace(n[0], n[1]);
    }

    return txt;
}
function logErrors(x) {
    var erList = "";
    for (n of x) {
        erList += "<br/>"+ n ;
    }
    return erList;
}
var qts = {
    mcq: {
        options: [{
                label: "[Choice A]",
                value: "0"
            }, {
                label: "[Choice B]",
                value: "1"
            }
        ],
        stimulus: "rubric text",
        type: "mcq",
        validation: {
            scoring_type: "exactMatch",
            valid_response: {
                score: 1,
                value: ["0"]
            },
            "alt_responses": [{
                "score": 1,
                "value": ["1"]
            }]
        },
        ui_style: {
            type: "horizontal"
        },
        "shuffle_options": true
    }
}
function stuffIt(x,y) { //x = data, y = Question type from qts e.g. mcq
    qts[y].stimulus = x.rubric;
    qts[y].options = x.options;
    //console.log(qts[y]);
    //return qts[y];
}
function replace_gap_in_question(x) { //MCQ
    var len = x.length;
    var y = !!arguments[1];
    var test = y ? x.endsWith("@"): false;
    var z = test ? x.slice(0,len-1) : x;
    var gapMark = /@/g;
    var gap = "_____"
    var out = test ? z.replace(gapMark,gap) : x.replace(gapMark,gap);
    return out;
}

function replace_gaps_with_responses(x) {//Cloze text
    var gap = "{{response}}";
    var gapMark = /@/g;
    var out =  x.replace(gapMark,gap);
    return out;
}

function remove_gaps_from_question(x) {//Short text
    var gapMark = /@/g;
    var out =  x.replace(gapMark,"");
    return out;
}


function makeOpts(x) {
    //console.log("make options > > >", x);
    var opts = [];
    if (x != undefined) {
        var ans = x[0].answers[0];
        var correctOpt = {
            label: ans,
            value: "0"
        }
        opts.push(correctOpt);

        if (x[0].distractors != undefined) {
            for (var i = 0; i < x[0].distractors.length; i++) {
                var idx = i + 1;
                var otherOpt = {
                    label: x[0].distractors[i],
                    value: idx.toString()
                };
                opts.push(otherOpt);
            }
        } else {
            logErr(errorList.e010);
        }


    } else {
        var if_undefined = {
            label: "[Choice X]",
            value: "0"
        };
        opts.push(if_undefined);
    }

    return opts;//array
}
//function colour(x) {
//    var holder;
//    var gaps = x.split("<");
//    var ngaps = []
//    for (gap of gaps) {
//        if (gaps.indexOf(gap)%2) {
//            ngaps.push(gap)
//        }
//    }
//
//    return ngaps;
//}
function escape_tags_in_line(x){//String
    //console.log(x)
    var lt = /</g;
    var gt = />/g;
    var out = x.replace(lt,"&lt;");
    var out = out.replace(gt,"&gt;");
    return out;
}
function fix_spaces(x){//String
    return x.replace(/\s/g,"&nbsp;");
}
function if_contains_chars(x,chars){//String,Array
    //var chars = [/\</,/\>/,/\|/,/\{/];
    for(var i = 0; i < chars.length; i++ ){
        if(x.search(chars[i]) >= 0 ) {
                //console.log(x,x.search(chars[i]),chars[i])
                return true;
           }
    }
    return false;
}
//if_contains_chars("ds|ds","|");

function aqq(){
    alert("clicked");
}

function color_code(x) {//String - text input - item
    
    var lines = x.split("\n")
    parse_omni_from_input();
    //console.log("Test omni:",if_single_answer_in_first(omni[0]) );
    //var questions = [];
    
    //console.log("Read:",omni[0].passage);
    var colorText = "";
    
    var error_icons = [];
    var icon = ['\<span data-error=\"','\" class=\"tip\"\>\<i class=\"fas fa-times-circle\"\>\<\/i\>\<\/span\>\<br\/\>'];
    var rubric_line = [];
    
    var test_multi = if_multi_answer_in_first(omni[0].questions[0]);
    var test_decoy = if_decoy_in_first(omni[0]);
    var test_first = if_single_answer_in_first(omni[0]);
    
    for (line of lines) {
        var first_scorable = [];
        
        if ( line.indexOf("#") >= 0) {
            if(line.trim()[0] == "#") {
                error_icons.push("<br/>");
                colorText += "<span class='mark'>" + fix_spaces(line) + "</span><br/>";
            } else {
                error_icons.push(icon[0]+'Comment error: remove the text before #'+icon[1]);
                colorText += "<span class='error'>" + fix_spaces(line) + "</span><br/>";
            }
            
        } else if (line == ""){
            colorText += "" + "<br/>";
            error_icons.push("<br/>");
        } else if ( !if_gap_in_string(line)) {
            rubric_line.push(line);
//            var widt = document.getElementById("text_input").clientWidth;
//            var dyn_line_w = widt / (line.length*10);
//            
//            console.log("text wrap", line.length ,"w:", widt,"p:",dyn_line_w);
            
            var rubric = escape_tags_in_line(fix_spaces(line));
            
            //OMNI RUBRIC
//            omni_template.rubric = escape_tags_in_line(fix_spaces(rubric_line[0]));
            
            if(if_contains_chars(line, [/\</,/\>/,/\|/,/\{/,/\}/])){
                colorText += "<span class='error'>" + rubric + "</span><br/>";
                error_icons.push(icon[0]+"Contains one or more invalid characters <{|}>"+icon[1]);
            } else {
                if (line == rubric_line[0]){
                    colorText += "<span class='rubric'>" + rubric + "</span><br/>";
                } else {
                    colorText += "<span class='reading'>" + rubric + "</span><br/>";
                }
                error_icons.push("<br/>");
            }
            
        }  else if (if_gap_in_string(line)) {
            first_scorable = first_scorable.length == 0? first_scorable.push(line): false;
            
            colorText += fix_gaps(fix_spaces(line))[0] + "<br/>";
            
            //mark-up errors MCQ
//            var test_multi = if_multi_answer_in_first(omni[0]);
//            var test_decoy = if_decoy_in_first(omni[0]);
//            var test_first = if_single_answer_in_first(omni[0]);
            var curr_ans_len = fix_gaps(fix_spaces(line))[3][0].answer.length;
            var curr_dec_len = fix_gaps(fix_spaces(line))[3][0].decoy.length;
            var curr_ans_val = fix_gaps(fix_spaces(line))[3][0].answer[0];
            //console.log("TEST ", curr_ans_len ,test_multi,line,!!curr_ans_val);
            
            var cqt = $("#qt :selected").val();
            switch (cqt) {
                case "mcq":
                    if(curr_dec_len){
                        if( test_multi && curr_ans_len > 1) {
                            error_icons.push("<br>");
                        } else if(!test_multi && curr_ans_len == 1) {
                            error_icons.push("<br>");
                        } else {
                            error_icons.push(icon);
                        }
                    } else {
                        error_icons.push(icon);
                    }
                    break;
                case "clozetext":
                    if(!curr_dec_len){
                        if( !!curr_ans_val){
                            error_icons.push("<br>");  
                        } else {
                            error_icons.push(icon);
                        }
                    } else {
                        error_icons.push(icon);
                    }
                    break;
                default:
                    error_icons.push("<br>");
            }
                
            
            
            //mark-up errors clozetext
                
           
        } 
        
    }
    //<br><i class="fas fa-times-circle"></i>
    
    $("#error_column").empty().append(error_icons);
    //console.log(error_icons);
    
    //remove_empty_items_from_array(["","",2]);
    //if_gap_in_string("cxcx");
    
    //new
    //grab first and wrap it as rubric
    //check if the rubric contains gaps if so throw error
    //shift the lines array and process all lines
    //expect gap/gaps in lines/questions else throw error
    //lines.shift();
    //console.log("====",lines)
    return colorText;//,questions];//html output
}
//function line_counter(x){//Int
//    var out = "";
//    for (var i = 1; i <= x; i++) {
//        //
//        out += i + "<br/>";
//    }
//    return out;
//}
function make_options(x) {
    var start = arguments[1] ? arguments[1] : 0;
    var out = [];
    for(const [i,v] of x.entries()){
        out.push({ 
            label: v.trim(), 
            value: (i + start).toString()
        })
    }
    return out;
}
//stimulus_template: "Text text @.",
//responses: [ 
//    {
//        answer: ["ans_1","ans_1A"],
//        decoy: ["dec_1","dec_2"],
//        hint: "(hint text)",
//        feedback: {
//            positive: "positive feedback",
//            negative: "negative feedback"
//        }
//    }  
//]
//function Response(answer,decoy,hint,feedback,extra){
//    this.answer = answer;
//    this.decoy = decoy;
//    this.hint = hint;//Array
//    this.feedback = feedback;
//    this.extra = extra;
//}

function Question(stim,resp) {
    this.stimulus_template = stim;
    this.responses = resp;
    
}

function Omni_item(rubric, tags, questions, passage, assets) {
    this.rubric = rubric;
    this.tags = tags;
    this.questions = questions;
    this.passage = passage;
    this.assets = assets;
        
}

function parse_omni_from_input(){
    var txt = $("#text_input").val();
    var items = txt.split("§");
    //console.log("ITEMS:",items.length,items);
    omni = [];
    for (item of items) {
        var lines = item.split("\n");
        lines = remove_empty_items_from_array(lines);
        //console.log("LINES:",lines.length);
        var blue_lines = [];
        for (line of lines){
            if(line.indexOf("#") < 0 && !if_gap_in_string(line) ){
                blue_lines.push(line);
            } 
        }
        var questions = [];
        
        for (line of lines){
            if(if_gap_in_string(line)){
                var line_data = fix_gaps(line);
              
                var que = new Question(line_data[2],line_data[3]);
                questions.push(que);
                //console.log("CCC",questions[0]);
            }
        }
        var reading = "";
        for (var j = 1; j < blue_lines.length; j++){
            reading += blue_lines[j] + "<br/>";
        }
        
        //add function for reading
        //to parse {} [] italics and bold and wrpa in <p>
        
        //else if stimulus is empty ie no lines with gaps
        //passage implementation
        //throw error that there are no scorables!!!
        
        var om = new Omni_item(blue_lines[0],["Test Gen"],questions,reading,[])//assets not implemented
        omni.push(om);

    }
    
    //console.log("OMNI",omni);
}
function code_to_modal(x) {
    var wrap =  JSON.stringify(x) ;
    $("#code").empty().append('<div class="code"></div>')
    $(".code").text( wrap );
}
function append_code(x){
    var out = $('<div class="code"></div>').text( JSON.stringify(x) );
    $("#code").append(out);
}

function to_stimulus (x) {
    var a_stim = arguments[1] ? arguments[1] : "";
    var stim = "";
    if(a_stim) {
        stim = '\<h4\>\<strong\>';
        stim += a_stim;
        stim += "\</strong\>\</h5\>\n";
    }
    stim += "\<p\>";
    stim += replace_gap_in_question(x);
    stim += "\</p\>";
    return stim;
}

function extract_options(q, r_idx) {
    var q_ans = q.responses[r_idx].answer;
    var q_dcs = q.responses[r_idx].decoy;

    var ans = make_options(q_ans);
    var dcs = make_options(q_dcs,ans.length);

    return ans.concat(dcs);
}

function extract_first_answers(q) {
    var answers = []
    for (resp of q.responses){
        answers.push(resp.answer[0]);
    }

    return answers;
}

function extract_alts(q) {
    var all_alts = [];
    var max = get_max_ans(q);
    
    for (var i = 1; i < max; i++) {
        var alts = [];
        //console.log("LOOP:",i);
        for (resp of q.responses) {
              //console.log("INNER:",resp);
            if (resp.answer[i] != undefined) {
                alts.push(resp.answer[i].trim());
            } else {
                alts.push(resp.answer[0]);
            }
        }
        all_alts.push(alts);
    }
    //console.log("ALL ALTS:",all_alts);
    return all_alts;
}

function get_max_ans(q) {
    //var max = 0
    //console.log("MAX",q);
    var out = [];
    for (resp of q.responses) {
        out.push(resp.answer.length)
    }
    //console.log("OUT:", out);
    return Math.max.apply(Math, out)
}

function if_multi_answer_in_first(x){//test for MCQ with multi resp
    
    var comp = x == undefined ? 0: x.responses[0].answer.length;//questions[0]
    var out = comp > 1 ? 1 : 0;
    return !!out;
}

function if_single_answer_in_first(x){//general test 
    
    var comp = x.questions[0] == undefined ? 0: x.questions[0].responses[0].answer.length;
    var out = comp == 1 ? 1 : 0;
    return !!out;
}

function if_decoy_in_first(x){//test for Cloze Text and Association
    
    var comp = x.questions[0] == undefined ? 0: x.questions[0].responses[0].decoy.length;
    var out = comp > 0 ? 1 : 0;
    return !!out;
}

function get_multiple_ans(x) {//MCQ only
    var out = [];
    var alts = x.responses[0].answer;
    alts = JSON.parse(JSON.stringify(alts));
    alts.shift();
    for(alt of alts){
        var new_val = (alts.indexOf(alt)+1).toString();
        out.push(new_val);
    }
    //console.log("OUT", out);
    return out;
}
function get_multiple_alts(x) {//Cloze Text only
    var out = [];
    var alts = x.responses[0].answer;
    alts = JSON.parse(JSON.stringify(alts));
    alts.shift();
    for(alt of alts){
        out.push(alt);
    }
    //console.log("OUT", out);
    return out;
}
function tooltip(event) {
    //console.log(event.target.dataset.error);
    $(".ttip").remove();
    var tip = $('<div class="ttip"><p>'+event.target.dataset.error+'</p></div>');
    $("#app").append(tip);
    $(".ttip").css("top",event.pageY-19);
    $(".ttip").delay( 2000 ).fadeOut( 200 ).queue(
    function() { 
        $(this).remove(); 
    });
    
}

function show_code(){
    parse_omni_from_input();
    console.log("OMNI",omni);
    
    var code = `<div class="feedback"><p id="code"></p></div>`;
    openModal("LNSTY code",code);
    var selectedQT = $("#qt :selected").val();
    
    var reading = omni[0].passage
    if(reading) {
        var passage = JSON.parse(JSON.stringify(json_question_types["passage"]));
        passage.content = reading;
        append_code(passage);
    }
    
    switch (selectedQT) {
      case "mcq":
        
        var qt_template = JSON.parse(JSON.stringify(json_question_types[selectedQT]));
            
        for (activity of omni){  
            //$("#code").text("");
            var stim = to_stimulus(activity.questions[0].stimulus_template, activity.rubric);
            
            qt_template.stimulus = stim;
            qt_template.options = extract_options( activity.questions[0], 0 ); 
            var cols = qt_template.options.length;
            if(cols<4){
                qt_template.ui_style.columns = cols;
            } else if(cols == 4) {
                qt_template.ui_style.columns = Math.floor(cols/2);
            }
            var test = if_multi_answer_in_first(activity.questions[0]);
            qt_template.multiple_responses = test;
            
            if (test) {
                //get_multiple_ans(activity.questions[0]);
                
                qt_template.validation.valid_response.value =
                qt_template.validation.valid_response.value.concat( get_multiple_ans( activity.questions[0] ) );
            }
            
            append_code(qt_template);
            //remaing questions
            var rest = activity.questions;
            rest.shift();

            for (q of rest){ 
                qt_template.stimulus = to_stimulus(q.stimulus_template);
                qt_template.options = extract_options(q, 0);
                cols = qt_template.options.length;
                if(cols<4){
                    qt_template.ui_style.columns = cols;
                } else if(cols == 4) {
                    qt_template.ui_style.columns = Math.floor(cols/2);
                }

                
                if (test) {
                    get_multiple_ans(q);
                  
                    qt_template.validation.valid_response.value = ["0"];
                    qt_template.validation.valid_response.value =
                    qt_template.validation.valid_response.value.concat( get_multiple_ans( q ) );

                }
                append_code(qt_template);
            }
  
            break;//support for multiple items not implemented therefore only one item at a time, all other will be ignored
            
        }



        break;
      case "association":
        qt_template = "NOT IMPLEMENTED!";
        code_to_modal(qt_template);
        break;
      case "clozeassociation":
        qt_template = "NOT IMPLEMENTED!";
        code_to_modal(qt_template);
        break;
      case "tokenhighlight":
        qt_template = "NOT IMPLEMENTED!";
        code_to_modal(qt_template);
        break;
      case "orderlist":
        qt_template = "NOT IMPLEMENTED!";
        code_to_modal(qt_template);
        break;
      case "clozedropdown":
        qt_template = "NOT IMPLEMENTED!";
        code_to_modal(qt_template);
        break;
      case "shorttext":
        var qt_template = JSON.parse(JSON.stringify(json_question_types[selectedQT]));
            
        for (activity of omni){
            var stim_text = remove_gaps_from_question( activity.questions[0].stimulus_template);
            var stim = to_stimulus(stim_text, activity.rubric);
            
            qt_template.stimulus = stim;
            
//            qt_template.template = replace_gaps_with_responses( activity.questions[0].stimulus_template);
            
            qt_template.validation.valid_response.value = extract_first_answers( activity.questions[0])[0];
            
            var test = if_multi_answer_in_first(activity.questions[0]);
            //console.log("Q DUMP:",activity.questions[0]);
            
            
            if (test) {
                //var alts = get_multiple_alts( activity.questions[0] ) ;
                var alts = extract_alts( activity.questions[0] );
                //console.log("###:", get_max_ans(activity.questions[0]));
                qt_template.validation.alt_responses = [];
                for (alt of alts) {
                    var pick = {"score":1};
                    pick.value = alt[0];
                    qt_template.validation.alt_responses.push(pick);
                }
                
            } else {
                delete qt_template.validation.alt_responses;
            }
           
            append_code(qt_template);
            
            // - - - 
            var rest = activity.questions;
            rest.shift();
            console.log("REST",rest);
            for (q of rest){ 
                qt_template.stimulus = remove_gaps_from_question( q.stimulus_template);
                //qt_template.options = extract_options(q, 0);
            qt_template.validation.valid_response.value = extract_first_answers(q)[0];
                //test local
                var local_test = if_multi_answer_in_first(q);
                qt_template.validation.alt_responses = [];
                if ( local_test) {//this is a global test
                    var alts = extract_alts(q);//get_multiple_alts( q ) ;
                    //console.log("VNV",q,extract_alts(q));
                    for (alt of alts) {
                        var pick = {"score":1};
                        pick.value = alt[0];
                        console.log(pick)
                        qt_template.validation.alt_responses.push(pick);
                    } 
                } else {
                    delete qt_template.validation.alt_responses;
                }
                append_code(qt_template);
            }
            // - - -
            break;
        }
        
        break;
      case "clozetext":
        
        var qt_template = JSON.parse(JSON.stringify(json_question_types[selectedQT]));
            
        for (activity of omni){
            var stim = to_stimulus("",activity.rubric);
            
            qt_template.stimulus = stim;
            
            qt_template.template = replace_gaps_with_responses( activity.questions[0].stimulus_template);
            
            qt_template.validation.valid_response.value = extract_first_answers( activity.questions[0]);
            
            var test = if_multi_answer_in_first(activity.questions[0]);
            //console.log("Q DUMP:",activity.questions[0]);
            
            
            if (test) {
                //var alts = get_multiple_alts( activity.questions[0] ) ;
                var alts = extract_alts( activity.questions[0] );
                //console.log("###:", get_max_ans(activity.questions[0]));
                qt_template.validation.alt_responses = [];
                for (alt of alts) {
                    var pick = {"score":1};
                    pick.value = alt;
                    qt_template.validation.alt_responses.push(pick);
                }
                
            } else {
                delete qt_template.validation.alt_responses;
            }
           
            append_code(qt_template);
            
            // - - - 
            var rest = activity.questions;
            rest.shift();
            console.log("REST",rest);
            for (q of rest){ 
                qt_template.stimulus = "";
                qt_template.template = replace_gaps_with_responses( q.stimulus_template);
                //qt_template.options = extract_options(q, 0);
            qt_template.validation.valid_response.value = extract_first_answers(q);
                //test local
                var local_test = if_multi_answer_in_first(q);
                qt_template.validation.alt_responses = [];
                if ( local_test) {//this is a global test
                    var alts = extract_alts(q);//get_multiple_alts( q ) ;
                    //console.log("VNV",q,extract_alts(q));
                    for (alt of alts) {
                        var pick = {"score":1};
                        pick.value = alt;
                        console.log(pick)
                        qt_template.validation.alt_responses.push(pick);
                    } 
                } else {
                    delete qt_template.validation.alt_responses;
                }
                append_code(qt_template);
            }
            // - - -
            break;
        }
        
        break;
      default:
        var msg = "You should type something first! <br><br>Click the help button in the top right corner to find out how to get started.<br><br>Once you create some text come back to preview your code which you can copy and paste into Learnosity author."
        $("#code").html(msg);
        //code_to_modal(qt_template);
    }

    
}

function new_select(x) {
    var out = "";
    for (item of qt_filter[x]){
        out += qt_list[item];
    }
    return out;
}

function update_qt_list() {
    //try {
    //console.log("UPDATE:",test_decoy())
        if(test_decoy() && !test_cloze()) {
            $("#qt").empty().append(new_select("decoy_cloze"));
        } else if (test_decoy() && test_cloze()) {
            $("#qt").empty().append(new_select("decoy_multi"));
        } else {//plain_cloze
            $("#qt").empty().append(new_select("plain_cloze"));
        }
    //} catch {}
    
    //clasification not implemented
}
