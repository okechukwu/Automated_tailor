jQuery.fn.tooltip=function(d){
	
	var a=$.extend({text_field:"title",xOffset:-13,yOffset:-10,html:'<div id="tooltip_content"></div>'},d);
if(!$("#tooltip").length){
	$("body").append('<div id="tooltip">'+a.html+"</div>")
	}
	
	var b=$("#tooltip");
	var c=false;
	this.each(function(){
		var e=$(this);var f;$(this).unbind("mouseenter").mouseenter(function(h){var g=$(this).attr("tooltip_class");
		if(!g){g=""}f=$(this).attr("title");
		$(this).attr("org_title",f);
		this.html=$(this).attr(a.text_field);
		$(this).attr("title","");
		$("#tooltip_content",b).html(this.html).end().attr("class",g).show();
		c=false});
		
		$(this).unbind("mousemove").mousemove(function(g){
			if(b.css("display")=="none"&&!document.all){
				e.attr("title",$(this).attr("org_title"));
				e.trigger("mouseenter")}
				yPos=g.pageY+a.yOffset-b.height();
				xPos=g.pageX+a.xOffset;
	if(xPos+b.width()+10>$(window).width()+$(window).scrollLeft()){xPos-=b.width()+a.xOffset+30}b.css("top",yPos+"px").css("left",xPos+"px")});
	$(this).unbind("mouseleave").mouseleave(function(g){$(this).attr("title",f);
				b.attr("class","").hide();c=true})}
				
				)};