// UI definition 


$("#app").append('<ul id="topBar"></ul>')
$("#topBar").append('<div class="logo"><h3>Omni Editor v0.1.3</h3></div>');
$("#topBar").append(`<div id="qtype">
    <select name="types" id="qt">
      <option value=""></option>
      <option value="mcq">Multiple Choice</option>
      <option value="association">Association</option>
      <option value="clozeassociation">Cloze Association</option>
      <option value="clozedropdown">Cloze Drop Down</option>
      <option value="clozetext">Cloze Text</option>
      <option value="orderlist">Order List</option>
      <option value="classification">Classification</option>
      <option value="shorttext">Short Text</option>
      <option value="tokenhighlight">Token Highlight</option>
      <option value="feature">Passage</option>
    </select>
</div>`);
$("#topBar").append('<ul id="topMenu"></ul>');

$("#app").append('<div class="txt"></div>');

$(".txt").append('<div id="editor"></div>');
$("#editor").append('<div id="error_column"></div>');
//<i class="fas fa-times-circle"></i>
$("#editor").append('<div id="line_count">1<br></div>');
$("#editor").append('<div id="editorView"><div>start typing here ... but first check out how to get started! Click the help button in the top menu.<br></div></div>');



$("#editor").append('<textarea id="text_input" class="overlay" oninput="main()"></textarea>');
//Select the correct answer.\nMarry has a little <lamb|dog>\nkkk\ngggg<gg>

//$("#app").append('<p class="out"></p>');
$("#app").append('<p class="err"></p>');
var topmenu = `
<button class="btn" onclick="show_code()"><i class="fas fa-code"></i></button>



<button class="btn" onclick="help()"><i class="far fa-life-ring "></i></button>
` 
//<button class="btn" onclick="save()"><i class="fas fa-cloud-upload-alt f"></i></i></button>

//<button class="btn" onclick="action()"><i class="fas fa-magic "></i></button>
$("#topMenu").append(topmenu);
//-------------------------