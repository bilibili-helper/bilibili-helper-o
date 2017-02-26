/*!Copyright(c) CommentCoreLibrary (//github.com/jabbany/CommentCoreLibrary) - Licensed under the MIT License */function CommentFilter(){this.modifiers=[],this.runtime=null,this.allowTypes={1:!0,4:!0,5:!0,6:!0,7:!0,8:!0,17:!0},this.doModify=function(a){for(var b=0;b<this.modifiers.length;b++)a=this.modifiers[b](a);return a},this.beforeSend=function(a){return a},this.doValidate=function(a){return this.allowTypes[a.mode]?!0:!1},this.addRule=function(a){},this.addModifier=function(a){this.modifiers.push(a)},this.runtimeFilter=function(a){return null==this.runtime?a:this.runtime(a)},this.setRuntimeFilter=function(a){this.runtime=a}}var BinArray=function(){var a={};return a.bsearch=function(a,b,c){if(0===a.length)return 0;if(c(b,a[0])<0)return 0;if(c(b,a[a.length-1])>=0)return a.length;for(var d=0,e=0,f=0,g=a.length-1;g>=d;){if(e=Math.floor((g+d+1)/2),f++,c(b,a[e-1])>=0&&c(b,a[e])<0)return e;c(b,a[e-1])<0?g=e-1:c(b,a[e])>=0?d=e:console.error("Program Error"),f>1500&&console.error("Too many run cycles.")}return-1},a.binsert=function(b,c,d){var e=a.bsearch(b,c,d);return b.splice(e,0,c),e},a}(),__extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},CommentSpaceAllocator=function(){function a(a,b){"undefined"==typeof a&&(a=0),"undefined"==typeof b&&(b=0),this._pools=[[]],this.avoid=1,this._width=a,this._height=b}return a.prototype.willCollide=function(a,b){return a.stime+a.ttl>=b.stime+b.ttl/2},a.prototype.pathCheck=function(a,b,c){for(var d=a+b.height,e=b.right,f=0;f<c.length;f++)if(!(c[f].y>d||c[f].bottom<a)){if(!(c[f].right<b.x||c[f].x>e))return!1;if(this.willCollide(c[f],b))return!1}return!0},a.prototype.assign=function(a,b){for(;this._pools.length<=b;)this._pools.push([]);var c=this._pools[b];if(0===c.length)return a.cindex=b,0;if(this.pathCheck(0,a,c))return a.cindex=b,0;for(var d=0,e=0;e<c.length&&(d=c[e].bottom+this.avoid,!(d+a.height>this._height));e++)if(this.pathCheck(d,a,c))return a.cindex=b,d;return this.assign(a,b+1)},a.prototype.add=function(a){a.height>this._height?(a.cindex=-2,a.y=0):(a.y=this.assign(a,0),BinArray.binsert(this._pools[a.cindex],a,function(a,b){return a.bottom<b.bottom?-1:a.bottom>b.bottom?1:0}))},a.prototype.remove=function(a){if(!(a.cindex<0)){if(a.cindex>=this._pools.length)throw new Error("cindex out of bounds");var b=this._pools[a.cindex].indexOf(a);0>b||this._pools[a.cindex].splice(b,1)}},a.prototype.setBounds=function(a,b){this._width=a,this._height=b},a}(),AnchorCommentSpaceAllocator=function(a){function b(){a.apply(this,arguments)}return __extends(b,a),b.prototype.add=function(b){a.prototype.add.call(this,b),b.x=(this._width-b.width)/2},b.prototype.willCollide=function(a,b){return!0},b.prototype.pathCheck=function(a,b,c){for(var d=a+b.height,e=0;e<c.length;e++)if(!(c[e].y>d||c[e].bottom<a))return!1;return!0},b}(CommentSpaceAllocator),__extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},CoreComment=function(){function a(b,c){if("undefined"==typeof c&&(c={}),this.mode=1,this.stime=0,this.text="",this.ttl=5e3,this.dur=5e3,this.cindex=-1,this.motion=[],this.movable=!0,this._alphaMotion=null,this.absolute=!0,this.align=0,this._alpha=1,this._size=25,this._color=16777215,this._border=!1,this._shadow=!0,this._font="",!b)throw new Error("Comment not bound to comment manager.");if(this.parent=b,c.hasOwnProperty("stime")&&(this.stime=c.stime),c.hasOwnProperty("mode")?this.mode=c.mode:this.mode=1,c.hasOwnProperty("dur")&&(this.dur=c.dur,this.ttl=this.dur),this.dur*=this.parent.options.global.scale,this.ttl*=this.parent.options.global.scale,c.hasOwnProperty("text")&&(this.text=c.text),c.hasOwnProperty("motion")){this._motionStart=[],this._motionEnd=[],this.motion=c.motion;for(var d=0,e=0;e<c.motion.length;e++){this._motionStart.push(d);var f=0;for(var g in c.motion[e]){var h=c.motion[e][g];f=Math.max(h.dur,f),(null===h.easing||void 0===h.easing)&&(c.motion[e][g].easing=a.LINEAR)}d+=f,this._motionEnd.push(d)}this._curMotion=0}c.hasOwnProperty("color")&&(this._color=c.color),c.hasOwnProperty("size")&&(this._size=c.size),c.hasOwnProperty("border")&&(this._border=c.border),c.hasOwnProperty("opacity")&&(this._alpha=c.opacity),c.hasOwnProperty("alpha")&&(this._alphaMotion=c.alpha),c.hasOwnProperty("font")&&(this._font=c.font),c.hasOwnProperty("x")&&(this._x=c.x),c.hasOwnProperty("y")&&(this._y=c.y),c.hasOwnProperty("shadow")&&(this._shadow=c.shadow),c.hasOwnProperty("position")&&"relative"===c.position&&(this.absolute=!1,this.mode<7&&console.warn("Using relative position for CSA comment."))}return a.prototype.init=function(a){"undefined"==typeof a&&(a=null),null!==a?this.dom=a.dom:this.dom=document.createElement("div"),this.dom.className=this.parent.options.global.className,this.dom.appendChild(document.createTextNode(this.text)),this.dom.textContent=this.text,this.dom.innerText=this.text,this.dom.setAttribute("content",this.text),this.size=this._size,16777215!=this._color&&(this.color=this._color),this.shadow=this._shadow,this._border&&(this.border=this._border),""!==this._font&&(this.font=this._font),void 0!==this._x&&(this.x=this._x),void 0!==this._y&&(this.y=this._y),(1!==this._alpha||this.parent.options.global.opacity<1)&&(this.alpha=this._alpha),this.motion.length>0&&this.animate()},Object.defineProperty(a.prototype,"x",{get:function(){return(null===this._x||void 0===this._x)&&(this.align%2===0?this._x=this.dom.offsetLeft:this._x=this.parent.width-this.dom.offsetLeft-this.width),this.absolute?this._x:this._x/this.parent.width},set:function(a){this._x=a,this.absolute||(this._x*=this.parent.width),this.align%2===0?this.dom.style.left=this._x+"px":this.dom.style.right=this._x+"px"},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"y",{get:function(){return(null===this._y||void 0===this._y)&&(this.align<2?this._y=this.dom.offsetTop:this._y=this.parent.height-this.dom.offsetTop-this.height),this.absolute?this._y:this._y/this.parent.height},set:function(a){this._y=a,this.absolute||(this._y*=this.parent.height),this.align<2?this.dom.style.top=this._y+"px":this.dom.style.bottom=this._y+"px"},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"bottom",{get:function(){return this.y+this.height},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"right",{get:function(){return this.x+this.width},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"width",{get:function(){return(null===this._width||void 0===this._width)&&(this._width=this.dom.offsetWidth),this._width},set:function(a){this._width=a,this.dom.style.width=this._width+"px"},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"height",{get:function(){return(null===this._height||void 0===this._height)&&(this._height=this.dom.offsetHeight),this._height},set:function(a){this._height=a,this.dom.style.height=this._height+"px"},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"size",{get:function(){return this._size},set:function(a){this._size=a,this.dom.style.fontSize=this._size+"px"},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"color",{get:function(){return this._color},set:function(a){this._color=a;var b=a.toString(16);b=b.length>=6?b:new Array(6-b.length+1).join("0")+b,this.dom.style.color="#"+b,0===this._color&&(this.dom.className=this.parent.options.global.className+" rshadow")},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"alpha",{get:function(){return this._alpha},set:function(a){this._alpha=a,this.dom.style.opacity=Math.min(this._alpha,this.parent.options.global.opacity)+""},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"border",{get:function(){return this._border},set:function(a){this._border=a,this._border?this.dom.style.border="1px solid #00ffff":this.dom.style.border="none"},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"shadow",{get:function(){return this._shadow},set:function(a){this._shadow=a,this._shadow||(this.dom.className=this.parent.options.global.className+" noshadow")},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"font",{get:function(){return this._font},set:function(a){this._font=a,this._font.length>0?this.dom.style.fontFamily=this._font:this.dom.style.fontFamily=""},enumerable:!0,configurable:!0}),a.prototype.time=function(a){this.ttl-=a,this.ttl<0&&(this.ttl=0),this.movable&&this.update(),this.ttl<=0&&this.finish()},a.prototype.update=function(){this.animate()},a.prototype.invalidate=function(){this._x=null,this._y=null,this._width=null,this._height=null},a.prototype._execMotion=function(a,b){for(var c in a)if(a.hasOwnProperty(c)){var d=a[c];this[c]=d.easing(Math.min(Math.max(b-d.delay,0),d.dur),d.from,d.to-d.from,d.dur)}},a.prototype.animate=function(){if(this._alphaMotion&&(this.alpha=(this.dur-this.ttl)*(this._alphaMotion.to-this._alphaMotion.from)/this.dur+this._alphaMotion.from),0!==this.motion.length){var a=Math.max(this.ttl,0),b=this.dur-a-this._motionStart[this._curMotion];return this._execMotion(this.motion[this._curMotion],b),this.dur-a>this._motionEnd[this._curMotion]?(this._curMotion++,void(this._curMotion>=this.motion.length&&(this._curMotion=this.motion.length-1))):void 0}},a.prototype.finish=function(){this.parent.finish(this)},a.prototype.toString=function(){return["[",this.stime,"|",this.ttl,"/",this.dur,"]","(",this.mode,")",this.text].join("")},a.LINEAR=function(a,b,c,d){return a*c/d+b},a}(),ScrollComment=function(a){function b(b,c){a.call(this,b,c),this.dur*=this.parent.options.scroll.scale,this.ttl*=this.parent.options.scroll.scale}return __extends(b,a),Object.defineProperty(b.prototype,"alpha",{set:function(a){this._alpha=a,this.dom.style.opacity=Math.min(Math.min(this._alpha,this.parent.options.global.opacity),this.parent.options.scroll.opacity)+""},enumerable:!0,configurable:!0}),b.prototype.init=function(b){"undefined"==typeof b&&(b=null),a.prototype.init.call(this,b),this.x=this.parent.width,this.parent.options.scroll.opacity<1&&(this.alpha=this._alpha),this.absolute=!0},b.prototype.update=function(){this.x=this.ttl/this.dur*(this.parent.width+this.width)-this.width},b}(CoreComment),__extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},CoreComment=function(){function a(b,c){if("undefined"==typeof c&&(c={}),this.mode=1,this.stime=0,this.text="",this.ttl=5e3,this.dur=5e3,this.cindex=-1,this.motion=[],this.movable=!0,this._alphaMotion=null,this.absolute=!0,this.align=0,this._alpha=1,this._size=25,this._color=16777215,this._border=!1,this._shadow=!0,this._font="",!b)throw new Error("Comment not bound to comment manager.");if(this.parent=b,c.hasOwnProperty("stime")&&(this.stime=c.stime),c.hasOwnProperty("mode")?this.mode=c.mode:this.mode=1,c.hasOwnProperty("dur")&&(this.dur=c.dur,this.ttl=this.dur),this.dur*=this.parent.options.global.scale,this.ttl*=this.parent.options.global.scale,c.hasOwnProperty("text")&&(this.text=c.text),c.hasOwnProperty("motion")){this._motionStart=[],this._motionEnd=[],this.motion=c.motion;for(var d=0,e=0;e<c.motion.length;e++){this._motionStart.push(d);var f=0;for(var g in c.motion[e]){var h=c.motion[e][g];f=Math.max(h.dur,f),(null===h.easing||void 0===h.easing)&&(c.motion[e][g].easing=a.LINEAR)}d+=f,this._motionEnd.push(d)}this._curMotion=0}c.hasOwnProperty("color")&&(this._color=c.color),c.hasOwnProperty("size")&&(this._size=c.size),c.hasOwnProperty("border")&&(this._border=c.border),c.hasOwnProperty("opacity")&&(this._alpha=c.opacity),c.hasOwnProperty("alpha")&&(this._alphaMotion=c.alpha),c.hasOwnProperty("font")&&(this._font=c.font),c.hasOwnProperty("x")&&(this._x=c.x),c.hasOwnProperty("y")&&(this._y=c.y),c.hasOwnProperty("shadow")&&(this._shadow=c.shadow),c.hasOwnProperty("position")&&"relative"===c.position&&(this.absolute=!1,this.mode<7&&console.warn("Using relative position for CSA comment."))}return a.prototype.init=function(a){"undefined"==typeof a&&(a=null),null!==a?this.dom=a.dom:this.dom=document.createElement("div"),this.dom.className=this.parent.options.global.className,this.dom.appendChild(document.createTextNode(this.text)),this.dom.textContent=this.text,this.dom.innerText=this.text,this.dom.setAttribute("content",this.text),this.size=this._size,16777215!=this._color&&(this.color=this._color),this.shadow=this._shadow,this._border&&(this.border=this._border),""!==this._font&&(this.font=this._font),void 0!==this._x&&(this.x=this._x),void 0!==this._y&&(this.y=this._y),(1!==this._alpha||this.parent.options.global.opacity<1)&&(this.alpha=this._alpha),this.motion.length>0&&this.animate()},Object.defineProperty(a.prototype,"x",{get:function(){return(null===this._x||void 0===this._x)&&(this.align%2===0?this._x=this.dom.offsetLeft:this._x=this.parent.width-this.dom.offsetLeft-this.width),this.absolute?this._x:this._x/this.parent.width},set:function(a){this._x=a,this.absolute||(this._x*=this.parent.width),this.align%2===0?this.dom.style.left=this._x+"px":this.dom.style.right=this._x+"px"},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"y",{get:function(){return(null===this._y||void 0===this._y)&&(this.align<2?this._y=this.dom.offsetTop:this._y=this.parent.height-this.dom.offsetTop-this.height),this.absolute?this._y:this._y/this.parent.height},set:function(a){this._y=a,this.absolute||(this._y*=this.parent.height),this.align<2?this.dom.style.top=this._y+"px":this.dom.style.bottom=this._y+"px"},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"bottom",{get:function(){return this.y+this.height},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"right",{get:function(){return this.x+this.width},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"width",{get:function(){return(null===this._width||void 0===this._width)&&(this._width=this.dom.offsetWidth),this._width},set:function(a){this._width=a,this.dom.style.width=this._width+"px"},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"height",{get:function(){return(null===this._height||void 0===this._height)&&(this._height=this.dom.offsetHeight),this._height},set:function(a){this._height=a,this.dom.style.height=this._height+"px"},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"size",{get:function(){return this._size},set:function(a){this._size=a,this.dom.style.fontSize=this._size+"px"},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"color",{get:function(){return this._color},set:function(a){this._color=a;var b=a.toString(16);b=b.length>=6?b:new Array(6-b.length+1).join("0")+b,this.dom.style.color="#"+b,0===this._color&&(this.dom.className=this.parent.options.global.className+" rshadow")},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"alpha",{get:function(){return this._alpha},set:function(a){this._alpha=a,this.dom.style.opacity=Math.min(this._alpha,this.parent.options.global.opacity)+""},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"border",{get:function(){return this._border},set:function(a){this._border=a,this._border?this.dom.style.border="1px solid #00ffff":this.dom.style.border="none"},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"shadow",{get:function(){return this._shadow},set:function(a){this._shadow=a,this._shadow||(this.dom.className=this.parent.options.global.className+" noshadow")},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"font",{get:function(){return this._font},set:function(a){this._font=a,this._font.length>0?this.dom.style.fontFamily=this._font:this.dom.style.fontFamily=""},enumerable:!0,configurable:!0}),a.prototype.time=function(a){this.ttl-=a,this.ttl<0&&(this.ttl=0),this.movable&&this.update(),this.ttl<=0&&this.finish()},a.prototype.update=function(){this.animate()},a.prototype.invalidate=function(){this._x=null,this._y=null,this._width=null,this._height=null},a.prototype._execMotion=function(a,b){for(var c in a)if(a.hasOwnProperty(c)){var d=a[c];this[c]=d.easing(Math.min(Math.max(b-d.delay,0),d.dur),d.from,d.to-d.from,d.dur)}},a.prototype.animate=function(){if(this._alphaMotion&&(this.alpha=(this.dur-this.ttl)*(this._alphaMotion.to-this._alphaMotion.from)/this.dur+this._alphaMotion.from),0!==this.motion.length){var a=Math.max(this.ttl,0),b=this.dur-a-this._motionStart[this._curMotion];return this._execMotion(this.motion[this._curMotion],b),this.dur-a>this._motionEnd[this._curMotion]?(this._curMotion++,void(this._curMotion>=this.motion.length&&(this._curMotion=this.motion.length-1))):void 0}},a.prototype.finish=function(){this.parent.finish(this)},a.prototype.toString=function(){return["[",this.stime,"|",this.ttl,"/",this.dur,"]","(",this.mode,")",this.text].join("")},a.LINEAR=function(a,b,c,d){return a*c/d+b},a}(),ScrollComment=function(a){function b(b,c){a.call(this,b,c),this.dur*=this.parent.options.scroll.scale,this.ttl*=this.parent.options.scroll.scale}return __extends(b,a),Object.defineProperty(b.prototype,"alpha",{set:function(a){this._alpha=a,this.dom.style.opacity=Math.min(Math.min(this._alpha,this.parent.options.global.opacity),this.parent.options.scroll.opacity)+""},enumerable:!0,configurable:!0}),b.prototype.init=function(b){"undefined"==typeof b&&(b=null),a.prototype.init.call(this,b),this.x=this.parent.width,this.parent.options.scroll.opacity<1&&(this.alpha=this._alpha),this.absolute=!0},b.prototype.update=function(){this.x=this.ttl/this.dur*(this.parent.width+this.width)-this.width},b}(CoreComment),CSSCompatLayer=function(){function a(){}return a.transform=function(a,b){a.style.transform=b,a.style.webkitTransform=b,a.style.msTransform=b,a.style.oTransform=b},a}(),CSSScrollComment=function(a){function b(){a.apply(this,arguments),this._dirtyCSS=!0}return __extends(b,a),Object.defineProperty(b.prototype,"x",{get:function(){return this.ttl/this.dur*(this.parent.width+this.width)-this.width},set:function(a){if("number"==typeof this._x){var b=a-this._x;this._x=a,CSSCompatLayer.transform(this.dom,"translateX("+b+"px)")}else this._x=a,this.absolute||(this._x*=this.parent.width),this.align%2===0?this.dom.style.left=this._x+"px":this.dom.style.right=this._x+"px"},enumerable:!0,configurable:!0}),b.prototype.update=function(){this._dirtyCSS&&(this.dom.style.transition="transform "+this.ttl+"ms linear",this.x=-this.width,this._dirtyCSS=!1)},b.prototype.invalidate=function(){a.prototype.invalidate.call(this),this._dirtyCSS=!0},b.prototype.stop=function(){this.dom.style.transition="",this.x=this._x,this._x=null,this.x=this.ttl/this.dur*(this.parent.width+this.width)-this.width,this._dirtyCSS=!0},b}(ScrollComment),CommentManager=function(){function a(a){var b=0;this._listeners={},this.stage=a,this.options={global:{opacity:1,scale:1,className:"cmt"},scroll:{opacity:1,scale:1},limit:0},this.timeline=[],this.runline=[],this.position=0,this.limiter=0,this.filter=null,this.csa={scroll:new CommentSpaceAllocator(0,0),top:new AnchorCommentSpaceAllocator(0,0),bottom:new AnchorCommentSpaceAllocator(0,0),reverse:new CommentSpaceAllocator(0,0),scrollbtm:new CommentSpaceAllocator(0,0)},this.width=this.stage.offsetWidth,this.height=this.stage.offsetHeight,this.startTimer=function(){if(!(b>0)){var a=(new Date).getTime(),c=this;b=window.setInterval(function(){var b=(new Date).getTime()-a;a=(new Date).getTime(),c.onTimerEvent(b,c)},10)}},this.stopTimer=function(){window.clearInterval(b),b=0},this.pauseComment=function(){Array.prototype.slice.call(this.stage.children).forEach(function(a){a.classList.contains("cmt")&&!a.classList.contains("paused")&&(a.finalTransform=a.style.transform,a.style.transform=window.getComputedStyle(a).getPropertyValue("transform"),a.finalDuration=parseFloat(a.style.transitionDuration)-(new Date).getTime()+a.transitionStartTime,a.style.transitionDuration="10ms",a.classList.add("paused"))})},this.resumeComment=function(){Array.prototype.slice.call(this.stage.children).forEach(function(a){a.classList.contains("cmt")&&a.classList.contains("paused")&&(a.style.transitionDuration=a.finalDuration+"ms",a.style.transform=a.finalTransform,a.transitionStartTime=(new Date).getTime(),a.classList.remove("paused"))})}}var b=function(a,b){for(var c=Math.PI/180,d=a*c,e=b*c,f=Math.cos,g=Math.sin,h=[f(d)*f(e),f(d)*g(e),g(d),0,-g(e),f(e),0,0,-g(d)*f(e),-g(d)*g(e),f(d),0,0,0,0,1],i=0;i<h.length;i++)Math.abs(h[i])<1e-6&&(h[i]=0);return"matrix3d("+h.join(",")+")"};return a.prototype.stop=function(){this.stopTimer();for(var a=0;a<this.runline.length;a++)"undefined"!=typeof this.runline[a].stop&&this.runline[a].stop()},a.prototype.start=function(){this.startTimer()},a.prototype.seek=function(a){this.position=BinArray.bsearch(this.timeline,a,function(a,b){return a<b.stime?-1:a>b.stime?1:0})},a.prototype.validate=function(a){return null==a?!1:this.filter.doValidate(a)},a.prototype.load=function(a){this.timeline=a,this.timeline.sort(function(a,b){return a.stime>b.stime?2:a.stime<b.stime?-2:a.date>b.date?1:a.date<b.date?-1:null!=a.dbid&&null!=b.dbid?a.dbid>b.dbid?1:a.dbid<b.dbid?-1:0:0}),this.dispatchEvent("load")},a.prototype.insert=function(a){var b=BinArray.binsert(this.timeline,a,function(a,b){return a.stime>b.stime?2:a.stime<b.stime?-2:a.date>b.date?1:a.date<b.date?-1:null!=a.dbid&&null!=b.dbid?a.dbid>b.dbid?1:a.dbid<b.dbid?-1:0:0});b<=this.position&&this.position++,this.dispatchEvent("insert")},a.prototype.clear=function(){for(;this.runline.length>0;)this.runline[0].finish();this.dispatchEvent("clear")},a.prototype.setBounds=function(){this.width=this.stage.offsetWidth,this.height=this.stage.offsetHeight,this.options.global.scale=this.width/680,this.dispatchEvent("resize");for(var a in this.csa)this.csa[a].setBounds(this.width,this.height);this.stage.style.perspective=this.width*Math.tan(40*Math.PI/180)/2+"px",this.stage.style.webkitPerspective=this.width*Math.tan(40*Math.PI/180)/2+"px"},a.prototype.init=function(){this.setBounds(),null==this.filter&&(this.filter=new CommentFilter)},a.prototype.time=function(a){if(a-=1,this.position>=this.timeline.length||Math.abs(this.lastPos-a)>=2e3){if(this.seek(a),this.lastPos=a,this.timeline.length<=this.position)return}else this.lastPos=a;for(;this.position<this.timeline.length&&!(this.options.limit>0&&this.runline.length>this.limiter)&&(this.validate(this.timeline[this.position])&&this.timeline[this.position].stime<=a);this.position++)this.send(this.timeline[this.position])},a.prototype.rescale=function(){},a.prototype.send=function(a){if(8===a.mode)return console.log(a),void(this.scripting&&console.log(this.scripting.eval(a.code)));if(null==this.filter||(a=this.filter.doModify(a),null!=a)){if(1===a.mode||2===a.mode||6===a.mode)var c=new CSSScrollComment(this,a);else var c=new CoreComment(this,a);switch(c.mode){case 1:c.align=0;break;case 2:c.align=2;break;case 4:c.align=2;break;case 5:c.align=0;break;case 6:c.align=1}switch(c.init(),this.stage.appendChild(c.dom),c.dom.transitionStartTime=(new Date).getTime(),c.mode){default:case 1:this.csa.scroll.add(c);break;case 2:this.csa.scrollbtm.add(c);break;case 4:this.csa.bottom.add(c);break;case 5:this.csa.top.add(c);break;case 6:this.csa.reverse.add(c);break;case 17:case 7:(0!==a.rY||0!==a.rZ)&&(c.dom.style.transform=b(a.rY,a.rZ),c.dom.style.webkitTransform=b(a.rY,a.rZ),c.dom.style.OTransform=b(a.rY,a.rZ),c.dom.style.MozTransform=b(a.rY,a.rZ),c.dom.style.MSTransform=b(a.rY,a.rZ))}c.y=c.y,this.dispatchEvent("enterComment",c),this.runline.push(c)}},a.prototype.sendComment=function(a){console.log("CommentManager.sendComment is deprecated. Please use send instead"),this.send(a)},a.prototype.finish=function(a){this.dispatchEvent("exitComment",a),this.stage.removeChild(a.dom);var b=this.runline.indexOf(a);switch(b>=0&&this.runline.splice(b,1),a.mode){default:case 1:this.csa.scroll.remove(a);break;case 2:this.csa.scrollbtm.remove(a);break;case 4:this.csa.bottom.remove(a);break;case 5:this.csa.top.remove(a);break;case 6:this.csa.reverse.remove(a);break;case 7:}},a.prototype.addEventListener=function(a,b){"undefined"!=typeof this._listeners[a]?this._listeners[a].push(b):this._listeners[a]=[b]},a.prototype.dispatchEvent=function(a,b){if("undefined"!=typeof this._listeners[a])for(var c=0;c<this._listeners[a].length;c++)try{this._listeners[a][c](b)}catch(d){console.err(d.stack)}},a.prototype.onTimerEvent=function(a,b){for(var c=0;c<b.runline.length;c++){var d=b.runline[c];d.hold||d.time(a)}},a}();

/*
Changes to the minified code:
- Removed function AcfunParser because it is not used
- Removed function BilibiliParser, which is replaced by the unminified version below (for modification)
 */

/* begin added filter code */
// Filter list. Will be populated by bilibili_injected.js:243 prior to loading the html5 player
var filters=[];
/* end added filter code */

/**
 * Bilibili Format Parser
 * @license MIT License
 * Takes in an XMLDoc/LooseXMLDoc and parses that into a Generic Comment List
 **/
function BilibiliParser(xmlDoc, text, warn){
	function format(string){
		// Format the comment text to be JSON Valid.
		return string.replace(/\t/,"\\t");
	}

	if(xmlDoc !== null){
		var elems = xmlDoc.getElementsByTagName('d');
	}else{
		if(!document || !document.createElement){
			// Maybe we are in a restricted context? Bail.
			return [];
		}
		if(warn){
			if(!confirm("XML Parse Error. \n Allow tag soup parsing?\n[WARNING: This is unsafe.]")){
				return [];
			}
		}else{
			// TODO: Make this safer in the future
			text = text.replace(new RegExp("</([^d])","g"), "</disabled $1");
			text = text.replace(new RegExp("</(\S{2,})","g"), "</disabled $1");
			text = text.replace(new RegExp("<([^d/]\W*?)","g"), "<disabled $1");
			text = text.replace(new RegExp("<([^/ ]{2,}\W*?)","g"), "<disabled $1");
		}
		var tmp = document.createElement("div");
		tmp.innerHTML = text;
		var elems = tmp.getElementsByTagName('d');
	}

	var tlist = [];

	/* Begin added filter code */
	// Dictionary for cached results
	// Do not process same comment more than once
	// True for good, false for bad
	var filtercache = {};
	function filterComment(cmt) {
		for (var i = 0; i < filters.color.length; i++) {
			if (cmt.color == filters.color[i].content) {
				return false;
			}
		}
		for (var i = 0; i < filters.user.length; i++) {
			if (cmt.hash == filters.user[i].content) {
				return false;
			}
		}
		for (var i = 0; i < filters.text.length; i++) {
			if(cmt.text.indexOf(filters.text[i].content)!=-1) {
				return false;
			}
		}
		for (var i = 0; i < filters.regex.length; i++) {
			if (filters.regex[i].content.exec(cmt.text)) {
				return false;
			}
		}
		return true;
	}
	/* end added filter code */

	for(var i=0;i < elems.length;i++){
		if(elems[i].getAttribute('p') != null){
			var opt = elems[i].getAttribute('p').split(',');
			if(!elems[i].childNodes[0])
			  continue;
			var text = elems[i].childNodes[0].nodeValue;
			var obj = {};
			obj.stime = Math.round(parseFloat(opt[0])*1000);
			obj.size = parseInt(opt[2]);
			obj.color = parseInt(opt[3]);
			obj.mode = parseInt(opt[1]);
			obj.date = parseInt(opt[4]);
			obj.pool = parseInt(opt[5]);
			obj.position = "absolute";
			if(opt[7] != null)
				obj.dbid = parseInt(opt[7]);
			obj.hash = opt[6];
			obj.border = false;
			if(obj.mode < 7){
				obj.text = text.replace(/(\/n|\\n|\n|\r\n)/g, "\n");
				/* begin added filter code */
				// Test against saved results. If failed, reject
				if (filtercache[obj.text]===false) {
					continue;
				}
				if (filtercache[obj.text]===undefined) {
					// Apply filters to comment
					var result = filterComment(obj);
					filtercache[obj.text] = result; // Save result for duplicates
					if (!result) {
						continue;
					}
				}
				/* end added filter code */
			}else{
				if(obj.mode == 7){
					try{
						adv = JSON.parse(format(text));
						obj.shadow = true;
						obj.x = parseFloat(adv[0]);
						obj.y = parseFloat(adv[1]);
						if(Math.floor(obj.x) < obj.x || Math.floor(obj.y) < obj.y){
							obj.position = "relative";
						}
						obj.text = adv[4].replace(/(\/n|\\n|\n|\r\n)/g, "\n");
						obj.rZ = 0;
						obj.rY = 0;
						if(adv.length >= 7){
							obj.rZ = parseInt(adv[5], 10);
							obj.rY = parseInt(adv[6], 10);
						}
						obj.motion = [];
						obj.movable = false;
						if(adv.length >= 11){
							obj.movable = true;
							var singleStepDur = 500;
							var motion = {
								x:{from: obj.x, to:parseFloat(adv[7]), dur:singleStepDur, delay:0},
								y:{from: obj.y, to:parseFloat(adv[8]), dur:singleStepDur, delay:0},
							};
							if(adv[9] !== ''){
								singleStepDur = parseInt(adv[9], 10);
								motion.x.dur = singleStepDur;
								motion.y.dur = singleStepDur;
							}
							if(adv[10] !== ''){
								motion.x.delay = parseInt(adv[10], 10);
								motion.y.delay = parseInt(adv[10], 10);
							}
							if(adv.length > 11){
								obj.shadow = adv[11];
								if(obj.shadow === "true"){
									obj.shadow = true;
								}
								if(obj.shadow === "false"){
									obj.shadow = false;
								}
								if(adv[12] != null){
									obj.font = adv[12];
								}
								if(adv.length > 14){
									// Support for Bilibili Advanced Paths
									if(obj.position === "relative"){
										console.log("Cannot mix relative and absolute positioning");
										obj.position = "absolute";
									}
									var path = adv[14];
									var lastPoint = {x:motion.x.from, y:motion.y.from};
									var pathMotion = [];
									var regex = new RegExp("([a-zA-Z])\\s*(\\d+)[, ](\\d+)","g");
									var counts = path.split(/[a-zA-Z]/).length - 1;
									var m = regex.exec(path);
									while(m !== null){
										switch(m[1]){
											case "M":{
												lastPoint.x = parseInt(m[2],10);
												lastPoint.y = parseInt(m[3],10);
											}break;
											case "L":{
												pathMotion.push({
													"x":{"from":lastPoint.x, "to":parseInt(m[2],10), "dur": singleStepDur / counts, "delay": 0},
													"y":{"from":lastPoint.y, "to":parseInt(m[3],10), "dur": singleStepDur / counts, "delay": 0}
												});
												lastPoint.x = parseInt(m[2],10);
												lastPoint.y = parseInt(m[3],10);
											}break;
										}
										m = regex.exec(path);
									}
									motion = null;
									obj.motion = pathMotion;
								}
							}
							if(motion !== null){
								obj.motion.push(motion);
							}
						}
						obj.dur = 2500;
						if(adv[3] < 12){
							obj.dur = adv[3] * 1000;
						}
						var tmp = adv[2].split('-');
						if(tmp != null && tmp.length>1){
							var alphaFrom = parseFloat(tmp[0]);
							var alphaTo = parseFloat(tmp[1]);
							obj.opacity = alphaFrom;
							if(alphaFrom !== alphaTo){
								obj.alpha = {from:alphaFrom, to:alphaTo}
							}
						}
					}catch(e){
						console.log('[Err] Error occurred in JSON parsing');
						console.log('[Dbg] ' + text);
					}
				}else if(obj.mode == 8){
					obj.code = text; //Code comments are special
				}
			}
			if(obj.text != null)
				obj.text = obj.text.replace(/\u25a0/g,"\u2588");
			tlist.push(obj);
		}
	}
	return tlist;
}
