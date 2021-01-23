// - - - - - - - - -Help text
var helpTxt = `
    <h3>How to create items and questions?</h3><br>
    <p>The entire document constitutes a Learnosity Item where the rubric is always the very first blue line and each line in white text with at least one gap is a question. The position of the gap is defined by placing the <span class="highlight"> &lt;&gt;</span> tags in the text e.g.<span class='mono'> </p><br><br>
    <div class="code">
    <span class="count">1 </span><span class="white">Mary had a little</span> &lt; <span class='answer'>lamb</span> | <span class='decoy'>dog</span> / <span class='decoy'>cat</span> &gt;</span> </div>
    <br>
    <br>
    <p>Below is an example of a multiple choice Item with 2 questions. The editor accepts any number of questions but Learnosity support max 50 questions in an Item. The green text within the <span class="highlight"> &lt;&gt;</span> tags indicates the correct answer text and the orange text denotes the distractors. There can be any number of distractors, simply use a <span class="highlight"> / </span> forward slash character to seprarate the options. Remember to delimit the answer from the distractors with the <span class="highlight"> |</span> pipe sign.</p>
    <br>
    <br>
    <div class="code">
    <span class="count">1 </span><span class="rubric">Select the correct answer.</span><br><span class="count">2</span>
    <span class="white">Mary had a little</span> &lt; <span class='answer'>lamb</span> | <span class='decoy'>dog</span> / <span class='decoy'>cat</span> &gt;</span> 
    <br><span class="count">3</span>
    <span class="white">It's fleece was white</span> &lt; <span class='answer'>white</span> | <span class='decoy'>pink</span> / <span class='decoy'>black</span> &gt; <span class="white">as snow.</span></span>
    </div>
    <br>
    <br>
    <h3>Supported question types</h3><br>
    <p>Multiple Choice - Single response</p>
    <br>
    <div class="code">
    <span class="count">1 </span><span class="white">Mary had a little</span> &lt; <span class='answer'>lamb</span> | <span class='decoy'>dog</span> / <span class='decoy'>cat</span> &gt;</span><span class="white">.</span> </div>
    <br>
    <p>Multiple Choice - Multiple response</p>
    <br>
    <div class="code">
    <span class="count">1 </span><span class="white">Mary had a little</span> &lt; <span class='answer'>lamb</span> / <span class='answer'>puppy</span> | <span class='decoy'>happy</span> / <span class='decoy'>yellow</span> &gt;</span></span><span class="white">.</span></div>
    <br>
    <p>Fill the gap - Cloze text</p>
    <br>
    <div class="code">
    <span class="count">1 </span><span class="white">Mary </span>&lt;<span class='answer'>had</span>&gt; <span class="white"> a little</span> &lt;<span class='answer'>lamb</span>&gt;</span> </span><span class="white">.</span></div>
    <br>
    <br>
    <div class="code">
    <span class="count">1 </span><span class="white">Mary </span>&lt;<span class='answer'>did not</span> / <span class='answer'>didn't</span>&gt; <span class="white"> have a little</span> &lt;<span class='answer'>lamb</span>&gt;</span> </span><span class="white">.</span></div>
    <br>
    Spaces within the gaps will be trimmed.The correct answer is always the first string of text in the response but multiple alternative answers can be defined by listing them with / character. </p>
`;
//It's fleece was white as snow