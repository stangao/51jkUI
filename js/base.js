/*
 ：active伪类
 兼容ios：这个元素的touchstart/touchend绑定一个空的匿名方法即可成功
 */
$(function(){
	var a=document.getElementsByTagName('a');
    for(var i=0;i<a.length;i++){
       a[i].addEventListener('touchstart',function(){},false);
    };
});

/*
 
 */
(function($){
			$.fn.tabchange=function(){
			var $ele=$(this);
			$ele.on('tap',function(){
		   $(this).addClass('on').siblings().removeClass('on');
	})
				}
			})(Zepto);

/**
 * @author stan 
 * @time 2016-3-30 18:13:40
 * 
 * [jQuery公用弹出层]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 * 
 * options{
 *     popTitle   //弹出层标题
 *     closeBtn   //弹出层关闭按钮
 *     popCent //弹出层内容
 *     isDefault  //是否有取消按钮
 *     callback   //点击确定回调函数
 * }
 */
var screenH=window.screen.height;//屏幕可见区域的高度
var screenW=window.screen.width;//屏幕可见区域的宽度

(function($){
	$.fn.comPopBox = function(options){
		 var settings = $.extend({
		 	winId:'id',
			popTitle : '弹出层标题',
			closeBtn : '#popCloseBtn',
			popCent : '弹出层内容弹出层内容弹出层内容弹出层内容弹出层内容弹出层内容弹出层内容弹出层内容弹出层内容弹出层内容弹出层内容弹出层内容',
			operateBut1:'确定',
			operateBut2:'取消',
			isDefault : true,
			isClickPop : true,//是否点击触发，默认点击触发
			callback : function(){}
		},options || {});
		
		var eleContent = $(this),
				popHtml = "",
			  eleCloseBtn = $(settings.closeBtn);
			  

		var showPopLayer = {
			init : function(){
				popHtml = '<div class="popBox" id="popBox">'
											+'<div class="popCover"></div>'
											+'<div class="popCent" >'
												+'<div class="popTitle">'+settings.popTitle+'</div>'
												+'<div class="popClose"></div>'
												+'<p class="popContent">'+settings.popContent+'</p>'
												+'<div class="popBtnArea flex-cont flex-simple">'
											    +'<button class="popSureBtn ">'+settings.operateBut1+'</button>'
												+'<button class="popDefaultBtn flex-item">'+settings.operateBut2+'</button>'
												+'</div>'
											+'</div>'
										+'</div>'
				
				if(settings.isClickPop){//如果点击触发
					eleContent.on('click',function(){
						if(!$("#popBox").attr('id')){
							$('body').append(popHtml);	
							var tkh=$('.popCent').outerHeight();							
                             var tkw=$('.popCent').outerWidth();                           
                             var toph=(screenH-tkh)/2;
                             var leftw=(screenW-tkw)/2;
							 $('.popCent').css({
	                         "top":toph+'px',
	                        "left":leftw+'px'
                                   })
							 $('.popCent').attr("id",settings.winId+'s');
						}		
					});
				}else{
					if(!$("#popBox").attr('id')){
						$('body').append(popHtml);	
						var tkh=$('.popCent').outerHeight();
                             var tkw=$('.popCent').outerWidth();
                             var toph=(screenH-tkh)/2;
                             var leftw=(screenW-tkw)/2;
							 $('.popCent').css({
	                         "top":toph+'px',
	                        "left":leftw+'px'
                                   })
					}	
				}
				showPopLayer.eventFunction();
			},
			eventFunction : function(){
				$(document).on('click','.popDefaultBtn',function(){
					//返回到顶部执行回调函数
					$(".popBox").remove();
				});
				$(document).on('click','#'+ settings.winId +'s' +' .popSureBtn',function(){					
				/*$(document).delegate('#' + settings.winId + '.popSureBtn', 'click',function(){*/
					//返回到顶部执行回调函数
					if(settings.callback && typeof settings.callback === 'function'){
						settings.callback();	
					}
				});
			}
		};
		showPopLayer.init();
	}
})(Zepto);