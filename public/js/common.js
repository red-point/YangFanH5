window.baseURL = 'http://42.159.246.214:8080/rest/rest/'; //接口基准位置

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {return pair[1];}
    }
    return false;
}

Handlebars.registerHelper('praiseMark', function (conditional, options) {
    conditional = Number(conditional);
    if (conditional) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('contentType', function (type, options) {
    if (type == "Program") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

$.ajax({
    url:      baseURL + 'users/login',
    method:   'POST',
    dataType: 'json',
    async:    false,
    data:     {
        LoginType: 1,
        LoginName: 'hezhoujun'
    },
    success:  function (data) {
        $.ajaxSetup({
            data: {
                'UserID':    data.User.ID,
                'UserToken': data.UserToken
            }
        });
    }
});
$(document).on('click', '.commend-wrap i', function (e) {
    var data = $(this).data();
    $.ajax({
        url: baseURL + 'contents/addpraise',
        dataType: 'json',
        data: {
            ContentID: data.contentId,
            CommentID: data.commentId
        }
    }).done(function (data) {
        $(e.currentTarget).toggleClass('current').next().html(data.ResultRecord);
    })
});

$(document).on('click', '#send', function (e) {
    var data = $(this).data();
    $.ajax({
        url: baseURL + 'contents/addpraise',
        dataType: 'json',
        data: {
            ContentID: data.contentId,
            CommentID: data.commentId
        }
    }).done(function (data) {
        $(e.currentTarget).toggleClass('current').next().html(data.ResultRecord);
    })
});