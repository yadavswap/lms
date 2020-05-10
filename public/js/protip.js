!function t(e,i,s){function o(h,r){if(!i[h]){if(!e[h]){var a="function"==typeof require&&require;if(!r&&a)return a(h,!0);if(n)return n(h,!0);var _=new Error("Cannot find module '"+h+"'");throw _.code="MODULE_NOT_FOUND",_}var f=i[h]={exports:{}};e[h][0].call(f.exports,function(t){var i=e[h][1][t];return o(i?i:t)},f,f.exports,t,e,i,s)}return i[h].exports}for(var n="function"==typeof require&&require,h=0;h<s.length;h++)o(s[h]);return o}({1:[function(t,e,i){t("./src/Plugin")},{"./src/Plugin":8}],2:[function(t,e,i){(function(t){!function(s,o){"use strict";"function"==typeof define&&define.amd?define(["jquery"],o):"object"==typeof i?e.exports=o("undefined"!=typeof window?window.jQuery:"undefined"!=typeof t?t.jQuery:null):o(s.jQuery)}(this,function(t){"use strict";var e=function(){return this._Construct()};return e.prototype={_Construct:function(){return this._commandList=[],this._isReady=!1,this._timer=setInterval(this._check.bind(this),10),this},add:function(t,e,i){this._commandList.push({cmd:t,el:e,cmdArgs:i})},isReady:function(){return this._isReady},_check:function(){t._protipClassInstance&&(this._isReady=!0)&&(!this._commandList.length||this._run())&&clearInterval(this._timer)},_run:function(){var t=this._commandList.shift();return t.el[t.cmd].apply(t.el,t.cmdArgs),this._commandList.length&&this._run(),!0}},e})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],3:[function(t,e,i){(function(s){!function(o,n){"use strict";"function"==typeof define&&define.amd?define(["jquery","./Constants","./Item"],n):"object"==typeof i?e.exports=n("undefined"!=typeof window?window.jQuery:"undefined"!=typeof s?s.jQuery:null,t("./Constants"),t("./Item")):o.ProtipClass=n(o.jQuery,o.ProtipConstants,o.ProtipItemClass)}(this,function(t,e,i){"use strict";try{window.MutationObserver._period=100}catch(t){console.warn("Protip: MutationObserver polyfill haven't been loaded!"),window.MutationObserver=window.MutationObserver||function(){this.disconnect=this.observe=function(){}}}var s=function(t){return this._Construct(t)};return t.extend(!0,s.prototype,{_defaults:{selector:e.DEFAULT_SELECTOR,namespace:e.DEFAULT_NAMESPACE,protipTemplate:e.TEMPLATE_PROTIP,arrowTemplate:e.TEMPLATE_ARROW,iconTemplate:e.TEMPLATE_ICON,observer:!0,offset:0,forceMinWidth:!0,delayResize:100,defaults:{trigger:e.TRIGGER_HOVER,title:null,inited:!1,delayIn:0,delayOut:0,interactive:!1,gravity:!0,offsetTop:0,offsetLeft:0,position:e.POSITION_RIGHT,placement:e.PLACEMENT_OUTSIDE,classes:null,arrow:!0,width:300,identifier:!1,icon:!1,observer:!1,target:e.SELECTOR_BODY,skin:e.SKIN_DEFAULT,size:e.SIZE_DEFAULT,scheme:e.SCHEME_DEFAULT,animate:!1,autoHide:!1,autoShow:!1,mixin:null}},_Construct:function(e){return this.settings=t.extend(!0,{},this._defaults,e),this._itemInstances={},this._observerInstance=void 0,this._visibleBeforeResize=[],this._task={delayIn:void 0,delayOut:void 0,resize:void 0},this._fetchElements(),this._bind(),this},destroy:function(){this._unbind(),t.each(this._itemInstances,t.proxy(function(t){this.destroyItemInstance(t)},this)),this._itemInstances=void 0,this.settings=void 0,t._protipClassInstance=void 0},namespaced:function(t){return this.settings.namespace+t.charAt(0).toUpperCase()+t.slice(1)},destroyItemInstance:function(t){this._itemInstances[t].destroy()},onItemDestoryed:function(t){delete this._itemInstances[t]},createItemInstance:function(t,s){var o=this._generateId();return this._itemInstances[o]=new i(o,t,this,s),t.data(this.namespaced(e.PROP_IDENTIFIER),o),this._itemInstances[o]},reloadItemInstance:function(t){var i=t.data(this.namespaced(e.PROP_IDENTIFIER));this.destroyItemInstance(i),this.createItemInstance(t)},getItemInstance:function(t,i){var s=t.data(this.namespaced(e.PROP_IDENTIFIER));return this._isInited(t)?this._itemInstances[s]:this.createItemInstance(t,i)},_fetchElements:function(){setTimeout(function(){t(this.settings.selector).each(t.proxy(function(e,i){this.getItemInstance(t(i))},this))}.bind(this))},_generateId:function(){return(new Date).valueOf()+Math.floor(1e4*Math.random()).toString()},_isInited:function(t){return!!t.data(this.namespaced(e.PROP_INITED))},_hideAll:function(e,i){t.each(this._itemInstances,t.proxy(function(t,s){s.isVisible()&&this._visibleBeforeResize.push(s)&&s.hide(e,i)},this))},_showAll:function(t,e){this._visibleBeforeResize.forEach(function(i){i.show(t,e)})},_onAction:function(i){var s=t(i.currentTarget),o=this.getItemInstance(s);i.type===e.EVENT_CLICK&&o.data.trigger===e.TRIGGER_CLICK&&i.preventDefault(),o.actionHandler(i.type)},_onResize:function(){!this._task.resize&&this._hideAll(!0,!0),this._task.resize&&clearTimeout(this._task.resize),this._task.resize=setTimeout(function(){this._showAll(!0,!0),this._task.resize=void 0,this._visibleBeforeResize=[]}.bind(this),this.settings.delayResize)},_onBodyClick:function(i){var s=t(i.target),o=s.closest("."+e.SELECTOR_PREFIX+e.SELECTOR_CONTAINER)||!1,n=s.closest(e.DEFAULT_SELECTOR),h=(!!this._isInited(n)&&this.getItemInstance(n),!!this._isInited(o)&&this.getItemInstance(o));(!h||h&&h.data.trigger!==e.TRIGGER_CLICK)&&t.each(this._itemInstances,function(t,i){i.isVisible()&&i.data.trigger===e.TRIGGER_CLICK&&(!o||i.el.protip.get(0)!==o.get(0))&&(!n||i.el.source.get(0)!==n.get(0))&&i.hide()})},_onCloseClick:function(i){var s=t(i.currentTarget).parents("."+e.SELECTOR_PREFIX+e.SELECTOR_CONTAINER).data(this.namespaced(e.PROP_IDENTIFIER));this._itemInstances[s]&&this._itemInstances[s].hide()},_mutationObserverCallback:function(i){i.forEach(function(i){for(var s,o=0;o<i.addedNodes.length;o++)if(s=t(i.addedNodes[o]),!s.hasClass(e.SELECTOR_PREFIX+e.SELECTOR_CONTAINER)){var n=s.parent().find(this.settings.selector);n.each(function(i,s){if(s=t(s),!this._isInited(s)){var o=this.getItemInstance(s);o.data.trigger===e.TRIGGER_STICKY&&this.getItemInstance(s).show()}}.bind(this))}for(var o=0;o<i.removedNodes.length;o++){var h=t(i.removedNodes[o]);h.find(this.settings.selector).each(function(e,i){this.getItemInstance(t(i)).destroy()}.bind(this)),h.hasClass(this.settings.selector.replace(".",""))&&this.getItemInstance(h).destroy()}}.bind(this))},_bind:function(){var i=t(e.SELECTOR_BODY);i.on(e.EVENT_CLICK,t.proxy(this._onBodyClick,this)).on(e.EVENT_MOUSEOVER,this.settings.selector,t.proxy(this._onAction,this)).on(e.EVENT_MOUSEOUT,this.settings.selector,t.proxy(this._onAction,this)).on(e.EVENT_CLICK,this.settings.selector,t.proxy(this._onAction,this)).on(e.EVENT_CLICK,e.SELECTOR_CLOSE,t.proxy(this._onCloseClick,this)),t(window).on(e.EVENT_RESIZE,t.proxy(this._onResize,this)),this.settings.observer&&(this._observerInstance=new MutationObserver(this._mutationObserverCallback.bind(this)),this._observerInstance.observe(i.get(0),{attributes:!1,childList:!0,characterData:!1,subtree:!0}))},_unbind:function(){t(e.SELECTOR_BODY).off(e.EVENT_CLICK,t.proxy(this._onBodyClick,this)).off(e.EVENT_MOUSEOVER,this.settings.selector,t.proxy(this._onAction,this)).off(e.EVENT_MOUSEOUT,this.settings.selector,t.proxy(this._onAction,this)).off(e.EVENT_CLICK,this.settings.selector,t.proxy(this._onAction,this)).off(e.EVENT_CLICK,e.SELECTOR_CLOSE,t.proxy(this._onCloseClick,this)),t(window).off(e.EVENT_RESIZE,t.proxy(this._onResize,this)),this.settings.observer&&this._observerInstance.disconnect()}}),s})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Constants":4,"./Item":7}],4:[function(t,e,i){!function(t,s){"function"==typeof define&&define.amd?define([],s):"object"==typeof i?e.exports=s():t.ProtipConstants=s()}(this,function(){"use strict";var t={PLACEMENT_CENTER:"center",PLACEMENT_INSIDE:"inside",PLACEMENT_OUTSIDE:"outside",PLACEMENT_BORDER:"border",POSITION_TOP_LEFT:"top-left",POSITION_TOP:"top",POSITION_TOP_RIGHT:"top-right",POSITION_RIGHT_TOP:"right-top",POSITION_RIGHT:"right",POSITION_RIGHT_BOTTOM:"right-bottom",POSITION_BOTTOM_LEFT:"bottom-left",POSITION_BOTTOM:"bottom",POSITION_BOTTOM_RIGHT:"bottom-right",POSITION_LEFT_TOP:"left-top",POSITION_LEFT:"left",POSITION_LEFT_BOTTOM:"left-bottom",POSITION_CORNER_LEFT_TOP:"top-left-corner",POSITION_CORNER_RIGHT_TOP:"top-right-corner",POSITION_CORNER_LEFT_BOTTOM:"bottom-left-corner",POSITION_CORNER_RIGHT_BOTTOM:"bottom-right-corner",TRIGGER_CLICK:"click",TRIGGER_CLICK2:"click2",TRIGGER_HOVER:"hover",TRIGGER_STICKY:"sticky",PROP_TRIGGER:"trigger",PROP_TITLE:"title",PROP_STICKY:"sticky",PROP_INITED:"inited",PROP_DELAY_IN:"delayIn",PROP_DELAY_OUT:"delayOut",PROP_GRAVITY:"gravity",PROP_OFFSET:"offset",PROP_OFFSET_TOP:"offsetTop",PROP_OFFSET_LEFT:"offsetLeft",PROP_POSITION:"position",PROP_CLASS:"class",PROP_ARROW:"arrow",PROP_WIDTH:"width",PROP_IDENTIFIER:"identifier",PROP_ICON:"icon",PROP_AUTOSHOW:"autoShow",PROP_TARGET:"target",EVENT_MOUSEOVER:"mouseover",EVENT_MOUSEOUT:"mouseout",EVENT_MOUSEENTER:"mouseenter",EVENT_MOUSELEAVE:"mouseleave",EVENT_CLICK:"click",EVENT_RESIZE:"resize",EVENT_PROTIP_SHOW:"protipshow",EVENT_PROTIP_HIDE:"protiphide",EVENT_PROTIP_READY:"protipready",DEFAULT_SELECTOR:".protip",DEFAULT_NAMESPACE:"pt",DEFAULT_DELAY_OUT:100,SELECTOR_PREFIX:"protip-",SELECTOR_BODY:"body",SELECTOR_ARROW:"arrow",SELECTOR_CONTAINER:"container",SELECTOR_SHOW:"protip-show",SELECTOR_CLOSE:".protip-close",SELECTOR_SKIN_PREFIX:"protip-skin-",SELECTOR_SIZE_PREFIX:"--size-",SELECTOR_SCHEME_PREFIX:"--scheme-",SELECTOR_ANIMATE:"animated",SELECTOR_TARGET:".protip-target",SELECTOR_MIXIN_PREFIX:"protip-mixin--",SELECTOR_OPEN:"protip-open",TEMPLATE_PROTIP:'<div class="{classes}" data-pt-identifier="{identifier}" style="{widthType}:{width}px">{arrow}{icon}<div class="protip-content">{content}</div></div>',TEMPLATE_ICON:'<i class="icon-{icon}"></i>',ATTR_WIDTH:"width",ATTR_MAX_WIDTH:"max-width",SKIN_DEFAULT:"default",SIZE_DEFAULT:"normal",SCHEME_DEFAULT:"pro",PSEUDO_NEXT:"next",PSEUDO_PREV:"prev",PSEUDO_THIS:"this"};return t.TEMPLATE_ARROW='<span class="'+t.SELECTOR_PREFIX+t.SELECTOR_ARROW+'"></span>',t})},{}],5:[function(t,e,i){(function(s){!function(o,n){"use strict";"function"==typeof define&&define.amd?define(["jquery","./Constants"],n):"object"==typeof i?e.exports=n("undefined"!=typeof window?window.jQuery:"undefined"!=typeof s?s.jQuery:null,t("./Constants")):o.ProtipGravityParser=n(o.jQuery,o.ProtipConstants)}(this,function(t,e){"use strict";var i=function(t,e){return this._Construct(t,e)};return t.extend(!0,i.prototype,{_Construct:function(t,i){return this._positionsList=[{lvl:1,key:i,top:0,left:0},{lvl:3,key:e.POSITION_CORNER_LEFT_TOP,top:0,left:0},{lvl:2,key:e.POSITION_TOP_LEFT,top:0,left:0},{lvl:1,key:e.POSITION_TOP,top:0,left:0},{lvl:2,key:e.POSITION_TOP_RIGHT,top:0,left:0},{lvl:3,key:e.POSITION_CORNER_RIGHT_TOP,top:0,left:0},{lvl:2,key:e.POSITION_RIGHT_TOP,top:0,left:0},{lvl:1,key:e.POSITION_RIGHT,top:0,left:0},{lvl:2,key:e.POSITION_RIGHT_BOTTOM,top:0,left:0},{lvl:2,key:e.POSITION_BOTTOM_LEFT,top:0,left:0},{lvl:1,key:e.POSITION_BOTTOM,top:0,left:0},{lvl:2,key:e.POSITION_BOTTOM_RIGHT,top:0,left:0},{lvl:3,key:e.POSITION_CORNER_RIGHT_BOTTOM,top:0,left:0},{lvl:2,key:e.POSITION_LEFT_TOP,top:0,left:0},{lvl:1,key:e.POSITION_LEFT,top:0,left:0},{lvl:2,key:e.POSITION_LEFT_BOTTOM,top:0,left:0},{lvl:3,key:e.POSITION_CORNER_LEFT_BOTTOM,top:0,left:0}],this._input=t,this._finals=[],this._parse(),this._finals},_parse:function(){if(this._input===!0||3===this._input)this._finals=this._positionsList;else if(isNaN(this._input)){var t=[],e=!1;this._finals=this._input.split(";").map(function(i){if(i=i.trim(),"..."===i)e=!0;else if(i){var s=i.split(" ").map(function(t){return t.trim()});return t.push(s[0]),{lvl:1,key:s[0],left:parseInt(s[1],10)||0,top:parseInt(s[2],10)||0}}}).filter(function(t){return!!t}),e&&this._positionsList.forEach(function(e){t.indexOf(e.key)===-1&&this._finals.push(e)}.bind(this))}else this._finals=this._positionsList.filter(function(t){return t.lvl<=this._input}.bind(this))}}),i})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Constants":4}],6:[function(t,e,i){(function(s){!function(o,n){"use strict";"function"==typeof define&&define.amd?define(["jquery","./Constants","./GravityParser","./PositionCalculator"],n):"object"==typeof i?e.exports=n("undefined"!=typeof window?window.jQuery:"undefined"!=typeof s?s.jQuery:null,t("./Constants"),t("./GravityParser"),t("./PositionCalculator")):o.ProtipGravityTester=n(o.jQuery,o.ProtipConstants,o.ProtipGravityParser,o.ProtipPositionCalculator)}(this,function(t,e,i,s){"use strict";var o=function(t){return this._Construct(t)};return t.extend(!0,o.prototype,{_Construct:function(t){this._item=t,this._result=void 0,this._setWindowDimensions(),this._positionList=new i(this._item.data.gravity,this._item.data.position);var e;for(e=0;e<this._positionList.length&&!this._test(this._positionList[e]);e++);return this._item.data.position=this._positionList[0].key,this._result||new s(this._item)},_test:function(t){this._setProtipMinWidth();var e=new s(this._item,t.key,t);return this._item.el.protip.css(e),this._setProtipDimensions(),!!(this._topOk()&&this._rightOk()&&this._bottomOk()&&this._leftOk())&&(e.position=t.key,this._result=e,!0)},_topOk:function(){return this._dimensions.offset.top-this._windowDimensions.scrollTop>0},_rightOk:function(){return this._dimensions.offset.left+this._dimensions.width<this._windowDimensions.width},_bottomOk:function(){return this._dimensions.offset.top-this._windowDimensions.scrollTop+this._dimensions.height<this._windowDimensions.height},_leftOk:function(){return this._dimensions.offset.left>0},_setProtipMinWidth:function(){if(this._item.classInstance.settings.forceMinWidth){this._item.el.protip.css({position:"fixed",left:0,top:0,minWidth:0});var t=this._item.el.protip.outerWidth()+1;this._item.el.protip.css({position:"",left:"",top:"",minWidth:t+"px"})}},_setProtipDimensions:function(){this._dimensions={width:this._item.el.protip.outerWidth()||0,height:this._item.el.protip.outerHeight()||0,offset:this._item.el.protip.offset()}},_setWindowDimensions:function(){var t=window,e=document,i=e.documentElement,s=e.getElementsByTagName("body")[0],o=t.innerWidth||i.clientWidth||s.clientWidth,n=t.innerHeight||i.clientHeight||s.clientHeight;this._windowDimensions={width:parseInt(o),height:parseInt(n),scrollTop:window.pageYOffset||document.documentElement.scrollTop||document.getElementsByTagName("body")[0].scrollTop||0}}}),o})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Constants":4,"./GravityParser":5,"./PositionCalculator":9}],7:[function(t,e,i){(function(s){!function(o,n){"use strict";"function"==typeof define&&define.amd?define(["jquery","./Constants","./GravityTester","./PositionCalculator"],n):"object"==typeof i?e.exports=n("undefined"!=typeof window?window.jQuery:"undefined"!=typeof s?s.jQuery:null,t("./Constants"),t("./GravityTester"),t("./PositionCalculator")):o.ProtipItemClass=n(o.jQuery,o.ProtipConstants,o.ProtipGravityTester,o.ProtipPositionCalculator)}(this,function(t,e,i,s){"use strict";function o(t,e){return t.replace(/\{([\w\.]*)}/g,function(t,i){for(var s=i.split("."),o=e[s.shift()],n=0,h=s.length;n<h;n++)o=o[s[n]];return"undefined"!=typeof o&&null!==o?o:""})}var n=function(t,e,i,s){return this._Construct(t,e,i,s)};return t.extend(!0,n.prototype,{_Construct:function(t,i,s,o){return this._override=o||{},this._override.identifier=t,this.el={},this.el.source=i,this.data={},this.classInstance=s,this._isVisible=!1,this._task={delayIn:void 0,delayOut:void 0},this._fetchData(),this._prepareInternals(),this._appendProtip(),this._initSticky(),this._initAutoShow(),this._bind(),this.el.source.addClass(this.classInstance.settings.selector.replace(".","")).data(this._namespaced(e.PROP_INITED),!0),setTimeout(function(){this.el.source.trigger(e.EVENT_PROTIP_READY,this)}.bind(this),10),this},actionHandler:function(t){if(this.data.trigger===e.TRIGGER_STICKY);else if(t!==e.EVENT_CLICK||this.data.trigger!==e.TRIGGER_CLICK&&this.data.trigger!==e.TRIGGER_CLICK2){if(this.data.trigger!==e.TRIGGER_CLICK&&this.data.trigger!==e.TRIGGER_CLICK2)switch(t){case e.EVENT_MOUSEOUT:this.hide();break;case e.EVENT_MOUSEOVER:this.show()}}else this.toggle()},destroy:function(){this.hide(!0),this._unbind(),this.el.protip.remove(),this.el.source.data(this._namespaced(e.PROP_INITED),!1).data(this._namespaced(e.PROP_IDENTIFIER),!1).removeData(),this.classInstance.onItemDestoryed(this.data.identifier),t.each(this._task,function(t,e){clearTimeout(e)})},isVisible:function(){return this._isVisible},toggle:function(){this._isVisible?this.hide():this.show()},show:function(t,o){if(this.data.title){if(this._task.delayOut&&clearTimeout(this._task.delayOut),this._task.delayIn&&clearTimeout(this._task.delayIn),this._task.autoHide&&clearTimeout(this._task.autoHide),!t&&this.data.delayIn)return void(this._task.delayIn=setTimeout(function(){this.show(!0)}.bind(this),this.data.delayIn));this.data.autoHide!==!1&&(this._task.autoHide=setTimeout(function(){this.hide(!0)}.bind(this),this.data.autoHide));var n;this.data.gravity?(n=new i(this),delete n.position):n=new s(this),this.el.source.addClass(e.SELECTOR_OPEN),!o&&this.el.source.trigger(e.EVENT_PROTIP_SHOW,this),this.el.protip.css(n).addClass(e.SELECTOR_SHOW),this.data.animate&&this.el.protip.addClass(e.SELECTOR_ANIMATE).addClass(this.data.animate||this.classInstance.settings.animate),this._isVisible=!0}},applyPosition:function(t){this.el.protip.attr("data-"+e.DEFAULT_NAMESPACE+"-"+e.PROP_POSITION,t)},hide:function(t,i){return this._task.delayOut&&clearTimeout(this._task.delayOut),this._task.delayIn&&clearTimeout(this._task.delayIn),this._task.autoHide&&clearTimeout(this._task.autoHide),!t&&this.data.delayOut?void(this._task.delayOut=setTimeout(function(){this.hide(!0)}.bind(this),this.data.delayOut)):(this.el.source.removeClass(e.SELECTOR_OPEN),!i&&this.el.source.trigger(e.EVENT_PROTIP_HIDE,this),this.el.protip.removeClass(e.SELECTOR_SHOW).removeClass(e.SELECTOR_ANIMATE).removeClass(this.data.animate),void(this._isVisible=!1))},getArrowOffset:function(){return{width:this.el.protipArrow.outerWidth()||0,height:this.el.protipArrow.outerHeight()||0}},_fetchData:function(){t.each(this.classInstance.settings.defaults,t.proxy(function(t){this.data[t]=this.el.source.data(this._namespaced(t))},this)),this.data=t.extend({},this.classInstance.settings.defaults,this.data),this.data=t.extend({},this.data,this._override),t.each(this.data,t.proxy(function(t,e){this.el.source.data(this._namespaced(t),e)},this))},_prepareInternals:function(){this._setTarget(),this._detectTitle(),this._checkInteractive()},_checkInteractive:function(){this.data.interactive&&(this.data.delayOut=this.data.delayOut||e.DEFAULT_DELAY_OUT)},_initSticky:function(){this.data.trigger===e.TRIGGER_STICKY&&this.show()},_initAutoShow:function(){this.data.autoShow&&this.show()},_appendProtip:function(){this.el.protip=o(this.classInstance.settings.protipTemplate,{classes:this._getClassList(),widthType:this._getWidthType(),width:this._getWidth(),content:this.data.title,icon:this._getIconTemplate(),arrow:this.data.arrow?e.TEMPLATE_ARROW:"",identifier:this.data.identifier}),this.el.protip=t(this.el.protip),this.el.protipArrow=this.el.protip.find("."+e.SELECTOR_PREFIX+e.SELECTOR_ARROW),this.el.target.append(this.el.protip)},_getClassList:function(){var t=[],i=this.data.skin,s=this.data.size,o=this.data.scheme;return t.push(e.SELECTOR_PREFIX+e.SELECTOR_CONTAINER),t.push(e.SELECTOR_SKIN_PREFIX+i),t.push(e.SELECTOR_SKIN_PREFIX+i+e.SELECTOR_SIZE_PREFIX+s),t.push(e.SELECTOR_SKIN_PREFIX+i+e.SELECTOR_SCHEME_PREFIX+o),this.data.classes&&t.push(this.data.classes),this.data.mixin&&t.push(this._parseMixins()),t.join(" ")},_parseMixins:function(){var t=[];return this.data.mixin&&this.data.mixin.split(" ").forEach(function(i){i&&t.push(e.SELECTOR_MIXIN_PREFIX+i)},this),t.join(" ")},_getWidthType:function(){return isNaN(this.data.width)?e.ATTR_WIDTH:e.ATTR_MAX_WIDTH},_getWidth:function(){return parseInt(this.data.width,10)},_getIconTemplate:function(){return this.data.icon?o(this.classInstance.settings.iconTemplate,{icon:this.data.icon}):""},_detectTitle:function(){if(!this.data.title||"#"!==this.data.title.charAt(0)&&"."!==this.data.title.charAt(0)){if(this.data.title&&":"===this.data.title.charAt(0)){var i=this.data.title.substring(1);switch(i){case e.PSEUDO_NEXT:this.data.title=this.el.source.next().html();break;case e.PSEUDO_PREV:this.data.title=this.el.source.prev().html();break;case e.PSEUDO_THIS:this.data.title=this.el.source.html()}}}else this.data.titleSource=this.data.titleSource||this.data.title,this.data.title=t(this.data.title).html();this.data.title&&this.data.title.indexOf("<a ")+1&&(this.data.interactive=!0)},_setTarget:function(){var i=this._getData(e.PROP_TARGET);i=i===!0?this.el.source:i===e.SELECTOR_BODY&&this.el.source.closest(e.SELECTOR_TARGET).length?this.el.source.closest(e.SELECTOR_TARGET):t(i?i:e.SELECTOR_BODY),"static"===i.css("position")&&i.css({position:"relative"}),this.el.target=i},_getData:function(t){return this.el.source.data(this._namespaced(t))},_namespaced:function(t){return this.classInstance.namespaced(t)},_onProtipMouseenter:function(){clearTimeout(this._task.delayOut)},_onProtipMouseleave:function(){this.data.trigger===e.TRIGGER_HOVER&&this.hide()},_bind:function(){this.data.interactive&&this.el.protip.on(e.EVENT_MOUSEENTER,t.proxy(this._onProtipMouseenter,this)).on(e.EVENT_MOUSELEAVE,t.proxy(this._onProtipMouseleave,this)),this.data.observer&&(this._observerInstance=new MutationObserver(function(){this.classInstance.reloadItemInstance(this.el.source)}.bind(this)),this._observerInstance.observe(this.el.source.get(0),{attributes:!0,childList:!1,characterData:!1,subtree:!1}))},_unbind:function(){this.data.interactive&&this.el.protip.off(e.EVENT_MOUSEENTER,t.proxy(this._onProtipMouseenter,this)).off(e.EVENT_MOUSELEAVE,t.proxy(this._onProtipMouseleave,this)),this.data.observer&&this._observerInstance.disconnect()}}),n})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Constants":4,"./GravityTester":6,"./PositionCalculator":9}],8:[function(t,e,i){(function(s){!function(o,n){"use strict";"function"==typeof define&&define.amd?define(["jquery","./Class","./Buffer","./Constants"],n):"object"==typeof i?e.exports=n("undefined"!=typeof window?window.jQuery:"undefined"!=typeof s?s.jQuery:null,t("./Class"),t("./Buffer"),t("./Constants")):n(o.jQuery,o.ProtipClass,o.ProtipBuffer,o.ProtipContants)}(this,function(t,e,i,s){"use strict";t=t.extend(t,{_protipClassInstance:void 0,_protipBuffer:new i,protip:function(t){return this._protipClassInstance||(this._protipClassInstance=new e(t),this.protip.C=s),this._protipClassInstance}}),t.fn.extend({protipSet:function(e){return t._protipBuffer.isReady()?this.each(function(i,s){s=t(s),t._protipClassInstance.getItemInstance(s).destroy(),t._protipClassInstance.getItemInstance(s,e)}):(t._protipBuffer.add("protipSet",this,arguments),this)},protipShow:function(e){return t._protipBuffer.isReady()?this.each(function(i,s){s=t(s),t._protipClassInstance.getItemInstance(s).destroy(),t._protipClassInstance.getItemInstance(s,e).show(!0)}):(t._protipBuffer.add("protipShow",this,arguments),this)},protipHide:function(){return t._protipBuffer.isReady()?this.each(function(e,i){t._protipClassInstance.getItemInstance(t(i)).hide(!0)}):(t._protipBuffer.add("protipHide",this,arguments),this)},protipToggle:function(){if(t._protipBuffer.isReady()){var e;return this.each(function(i,s){e=t._protipClassInstance.getItemInstance(t(s)),e=e.isVisible()?e.hide(!0):e.show(!0)}.bind(this))}return t._protipBuffer.add("protipToggle",this,arguments),this},protipHideInside:function(){return t._protipBuffer.isReady()?this.each(function(e,i){t(i).find(t._protipClassInstance.settings.selector).each(function(e,i){t._protipClassInstance.getItemInstance(t(i)).hide(!0)})}):(t._protipBuffer.add("protipHideInside",this,arguments),this)},protipShowInside:function(){return t._protipBuffer.isReady()?this.each(function(e,i){t(i).find(t._protipClassInstance.settings.selector).each(function(e,i){t._protipClassInstance.getItemInstance(t(i)).show(!0)})}):(t._protipBuffer.add("protipShowInside",this,arguments),this)},protipToggleInside:function(){if(t._protipBuffer.isReady()){var e;return this.each(function(i,s){t(s).find(t._protipClassInstance.settings.selector).each(function(i,s){e=t._protipClassInstance.getItemInstance(t(s)),e=e.isVisible()?e.hide(!0):e.show(!0)})})}return t._protipBuffer.add("protipToggleInside",this,arguments),this}})})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Buffer":2,"./Class":3,"./Constants":4}],9:[function(t,e,i){(function(s){!function(o,n){"use strict";"function"==typeof define&&define.amd?define(["jquery","./Constants"],n):"object"==typeof i?e.exports=n("undefined"!=typeof window?window.jQuery:"undefined"!=typeof s?s.jQuery:null,t("./Constants")):o.ProtipPositionCalculator=n(o.jQuery,o.ProtipConstants)}(this,function(t,e){"use strict";var i=function(t,e,i){return this._Construct(t,e,i)};return t.extend(!0,i.prototype,{_Construct:function(t,e,i){return this._itemInstance=t,this._protip=this._getProto(this._itemInstance.el.protip),this._source=this._getProto(this._itemInstance.el.source),this._target=this._getProto(this._itemInstance.el.target),this._position=e||this._itemInstance.data.position,this._placement=this._itemInstance.data.placement,this._offset=i||{top:this._itemInstance.data.offsetTop,left:this._itemInstance.data.offsetLeft},this._getPosition()},_getProto:function(t){var e={el:void 0,width:void 0,height:void 0,offset:void 0};return e.el=t,e.width=t.outerWidth()||0,e.height=t.outerHeight()||0,e.offset=t.offset(),e},_getPosition:function(){this._itemInstance.applyPosition(this._position);var t={left:0,top:0},i=this._itemInstance.getArrowOffset(),s=this._itemInstance.classInstance.settings.offset;if(this._placement!==e.PLACEMENT_CENTER)switch(this._position){case e.POSITION_TOP:this._offset.top+=(s+i.height)*-1,t.left=this._source.offset.left+this._source.width/2-this._protip.width/2-this._target.offset.left+this._offset.left,t.top=this._source.offset.top-this._protip.height-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.top+=this._protip.height),this._placement===e.PLACEMENT_BORDER&&(t.top+=this._protip.height/2);break;case e.POSITION_TOP_LEFT:this._offset.top+=(s+i.height)*-1,t.left=this._source.offset.left-this._target.offset.left+this._offset.left,t.top=this._source.offset.top-this._protip.height-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.top+=this._protip.height),this._placement===e.PLACEMENT_BORDER&&(t.top+=this._protip.height/2);break;case e.POSITION_TOP_RIGHT:this._offset.top+=(s+i.height)*-1,t.left=this._source.offset.left+this._source.width-this._protip.width-this._target.offset.left+this._offset.left,t.top=this._source.offset.top-this._protip.height-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.top+=this._protip.height),this._placement===e.PLACEMENT_BORDER&&(t.top+=this._protip.height/2);break;case e.POSITION_RIGHT:this._offset.left+=s+i.width,t.left=this._source.offset.left+this._source.width-this._target.offset.left+this._offset.left,t.top=this._source.offset.top+this._source.height/2-this._protip.height/2-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.left-=this._protip.width),this._placement===e.PLACEMENT_BORDER&&(t.left-=this._protip.width/2);break;case e.POSITION_RIGHT_TOP:this._offset.left+=s+i.width,t.left=this._source.offset.left+this._source.width-this._target.offset.left+this._offset.left,t.top=this._source.offset.top-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.left-=this._protip.width),this._placement===e.PLACEMENT_BORDER&&(t.left-=this._protip.width/2);break;case e.POSITION_RIGHT_BOTTOM:this._offset.left+=s+i.width,t.left=this._source.offset.left+this._source.width-this._target.offset.left+this._offset.left,t.top=this._source.offset.top+this._source.height-this._protip.height-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.left-=this._protip.width),this._placement===e.PLACEMENT_BORDER&&(t.left-=this._protip.width/2);break;case e.POSITION_BOTTOM:this._offset.top+=s+i.height,t.left=this._source.offset.left+this._source.width/2-this._protip.width/2-this._target.offset.left+this._offset.left,t.top=this._source.offset.top+this._source.height-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.top-=this._protip.height),this._placement===e.PLACEMENT_BORDER&&(t.top-=this._protip.height/2);break;case e.POSITION_BOTTOM_LEFT:this._offset.top+=s+i.height,t.left=this._source.offset.left-this._target.offset.left+this._offset.left,t.top=this._source.offset.top+this._source.height-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.top-=this._protip.height),this._placement===e.PLACEMENT_BORDER&&(t.top-=this._protip.height/2);break;case e.POSITION_BOTTOM_RIGHT:this._offset.top+=s+i.height,t.left=this._source.offset.left+this._source.width-this._protip.width-this._target.offset.left+this._offset.left,t.top=this._source.offset.top+this._source.height-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.top-=this._protip.height),this._placement===e.PLACEMENT_BORDER&&(t.top-=this._protip.height/2);break;case e.POSITION_LEFT:this._offset.left+=(s+i.width)*-1,t.left=this._source.offset.left-this._protip.width-this._target.offset.left+this._offset.left,t.top=this._source.offset.top+this._source.height/2-this._protip.height/2-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.left+=this._protip.width),this._placement===e.PLACEMENT_BORDER&&(t.left+=this._protip.width/2);break;case e.POSITION_LEFT_TOP:this._offset.left+=(s+i.width)*-1,t.left=this._source.offset.left-this._protip.width-this._target.offset.left+this._offset.left,t.top=this._source.offset.top-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.left+=this._protip.width),this._placement===e.PLACEMENT_BORDER&&(t.left+=this._protip.width/2);break;case e.POSITION_LEFT_BOTTOM:this._offset.left+=(s+i.width)*-1,t.left=this._source.offset.left-this._protip.width-this._target.offset.left+this._offset.left,t.top=this._source.offset.top+this._source.height-this._protip.height-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.left+=this._protip.width),this._placement===e.PLACEMENT_BORDER&&(t.left+=this._protip.width/2);break;case e.POSITION_CORNER_LEFT_TOP:this._offset.top+=(s+i.height)*-1,t.left=this._source.offset.left-this._protip.width-this._target.offset.left+this._offset.left,t.top=this._source.offset.top-this._protip.height-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.left+=this._protip.width),this._placement===e.PLACEMENT_INSIDE&&(t.top+=this._protip.height),this._placement===e.PLACEMENT_BORDER&&(t.left+=this._protip.width/2),this._placement===e.PLACEMENT_BORDER&&(t.top+=this._protip.height/2);break;case e.POSITION_CORNER_LEFT_BOTTOM:this._offset.top+=s+i.height,t.left=this._source.offset.left-this._protip.width-this._target.offset.left+this._offset.left,t.top=this._source.offset.top+this._source.height-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.left+=this._protip.width),this._placement===e.PLACEMENT_INSIDE&&(t.top-=this._protip.height),this._placement===e.PLACEMENT_BORDER&&(t.left+=this._protip.width/2),this._placement===e.PLACEMENT_BORDER&&(t.top-=this._protip.height/2);break;case e.POSITION_CORNER_RIGHT_BOTTOM:this._offset.top+=s+i.height,t.left=this._source.offset.left+this._source.width-this._target.offset.left+this._offset.left,t.top=this._source.offset.top+this._source.height-this._target.offset.top+this._offset.top,
this._placement===e.PLACEMENT_INSIDE&&(t.left-=this._protip.width),this._placement===e.PLACEMENT_INSIDE&&(t.top-=this._protip.height),this._placement===e.PLACEMENT_BORDER&&(t.left-=this._protip.width/2),this._placement===e.PLACEMENT_BORDER&&(t.top-=this._protip.height/2);break;case e.POSITION_CORNER_RIGHT_TOP:this._offset.top+=(s+i.height)*-1,t.left=this._source.offset.left+this._source.width-this._target.offset.left+this._offset.left,t.top=this._source.offset.top-this._protip.height-this._target.offset.top+this._offset.top,this._placement===e.PLACEMENT_INSIDE&&(t.left-=this._protip.width),this._placement===e.PLACEMENT_INSIDE&&(t.top+=this._protip.height),this._placement===e.PLACEMENT_BORDER&&(t.left-=this._protip.width/2),this._placement===e.PLACEMENT_BORDER&&(t.top+=this._protip.height/2)}else t.left=this._source.offset.left+this._source.width/2-this._protip.width/2-this._target.offset.left+this._offset.left,t.top=this._source.offset.top+this._source.height/2-this._protip.height/2-this._target.offset.top+this._offset.top;return t.left=t.left+"px",t.top=t.top+"px",t}}),i})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Constants":4}]},{},[1]);