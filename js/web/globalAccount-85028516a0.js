function wishlistTask(){var i=$("#wishlist-modal form"),e=i.attr("method"),a=i.attr("action");i.find(".help-block").remove(),i.find(".form-group").removeClass("has-error"),i.find(".alert").remove(),$.ajax({url:a,method:e,data:i.serialize(),success:function(e){"success"==e.message?(i.prepend('<div style="text-align: center;" class="alert alert-success">محصول با موفقیت به علاقه مندی ها اضافه شد</div>'),i.trigger("reset"),wishlist_modal.find($("#name")).slideUp(),wishlist_modal.find($("#name-label")).slideUp(),wishlist_modal.find($("#who-can-see")).slideUp(),wishlist_modal.find($("#description")).slideUp(),$("body").find(".pdpAddToWishlistLink").prop("href","/models/wishlist?id="+e.id),$("body").find(".pdpAddToWishlistLink").children(":first").removeClass("fa fa-heart-o"),$("body").find(".pdpAddToWishlistLink").children(":first").addClass("fa fa-heart"),$("body").find(".pdpAddToWishlistLink").children(":first").css("color","#dc282c"),$("body").find("#authBar").children().remove(),$("body").find("#authBar").append('<div id="welcome"><span style="font-weight: bold;">سلام، </span>'+e.username+"</div>"),$("body").find("#authBar").next().remove(),$("body").find("#authBar").after('<div id="myAccountMenu"><div style="background: url(/assets/img/new/login.svg); width: 26px; height: 26px; float: right; margin-top: -4px"></div><a href="/account" style="margin-right: 3px;font-weight: bold;color: #0B3750;" id="myAccountLink">حساب من<span class="down-arrowhead"></span></a><div id="myAccountLinks"><div class="triangle-up"></div><ul><li><a href="/account/#order/">وضعیت سفارش<span class="acct-link-order-status"></span></a></li><li><a href="/account/#manage-account/">مدیریت حساب <span class="acct-link-manage-account"></span></a></li><li><a href="/account/#wishlist/" class="sign-in-link">مورد علاقه&zwnj;ها <span class="acct-link-wishlists"></span></a></li><li><a href="/account/manage/addresses/index.jsp" class="sign-in-link">دفترچه آدرس<span class="acct-link-address-book"></span></a></li><li class="logout-color"><a href="/logout?next='+window.location.href+'">خروج <span class="acct-link-logout"></span></a></li></ul></div></div>')):"exist"==e?i.prepend('<div style="text-align: center;" class="alert alert-danger">شما قبلا این محصول را به علاقه مندی ها اضافه کرده اید.</div>'):"existFolder"==e?i.prepend('<div style="text-align: center;" class="alert alert-danger">لیست علاقه مندی با این نام قبلا برای شما ثبت شده؛ لطفا نام دیگری انتخاب نمایید.</div>'):"successAdd"==e.message&&(i.prepend('<div style="text-align: center;" class="alert alert-success">محصول با موفقیت به علاقه مندی ها اضافه شد</div>'),i.trigger("reset"),wishlist_modal.find($("#name")).slideUp(),wishlist_modal.find($("#name-label")).slideUp(),wishlist_modal.find($("#who-can-see")).slideUp(),wishlist_modal.find($("#description")).slideUp(),wishlist_modal.find($("#wishlist-folder")).append('<option value="'+e.wishlist.id+'">'+e.wishlist.name+"</option>"),$("body").find(".pdpAddToWishlistLink").prop("href","/models/wishlist?id="+e.id),$("body").find(".pdpAddToWishlistLink").children(":first").removeClass("fa fa-heart-o"),$("body").find(".pdpAddToWishlistLink").children(":first").addClass("fa fa-heart"),$("body").find(".pdpAddToWishlistLink").children(":first").css("color","#dc282c"),$("body").find("#authBar").children().remove(),$("body").find("#authBar").append('<div id="welcome"><span style="font-weight: bold;">سلام، </span>'+e.username+"</div>"),$("body").find("#authBar").next().remove(),$("body").find("#authBar").after('<div id="myAccountMenu"><div style="background: url(/assets/img/new/login.svg); width: 26px; height: 26px; float: right; margin-top: -4px"></div><a href="/account" style="margin-right: 3px;font-weight: bold;color: #0B3750;" id="myAccountLink">حساب من<span class="down-arrowhead"></span></a><div id="myAccountLinks"><div class="triangle-up"></div><ul><li><a href="/account/#order/">وضعیت سفارش<span class="acct-link-order-status"></span></a></li><li><a href="/account/#manage-account/">مدیریت حساب <span class="acct-link-manage-account"></span></a></li><li><a href="/account/#wishlist/" class="sign-in-link">مورد علاقه&zwnj;ها <span class="acct-link-wishlists"></span></a></li><li><a href="/account/manage/addresses/index.jsp" class="sign-in-link">دفترچه آدرس<span class="acct-link-address-book"></span></a></li><li class="logout-color"><a href="/logout?next='+window.location.href+'">خروج <span class="acct-link-logout"></span></a></li></ul></div></div>'))},error:function(i){var e=i.responseJSON;0==$.isEmptyObject(e)&&$.each(e,function(i,e){$("#"+i).closest(".form-group").addClass("has-error").append('<span style="float: right" class="help-block">'+e+"</span>")})}}),setTimeout(function(){$(".modal").modal("hide")},2e3)}function getOrders(i){$.ajax({url:"/ajax/orders?page="+i}).done(function(e){$(".content").html(e),location.hash=i})}var baseUrl=document.location.origin,wishlist_modal=$("#wishlist-modal");"new"!=wishlist_modal.find("#wishlist-folder").val()&&(wishlist_modal.find($("#name")).hide(),wishlist_modal.find($("#name-label")).hide(),wishlist_modal.find($("#who-can-see")).hide(),wishlist_modal.find($("#description")).hide()),$("body").on("change","#wishlist-folder",function(i){i.preventDefault();var e=$(this);$("#wishlist-modal form");"new"!=e.val()?($("#name").slideUp(),$("#name-label").slideUp(),$("#who-can-see").slideUp(),$("#description").slideUp()):($("#name").slideDown(),$("#name-label").slideDown(),$("#who-can-see").slideDown(),$("#description").slideDown())}),$("#add-to-wishlist-btn").click(function(i){i.preventDefault(),wishlistTask()}),$("#add-to-wishlist-btn-2").click(function(i){i.preventDefault(),wishlistTask()}),$("body").on("click",".show-detail",function(i){var e=$(this);e.find("p").addClass("orange");var a=e.find("p").children().eq(1);a.hasClass("fa fa-angle-left")?a.removeClass("fa fa-angle-left").addClass("fa fa-angle-down"):(a.removeClass("fa fa-angle-down").addClass("fa fa-angle-left"),e.find("p").removeClass("orange"))}),$("body").on("click",".wishlist-panel li a",function(i){i.preventDefault();var e=$(this),a=$(this).attr("href"),s=$(a).find("#edit-icon");if("#allGroups"!=a){var t=$(a).find(".wishlist-product-form"),n=t.attr("method"),l=t.attr("action"),d=t.attr("data-id");$.ajax({url:l,method:n,dataType:"html",data:{wishlist_id:d},success:function(i){$(a).find("#result").html(i)}})}else if("#allGroups"==a){var t=$("#allGroups form"),n=t.attr("method"),l=t.attr("action");$.ajax({url:l,method:n,dataType:"html",success:function(i){$("#allGroups").find("#result").html(i)}})}$(a).find("#edit-panel").hide(),$(a).find("#edit-icon").click(function(i){i.preventDefault(),$(a).find("#edit-panel").slideDown()}),$(a).find("#save-icon").click(function(i){i.preventDefault();var t=$(a).find("form"),n=t.attr("method"),l=t.attr("action");$(a).find(".help-block").remove(),$(a).find(".form-group").removeClass("has-error"),$.ajax({url:l,method:n,data:t.serialize(),success:function(i){e.text(i.name),s.text(" ویرایش "+i.name),s.append('<i style="color: #fdb816" title="ویرایش"  class="fa fa-pencil-square-o" aria-hidden="true"></i>')},error:function(i){var e=i.responseJSON;0==$.isEmptyObject(e)&&$.each(e,function(i,e){$(a).find("#name").closest(".form-group").addClass("has-error").append('<span class="help-block">'+e+"</span>")})}})}),$(a).find("#remove-icon").click(function(i){i.preventDefault();var s=$(this).attr("href"),t="DELETE",n=($(a).find("#wishlistId").val(),$("input[name = _token]").val());swal({title:"آیا از حذف این مورد اطمینان دارید؟",text:"توجه داشته باشید که با حذف ؛ امکان برگشت وجود ندارد",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"بله !",cancelButtonText:"خیر",closeOnConfirm:!1,closeOnCancel:!1},function(i){i?($.ajax({url:s,method:t,data:{_token:n},success:function(i){e.remove(),$(a).remove()}}),swal({type:"success",title:"حذف شد!",text:"اطلاعات با موفقیت حذف شد.",timer:2e3,showConfirmButton:!1})):swal({type:"error",title:"کنسل شد!",text:"اطلاعات شما حذف نشد.",timer:2e3,showConfirmButton:!1})})})}),$(".delete-wishlist-item-btn").click(function(i){i.preventDefault();var e=$(this).attr("href"),a="DELETE";if(e.indexOf("all")>-1)var s="توجه داشته باشید که با حذف ؛ محصول از همه ی لیست ها حذف میشود.";else var s="توجه داشته باشید که با حذف ؛ امکان برگشت وجود ندارد";swal({title:"آیا از حذف این مورد اطمینان دارید؟",text:s,type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"بله !",cancelButtonText:"خیر",closeOnConfirm:!1,closeOnCancel:!1},function(i){i?($.ajax({url:e,method:a,success:function(i){"yes"==i.all?($.each(i.wishlist,function(e,a){$("#"+i.wishlist[e].id).find("#product-item-"+i.productId).remove()}),$("#allGroups").find("#product-item-"+i.productId+"-"+i.wishlistId).remove()):($("#"+i.wishlistId).find("#product-item-"+i.productId).remove(),$("#allGroups").find("#product-item-"+i.productId+"-"+i.wishlistId).remove())}}),swal({type:"success",title:"حذف شد!",text:"اطلاعات با موفقیت حذف شد.",timer:2e3,showConfirmButton:!1})):swal({type:"error",title:"کنسل شد!",text:"اطلاعات شما حذف نشد.",timer:2e3,showConfirmButton:!1})})}),$("#add-new-group-btn").click(function(i){i.preventDefault();var e=$("#add-new-group form"),a=e.attr("action"),s=e.attr("method");e.find(".help-block").remove(),e.find(".form-group").removeClass("has-error"),e.find(".alert").remove(),$.ajax({url:a,method:s,data:e.serialize(),success:function(i){$("#add").before('<li><a href="#'+i.id+'" class="wishlist-tab" data-toggle="tab">'+i.name+"</a></li>"),$("#name-label").before('<div style="text-align: center;margin-top: 20px;" class="alert alert-success">گروه جدید با موفقیت ایجاد شد. </div>'),$(".tab-content>div:eq(2)").after('<div class="tab-pane fade" id="'+i.id+'"><div class="list-name"><p id="edit-icon"> ویرایش '+i.name+'<i title="ویرایش" class="fa fa-pencil-square-o"  aria-hidden="true"></i></p><div class="form-group" id="edit-panel"><form action="/account/changeWishlistName" method="POST"><div class="row"><div class="col col-md-6"><div class="form-group"><input type="hidden" id="wishlistId" name="wishlistId" value="'+i.id+'"><input type="text" maxlength="40" id="name" value="'+i.name+'" name="name" ></div></div><div class="col col-md-6"><div class="form-group"><div id="who-can-see"><p>چه کسی میتواند این لیست را ببیند؟</p><div class="form-group"><label><span class="styled-radio"></span><input id="isPublic" type="radio" value="0" name="isPublic" checked ><span class="styled-radio"></span><span class="radio-label-text"> فقط من (خصوصی) اشتراک گذاری غیر فعال میشود.</span></label></div><div class="form-group"><label><input id="isPublic" type="radio" value="1" name="isPublic" ><span class="styled-radio"></span><span class="radio-label-text">همه (عمومی)</span></label></div></div></div></div></div><button style="margin-left: 5px" id="save-icon" class="btn mybtn-success"> ویرایش لیست <i title="ویرایش" class="fa fa-check-square-o"  aria-hidden="true"></i>  </button><a class="btn btn-orange" id="remove-icon" href="/account/deleteWishlist/'+i.id+'" > حذف لیست <i style="font-size: 15px" title="حذف" class="fa fa-trash" aria-hidden="true"></i></a></form></div></div>'),$("#list-name").focus(),e.trigger("reset")},error:function(i){var e=i.responseJSON;0==$.isEmptyObject(e)&&$.each(e,function(i,e){$("#list-name").closest(".form-group").addClass("has-error").append('<span class="help-block">'+e+"</span>")})}})}),$(document).on("click",".pagination a",function(i){i.preventDefault();var e=$(this).attr("href").split("page=")[1];getOrders(e)});