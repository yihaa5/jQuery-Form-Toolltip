(function ($){ 

var _calloutCss;
var _padding = 8;
var _color = "#FFFFFF";
var _bgColor = "#000000";
var _tooltipOffset = 5;
var _tooltipOffsetAnimate = 5;
var _animteSpeed = 500;
var _fontSize = 12;

var TOP = "top";
var BOTTOM = "bottom";
var LEFT = "left";
var RIGHT = "right";

var _borderRadius = 5;

$.fn.formtoolip = function(param, css){
	var _this = this;
	
	//Update Global Style
	_color = typeof(css.color) == 'undefined' ? _color : css.color;
	_padding = typeof(css.padding) == 'undefined' ? _padding : css.padding;
	_bgColor = typeof(css.backgroundColor) == 'undefined' ? _bgColor : css.backgroundColor;
	_fontSize = typeof(css.fontSize) == 'undefined' ? _fontSize : css.fontSize;
	_borderRadius = typeof(css.borderRadius) == 'undefined' ? _borderRadius : css.borderRadius;
	
	$.each(param, function(a,b){

		var input = $(_this).find("[name="+a+"]");

		if(typeof(b.position) === 'undefined')
		{
			//default to top;
			b.position = TOP;
		}	
						
		if(input.length)
		{
			$(input).after("<span data-dir='" + 
			b.position + "' style='display:none;'>" + b.tooltip + "</span>");
			
			
			var tooltip = $(input).next();
			
			//Styling
			$(tooltip).css({
				color : typeof(b.color) == 'undefined' ? _color : b.color,
				fontSize: typeof(b.fontSize) == 'undefined' ? _fontSize : b.fontSize,
				backgroundColor : typeof(b.backgroundColor) == 'undefined' ? _bgColor : b.backgroundColor,
				padding : _padding,
				borderRadius : _borderRadius
			});
			
			
			var fadeInTop,fadeOutTop,fadeInLeft,fadeOutLeft;
			
			$(input).focusin(function(){
				
				var inputHeight = Number($(input).outerHeight());
				var inputWidth = Number($(input).outerWidth());
				var tooltipHeight = Number($(tooltip).outerHeight());
				var tooltipWidth = Number($(tooltip).outerWidth());
				var deltaWidth = inputWidth - tooltipWidth;
				var deltaHeight = inputHeight - tooltipHeight;
				var position = $(this).position();
				
				var t,l;
				if(b.position == BOTTOM)
				{
					t = $(this).position().top + inputHeight + _tooltipOffset;
					l = $(this).position().left + deltaWidth/2;
					fadeInTop = "+="+_tooltipOffsetAnimate;
					fadeOutTop = "-="+_tooltipOffsetAnimate;
				}
				else if (b.position == LEFT)
				{
					t = $(this).position().top + deltaHeight/2;
					l = $(this).position().left - tooltipWidth - _tooltipOffset;
					fadeInLeft = "-="+_tooltipOffsetAnimate;
					fadeOutLeft = "+="+_tooltipOffsetAnimate;
				}
				else if (b.position == RIGHT)
				{
					t = $(this).position().top + deltaHeight/2;
					l = $(this).position().left + inputWidth + _tooltipOffset;
					fadeInLeft = "+="+_tooltipOffsetAnimate;
					fadeOutLeft = "-="+_tooltipOffsetAnimate;
				}
				else if (b.position == TOP)
				{
					t = $(this).position().top - tooltipHeight - _tooltipOffset;
					l = $(this).position().left + deltaWidth/2;
					fadeInTop = "-="+_tooltipOffsetAnimate;
					fadeOutTop = "+="+_tooltipOffsetAnimate;
				}
				
				if(b.position == RIGHT || b.position == LEFT)
				{
					$(tooltip).css({
						top: t,
						left: l,
						position: 'absolute',
						opacity : 0
					}).show().stop().animate({
						opacity :1,
						top:fadeInTop
					}, _animteSpeed);
				}
				else if(b.position == TOP || b.position == BOTTOM)
				{
					$(tooltip).css({
						top: t,
						left: l,
						position: 'absolute',
						opacity : 0
					}).show().stop().animate({
						opacity :1,
						top:fadeInLeft
					}, _animteSpeed);
				}
				
				
			}).focusout(function(){
			
				if(b.position == RIGHT || b.position == LEFT)
				{
					$(tooltip).stop().animate({
					opacity:0,
					left:fadeOutLeft
					}, _animteSpeed , function(){$(this).hide();});
				
				}
				else if(b.position == TOP || b.position == BOTTOM)
				{
					$(tooltip).stop().animate({
					opacity:0,
					top:fadeOutTop
					}, _animteSpeed , function(){$(this).hide();});
				}
				
			});						
		}
		else
		{
			console.log("ERROR: Cannot find "+a);
		}
		
		
	});

};

}(jQuery));