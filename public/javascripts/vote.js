$(document).ready(function() {
    $('#right_block').bottom({proximity: 0.02});
    $('#right_block').bind('bottom', function() {
        var obj = $(this);
        if (!obj.data('loading')) {
            obj.data('loading', true);

            $('#right_block').append('<div class="loading"><p>Loading comments...</p></div>');

            setTimeout(function() {
                $('#right_block>div.loading').remove();

                //downloadPics();

                obj.data('loading', false);
            }, 1000);
        }
    });
    $('html,body').animate({scrollTop: 0}, '1');

    showHeader();
    showTabColumn();

    loadTopic();

    loadComment();

    adjustHeight();
});

function adjustHeight(){
    var hsize = $(document).height() - 100;
    $("#left_block").height(hsize);
    $("#right_block").height(hsize);
}

$(window).resize(adjustHeight);

function showHeader() {
    var $div_header_logo = $('<div>',
        {
            "id": "div_header_logo",
            "class": "div_header_logo",
            html: '<a href="#" onclick="readInitPics()">' +
                    '<img src="http://192.168.91.197:3000/images/funpis.40.png" alt="funpis" title="funpis logo" />' +
                  '</a>'
        });
    $('#header').append($div_header_logo);

    var $div_header_search = $('<div>',
        {
            "id": "div_header_search",
            "class": "div_header_search",
            html: '<form action="search" method="post">' +
                    '<input type="search" id="input_header_search" size="50" maxlength="200" class="input_header_search">' +
                    '<input type="submit" id="button_header_search" value="search" class="button_header_search">' +
                  '</form>'
        });
    $('#header').append($div_header_search);

    var $div_header_menu = $('<div>',
        {
            "id": "div_header_menu",
            "class": "div_header_menu"
        });
    $('#header').append($div_header_menu);

    var $div_header_menu_user = $('<div>',
        {
            "id": "div_header_menu_user",
            "class": "div_header_menu_user",
            html: '<a href="#" onclick="showLogin()" class="a_header_menu">Login</a>'
        });
    $div_header_menu.append($div_header_menu_user);

    var $div_header_menu_account = $('<div>',
        {
            "id": "div_header_menu_account",
            "class": "div_header_menu_account",
            html: '<a href="#" onclick="createAccount()" class="a_header_menu">Register</a>'
        });
    $div_header_menu.append($div_header_menu_account);

    var $div_header_menu_account_question = $('<div>',
        {
            "id": "div_header_menu_account_question",
            "class": "div_header_menu_account_question",
            html: '<a href="#" onclick="alert(1)">' +
                    '<img src="http://192.168.91.197:3000/images/question.mark.40.png" alt="question" title="question" />' +
                  '</a>'
        });
    $div_header_menu.append($div_header_menu_account_question);
}

function showTabColumn() {
    $('#column_tab').html(
        '<div class="div_column_tab">ALL</div>' +
        '<div class="div_column_tab">NEWS</div>' +
        '<div class="div_column_tab">ENTERTAINMENT</div>' +
        '<div class="div_column_tab">HOLIDAY</div>' +
        '<div class="div_column_tab">BUEATY</div>'
    );
}

$(function() {
    $('#column_tab div.div_column_tab').click(function() {
        $('#column_tab div.div_column_tab').not(this).each(function(index, element) {
            $(element).removeClass('div_column_tab_on');
        });

        $(this).addClass('div_column_tab_on');
    });
});

function loadTopicPic(div_topic, url) {
    var w, h;
    var wmax = $('#left_block').width() - 10;

    var pic = $('<img />')
        .attr({
            id: url,
            src: url,
            alt: 'liupeng'
        })
        .on('load', function() {
            if (this.complete && this.naturalWidth > 0 && this.naturalHeight > 0) {
                w = this.naturalWidth;
                h = this.naturalHeight;

                if (w > wmax) {
                    h = parseInt((h * wmax) / w);
                    w = wmax;
                }
                this.width = w;
                this.height = h;
            }
        });

    div_topic.append($('<a>',
    {
        href: url,
        html: pic
    }));
}

function loadVoteGraph(div_topic, chart_type, chart_data, chart_options) {
    var w, h;
    var wmax = $('#left_block').width() - 10;

    var myCanvas = $('<canvas/>')
        .attr({
            id: "canvas_vote_graph"
        })
        .width(wmax)
        .height(300);

    div_topic.append(myCanvas);

/*
    var chart_type = "bar";

    var chart_data = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
        }]
    };

    var chart_options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    };
*/

    var myChart = new Chart(myCanvas, {
        type: chart_type,
        data: jQuery.parseJSON(chart_data),
        options: jQuery.parseJSON(chart_options)
    });

    myCanvas.click(
        function(evt){
            var p = myChart.getElementsAtEvent(evt);
            var clickedElementIndex = p[0]["_index"];
            alert(clickedElementIndex);
            var label = myChart.data.labels[clickedElementIndex];
            alert(label);
            var value = myChart.data.datasets[0].data[clickedElementIndex];
            alert(value);
            myChart.data.datasets[0].data[clickedElementIndex] = 18;
            myChart.update();
        }
    );
}

function loadTopicTxt(div_topic, url, txt) {
    div_topic.append($('<a>',
    {
        href: url,
        html: txt
    }));
}

function loadTopic() {
    var $div_topic = $('<div>',
        {
            "class": "topic"
        });

    var $div_title = $('<div>',
    {
        "class": "topic_title",
        "html": '<span style="font-size:1.5em;">abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ<span>'
    });
    $div_topic.append($div_title);

    var $div_topic_head = $('<div>',
        {
            "class": "topic_head"
        });

    $div_topic_head.append('<div class="topic_head_publisher">Run by ' + '@liupeng' + '</div>');

    var $div_countdown = $('<div class="topic_head_countdown"></div>')
        .countdown('2018/02/21 14:13:00', {elapse: false})
        .on('update.countdown', function(event) {
            var totalHours = event.offset.totalDays * 24 + event.offset.hours + 'h';
            if (totalHours < 1) {
                $(this).html('<font color="red">Left ' + 
                             event.strftime(totalHours + ':%Mm:%Ss') +
                             '</font>');
            } else {
                $(this).html('<font color="black">Left ' + 
                             event.strftime(totalHours + ':%Mm:%Ss') +
                             '</font>');
            }
        })
        .on('finish.countdown', function(event) {
            $(this).html('expired');
        });
    $div_topic_head.append($div_countdown);

    $div_topic.append($div_topic_head);

/*
    loadTopicPic($div_topic, picUrl[0]);
    loadTopicTxt($div_topic, picUrl[0], "aaaaaaaaaa");
*/
    var chart_type = "bar";

    var chart_data = '{\
        "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],\
        "datasets": [{\
            "label": "# of Votes",\
            "data": [12, 19, 3, 5, 2, 3],\
            "backgroundColor": [\
                "rgba(255, 99, 132, 0.2)",\
                "rgba(54, 162, 235, 0.2)",\
                "rgba(255, 206, 86, 0.2)",\
                "rgba(75, 192, 192, 0.2)",\
                "rgba(153, 102, 255, 0.2)",\
                "rgba(255, 159, 64, 0.2)"\
            ],\
            "borderColor": [\
                "rgba(255,99,132,1)",\
                "rgba(54, 162, 235, 1)",\
                "rgba(255, 206, 86, 1)",\
                "rgba(75, 192, 192, 1)",\
                "rgba(153, 102, 255, 1)",\
                "rgba(255, 159, 64, 1)"\
            ],\
            "borderWidth": 1\
        }]\
    }';

    var chart_options = '{\
        "scales": {\
            "yAxes": [{\
                "ticks": {\
                    "beginAtZero":true\
                }\
            }]\
        },\
        "legend": {\
            "display": false,\
            "position": "right"\
        },\
        "title": {\
            "display": true,\
            "text": "test vote",\
            "fontSize": 18\
        }\
    }';

    var $div_vote_graph = $('<div>',
    {
        "id": "div_vote_graph",
        "class": "vote_graph"
    })
    loadVoteGraph($div_vote_graph, chart_type, chart_data, chart_options);
    $div_topic.append($div_vote_graph);

    var $div_vote_func = $('<div>',
        {
            "class": "topic_foot",
            html: '<div class="topic_foot_left">' +
                    '<a id="a_shoot" href="#" onclick="clickShoot()"><div class="div_hover_click_shoot"><img height="25" src="http://192.168.91.197:3000/images/camera48.png" alt="SHOOT" title="SHOOT" /></div></a>' +
                    '<div class="div_left_margin" style="font-size:1.2em;">999K</div>' +
                  '</div>' + 
                  '<div class="topic_foot_right">' +
                    '<div class="div_hover_click div_left_margin"><img height="25" src="http://192.168.91.197:3000/images/quote48.png" alt="QUOTE" title="QUOTE" /></div>' +
                    '<div class="div_left_margin" style="font-size:1.2em;">888K</div>' +
                    '<div class="div_hover_click div_left_margin"><img height="30" src="http://192.168.91.197:3000/images/glasses48.png" alt="WATCH" title="WATCH" /></div>' +
                    '<div class="div_left_margin" style="font-size:1.2em;">777K</div>' +
                  '</div>'
        });
    $div_topic.append($div_vote_func);

    var html_vote_graph_legend = '<table style="table-layout:fixed; width:100%; word-wrap:break-word;">' +
        '<colgroup>' +
        '<col style="width:20%;">' +
        '<col style="width:80%;">' +
        '</colgroup>' +
        '<tr>' +
        '<td valign="top">' + 'Red :' + '</td>' +
        '<td valign="top">' + '中国からインターネット経由で日本の通販サイトなどで買い物をした金額が、２０１６年に初めて１兆円を突破したことが経済産業省の調査でわかった。' + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td valign="top">' + 'Blue :' + '</td>' +
        '<td valign="top">' + 'BlueBlueBlue' + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td valign="top">' + 'Yellow :' + '</td>' +
        '<td valign="top">' + '123' + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td valign="top">' + 'Green :' + '</td>' +
        '<td valign="top">' + 'abc' + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td valign="top">' + 'Purple :' + '</td>' +
        '<td valign="top">' + 'abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc' + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td valign="top">' + 'Orange :' + '</td>' +
        '<td valign="top">' + '456' + '</td>' +
        '</tr>' +
        '</table>'
    var $div_vote_graph_legend = $('<div>',
    {
        "class": "vote_graph_legend",
        "html": html_vote_graph_legend
    })
    $div_topic.append($div_vote_graph_legend);

    var $div_vote_topic = $('<div>',
    {
        "class": "vote_topic",
        "html": '<Hr Align="center" Width="80%">vote topic<br>ali<br>egna<br>pnv<br>bgn<br>vba<br>omvnv<br>'
    })
    $div_topic.append($div_vote_topic);

    $('#left_block').empty();
    $('#left_block').append($div_topic);

    /*
    $("#a_shoot").on('click', function() {
        html2canvas($("#div_vote_graph"), {
            onrendered: function(canvas) {
                var vote_image = canvas.toDataURL("image/jpg").replace(/^data:image\/jpg/, "data:application/octet-stream");
                $("#a_shoot").attr("download", "hogehoge.jpg").attr("href", vote_image);
            }
        });
    });
    */

/*
    html2canvas($("#div_vote_graph"), {
        onrendered: function(canvas) {
            vote_canvas = canvas;
        }
    });
*/
    makePopupVoteGraph();

}

function makePopupVoteGraph() {
    var $div_popup_vote_graph = $('<div>',
    {
        "id": "id_div_popup_vote_graph",
        "class": "div_popup_vote_graph",
        "html": '<span id="id_span_close_popup_vote_graph" class="span_close_popup_vote_graph"' +
                '  onclick="document.getElementById(' + '\'id_div_popup_vote_graph\'' + ').style.display=' + '\'none\'' + '">&times;' +
                '</span>' +
                '<img id="id_img_popup_vote_graph" class="img_popup_vote_graph_loading" src="../images/generate_vote_graph.gif">' +
                '<div id="id_div_popup_vote_graph_foot" class="div_popup_vote_graph_foot"></div>'
    })
    $('#left_block').append($div_popup_vote_graph);
}

function waitCanvas() {
    var vote_canvas;

    html2canvas($("#div_vote_graph"), {
        onrendered: function(canvas) {
            alert(11);
            vote_canvas = canvas;
        }
    });

    $("#a_shoot").on('click', function() {
        alert(vote_canvas);
        var vote_image = vote_canvas.toDataURL("image/jpg").replace(/^data:image\/jpg/, "data:application/octet-stream");
        $("#a_shoot").attr("download", "hogehoge.jpg").attr("href", vote_image);
    });
}

/*
var clipboard = new Clipboard('.btn');
clipboard.on('success', function(e) {
    alert(11);
});
clipboard.on('error', function(e) {
    alert(22);
});
*/

function clickShoot() {
/*
    var clipboard = new Clipboard('.div_hover_click_shoot');
    clipboard.on('success', function(e) {
        alert(11);
    });
    clipboard.on('error', function(e) {
        alert(22);
    });
*/


    //$("#id_div_popup_vote_graph").style.display = "block";
    document.getElementById("id_div_popup_vote_graph").style.display = "block";

    html2canvas($("#div_vote_graph"), {
        onrendered: function(canvas) {
            var data_vote_graph = canvas.toDataURL("image/jpg").replace(/^data:image\/jpg/, "data:application/octet-stream");
            //data = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            document.getElementById("id_img_popup_vote_graph").className = "img_popup_vote_graph";
            document.getElementById("id_img_popup_vote_graph").src = data_vote_graph;
            //document.body.appendChild(canvas);
            var html_popup_vote_graph = 
                //'  <a onclick="document.getElementById(' + '\'id_div_popup_vote_graph\'' + ').style.display=' + '\'none\'"><div width="50px" height="20px">CANCEL</div></a>' +
                //'  <div width="100px" height="20px">&nbsp;</div>' +
                '  <a id="a_download" download="hogehoge.png" href=' + data_vote_graph + '><div width="50px" height="20px">DOWNLOAD</div></a>'

            document.getElementById("id_div_popup_vote_graph_foot").innerHTML = html_popup_vote_graph;
        }
    });

            //$("#a_shoot").attr("download", "hogehoge.png").attr("href", data);
/*
new Clipboard('.div_hover_click_shoot', {
    target: function() {
        return canvas;
    text: function() {
        return 'return liupeng';
    }
});
*/
}

var picUrl = [
    "http://192.168.91.197:3000/funimg/einstein01.jpeg",
    "http://192.168.91.197:3000/funimg/trump_bainian.jpg",
    "http://192.168.91.197:3000/funimg/weiqu.jpg",
    "http://192.168.91.197:3000/funimg/zhen.jpg",
    "http://192.168.91.197:3000/funimg/xi.jpg",
    "http://192.168.91.197:3000/funimg/tangseng.fuck.png",
    "http://192.168.91.197:3000/funimg/29.gif",
    "http://192.168.91.197:3000/funimg/beijing.jpg",
];

var json_topic = {
    "id": "123456789012",
    "title": "test topic",
    "author": {
        "name": "liupeng",
        "url": "http://google.com"
    },
    "expire_time": "2018/02/21 14:13:00",
    "publisher": {
        "name": "yahoo",
        "time": "2017/02/21 14:13:00"
    },
    "paragraph": [
        {
            "id": "1234567890a",
            "type": "text",
            "url": "",
        }
    ]
};

var json_db_comment = {
    "comment_id": "1234567890ab",
    "vote_id": "123456789012",
    "publish_time": "2017-04-28T18:43:45+09:00",
    "publisher": {
        "name": "test01",
        "url": "http://yahoo.co.jp",
        "icon": "http://192.168.91.197:3000/funimg/einstein01.jpeg"
    },
    "content": "test comment",
    "parent_id": "none"
};

var json_js_comment = [
    {
        "comment_id": "1234567890aa",
        "publish_time": "2017-04-28T18:43:45+09:00",
        "publisher": {
            "name": "test01",
            "url": "http://yahoo.co.jp",
            "icon": "http://192.168.91.197:3000/funimg/einstein01.jpeg"
        },
        "content": "test comment 1",
        "child": [
            {
            "comment_id": "1234567890ab",
            "publish_time": "2017-04-28T18:43:45+09:00",
            "publisher": {
                "name": "test02",
                "url": "http://yahoo.co.jp",
                "icon": "http://192.168.91.197:3000/funimg/einstein01.jpeg"
                },
            "content": "test comment 2<br>" +
                       "<img src='http://192.168.91.197:3000/funimg/zhen.jpg'/>",
            },
            {
            "comment_id": "1234567890ac",
            "publish_time": "2017-04-28T18:43:45+09:00",
            "publisher": {
                "name": "test03",
                "url": "http://yahoo.co.jp",
                "icon": "http://192.168.91.197:3000/funimg/einstein01.jpeg"
                },
            "content": "test comment 3"
            }
        ]
    },
    {
        "comment_id": "1234567890ba",
        "publish_time": "2017-04-28T18:43:45+09:00",
        "publisher": {
            "name": "test11",
            "url": "http://yahoo.co.jp",
            "icon": "http://192.168.91.197:3000/funimg/einstein01.jpeg"
        },
        "content": "test comment 11",
        "child": [
            {
            "comment_id": "1234567890ac",
            "publish_time": "2017-04-28T18:43:45+09:00",
            "publisher": {
                "name": "test12",
                "url": "http://yahoo.co.jp",
                "icon": "http://192.168.91.197:3000/funimg/einstein01.jpeg"
                },
            "content": "test comment 12"
            }
        ]
    },
    {
        "comment_id": "1234567890ca",
        "publish_time": "2017-04-28T18:43:45+09:00",
        "publisher": {
            "name": "test21",
            "url": "http://yahoo.co.jp",
            "icon": "http://192.168.91.197:3000/funimg/einstein01.jpeg"
        },
        "content": "test comment 21<br>" +
                   "<img src='http://192.168.91.197:3000/funimg/beijing.jpg'/><br>" +
                   "<img src='http://192.168.91.197:3000/funimg/weiqu.jpg'/><br>" +
                   "<img src='http://192.168.91.197:3000/funimg/29.gif'/>",
        "child": null
    }
];

function loadComment() {
    $('#right_block').empty();

    var c_txt = JSON.stringify(json_js_comment);
    var comments = jQuery.parseJSON(c_txt);
    for (var i = 0; i < comments.length; i++) {
        var c = comments[i];

        var $div_comment_set = $('<div>',
        {
            "class": "comment_set"
        });

        var $div_comment = $('<div>',
        {
            "class": "comment"
        });

        var $div_comment_left = $('<div>',
        {
            "class": "comment_left",
            html: '<a href="' + c["publisher"]["url"] + '">' +
                    '<img src="' + c["publisher"]["icon"] + '" width="40px" height="40px" alt="funpis" title="funpis" />' +
                  '</a>'
        });
        $div_comment.append($div_comment_left);

        var $div_comment_right = $('<div>',
        {
            "class": "comment_right"
        });

        var $div_comment_right_top = $('<div>',
        {
            "class": "comment_right_top"
        });
        var $div_comment_right_top_name = $('<div>',
        {
            "class": "comment_right_item",
            html: '<a href="' + c["publisher"]["url"] + '">' + c["publisher"]["name"] + '</a>'
        });
        $div_comment_right_top.append($div_comment_right_top_name);
        var $div_comment_right_top_space = $('<div>',
        {
            "class": "comment_right_item",
            html: '&nbsp;&nbsp;&nbsp;'
        });
        $div_comment_right_top.append($div_comment_right_top_space);
        var $div_comment_right_top_time = $('<div>',
        {
            "class": "comment_right_item",
            html: c["publish_time"]
        });
        $div_comment_right_top.append($div_comment_right_top_time);

        var $div_comment_right_main = $('<div>',
        {
            "class": "comment_right_main",
            html: c["content"]
        });
        $div_comment_right.append($div_comment_right_top);
        $div_comment_right.append($div_comment_right_main);
        $div_comment.append($div_comment_right);

        $div_comment_set.append($div_comment);

        for (var j = 0; c["child"] && j < c["child"].length; j++) {
            var child = c["child"][j];

            var $div_child_comment = $('<div>',
            {
                "class": "comment"
            });

            var $div_child_comment_indent = $('<div>',
            {
                "class": "comment_indent",
                html: '&nbsp;&nbsp;&nbsp;'
            });
            $div_child_comment.append($div_child_comment_indent);

            var $div_child_comment_left = $('<div>',
            {
                "class": "comment_left",
                html: '<a href="' + child["publisher"]["url"] + '">' +
                        '<img src="' + child["publisher"]["icon"] + '" width="40px" height="40px" alt="funpis" title="funpis" />' +
                      '</a>'
            });
            $div_child_comment.append($div_child_comment_left);

            var $div_child_comment_right = $('<div>',
            {
                "class": "comment_right"
            });

            var $div_child_comment_right_top = $('<div>',
            {
                "class": "comment_right_top"
            });
            var $div_child_comment_right_top_name = $('<div>',
            {
                "class": "comment_right_item",
                html: '<a href="' + child["publisher"]["url"] + '">' + child["publisher"]["name"] + '</a>'
            });
            $div_child_comment_right_top.append($div_child_comment_right_top_name);
            var $div_child_comment_right_top_space = $('<div>',
            {
                "class": "comment_right_item",
                html: '&nbsp;&nbsp;&nbsp;'
            });
            $div_child_comment_right_top.append($div_child_comment_right_top_space);
            var $div_child_comment_right_top_time = $('<div>',
            {
                "class": "comment_right_item",
                html: child["publish_time"]
            });
            $div_child_comment_right_top.append($div_child_comment_right_top_time);

            var $div_child_comment_right_main = $('<div>',
            {
                "class": "comment_right_main",
                html: child["content"]
            });
            $div_child_comment_right.append($div_child_comment_right_top);
            $div_child_comment_right.append($div_child_comment_right_main);
            $div_child_comment.append($div_child_comment_right);

            $div_comment_set.append($div_child_comment);

        }

        $('#right_block').append($div_comment_set);
    }



/*
    $('#panel').append('<div style="width:100%; height:100px;"></div>');

    var $div_login_username = $('<div>',
        {
            "id": "div_login_username",
            "class": "account",
            html: '<div class="title">USERNAME</div>' +
                  '<div class="content"><input id="input_username" type="text" size="30" maxlength="200"></div>'
        });
    $('#panel').append($div_login_username);

    var $div_login_password = $('<div>',
        {
            "id": "div_login_password",
            "class": "account",
            html: '<div class="title">PASSWORD</div>' +
                  '<div class="content"><input id="input_password" type="text" size="30" maxlength="200"></div>'
        });
    $('#panel').append($div_login_password);

    var $div_login_button = $('<div>',
        {
            "id": "div_login_button",
            "class": "account",
            html: '<div class="title"><button type=button onclick="clickLogin()">LOGIN</button></div>' +
                  '<div class="content"><button type=button onclick="window.location.reload()">CANCEL</button></div>'
        });
    $('#panel').append($div_login_button);
*/
}

function post(path, params) {
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hidden = document.createElement('input');
            hidden.setAttribute('type', 'hidden');
            hidden.setAttribute('name', key);
            hidden.setAttribute('value', params[key]);
        }
    }

    document.body.appendChild(form);
    form.submit();

    document.body.removeChild(form);
}

function clickLogin() {
    var name = $('#input_username').val();
    var pass = $('#input_password').val();

    post('/login', 
         {username: name,
          password: pass}
        );
}

function loginSuccess() {
    $('#div_header_menu_user').html('<a href="#" onclick="showUserPics()" class="a_header_menu">@liupengliupengliupengliupengliupeng</a>');
    $('#div_header_menu_account').html(
        '<div class="div_header_menu_account_item">' +
          '<a href="#" onclick="clickUserLike()">' +
            '<img src="http://192.168.91.197:3000/images/24/heart2.png" alt="LIKE" title="LIKE" />' +
          '</a>' +
        '</div>' +
        '<div class="div_header_menu_account_item">' +
          '<a href="#" onclick="clickUserStock()">' +
            '<img src="http://192.168.91.197:3000/images/24/stock.png" alt="STOCK" title="STOCK" /></div>' +
          '</a>' +
        '</div>' +
        '<div class="div_header_menu_account_item">' +
          '<a href="#" onclick="clickUserUpload()">' +
            '<img src="http://192.168.91.197:3000/images/24/upload.png" alt="UPLOAD" title="UPLOAD" /></div>' +
          '</a>' +
        '</div>' +
        '<div class="div_header_menu_account_item">' +
          '<a href="#" onclick="clickUserAccount()">' +
            '<img src="http://192.168.91.197:3000/images/24/account.jpg" alt="ACCOUNT" title="ACCOUNT" /></div>' +
          '</a>' +
        '</div>'
    );

    showUserPics();
}

function showUserPics() {
    readInitPics();
}

function clickUserLike() {
    alert(1);
}

function clickUserStock() {
    alert(2);
}

function clickUserUpload() {
    alert(3);
}

function clickUserAccount() {
    alert(4);
}

/*
$(function() {
    $('#account_header div.div_account_button').click(function() {
        alert(1);
        $('#account_header div.div_account_button').not(this).each(function(index, element) {
            $(element).removeClass('div_account_button_on');
        });

        $(this).addClass('div_account_button_on');
    });
});
*/

function showAccount() {
    $('#panel').empty();

    var $div_account_padding = $('<div>',
        {
            "id": "div_account_padding",
            "class": "account"
        });
    $('#panel').append($div_account_padding);

    var $div_account_username = $('<div>',
        {
            "id": "div_account_username",
            "class": "account",
            html: '<div class="title">username</div>' +
                  '<div class="content">@liupeng</div>'
        });
    $('#panel').append($div_account_username);

    var $div_account_password = $('<div>',
        {
            "id": "div_account_password",
            "class": "account",
            html: '<div class="title">password</div>' +
                  '<div class="content"><button type=button onclick="alert(' + '"really reset password"' + ')">reset password</button></div>'
        });
    $('#panel').append($div_account_password);

    var $div_account_mail = $('<div>',
        {
            "id": "div_account_mail",
            "class": "account",
            html: '<div class="title">mail</div>' +
                  '<div class="content"><input id="input_mail" type="text" size="30" maxlength="200" value="tester@example.com"></div>'
        });
    $('#panel').append($div_account_mail);
}

function createAccount() {
    $('#panel').empty();

    var $div_account_padding = $('<div>',
        {
            "id": "div_account_padding",
            "class": "account"
        });
    $('#panel').append($div_account_padding);

    var $div_account_username = $('<div>',
        {
            "id": "div_account_username",
            "class": "account",
            html: '<form action="/register" method="post">' +
                  '<div class="title">username</div>' +
                  '<div class="content"><input id="input_username" type="text" size="30" maxlength="200"></div>'
        });
    $('#panel').append($div_account_username);

    var $div_account_password = $('<div>',
        {
            "id": "div_account_password",
            "class": "account",
            html: '<div class="title">password</div>' +
                  '<div class="content"><input id="input_password" type="text" size="30" maxlength="200"></div>'
        });
    $('#panel').append($div_account_password);

    var $div_account_password_confirm = $('<div>',
        {
            "id": "div_account_password_confirm",
            "class": "account",
            html: '<div class="title">password confirm</div>' +
                  '<div class="content"><input id="input_password_confirm" type="text" size="30" maxlength="200"></div>'
        });
    $('#panel').append($div_account_password_confirm);

    var $div_account_mail = $('<div>',
        {
            "id": "div_account_mail",
            "class": "account",
            html: '<div class="title">mail</div>' +
                  '<div class="content"><input id="input_mail" type="text" size="30" maxlength="200" value="test@example.com"></div>' +
                  '</form>'
        });
    $('#panel').append($div_account_mail);
}
