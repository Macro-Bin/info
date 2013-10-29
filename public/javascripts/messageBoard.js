/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 13-10-17
 * Time: 下午2:38
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    function nullDialog() {
        bootbox.dialog({
            message: '写点东西吧，内容不能为空哦。',
            title: "提示",
            backdrop: false,
            buttons: {
                main: {
                    label: "OK!",
                    className: "btn-primary"
                }
            }
        });
        return false;
    };
    $(".btn.btn-primary").click(function () {
        if ($("#comment").val() == "") {
            nullDialog();
            return false;
        }
        $.ajax({
            type: "POST",
            url: '/comment/create',
            data: {
                "name": $("#name").val(),
                "comment": $("#comment").val(),
                "flag": $("#flag").val()
            }, // serializes the form's elements.
            success: function (data) {
                if (data["isSuccess"]) {
                    if ($("ul.list-group li:eq(0)").length <= 0) {
                        $("ul.list-group").append('<li class="list-group-item">' +
                            '<span class="reply pull-right">' +
                            '<button type="button" class="btn btn-info">回复</button>' +
                            '</span>' +
                            '<ul class="comment-group list-unstyled">' +
                            '<input type="hidden" value="' + data["cid"] + '"/>' +
                            '<li>' + data["content"] + '</li>' +
                            '<li>' + data["createTime"] + '&nbsp' + '<a href="#">@' + data["username"] + '</a></li>' +
                            '<li><ol class="reply-group"></ol></li>' +
                            '</ul>' +
                            '</li>'
                        );
                    } else {
                        $("ul.list-group li.list-group-item:eq(9)").remove();
                        $("ul.list-group li:eq(0)").before(
                            '<li class="list-group-item">' +
                                '<span class="reply pull-right">' +
                                '<button type="button" class="btn btn-info">回复</button>' +
                                '</span>' +
                                '<ul class="comment-group list-unstyled">' +
                                '<input type="hidden" value="' + data["cid"] + '"/>' +
                                '<li>' + data["content"] + '</li>' +
                                '<li>' + data["createTime"] + '&nbsp' + '<a href="#">@' + data["username"] + '</a></li>' +
                                '<li><ol class="reply-group"></ol></li>' +
                                '</ul>' +
                                '</li>'
                        );
                    }
                    $('div.row.paginator').load('/paginator/'+$("#flag").val()+'/update/');
                    $("#name").val("");
                    $("#comment").val("");
                    bootbox.dialog({
                        message: '发表评论成功。',
                        title: "提示",
                        backdrop: false,
                        buttons: {
                            main: {
                                label: "OK!",
                                className: "btn-primary"
                            }
                        }
                    });
                } else {
                    bootbox.dialog({
                        message: '发表评论失败，好像有什么东西混进来了。',
                        title: "提示",
                        backdrop: false,
                        buttons: {
                            main: {
                                label: "OK!",
                                className: "btn-primary"
                            }
                        }
                    });
                }
            }
        });
        return false;
    });
    $("div.main").on("click", '.btn.btn-info', function () {
        $current_ul = $(this).parent().parent("li").children("ul");
        if ($current_ul.children().has("form").length <= 0) {
            $current_ul.append(
                '<div class="row col-md-12 replyDiv">' +
                    '<form class="form-inline" role="form">' +
                    '<div class="form-group col-md-2">' +
                    '<input type="text" class="form-control r_name" id="r_name" placeholder="请填写姓名或者邮箱...">' +
                    '</div>' +
                    '<div class="form-group col-md-9 ">' +
                    '<input type="text" class="form-control r_comment" id="r_comment" placeholder="请输入回复内容...">' +
                    '</div>' +
                    '<button type="submit" class="btn btn-default">回复</button>' +
                    '</form>' +
                    '</div>'
            );
        }
        ;
        return false;
    });

    $("div.main").on("click", '.btn.btn-default', function () {
        $current_ul = $(this).closest("ul");
        var cid = $current_ul.children("input[type='hidden']").val();
        var reply = $current_ul.find(".r_comment").val();
        var r_username = $current_ul.find(".r_name").val();
        if (reply == "") {
            nullDialog();
            return false;
        }
        $.ajax({
            type: "POST",
            url: '/reply/create',
            data: {
                "name": r_username,
                "comment": reply,
                "cid": cid
            },
            success: function (data) {
                if (data["isSuccess"]) {
                    if ($current_ul.find(".reply-group li:last").length <= 0) {
                        $current_ul.find(".reply-group").append('<li>' +
                            data["content"] + "<br>" +
                            data["createTime"] + "&nbsp" +
                            '<a href="#">@' + data["username"] + '</a></li>');
                    } else {
                        $current_ul.find(".reply-group li:last").after('<li>' +
                            data["content"] + "<br>" +
                            data["createTime"] + "&nbsp" +
                            '<a href="#">@' + data["username"] + '</a></li>');
                    }
                    $current_ul.find(".r_comment").val("");
                    $current_ul.find(".r_name").val("");
                    $current_ul.find(".replyDiv").remove();
                    bootbox.dialog({
                        message: '回复成功。',
                        title: "提示",
                        backdrop: false,
                        buttons: {
                            main: {
                                label: "OK!",
                                className: "btn-primary"
                            }
                        }
                    });
                } else {
                    bootbox.dialog({
                        message: '回复失败，好像有什么东西混进来了。',
                        title: "提示",
                        backdrop: false,
                        buttons: {
                            main: {
                                label: "OK!",
                                className: "btn-primary"
                            }
                        }
                    });
                }
            }
        });
        return false;
    });
});