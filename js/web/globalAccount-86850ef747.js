/**
 * Created by website on 06/03/2017.
 */
// $('#close-wishlist').click(function (e) {
//     e.preventDefault();
//     location.reload();
// });
var baseUrl = document.location.origin;

var wishlist_modal = $('#wishlist-modal');
console.log(wishlist_modal.find('#wishlist-folder').val());

if(wishlist_modal.find('#wishlist-folder').val() != 'new'){
    wishlist_modal.find($('#name')).hide();
    wishlist_modal.find($('#name-label')).hide();
    wishlist_modal.find($('#who-can-see')).hide();
    wishlist_modal.find($('#description')).hide();
}

$('body').on('change' ,'#wishlist-folder', function (e) {
    e.preventDefault();
    var This = $(this),
        form = $('#wishlist-modal form');

    if(This.val() != 'new'){
        $('#name').slideUp();
        $('#name-label').slideUp();
        $('#who-can-see').slideUp();
        $('#description').slideUp();
    }
    else {
        $('#name').slideDown();
        $('#name-label').slideDown();
        $('#who-can-see').slideDown();
        $('#description').slideDown();
    }
});

$('#add-to-wishlist-btn').click(function (e) {
    e.preventDefault();
    console.log('wishList');
    var form = $('#wishlist-modal form'),
        method = form.attr('method'),
        url = form.attr('action');
    form.find('.help-block').remove();
    form.find('.form-group').removeClass('has-error');
    form.find('.alert').remove();
    $.ajax({
        url : url,
        method : method,
        data : form.serialize(),
        success : function (response) {
            // if(response == 'success'){
            if(response.message == 'success'){
                form.prepend('<div style="text-align: center;" class="alert alert-success">محصول با موفقیت به علاقه مندی ها اضافه شد</div>');
                form.trigger('reset');
                wishlist_modal.find($('#name')).slideUp();
                wishlist_modal.find($('#name-label')).slideUp();
                wishlist_modal.find($('#who-can-see')).slideUp();
                wishlist_modal.find($('#description')).slideUp();
                $('body').find('.pdpAddToWishlistLink').prop('href', '/models/wishlist?id='+response.id);
                $('body').find('.pdpAddToWishlistLink').children(":first").removeClass('fa fa-heart-o');
                $('body').find('.pdpAddToWishlistLink').children(":first").addClass('fa fa-heart');
                $('body').find('.pdpAddToWishlistLink').children(":first").css('color', '#dc282c');

                $('body').find('#authBar').children().remove();
                $('body').find('#authBar').append('<div id="welcome"><span style="font-weight: bold;">سلام، </span>'+response.username+'</div>');
                $('body').find('#authBar').next().remove();
                $('body').find('#authBar').after('<div id="myAccountMenu">'+
                    '<div style="background: url(/assets/img/new/login.svg); width: 26px; height: 26px; float: right; margin-top: -4px"></div>'+
                    '<a href="/account" style="margin-right: 3px;font-weight: bold;color: #0B3750;" id="myAccountLink">حساب من<span class="down-arrowhead"></span></a>'+
                    '<div id="myAccountLinks">'+
                    '<div class="triangle-up"></div>'+
                    '<ul>'+
                    '<li><a href="/account/#order/">وضعیت سفارش<span class="acct-link-order-status"></span></a></li>'+
                    '<li><a href="/account/#manage-account/">مدیریت حساب <span class="acct-link-manage-account"></span></a></li>'+
                    '<li><a href="/account/#wishlist/" class="sign-in-link">مورد علاقه&zwnj;ها <span class="acct-link-wishlists"></span></a></li>'+
                    '<li><a href="/account/manage/addresses/index.jsp" class="sign-in-link">دفترچه آدرس<span class="acct-link-address-book"></span></a></li>'+
                    '<li class="logout-color"><a href="/logout?next='+baseUrl+'/product/8499">خروج <span class="acct-link-logout"></span></a></li>'+
                    '</ul>'+
                    '</div>'+
                    '</div>');

            }
            else if(response == 'exist') {
                form.prepend('<div style="text-align: center;" class="alert alert-danger">شما قبلا این محصول را به علاقه مندی ها اضافه کرده اید.</div>');
            }
            else if(response == 'existFolder'){
                form.prepend('<div style="text-align: center;" class="alert alert-danger">لیست علاقه مندی با این نام قبلا برای شما ثبت شده؛ لطفا نام دیگری انتخاب نمایید.</div>');
            }
            else if(response.message == 'successAdd'){
                form.prepend('<div style="text-align: center;" class="alert alert-success">محصول با موفقیت به علاقه مندی ها اضافه شد</div>');
                form.trigger('reset');
                wishlist_modal.find($('#name')).slideUp();
                wishlist_modal.find($('#name-label')).slideUp();
                wishlist_modal.find($('#who-can-see')).slideUp();
                wishlist_modal.find($('#description')).slideUp();
                wishlist_modal.find($('#wishlist-folder')).append('<option value="'+response.wishlist.id+'">'+response.wishlist.name+'</option>');
                $('body').find('.pdpAddToWishlistLink').prop('href', '/models/wishlist?id='+response.id);
                $('body').find('.pdpAddToWishlistLink').children(":first").removeClass('fa fa-heart-o');
                $('body').find('.pdpAddToWishlistLink').children(":first").addClass('fa fa-heart');
                $('body').find('.pdpAddToWishlistLink').children(":first").css('color', '#dc282c');
                $('body').find('#authBar').children().remove();
                $('body').find('#authBar').append('<div id="welcome"><span style="font-weight: bold;">سلام، </span>'+response.username+'</div>');
                $('body').find('#authBar').next().remove();
                $('body').find('#authBar').after('<div id="myAccountMenu">'+
                    '<div style="background: url(/assets/img/new/login.svg); width: 26px; height: 26px; float: right; margin-top: -4px"></div>'+
                    '<a href="/account" style="margin-right: 3px;font-weight: bold;color: #0B3750;" id="myAccountLink">حساب من<span class="down-arrowhead"></span></a>'+
                    '<div id="myAccountLinks">'+
                    '<div class="triangle-up"></div>'+
                    '<ul>'+
                    '<li><a href="/account/#order/">وضعیت سفارش<span class="acct-link-order-status"></span></a></li>'+
                    '<li><a href="/account/#manage-account/">مدیریت حساب <span class="acct-link-manage-account"></span></a></li>'+
                    '<li><a href="/account/#wishlist/" class="sign-in-link">مورد علاقه&zwnj;ها <span class="acct-link-wishlists"></span></a></li>'+
                    '<li><a href="/account/manage/addresses/index.jsp" class="sign-in-link">دفترچه آدرس<span class="acct-link-address-book"></span></a></li>'+
                    '<li class="logout-color"><a href="/logout?next='+baseUrl+'/product/8499">خروج <span class="acct-link-logout"></span></a></li>'+
                    '</ul>'+
                    '</div>'+
                    '</div>');

            }
        },
        error : function (xhr) {
            var errors = xhr.responseJSON;
            if($.isEmptyObject(errors) == false){
                $.each(errors, function (key , value) {
                    $('#' + key)
                        .closest('.form-group')
                        .addClass('has-error')
                        .append('<span style="float: right" class="help-block">'+ value+'</span>')
                })
            }
        }

    });
    setTimeout(function(){
        console.log('close');
        $('.modal').modal('hide')
    }, 2000);

});

//////////////// change angle of show detail////////////
$('body').on('click' ,'.show-detail', function (e) {
// $('.show-detail').click(function () {
    var me = $(this);
    me.find('p').addClass('orange');
    // var child = me.find('p').children();
    var child = me.find('p').children().eq(1);
    if(child.hasClass('fa fa-angle-left')){
        child.removeClass('fa fa-angle-left')
            .addClass('fa fa-angle-down');

    }
    else {
        child.removeClass('fa fa-angle-down')
            .addClass('fa fa-angle-left');
        me.find('p').removeClass('orange');
    }
});
////////////End change angle of show detail //////////



/////////////////Edit WishlList Name//////////////////////

$('body').on('click', '.wishlist-panel li a', function (e) {
// $(".wishlist-panel li a").click(function(e){
    e.preventDefault();
    var me = $(this),
        href =  $(this).attr('href'),
        // p =$(href).find('#edit-icon').parent();
        p =$(href).find('#edit-icon');

    if(href != '#allGroups'){
        var form = $(href).find('.wishlist-product-form'),
        method = form.attr('method'),
        url = form.attr('action'),
        wishlist_id = form.attr('data-id');
        // console.log(url);

        $.ajax({
            url : url,
            method : method,
            dataType : 'html',
            data : {'wishlist_id' : wishlist_id},
            success : function (response) {
                $(href).find('#result').html(response);
            }
        });
    }else if(href == '#allGroups'){
        var form = $('#allGroups form'),
            method = form.attr('method'),
            url = form.attr('action');
        console.log(url);
        $.ajax({
            url : url,
            method : method,
            dataType : 'html',
            success : function (response) {
                $('#allGroups').find('#result').html(response);
            }
        });
    }

    // console.log(method);

    $(href).find('#edit-panel').hide();
    $(href).find('#edit-icon').click(function (e) {
        e.preventDefault();
        $(href).find('#edit-panel').slideDown();
    });
    //////////edit wishlist/////////////////
    $(href).find('#save-icon').click(function (e) {
        e.preventDefault();
        var
            // baseUrl = document.location.origin,
            // url = baseUrl+'/account/changeWishlistName',
            // form = $('#edit-panel form'),
            form = $(href).find('form'),
            method = form.attr('method'),
            url = form.attr('action');
            // id = $(href).find('#wishlistId').val(),
            // method = 'POST',
            // name = $(href).find('#name').val();
        $(href).find('.help-block').remove();
        $(href).find('.form-group').removeClass('has-error');

        $.ajax({
            url : url,
            method : method,
            data : form.serialize(),
            // data : {'id' : id , 'name' : name },
            success : function (response) {
                me.text(response.name);
                p.text( " ویرایش " + response.name);
                p.append('<i style="color: #fdb816" title="ویرایش"  class="fa fa-pencil-square-o" aria-hidden="true"></i>');
            },
            error : function (xhr) {
                var errors = xhr.responseJSON;
                console.log(errors);
                if($.isEmptyObject(errors) == false){
                    $.each(errors, function (key , value) {
                        $(href).find('#name')
                            .closest('.form-group')
                            .addClass('has-error')
                            .append('<span class="help-block">'+ value+'</span>');
                    });
                }
            }
        });
    });

    ///////////////end edit wishlist/////////////////////

    /////////////////delete wishlist/////////////////////////

    $(href).find('#remove-icon').click(function (e) {
        e.preventDefault();
        var
            url = $(this).attr('href'),
            method = 'DELETE',
            id = $(href).find('#wishlistId').val(),
            _token =  $('input[name = _token]').val();
        // console.log(url);
        // console.log(id);

        swal({
                title: "آیا از حذف این مورد اطمینان دارید؟",
                text: "توجه داشته باشید که با حذف ؛ امکان برگشت وجود ندارد",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "بله !",
                cancelButtonText: "خیر",
                closeOnConfirm: false,
                closeOnCancel: false

            },
            function(isConfirm){
                if (isConfirm) {
                    $.ajax({
                        url : url,
                        method : method,
                        data : {'_token': _token},
                        success : function (response) {
                            console.log(response);
                            console.log(response.id);
                            me.remove();
                            $(href).remove();
                        }
                    });
                    swal({
                        type: "success",
                        title: "حذف شد!",
                        text: "اطلاعات با موفقیت حذف شد.",
                        timer: 2000,
                        showConfirmButton: false
                    });

                } else {
                    swal({
                        type: "error",
                        title: "کنسل شد!",
                        text: "اطلاعات شما حذف نشد.",
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            });

    });
    /////////////////end delete wishlist/////////////////////

});

$('.delete-wishlist-item-btn').click(function (e) {
    e.preventDefault();
    var url = $(this).attr('href'),
        method = 'DELETE';
    if (url.indexOf("all") > -1)
    {
        var text = "توجه داشته باشید که با حذف ؛ محصول از همه ی لیست ها حذف میشود.";
    }
    else {
        var text = "توجه داشته باشید که با حذف ؛ امکان برگشت وجود ندارد";
    }

    swal({
            title: "آیا از حذف این مورد اطمینان دارید؟",
            // text: "توجه داشته باشید که با حذف ؛ امکان برگشت وجود ندارد",
            text: text,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "بله !",
            cancelButtonText: "خیر",
            closeOnConfirm: false,
            closeOnCancel: false,
        },
        function(isConfirm){
            if (isConfirm) {
    $.ajax({
        url : url,
        method : method,
        success : function (response) {
                        if(response.all == 'yes'){
                            $.each(response.wishlist, function (key , value) {
                                $('#'+response.wishlist[key].id).find('#product-item-'+response.productId).remove();
                            });

                            $('#allGroups').find('#product-item-'+response.productId+'-'+response.wishlistId).remove();
                        }
                        else{
                        $('#'+response.wishlistId).find('#product-item-'+response.productId).remove();
                        $('#allGroups').find('#product-item-'+response.productId+'-'+response.wishlistId).remove();
        }
                    }
    });
                swal({
                    type: "success",
                    title: "حذف شد!",
                    text: "اطلاعات با موفقیت حذف شد.",
                    timer: 2000,
                    showConfirmButton: false
                });

            } else {
                swal({
                    type: "error",
                    title: "کنسل شد!",
                    text: "اطلاعات شما حذف نشد.",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });

});

/////////////////End edit WishlList Name//////////////////////

$('#add-new-group-btn').click(function (e) {
    e.preventDefault();
    var form = $('#add-new-group form'),
        url = form.attr('action'),
        method = form.attr('method');
    form.find('.help-block').remove();
    form.find('.form-group').removeClass('has-error');
    form.find('.alert').remove();

    $.ajax({
        url : url,
        method : method,
        data : form.serialize(),
        success : function (response) {
            $('#add').before('<li><a href="#'+response.id+'" class="wishlist-tab" data-toggle="tab">'+response.name+'</a></li>');
            $('#name-label').before('<div style="text-align: center;margin-top: 20px;" class="alert alert-success">گروه جدید با موفقیت ایجاد شد. </div>');
            // $('#'+response.id).append('<p>zahra</p>');
            $(".tab-content>div:eq(2)").after('<div class="tab-pane fade" id="'+response.id+'">' +
                '<div class="list-name">'+
            '<p id="edit-icon"> ویرایش '+response.name+
            '<i title="ویرایش" class="fa fa-pencil-square-o"  aria-hidden="true"></i>'+
                '</p>'+
                '<div class="form-group" id="edit-panel">'+
            '<form action="/account/changeWishlistName" method="POST">'+
            '<div class="row">'+
            '<div class="col col-md-6">'+
            '<div class="form-group">'+
                '<input type="hidden" id="wishlistId" name="wishlistId" value="'+response.id+'">'+
                '<input type="text" maxlength="40" id="name" value="'+response.name+'" name="name" >'+
                '</div>'+
            '</div>'+
            '<div class="col col-md-6">'+
            '<div class="form-group">'+
            '<div id="who-can-see">'+
            '<p>چه کسی میتواند این لیست را ببیند؟</p>'+
            '<div class="form-group">'+
            '<label>'+
            '<span class="styled-radio"></span>'+
            '<input id="isPublic" type="radio" value="0" name="isPublic" checked >'+
            '<span class="styled-radio"></span>'+
            '<span class="radio-label-text"> فقط من (خصوصی) اشتراک گذاری غیر فعال میشود.</span>'+
            '</label>'+
            '</div>'+
            '<div class="form-group">'+
            '<label>'+
            '<input id="isPublic" type="radio" value="1" name="isPublic" >'+
            '<span class="styled-radio"></span>'+
            '<span class="radio-label-text">همه (عمومی)</span>'+
            '</label>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<button style="margin-left: 5px" id="save-icon" class="btn mybtn-success"> ویرایش لیست <i title="ویرایش" class="fa fa-check-square-o"  aria-hidden="true"></i>  </button>'+
            '<a class="btn btn-orange" id="remove-icon" href="/account/deleteWishlist/'+response.id+'" > حذف لیست <i style="font-size: 15px" title="حذف" class="fa fa-trash" aria-hidden="true"></i>'+
            '</a>'+
            '</form>'+
                '</div>'+
                '</div>'
            );
            $('#list-name').focus();
            form.trigger('reset');
        },
        error : function (xhr) {
            var errors = xhr.responseJSON;
            if($.isEmptyObject(errors) == false){
                $.each(errors, function (key , value) {
                    $('#list-name')
                        .closest('.form-group')
                        .addClass('has-error')
                        .append('<span class="help-block">'+ value+'</span>');
                });
            }
        }
    });
});

///////////////////Order Pagination//////////////////////

$(document).on('click','.pagination a',function (e) {
    e.preventDefault();
    var page = $(this).attr('href').split('page=')[1];
    getOrders(page);
});

function getOrders(page) {
    $.ajax({
        url : '/ajax/orders?page='+page
    }).done(function (data) {
        $('.content').html(data);
        location.hash = page;
    });
}
///////////////////End Order Pagination///////////////////
//# sourceMappingURL=globalAccount.js.map
