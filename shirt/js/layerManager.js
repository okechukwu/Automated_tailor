function layerManagerImg(b,a){
	this.src=b;
	this.base_src="/";
	this.x=0;
	this.y=0;
	this.zIndex=0;
	if(a){for(var c in a){this[c]=a[c]}}
	this.html_obj=null;
	this.pendingDraw=true;
	this.pendingUpdate=true
	}
	
	layerManagerImg.prototype.change_base_src=function(a){
		this.base_src=a;if(this.html_obj!=null){this.html_obj.attr("src",a+this.src)}
		};
		
		layerManagerImg.prototype.redraw=function(){
			if(this.html_obj==null){this.html_obj=$('<img src="'+this.base_src+this.src+'" />').css({position:"absolute"})}
			this.html_obj.css({top:this.x+"px",left:this.y+"px",zIndex:this.zIndex});
			this.pendingUpdate=false
			};
			
			function layerManagerLayer(a,b){
				this.html_obj=$('<div class="layer"></div>');
				
				a.append(this.html_obj);
				//alert(a.html())
				this.base_src="/";
				this.group="default";
				this.position="front";
				this.images={};
				this.visible=true;
				this.zIndex=0;
				this.value=null;
				if(b){for(var c in b){this[c]=b[c]}}
				this.redraw()
				}
				
				layerManagerLayer.prototype.redraw=function(){
					for(var b=this.images.length-1;b>=0;b--){
						var a=this.images[b];
						if(a.pendingUpdate){a.redraw()}
						if(a.pendingDraw){this.html_obj.append(a.html_obj)}
						}
						this.html_obj.css({zIndex:this.zIndex,display:this.visible?"block":"none"})
						};
						
						layerManagerLayer.prototype.change_base_src=function(b){
							this.base_src=b;
							for(var a=this.images.length-1;a>=0;a--){
								this.images[a].change_base_src(b)}
								};
								
					layerManagerLayer.prototype.remove=function(){
						this.html_obj.remove()
						};
						
						layerManagerLayer.prototype.setImages=function(a){
							this.removeImages();
							for(var b=0;b<a.length;b++){this.addImage(a[b][0],a[b][1])}
							};
							
							layerManagerLayer.prototype.addImage=function(c,b){
								var d=$.extend({base_src:this.base_src},b);
								var a=new layerManagerImg(c,d);
								this.images.push(a);
								return a
								};
								
								
								layerManagerLayer.prototype.removeImages=function(){
									this.html_obj.html("");
									this.images=[]
									};
									
							function layerManager(b,a){
								this.container=$(b).css({position:"relative"});
								this.op=$.extend({base_src:"/"},a);
								this.layersGroups={"default":{base_src:this.op.base_src}};
								this.layers={};
								this.loading=$('<div class="loading"></div>').appendTo(this.container)
								}
								
						layerManager.prototype.redraw=function(){
							this.loading.show();
							for(var a in this.layers){
								this.layers[a].redraw()
								}
								this.loading.hide()
								};
								
						layerManager.prototype.existsLayer=function(a){
							if(typeof(this.layers[a])=="undefined"){return false}return true
							};
							
							layerManager.prototype.addLayer=function(d,c,b){
								if(typeof(c)=="undefined"){c="default"}
								if(typeof(b)=="undefined"){b="front"}
								if(typeof(this.layersGroups[c])=="undefined"){c="default"}
								var a=new layerManagerLayer(this.container,{base_src:this.layersGroups[c].base_src,group:c,position:b});
								this.layers[d]=a;
								//return a
								};
								
								layerManager.prototype.removeLayer=function(a){
									if(typeof(this.layers[a])=="undefined"){return false}this.layers[a].remove();delete this.layers[a]
									};
									
						layerManager.prototype.hideLayer=function(b){
							try{this.layers[b].visible=false}catch(a){}
							};
							
					layerManager.prototype.showLayer=function(b){
						try{this.layers[b].visible=true}
						catch(a){}
						};
						
						layerManager.prototype.addLayerGroup=function(b,a){
							this.layersGroups[b]=$.extend({base_src:this.op.base_src},a);return this.layersGroups[b]
							};
							
							layerManager.prototype.change_base_src=function(b,c){
								if(typeof(c)=="undefined"){c=false}
								else{
									if(typeof(this.layersGroups[c])=="undefined"){c=false}
									}
									
									if(!c){this.op.base_src=b}
									for(var a in this.layers){if(!c||this.layers[a].group==c){this.layers[a].change_base_src(b)}}
									};