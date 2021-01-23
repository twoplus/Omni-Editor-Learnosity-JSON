var json_question_types = {
    "mcq" : {
        "options": [{
            "label": "[Choice A]",
            "value": "0"
        }, {
            "label": "[Choice B]",
            "value": "1"
        }, {
            "label": "[Choice C]",
            "value": "2"
        }],
        "stimulus": "<p>[This is the stem.]</p>",
        "type": "mcq",
        "validation": {
            "scoring_type": "exactMatch",
            "valid_response": {
                "score": 1,
                "value": ["0"]
            }//,
//            "alt_responses": [{
//                "score": 1,
//                "value": ["1"]
//            }]
        },
        "ui_style": {
            "type": "horizontal"
            //,"columns": 3
    
        },
        //"multiple_responses": true,
        "shuffle_options": true
    },
    "clozeassociation" : {
        "possible_responses": ["Choice A", "Choice B", "Choice C"],
        "response_container": {
            "pointer": "left"
        },
        "stimulus": "<p>[This is the stem.]</p>",
        "template": "Risus {{response}}, et tincidunt&nbsp;&nbsp;{{response}} dignissim.",
        "type": "clozeassociation",
        "case_sensitive": true,
        "validation": {
            "scoring_type": "exactMatch",
            "valid_response": {
                "score": 1,
                "value": ["Choice A", "Choice C"]
            },
            "alt_responses": [{
                "score": 1,
                "value": ["Choice A", "Choice B"]
            }]
        },
        "duplicate_responses": true,
        "shuffle_options": true
    },
    "clozedropdown": {
        "possible_responses": [
            ["Choice A", "Choice B", "Choice C"],
            ["Choice D", "Choice E", "Choice F"]
        ],
        "response_container": {
            "pointer": "left"
        },
        "stimulus": "<p>[This is the stem.]</p>",
        "template": "Risus {{response}},&nbsp;&nbsp;{{response}} dignissim.",
        "type": "clozedropdown",
        "case_sensitive": true,
        "validation": {
            "scoring_type": "exactMatch",
            "valid_response": {
                "score": 1,
                "value": ["Choice A", "Choice E"]
            },
            "alt_responses": [{
                "score": 1,
                "value": ["Choice A", "Choice C"]
            }, {
                "score": 1,
                "value": ["Choice A", "Choice A"]
            }]
        },
        "shuffle_options": true
    },
    "clozetext":{
        "stimulus": "<p>[This is the stem.]</p>",
        "template": "Risus {{response}}, et tincidunt turpis facilisis&nbsp;{{response}} dignissim.",
        "type": "clozetext",
        "validation": {
            "scoring_type": "exactMatch",
            "valid_response": {
                "score": 1,
                "value": ["answer_1", "answer_2"]
            },
            "alt_responses": [{
                "score": 1,
                "value": ["answer_1B", "answer_2B"]
            }]
        }
    },
    "orderlist": {
        "list": ["[Choice A]", "[Choice B]", "[Choice C]", "[Choice D]"],
        "stimulus": "<p>[This is the stem.]</p>",
        "type": "orderlist",
        "validation": {
            "scoring_type": "exactMatch",
            "valid_response": {
                "score": 1,
                "value": [1, 2, 3, 0]
            },
            "alt_responses": [{
                "score": 1,
                "value": [1, 2, 0, 3]
            }]
        },
        "ui_style": {
            "type": "inline",
            "show_drag_handle": false
        },
        "shuffle_options": true
    },
    "classification":{
        "possible_responses": ["[Choice A]", "[Choice B]", "[Choice C]", "[Choice D]"],
        "stimulus": "<p>[This is the stem.]</p>",
        "type": "classification",
        "ui_style": {
            "column_count": 2,
            "column_titles": ["COLUMN 1", "COLUMN 2"]
        },
        "validation": {
            "scoring_type": "exactMatch",
            "valid_response": {
                "score": 1,
                "value": [
                    [0, 1],
                    [2, 3]
                ]
            },
            "alt_responses": [{
                "score": 1,
                "value": [
                    [0, 1],
                    [0, 2, 3]
                ]
            }]
        },
        "shuffle_options": true,
        "duplicate_responses": true
    },
    "association": {
        "possible_responses": ["[Choice A]", "[Choice B]", "[Choice C]"],
        "stimulus": "<p>[This is the stem.]</p>",
        "stimulus_list": ["[Stem 1]", "[Stem 2]", "[Stem 3]"],
        "type": "association",
        "validation": {
            "scoring_type": "exactMatch",
            "valid_response": {
                "score": 1,
                "value": ["[Choice A]", "[Choice B]", "[Choice C]"]
            },
            "alt_responses": [{
                "score": 1,
                "value": ["[Choice A]", "[Choice C]", "[Choice B]"]
            }]
        },
        "ui_style": {
            "show_drag_handle": false
        },
        "shuffle_options": true
    },
    "shorttext": {
        "stimulus": "<p>[This is the stem.]</p>",
        "type": "shorttext",
        "validation": {
            "scoring_type": "exactMatch",
            "valid_response": {
                "score": 1,
                "value": "This is the answer text."
            },
            "alt_responses": [{
                "score": 1,
                "value": "Here is the answer text."
            }]
        }
    },
    "tokenhighlight": {
        "stimulus": "<p>[This is the stem.]</p>",
        "template": "<p>Risus et tincidunt <span class=\"lrn_token\">YES</span> / <span class=\"lrn_token\">NO</span> / <span class=\"lrn_token\">MAYBE</span>&nbsp;facilisis.</p>\n\n<p>&nbsp;</p>\n",
        "tokenization": "custom",
        "type": "tokenhighlight",
        "validation": {
            "scoring_type": "exactMatch",
            "valid_response": {
                "score": 1,
                "value": [0]
            },
            "alt_responses": [{
                "score": 1,
                "value": [0, 2]
            }]
        }
    },
    "passage": {
        "type": "sharedpassage",
        "heading": "[Heading]",
        "content": "[Enter passage content here.]"
    }
}
var qt_list = {
      mcq: '<option value="mcq" selected>Multiple Choice</option>',
      association: '<option value="association">Association</option>',
      clozeassociation: '<option value="clozeassociation">Cloze Association</option>',
      clozedropdown: '<option value="clozedropdown">Cloze Drop Down</option>',
      clozetext: '<option value="clozetext">Cloze Text</option>',
      orderlist: '<option value="orderlist">Order List</option>',
      classification: '<option value="classification">Classification</option>',
      shorttext: '<option value="shorttext">Short Text</option>',
      tokenhighlight: '<option value="tokenhighlight">Token Highlight</option>',
      feature: '<option value="feature">Passage</option>'
}
var qt_filter = {
    decoy_cloze: ["clozedropdown", "clozeassociation", "clozetext", "association","mcq", "tokenhighlight", "orderlist"],
    decoy_multi: ["mcq", "clozeassociation", "tokenhighlight", "orderlist", "clozedropdown"],
    plain_cloze: [ "clozetext","shorttext", "association"],
    extra: ["classification"]
}
//IF decoy: "mcq", "association", "clozeassociation", "tokenhighlight", , "orderlist", "clozedropdown"
//IF cloze: "clozedropdown", "clozeassociation", "clozetext", "association", "classification"
//IF multiple questions: "shorttext","mcq", "clozeassociation", "tokenhighlight", , "orderlist", "clozedropdown"
//IF  column/extra: "classification"

