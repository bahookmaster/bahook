function textCounter(e,t,i){var n=document.getElementById(t);return e.value.length>i?(e.value=e.value.substring(0,i),!1):void(n.value=i-e.value.length)}$(document).ready(function(){$("#searchImageblog").click(function(){$("#mob").hide(),$(".navbar-toggle").hide(),$("#shoppingBag").hide(),$("#expandbox").show(),$("#searchImageblog").css({visibility:"hidden"}),$("#searchForm").css({"margin-top":"30px"}),$("#cancel").show()}),$("#cancel").click(function(){$("#mob").show(),$("#shoppingBag").show(),$(".navbar-toggle").show(),$("#expandbox").hide(),$("#searchImageblog").css({visibility:"visible"}),$("#cancel").hide()});var e=$("#bs-example-navbar-collapse-1").outerWidth(),t=$("#widthMyTextMenu").outerWidth(),i=$("#MySearch").outerWidth(),n=t+i,o=e-n;$(window).width()<768&&($("#globalHeader").css("visibility","hidden"),$(".marginInSize").css("margin-top","-54px")),$(window).width()>768&&($("#widthMyTextMenu").css("padding-right",o/2),$("ul li a").hover(function(){$(".dropdown-menu").css("padding-right",o/2)})),$(window).width()<=768&&($("#navreview").addClass("navbar-fixed-top"),$("#marginInMobile").css("visibility","visible")),$(window).width()>768&&($("#marginInMobile").css("visibility","hidden"),$("#marginInMobile").css("display","none")),$(window).scroll(function(){if($(window).width()<=768){$("#review-nav");$(document).scrollTop()<=85?($("#review-nav").addClass("fixedMenu"),$(".review-base-menu img#mob").addClass("logoMobile"),$("#searchImage").addClass("searchImage")):($("#review-nav").removeClass("fixedMenu"),$(".review-base-menu img#mob").removeClass("logoMobile"),$("#searchImage").removeClass("searchImage"))}}),$(document).ready(function(){jQuery("body").bind("click",function(e){if(0==jQuery(e.target).closest(".navbar").length){var t=jQuery(".navbar-collapse").hasClass("in");t===!0&&(jQuery(".navbar-collapse").collapse("hide"),$(".menuReviewHoverSm").css({display:"none",visibility:"hidden"}))}})}),$(".myDelay").hover(function(){$(".menuReviewHoverSm").css({display:"block"})}),$(".myDelay").mouseleave(function(){$(".menuReviewHoverSm").css({display:"none"})});var s=!1;$(".myDelay1").click(function(){setTimeout(function(){s||(s=!0,$(".myDelay1").hasClass("collapsed")===!1?$(".menuReviewHoverSm").css({display:"block",visibility:"visible"}):$(".menuReviewHoverSm").css({display:"none",visibility:"hidden"}),s=!1)},50)}),$(document).ready(function(){if($(window).width()>767){var e;$(".dropdown-toggle").hover(function(){var t=$(this).attr("id"),i=$(this).outerWidth();$(this).css({"padding-right":"15px","padding-left":"15px","transition-delay":"0.3s"});var n=parseInt(i)/2,o=t.split("-"),s=o[1];$(".up-arrow"+s).css({"margin-right":parseInt(n)-5,"margin-left":parseInt(n),visibility:"visible","text-align":"center","transition-delay":"0.3s",cursor:"pointer",content:"",display:"block",position:"absolute",top:"75%",width:"0",height:"0",border:"5px solid transparent","border-bottom-color":"#febe1b"}),$(this).css({"transition-delay":"0.3s","border-bottom":"1px solid #FEBE1B",color:"rgb(255,186,37) !important;"});var a=$(this).parent(".dropdown");e=setTimeout(function(){a.addClass("open"),$(".menuReviewHoverSm").css({visibility:"visible"})},300)},function(){clearTimeout(e);var t=$(this).parent(".dropdown"),i=$(this).attr("id"),n=i.split("-"),o=n[1];$(".up-arrow"+o).css({"transition-delay":"0.0001s",visibility:"hidden",content:"",display:"block",position:"absolute",top:"75%",width:"0",height:"0",border:"5px solid transparent","border-bottom-color":"#febe1b"}),$(this).css({"transition-delay":"0.0001s","border-bottom":"none"}),e=setTimeout(function(){t.removeClass("open"),$(".menuReviewHoverSm").css({visibility:"hidden"})},100),$(".dropdown-menu").hover(function(){clearTimeout(e)},function(){setTimeout(function(){t.removeClass("open")},100)})})}}),$(".submenu").hover(function(e){var t=$(this).attr("id"),i=t.split("-"),n=i[1];$(".up-arrow"+n).css({cursor:"pointer",visibility:"visible","text-align":"center",content:"",display:"block",position:"absolute",top:"75%",width:"0",height:"0",border:"5px solid transparent","border-bottom-color":"#febe1b"}),$("#tagAInAMenu-"+n).css({"border-bottom":"1px solid #FEBE1B"})}),$(".submenu").mouseleave(function(e){var t=$(this).attr("id"),i=t.split("-"),n=i[1];$(".up-arrow"+n).css({visibility:"hidden",content:"",display:"block",position:"absolute",top:"75%",width:"0",height:"0",border:"5px solid transparent","border-bottom-color":"#febe1b"}),$("#tagAInAMenu-"+n).css({"border-bottom":"none"})})}),jQuery(document).ready(function(e){e(".videoBox").click(function(){this.paused?this.play():this.pause()})}),$("#logincomment").click(function(){var e=$("#logincomment").attr("href");$("#logincomment").attr("href",e+"/"+$(".comment").val())}),$(".reviewcommentId").unbind("click").click(function(){var e=$(this).attr("id");$.ajax({type:"post",url:"/likeComment",data:{commentId:e,_token:$("#token").val()},success:function(t){var i=$("#"+e+".counterLike");i.attr("id")===e&&(i.html(t.like),i.val(t.like));var n=$("#"+e+".counterdisLike");n.attr("id")===e&&(n.html(t.dislike),n.val(t.dislike))}})}),$(".reviewdisLike").unbind("click").click(function(){var e=$(this).attr("id");$.ajax({type:"post",url:"/dislikeComment",data:{commentId:e,_token:$("#token").val()},success:function(t){var i=$("#"+e+".counterdisLike");i.attr("id")===e&&(i.html(t.dislike),i.val(t.dislike));var n=$("#"+e+".counterLike");n.attr("id")===e&&(n.html(t.like),n.val(t.like))}})}),$(".commentlevel2").unbind("click").click(function(){var e=$(this).attr("id");$.ajax({type:"post",url:"/likeComment",data:{commentId:e,_token:$("#token").val()},success:function(t){var i=$("#"+e+".counterLike2");i.attr("id")===e&&(i.html(t.like),i.val(t.like));var n=$("#"+e+".counterdisLike2");n.attr("id")===e&&(n.html(t.dislike),n.val(t.dislike))}})}),$(".commentdislikelevel2").unbind("click").click(function(){var e=$(this).attr("id");$.ajax({type:"post",url:"/dislikeComment",data:{commentId:e,_token:$("#token").val()},success:function(t){var i=$("#"+e+".counterdisLike2");i.attr("id")===e&&(i.html(t.dislike),i.val(t.dislike));var n=$("#"+e+".counterLike2");n.attr("id")===e&&(n.html(t.like),n.val(t.like))}})}),$(".sendCommentreview").on("click",function(){var e=$(this).attr("id");$.ajax({type:"post",url:"/storecomment",data:{articleId:e,comment:$(".comment").val(),_token:$("#token").val()},success:function(e){$(".comment").val(""),"کاربر گرامی نظر شما به ثبت رسیده است.بعد از تایید مدیر در سایت به نمایش در می آید."===e?swal({title:e,type:"warning",timer:3e3,showCancelButton:!1,showConfirmButton:!1}):swal({title:e,type:"success",timer:3e3,showCancelButton:!1,showConfirmButton:!1})},error:function(e){swal({title:JSON.parse(e.responseText).comment,showCancelButton:!1,showConfirmButton:!1,type:"error",timer:2e3})}})}),$(".sendCommentreply").on("click",function(){var e=$(this).attr("id"),t=$("#articleId").val();$.ajax({type:"post",url:"/storecommentreply",data:{commentId:e,articleId:t,comment:$("#"+e+".ReplyComment").val(),_token:$("#token").val()},success:function(t){$("#"+e+".ReplyComment").val(""),swal({title:t,type:"success",timer:3e3,showCancelButton:!1,showConfirmButton:!1})},error:function(e){swal({title:JSON.parse(e.responseText).comment,showCancelButton:!1,showConfirmButton:!1,type:"error",timer:2e3})}})}),$(".ReplyComment").on("keydown",function(){function e(){var e=i.val().length;n.text(e),n.val(e)}var t=$(this).attr("id"),i=$("#"+t+".ReplyComment"),n=$("#"+t+".ReplyCounter");i.keyup(e),i.keydown(e)}),$(".comment").on("keydown",function(){function e(){var e=t.val().length;i.val(e),e>0?($("#logincomment").removeAttr("disabled"),$("#logincomment").css("cursor","pointer")):($("#logincomment").attr("disabled","disabled"),$("#logincomment").css("cursor","no-dorp"))}var t=$(".comment"),i=$(".counter");t.keyup(e),t.keydown(e)}),$(".btnd").click(function(){$(".btnd").css("border","0")}),$(".pagination li a").click(function(e){$(this).attr("href",$(this).attr("href")+"#lastestarticles"),$("#lastestarticles").attr("id",$(this).attr("href"))}),$(".logincommentreply").click(function(e){var t=$(this).attr("href");commentId=t.split("/")[5],$(".logincommentreply").attr("href",t+"/"+$("#"+commentId+".ReplyComment").val())}),$(".parentMainText").find("img").addClass("img-responsive"),$(".parentMainText").find("img").css({margin:"auto"});