$(document).ready(function(){$(window).scroll(function(){$("#orderSummary").css({"margin-top":0,"transition-duration":"0.2s"}),$(document).scrollTop()>=120?($("#orderSummary").css({"margin-top":-$(window).scrollTop(),"transition-duration":"0.2s"}),$(window).scrollTop()+$(window).height()>=$(document).height()?$("#orderSummary").css({"margin-top":-180,"transition-duration":"0.2s"}):$("#orderSummary").css({"margin-top":-180,"transition-duration":"0.2s"})):$("#orderSummary").css({"transition-duration":"0.2s"})}),$("input[type=checkbox]").click(function(){var a="";$('input[name="relatedPrdCheckBox"]:not(:checked)').each(function(){a=a.length>0?a+"-"+this.value:this.value}),a.length>0?location.href="/checkout/?removalRelatedPrd="+a:location.href="/checkout/"})}),$(document).ready(function(){var a=$(".discount-input");a.keyup(function(){a.val($(this).val())});var r=$("#discount-spinner"),e=$("#res-discount-spinner");$("body").find("#offMessage").html(""),$("body").find("#res-offMessage").html(""),$("body").find("#orderSummary #discountOrder").click(function(a){a.preventDefault(),$("body").find("#offMessage").html("");var s=$("#off").val();$("body").find("#amount").val();return""==s&&(s=0),jQuery.ajax({type:"POST",url:"/checkout/discount/"+s,success:function(a){r.fadeIn(100),e.fadeIn(100),setTimeout(function(){r.fadeOut(100,function(){a.msg?($("body").find("#total-amount").html(a.totalPayment-a.value+"تومان "),$("body").find("#offMessage").html(a.msg)):$("body").find("#offMessage").html(a)})},1e3),setTimeout(function(){e.fadeOut(100,function(){a.msg?($("body").find("#res-total-amount").html(a.totalPayment-a.value+"تومان "),$("body").find("#res-offMessage").html(a.msg)):$("body").find("#res-offMessage").html(a)})},1e3)}}),!1}),$("body").find("#orderSummary #melat-img,#orderSummary  #melat-span, #orderSummaryResponsive #melat-img , #orderSummaryResponsive #res-melat-span").click(function(a){a.preventDefault(),$("#payment-send-btn").text("  ثبت سفارش و پرداخت "),$(".res-payment-send-btn").text("  ثبت سفارش و پرداخت "),$("body").find("#orderSummary #melat-img >img, #orderSummaryResponsive #melat-img >img").attr("src","/assets/img/new/melat.svg"),$("body").find("#orderSummary #saderat-img >img, #orderSummaryResponsive #saderat-img >img").attr("src","/assets/img/new/saderat-gray.svg"),$("body").find("#orderSummary #parsian-img >img , #orderSummaryResponsive #parsian-img >img").attr("src","/assets/img/new/parsian-gray.svg"),$("body").find("#orderSummary #melat-span >span , #orderSummaryResponsive #res-melat-span >span").css("color","#0B3750"),$("body").find("#orderSummary #saderat-span >span, #orderSummary #parsian-span >span , #orderSummaryResponsive #sres-saderat-span >span, #orderSummaryResponsive #res-parsian-span >span").css("color","#bbbaba");var r=$("#orderSummary #address-id").val();$.ajax({url:"/checkout/updateOrder",method:"POST",data:{bankName:"mellat",addressId:r},success:function(a){}})}),$("body").find("#orderSummary #saderat-img,#orderSummary #saderat-span, #orderSummaryResponsive #saderat-img, #orderSummaryResponsive res-saderat-span").click(function(a){a.preventDefault(),$("#payment-send-btn").text("  ثبت سفارش و پرداخت "),$("body").find("#orderSummary #saderat-img >img , #orderSummaryResponsive #saderat-img >img").attr("src","/assets/img/new/saderat.svg"),$("body").find("#orderSummary #melat-img >img, #orderSummaryResponsive #melat-img >img").attr("src","/assets/img/new/melat-gray.svg"),$("body").find("#orderSummary #parsian-img >img, #orderSummaryResponsive #parsian-img >img").attr("src","/assets/img/new/parsian-gray.svg"),$("body").find("#orderSummary #melat-span >span,  #orderSummary #parsian-span >span ,#orderSummaryResponsive #res-melat-span >span,  #orderSummaryResponsive #res-parsian-span >span").css("color","#bbbaba"),$("body").find("#orderSummary #saderat-span >span, #orderSummaryResponsive #res-saderat-span >span").css("color","#0B3750");var r=$("#orderSummary #address-id").val();$.ajax({url:"/checkout/updateOrder",method:"POST",data:{bankName:"saderat",addressId:r},success:function(a){}})}),$("body").find("#orderSummary #parsian-img,#orderSummary  #parsian-span, #orderSummaryResponsive #parsian-img,#orderSummaryResponsive  #parsian-span").click(function(a){a.preventDefault(),$("#payment-send-btn").text("  ثبت سفارش و پرداخت "),$("body").find("#orderSummary #parsian-img >img, #orderSummaryResponsive #parsian-img >img").attr("src","/assets/img/new/parsian.svg"),$("body").find("#orderSummary #saderat-img >img , #orderSummaryResponsive #saderat-img >img").attr("src","/assets/img/new/saderat-gray.svg"),$("body").find("#orderSummary #melat-img >img, #orderSummaryResponsive #melat-img >img").attr("src","/assets/img/new/melat-gray.svg"),$("body").find("#orderSummary #parsian-span >span , #orderSummaryResponsive #parsian-span >span").css("color","#0B3750"),$("body").find("#orderSummary #saderat-span >span, #orderSummary #melat-span >span , #orderSummaryResponsive #res-saderat-span >span, #orderSummaryResponsive #res-melat-span >span").css("color","#bbbaba");var r=$("#orderSummary #address-id").val();$.ajax({url:"/checkout/updateOrder",method:"POST",data:{bankName:"parsian",addressId:r},success:function(a){}})})});