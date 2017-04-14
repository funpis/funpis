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
});

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

function loadVoteGraph(div_topic) {
    var w, h;
    var wmax = $('#left_block').width() - 10;

    var myCanvas = $('<canvas/>')
        .width(wmax)
        .height(500);

    div_topic.append(myCanvas);

    var chart_type = "bar";

    var chart_data = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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

    var myChart = new Chart(myCanvas, {
        type: chart_type,
        data: chart_data,
        options: chart_options
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

    var $div_topic_head = $('<div>',
        {
            "class": "topic_head"
        });

    $div_topic_head.append('<div class="topic_head_publisher">@liupeng</div>');

    var $div_countdown = $('<div class="topic_head_countdown"></div>')
        .countdown('2018/02/21 14:13:00', {elapse: false})
        .on('update.countdown', function(event) {
            var totalHours = event.offset.totalDays * 24 + event.offset.hours;
            if (totalHours < 1) {
                $(this).html('<font color="red">' + 
                             event.strftime(totalHours + ':%M:%S') +
                             '</font>');
            } else {
                $(this).html('<font color="black">' + 
                             event.strftime(totalHours + ':%M:%S') +
                             '</font>');
            }
        })
        .on('finish.countdown', function(event) {
            $(this).html('expired');
        });
    $div_topic_head.append($div_countdown);

    $div_topic.append($div_topic_head);

    var $div_title = $('<div>',
    {
        "class": "topic_title",
        "html": "<span>abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ<span>"
    })
    $div_topic.append($div_title);

/*
    loadTopicPic($div_topic, picUrl[0]);
    loadTopicTxt($div_topic, picUrl[0], "aaaaaaaaaa");
*/
    loadVoteGraph($div_topic);

    var $div_topic_foot = $('<div>',
        {
            "class": "topic_foot",
            html: '<div class="topic_foot_left">' +
                    '<div class="div_hover_click"><img src="http://192.168.91.197:3000/images/24/heart1.png" alt="UP" title="UP" /></div>' +
                    '<div class="div_left_margin" style="font-size:1.5em;">999K</div>' +
                  '</div>' + 
                  '<div class="topic_foot_right">' +
                    '<div class="div_hover_click div_left_margin"><img src="http://192.168.91.197:3000/images/24/channel.png" alt="COMMENT" title="COMMENT" /></div>' +
                    '<div class="div_left_margin" style="font-size:1.5em;">888K</div>' +
                    '<div class="div_hover_click div_left_margin"><img src="http://192.168.91.197:3000/images/24/forward.png" alt="SEND" title="SEND" /></div>' +
                    '<div class="div_left_margin" style="font-size:1.5em;">777K</div>' +
                  '</div>'
        });
    $div_topic.append($div_topic_foot);

    $('#left_block').empty();
    $('#left_block').append($div_topic);
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

var topic = {
    "id": "1234567890",
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
}

function loadComment() {
    $('#right_block').empty();

    var $div_comment_a = $('<div>',
        {
            "class": "comment_a"
        });

    $div_comment_a.append('first comment');

    $('#right_block').append($div_comment_a);

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
