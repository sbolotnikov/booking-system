(function(){/*
 *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
*****************************************************************************/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);$jscomp.checkEs6ConformanceViaProxy=function(){try{var b={},e=Object.create(new $jscomp.global.Proxy(b,{get:function(f,a,g){return f==b&&"q"==a&&g==e}}));return!0===e.q}catch(f){return!1}};$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS=!1;
$jscomp.ES6_CONFORMANCE=$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS&&$jscomp.checkEs6ConformanceViaProxy();$jscomp.arrayIteratorImpl=function(b){var e=0;return function(){return e<b.length?{done:!1,value:b[e++]}:{done:!0}}};$jscomp.arrayIterator=function(b){return{next:$jscomp.arrayIteratorImpl(b)}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,e,f){b!=Array.prototype&&b!=Object.prototype&&(b[e]=f.value)};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var b=0;return function(e){return $jscomp.SYMBOL_PREFIX+(e||"")+b++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.iterator;b||(b=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&$jscomp.defineProperty(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.asyncIterator;b||(b=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(b){$jscomp.initSymbolIterator();b={next:b};b[$jscomp.global.Symbol.iterator]=function(){return this};return b};
$jscomp.makeIterator=function(b){var e="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];return e?e.call(b):$jscomp.arrayIterator(b)};$jscomp.owns=function(b,e){return Object.prototype.hasOwnProperty.call(b,e)};$jscomp.polyfill=function(b,e,f,a){if(e){f=$jscomp.global;b=b.split(".");for(a=0;a<b.length-1;a++){var g=b[a];g in f||(f[g]={});f=f[g]}b=b[b.length-1];a=f[b];e=e(a);e!=a&&null!=e&&$jscomp.defineProperty(f,b,{configurable:!0,writable:!0,value:e})}};
$jscomp.polyfill("WeakMap",function(b){function e(){if(!b||!Object.seal)return!1;try{var c=Object.seal({}),d=Object.seal({}),a=new b([[c,2],[d,3]]);if(2!=a.get(c)||3!=a.get(d))return!1;a.delete(c);a.set(d,4);return!a.has(c)&&4==a.get(d)}catch(v){return!1}}function f(){}function a(c){if(!$jscomp.owns(c,h)){var a=new f;$jscomp.defineProperty(c,h,{value:a})}}function g(c){var d=Object[c];d&&(Object[c]=function(c){if(c instanceof f)return c;a(c);return d(c)})}if($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS){if(b&&
$jscomp.ES6_CONFORMANCE)return b}else if(e())return b;var h="$jscomp_hidden_"+Math.random();g("freeze");g("preventExtensions");g("seal");var k=0,d=function(c){this.id_=(k+=Math.random()+1).toString();if(c){c=$jscomp.makeIterator(c);for(var d;!(d=c.next()).done;)d=d.value,this.set(d[0],d[1])}};d.prototype.set=function(c,d){a(c);if(!$jscomp.owns(c,h))throw Error("WeakMap key fail: "+c);c[h][this.id_]=d;return this};d.prototype.get=function(c){return $jscomp.owns(c,h)?c[h][this.id_]:void 0};d.prototype.has=
function(c){return $jscomp.owns(c,h)&&$jscomp.owns(c[h],this.id_)};d.prototype.delete=function(c){return $jscomp.owns(c,h)&&$jscomp.owns(c[h],this.id_)?delete c[h][this.id_]:!1};return d},"es6","es3");$jscomp.MapEntry=function(){};
$jscomp.polyfill("Map",function(b){function e(){if($jscomp.ASSUME_NO_NATIVE_MAP||!b||"function"!=typeof b||!b.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new b($jscomp.makeIterator([[c,"s"]]));if("s"!=d.get(c)||1!=d.size||d.get({x:4})||d.set({x:4},"t")!=d||2!=d.size)return!1;var a=d.entries(),g=a.next();if(g.done||g.value[0]!=c||"s"!=g.value[1])return!1;g=a.next();return g.done||4!=g.value[0].x||"t"!=g.value[1]||!a.next().done?!1:!0}catch(n){return!1}}
if($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS){if(b&&$jscomp.ES6_CONFORMANCE)return b}else if(e())return b;$jscomp.initSymbolIterator();var f=new WeakMap,a=function(c){this.data_={};this.head_=k();this.size=0;if(c){c=$jscomp.makeIterator(c);for(var d;!(d=c.next()).done;)d=d.value,this.set(d[0],d[1])}};a.prototype.set=function(c,d){c=0===c?0:c;var a=g(this,c);a.list||(a.list=this.data_[a.id]=[]);a.entry?a.entry.value=d:(a.entry={next:this.head_,previous:this.head_.previous,head:this.head_,key:c,
value:d},a.list.push(a.entry),this.head_.previous.next=a.entry,this.head_.previous=a.entry,this.size++);return this};a.prototype.delete=function(c){c=g(this,c);return c.entry&&c.list?(c.list.splice(c.index,1),c.list.length||delete this.data_[c.id],c.entry.previous.next=c.entry.next,c.entry.next.previous=c.entry.previous,c.entry.head=null,this.size--,!0):!1};a.prototype.clear=function(){this.data_={};this.head_=this.head_.previous=k();this.size=0};a.prototype.has=function(c){return!!g(this,c).entry};
a.prototype.get=function(c){return(c=g(this,c).entry)&&c.value};a.prototype.entries=function(){return h(this,function(c){return[c.key,c.value]})};a.prototype.keys=function(){return h(this,function(c){return c.key})};a.prototype.values=function(){return h(this,function(c){return c.value})};a.prototype.forEach=function(c,d){for(var a=this.entries(),b;!(b=a.next()).done;)b=b.value,c.call(d,b[1],b[0],this)};a.prototype[Symbol.iterator]=a.prototype.entries;var g=function(c,a){var b=a&&typeof a;"object"==
b||"function"==b?f.has(a)?b=f.get(a):(b=""+ ++d,f.set(a,b)):b="p_"+a;var g=c.data_[b];if(g&&$jscomp.owns(c.data_,b))for(c=0;c<g.length;c++){var e=g[c];if(a!==a&&e.key!==e.key||a===e.key)return{id:b,list:g,index:c,entry:e}}return{id:b,list:g,index:-1,entry:void 0}},h=function(c,d){var a=c.head_;return $jscomp.iteratorPrototype(function(){if(a){for(;a.head!=c.head_;)a=a.previous;for(;a.next!=a.head;)return a=a.next,{done:!1,value:d(a)};a=null}return{done:!0,value:void 0}})},k=function(){var c={};return c.previous=
c.next=c.head=c},d=0;return a},"es6","es3");$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(b){function e(){this.batch_=null}function f(a){return a instanceof g?a:new g(function(d,c){d(a)})}if(b&&!$jscomp.FORCE_POLYFILL_PROMISE)return b;e.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};e.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var a=$jscomp.global.setTimeout;e.prototype.asyncExecuteFunction=function(b){a(b,
0)};e.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=this.batch_;this.batch_=[];for(var d=0;d<a.length;++d){var c=a[d];a[d]=null;try{c()}catch(q){this.asyncThrow_(q)}}}this.batch_=null};e.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var g=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var d=this.createResolveAndReject_();try{a(d.resolve,d.reject)}catch(c){d.reject(c)}};g.prototype.createResolveAndReject_=
function(){function a(a){return function(b){c||(c=!0,a.call(d,b))}}var d=this,c=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};g.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof g)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var d=null!=a;break a;case "function":d=!0;break a;default:d=!1}d?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};g.prototype.resolveToNonPromiseObj_=function(a){var d=
void 0;try{d=a.then}catch(c){this.reject_(c);return}"function"==typeof d?this.settleSameAsThenable_(d,a):this.fulfill_(a)};g.prototype.reject_=function(a){this.settle_(2,a)};g.prototype.fulfill_=function(a){this.settle_(1,a)};g.prototype.settle_=function(a,d){if(0!=this.state_)throw Error("Cannot settle("+a+", "+d+"): Promise already settled in state"+this.state_);this.state_=a;this.result_=d;this.executeOnSettledCallbacks_()};g.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
0;a<this.onSettledCallbacks_.length;++a)h.asyncExecute(this.onSettledCallbacks_[a]);this.onSettledCallbacks_=null}};var h=new e;g.prototype.settleSameAsPromise_=function(a){var d=this.createResolveAndReject_();a.callWhenSettled_(d.resolve,d.reject)};g.prototype.settleSameAsThenable_=function(a,d){var c=this.createResolveAndReject_();try{a.call(d,c.resolve,c.reject)}catch(q){c.reject(q)}};g.prototype.then=function(a,d){function c(a,c){return"function"==typeof a?function(c){try{b(a(c))}catch(p){e(p)}}:
c}var b,e,f=new g(function(a,c){b=a;e=c});this.callWhenSettled_(c(a,b),c(d,e));return f};g.prototype.catch=function(a){return this.then(void 0,a)};g.prototype.callWhenSettled_=function(a,d){function c(){switch(b.state_){case 1:a(b.result_);break;case 2:d(b.result_);break;default:throw Error("Unexpected state: "+b.state_);}}var b=this;null==this.onSettledCallbacks_?h.asyncExecute(c):this.onSettledCallbacks_.push(c)};g.resolve=f;g.reject=function(a){return new g(function(d,c){c(a)})};g.race=function(a){return new g(function(d,
c){for(var b=$jscomp.makeIterator(a),g=b.next();!g.done;g=b.next())f(g.value).callWhenSettled_(d,c)})};g.all=function(a){var d=$jscomp.makeIterator(a),c=d.next();return c.done?f([]):new g(function(a,b){function g(c){return function(d){e[c]=d;h--;0==h&&a(e)}}var e=[],h=0;do e.push(void 0),h++,f(c.value).callWhenSettled_(g(e.length-1),b),c=d.next();while(!c.done)})};return g},"es6","es3");
$jscomp.checkStringArgs=function(b,e,f){if(null==b)throw new TypeError("The 'this' value for String.prototype."+f+" must not be null or undefined");if(e instanceof RegExp)throw new TypeError("First argument to String.prototype."+f+" must not be a regular expression");return b+""};
$jscomp.polyfill("String.prototype.endsWith",function(b){return b?b:function(b,f){var a=$jscomp.checkStringArgs(this,b,"endsWith");b+="";void 0===f&&(f=a.length);f=Math.max(0,Math.min(f|0,a.length));for(var g=b.length;0<g&&0<f;)if(a[--f]!=b[--g])return!1;return 0>=g}},"es6","es3");$jscomp.underscoreProtoCanBeSet=function(){var b={a:!0},e={};try{return e.__proto__=b,e.a}catch(f){}return!1};
$jscomp.setPrototypeOf="function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(b,e){b.__proto__=e;if(b.__proto__!==e)throw new TypeError(b+" is not extensible");return b}:null;$jscomp.polyfill("Object.setPrototypeOf",function(b){return b||$jscomp.setPrototypeOf},"es6","es5");
$jscomp.assign="function"==typeof Object.assign?Object.assign:function(b,e){for(var f=1;f<arguments.length;f++){var a=arguments[f];if(a)for(var g in a)$jscomp.owns(a,g)&&(b[g]=a[g])}return b};$jscomp.polyfill("Object.assign",function(b){return b||$jscomp.assign},"es6","es3");
(function(b){function e(a){if(f[a])return f[a].exports;var g=f[a]={i:a,l:!1,exports:{}};b[a].call(g.exports,g,g.exports,e);g.l=!0;return g.exports}var f={};e.m=b;e.c=f;e.d=function(a,b,f){e.o(a,b)||Object.defineProperty(a,b,{enumerable:!0,get:f})};e.r=function(a){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"});Object.defineProperty(a,"__esModule",{value:!0})};e.t=function(a,b){b&1&&(a=e(a));if(b&8||b&4&&"object"===typeof a&&a&&a.__esModule)return a;
var g=Object.create(null);e.r(g);Object.defineProperty(g,"default",{enumerable:!0,value:a});if(b&2&&"string"!=typeof a)for(var f in a)e.d(g,f,function(d){return a[d]}.bind(null,f));return g};e.n=function(a){var b=a&&a.__esModule?function(){return a["default"]}:function(){return a};e.d(b,"a",b);return b};e.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};e.p="/core/office/";return e(e.s=13)})([function(b,e,f){f.d(e,"c",function(){return g});f.d(e,"a",function(){return k});f.d(e,"b",
function(){return h});var a=f(1),g=function(b,c){Object(a.a)("disableLogs")||(c?console.warn(b+": "+c):console.warn(b))},h=function(a,c,b){var d=b.pop();b=b.length?b.join(", ")+" and "+d:d;g("'"+c+"' is deprecated since version "+a+". Please use "+b+" instead.")},k=function(a,c){}},function(b,e,f){f.d(e,"a",function(){return h});f.d(e,"b",function(){return k});var a={},g={flattenedResources:!1,CANVAS_CACHE_SIZE:void 0,maxPagesBefore:void 0,maxPagesAhead:void 0,disableLogs:!1,wvsQueryParameters:{},
_trnDebugMode:!1,_logFiltersEnabled:null},h=function(a){return g[a]},k=function(b,c){var d;g[b]=c;null===(d=a[b])||void 0===d?void 0:d.forEach(function(a){a(c)})}},function(b,e,f){f.d(e,"a",function(){return w});f.d(e,"b",function(){return z});f.d(e,"c",function(){return D});var a=f(8),g=f(0),h=f(4),k=f(3),d="undefined"===typeof window?self:window,c=d.importScripts,q=!1,u=function(a,b){q||(c(d.basePath+"decode.min.js"),q=!0);a=self.BrotliDecode(Object(k.b)(a));return b?a:Object(k.a)(a)},v=function(c,
b){return Object(a.a)(void 0,void 0,Promise,function(){var d;return Object(a.b)(this,function(a){switch(a.label){case 0:return q?[3,2]:[4,Object(h.a)(self.Core.getWorkerPath()+"external/decode.min.js","Failed to download decode.min.js",window)];case 1:a.sent(),q=!0,a.label=2;case 2:return d=self.BrotliDecode(Object(k.b)(c)),[2,b?d:Object(k.a)(d)]}})})};(function(){function a(){this.remainingDataArrays=[]}a.prototype.processRaw=function(a){return a};a.prototype.processBrotli=function(a){this.remainingDataArrays.push(a);
return null};a.prototype.GetNextChunk=function(a){this.decodeFunction||(this.decodeFunction=0===a[0]&&97===a[1]&&115===a[2]&&109===a[3]?this.processRaw:this.processBrotli);return this.decodeFunction(a)};a.prototype.End=function(){if(this.remainingDataArrays.length){for(var a=this.arrays,c=0,b=0;b<a.length;++b)c+=a[b].length;c=new Uint8Array(c);var d=0;for(b=0;b<a.length;++b){var g=a[b];c.set(g,d);d+=g.length}return u(c,!0)}return null};return a})();var n=!1,r=function(a){n||(c(d.basePath+"pako_inflate.min.js"),
n=!0);var b=10;if("string"===typeof a){if(a.charCodeAt(3)&8){for(;0!==a.charCodeAt(b);++b);++b}}else if(a[3]&8){for(;0!==a[b];++b);++b}a=Object(k.b)(a);a=a.subarray(b,a.length-8);return d.pako.inflate(a,{windowBits:-15})},l=function(a,b){return b?a:Object(k.a)(a)},p=function(a){var b=!a.shouldOutputArray,d=new XMLHttpRequest;d.open("GET",a.url,a.isAsync);var e=b&&d.overrideMimeType;d.responseType=e?"text":"arraybuffer";e&&d.overrideMimeType("text/plain; charset=x-user-defined");d.send();var f=function(){var f=
Date.now();var h=e?d.responseText:new Uint8Array(d.response);Object(g.a)("worker","Result length is "+h.length);h.length<a.compressedMaximum?(h=a.decompressFunction(h,a.shouldOutputArray),Object(g.c)("There may be some degradation of performance. Your server has not been configured to serve .gz. and .br. files with the expected Content-Encoding. See http://www.pdftron.com/kb_content_encoding for instructions on how to resolve this."),c&&Object(g.a)("worker","Decompressed length is "+h.length)):b&&
(h=Object(k.a)(h));c&&Object(g.a)("worker",a.url+" Decompression took "+(Date.now()-f));return h};if(a.isAsync)var h=new Promise(function(b,c){d.onload=function(){200===this.status||0===this.status?b(f()):c("Download Failed "+a.url)};d.onerror=function(){c("Network error occurred "+a.url)}});else{if(200===d.status||0===d.status)return f();throw Error("Failed to load "+a.url);}return h},w=function(a){var b=a.lastIndexOf("/");-1===b&&(b=0);var d=a.slice(b).replace(".",".br.");c||(d.endsWith(".js.mem")?
d=d.replace(".js.mem",".mem"):d.endsWith(".js")&&(d=d.concat(".mem")));return a.slice(0,b)+d},y=function(a,b){var c=a.lastIndexOf("/");-1===c&&(c=0);var d=a.slice(c).replace(".",".gz.");b.url=a.slice(0,c)+d;b.decompressFunction=r;return p(b)},m=function(a,b){b.url=w(a);b.decompressFunction=c?u:v;return p(b)},t=function(a,b){a.endsWith(".js.mem")?a=a.slice(0,-4):a.endsWith(".mem")&&(a=a.slice(0,-4)+".js.mem");b.url=a;b.decompressFunction=l;return p(b)},x=function(a,b,c,d){return a.catch(function(a){Object(g.c)(a);
return d(b,c)})},A=function(a,b,c){var d;if(c.isAsync){var e=b[0](a,c);for(d=1;d<b.length;++d)e=x(e,a,c,b[d]);return e}for(d=0;d<b.length;++d)try{return b[d](a,c)}catch(I){Object(g.c)(I.message)}throw Error("");},D=function(a,b,c,d){return A(a,[y,m,t],{compressedMaximum:b,isAsync:c,shouldOutputArray:d})},z=function(a,b,c,d){return A(a,[m,y,t],{compressedMaximum:b,isAsync:c,shouldOutputArray:d})}},function(b,e,f){f.d(e,"b",function(){return a});f.d(e,"a",function(){return g});var a=function(a){if("string"===
typeof a){for(var b=new Uint8Array(a.length),d=a.length,c=0;c<d;c++)b[c]=a.charCodeAt(c);return b}return a},g=function(a){if("string"!==typeof a){for(var b="",d=0,c=a.length,g;d<c;)g=a.subarray(d,d+1024),d+=1024,b+=String.fromCharCode.apply(null,g);return b}return a}},function(b,e,f){function a(a,b,d){return new Promise(function(c){if(!a)return c();var e=d.document.createElement("script");e.type="text/javascript";e.onload=function(){c()};e.onerror=function(){b&&Object(g.c)(b);c()};e.src=a;d.document.getElementsByTagName("head")[0].appendChild(e)})}
f.d(e,"a",function(){return a});var g=f(0)},function(b,e,f){function a(a,b,e){function c(n){f=f||Date.now();return n?(Object(g.a)("load","Try instantiateStreaming"),fetch(Object(h.a)(a)).then(function(a){return WebAssembly.instantiateStreaming(a,b)}).catch(function(b){Object(g.a)("load","instantiateStreaming Failed "+a+" message "+b.message);return c(!1)})):Object(h.b)(a,e,!0,!0).then(function(a){d=Date.now();Object(g.a)("load","Request took "+(d-f)+" ms");return WebAssembly.instantiate(a,b)})}var d,
f;return c(!!WebAssembly.instantiateStreaming).then(function(a){Object(g.a)("load","WASM compilation took "+(Date.now()-(d||f))+" ms");return a})}f.d(e,"a",function(){return a});var g=f(0),h=f(2),k=f(4);f.d(e,"b",function(){return k.a})},function(b,e,f){f.d(e,"c",function(){return v});f.d(e,"b",function(){return n});f.d(e,"a",function(){return r});f(0);var a="undefined"===typeof window?self:window;b=function(){var a=navigator.userAgent.toLowerCase();return(a=/(msie) ([\w.]+)/.exec(a)||/(trident)(?:.*? rv:([\w.]+)|)/.exec(a))?
parseInt(a[2],10):a}();var g=function(){var b=a.navigator.userAgent.match(/OPR/),c=a.navigator.userAgent.match(/Maxthon/),d=a.navigator.userAgent.match(/Edge/);return a.navigator.userAgent.match(/Chrome\/(.*?) /)&&!b&&!c&&!d}();(function(){if(!g)return null;var b=a.navigator.userAgent.match(/Chrome\/([0-9]+)\./);return b?parseInt(b[1],10):b})();var h=!!navigator.userAgent.match(/Edge/i)||navigator.userAgent.match(/Edg\/(.*?)/)&&a.navigator.userAgent.match(/Chrome\/(.*?) /);(function(){if(!h)return null;
var b=a.navigator.userAgent.match(/Edg\/([0-9]+)\./);return b?parseInt(b[1],10):b})();e=/iPad|iPhone|iPod/.test(a.navigator.platform)||"MacIntel"===navigator.platform&&1<navigator.maxTouchPoints;var k=function(){var b=a.navigator.userAgent.match(/.*\/([0-9\.]+)\s(Safari|Mobile).*/i);return b?parseFloat(b[1]):b}(),d=/^((?!chrome|android).)*safari/i.test(a.navigator.userAgent)||/^((?!chrome|android).)*$/.test(a.navigator.userAgent)&&e,c=a.navigator.userAgent.match(/Firefox/);(function(){if(!c)return null;
var b=a.navigator.userAgent.match(/Firefox\/([0-9]+)\./);return b?parseInt(b[1],10):b})();b||/Android|webOS|Touch|IEMobile|Silk/i.test(navigator.userAgent);navigator.userAgent.match(/(iPad|iPhone|iPod)/i);a.navigator.userAgent.indexOf("Android");var q=/Mac OS X 10_13_6.*\(KHTML, like Gecko\)$/.test(a.navigator.userAgent),u=a.navigator.userAgent.match(/(iPad|iPhone).+\sOS\s((\d+)(_\d)*)/i)?14<=parseInt(a.navigator.userAgent.match(/(iPad|iPhone).+\sOS\s((\d+)(_\d)*)/i)[3],10):!1,v=function(){return!u&&
(d&&14>k||q)},n=!(!self.WebAssembly||!self.WebAssembly.validate),r=-1<a.navigator.userAgent.indexOf("Edge/16")||-1<a.navigator.userAgent.indexOf("MSAppHost")},function(b,e){e=function(){return this}();try{e=e||(new Function("return this"))()}catch(f){"object"===typeof window&&(e=window)}b.exports=e},function(b,e,f){function a(a,b,d,c){function e(a){return a instanceof d?a:new d(function(b){b(a)})}return new (d||(d=Promise))(function(d,g){function f(a){try{l(c.next(a))}catch(w){g(w)}}function h(a){try{l(c["throw"](a))}catch(w){g(w)}}
function l(a){a.done?d(a.value):e(a.value).then(f,h)}l((c=c.apply(a,b||[])).next())})}function g(a,b){function d(a){return function(b){return c([a,b])}}function c(c){if(g)throw new TypeError("Generator is already executing.");for(;e;)try{if(g=1,f&&(h=c[0]&2?f["return"]:c[0]?f["throw"]||((h=f["return"])&&h.call(f),0):f.next)&&!(h=h.call(f,c[1])).done)return h;if(f=0,h)c=[c[0]&2,h.value];switch(c[0]){case 0:case 1:h=c;break;case 4:return e.label++,{value:c[1],done:!1};case 5:e.label++;f=c[1];c=[0];
continue;case 7:c=e.ops.pop();e.trys.pop();continue;default:if(!(h=e.trys,h=0<h.length&&h[h.length-1])&&(6===c[0]||2===c[0])){e=0;continue}if(3===c[0]&&(!h||c[1]>h[0]&&c[1]<h[3]))e.label=c[1];else if(6===c[0]&&e.label<h[1])e.label=h[1],h=c;else if(h&&e.label<h[2])e.label=h[2],e.ops.push(c);else{h[2]&&e.ops.pop();e.trys.pop();continue}}c=b.call(a,e)}catch(p){c=[6,p],f=0}finally{g=h=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}var e={label:0,sent:function(){if(h[0]&1)throw h[1];return h[1]},
trys:[],ops:[]},g,f,h,k;return k={next:d(0),"throw":d(1),"return":d(2)},"function"===typeof Symbol&&(k[Symbol.iterator]=function(){return this}),k}f.d(e,"a",function(){return a});f.d(e,"b",function(){return g})},function(b,e,f){e.a=function(){ArrayBuffer.prototype.slice||(ArrayBuffer.prototype.slice=function(a,b){void 0===a&&(a=0);void 0===b&&(b=this.byteLength);a=Math.floor(a);b=Math.floor(b);0>a&&(a+=this.byteLength);0>b&&(b+=this.byteLength);a=Math.min(Math.max(0,a),this.byteLength);b=Math.min(Math.max(0,
b),this.byteLength);if(0>=b-a)return new ArrayBuffer(0);var e=new ArrayBuffer(b-a),f=new Uint8Array(e);a=new Uint8Array(this,a,b-a);f.set(a);return e})}},function(b,e,f){f.d(e,"a",function(){return a});f(11);var a=function(a,b){return function(){}}},function(b,e,f){e.a=function(a){var b={};decodeURIComponent(a.slice(1)).split("&").forEach(function(a){a=a.split("=",2);b[a[0]]=a[1]});return b}},function(b,e,f){f.d(e,"a",function(){return d});var a=f(2),g=f(5),h=f(6),k=function(){function a(a){var b=
this;this.promise=a.then(function(a){b.response=a;b.status=200})}a.prototype.addEventListener=function(a,b){this.promise.then(b)};return a}(),d=function(b,d,e){if(!h.b||h.a||Object(h.c)()||e){e=Object(a.b)((self.Module.asmjsPrefix?self.Module.asmjsPrefix:"")+b+".js.mem",d[".js.mem"],!1);var c=Object(a.c)((self.Module.memoryInitializerPrefixURL?self.Module.memoryInitializerPrefixURL:"")+b+".mem",d[".mem"],!0,!0);self.Module.memoryInitializerRequest=new k(c)}else self.Module.instantiateWasm=function(a,
c){return Object(g.a)(b+"Wasm.wasm",a,d["Wasm.wasm"]).then(function(a){c(a.instance)})},e=Object(a.b)(b+"Wasm.js.mem",d["Wasm.js.mem"],!1,!1);e=new Blob([e],{type:"application/javascript"});importScripts(URL.createObjectURL(e))}},function(b,e,f){b.exports=f(14)},function(b,e,f){f.r(e);f(15);f(20);b=f(9);f(21);Object(b.a)()},function(b,e,f){(function(a,b){function e(a){"@babel/helpers - typeof";return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&
"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},e(a)}(function(a){function d(){for(var a=0;a<B.length;a++)B[a][0](B[a][1]);B=[];G=!1}function c(a,b){B.push([a,b]);G||(G=!0,H(d,0))}function g(a,b){function c(a){n(b,a)}function d(a){l(b,a)}try{a(c,d)}catch(C){d(C)}}function h(a){var b=a.owner,c=b.state_;b=b.data_;var d=a[c];a=a.then;if("function"===typeof d){c=z;try{b=d(b)}catch(C){l(a,C)}}k(a,b)||(c===z&&n(a,b),c===E&&l(a,b))}function k(a,b){var c;try{if(a===
b)throw new TypeError("A promises callback cannot return that same promise.");if(b&&("function"===typeof b||"object"===e(b))){var d=b.then;if("function"===typeof d)return d.call(b,function(d){c||(c=!0,b!==d?n(a,d):r(a,d))},function(b){c||(c=!0,l(a,b))}),!0}}catch(C){return c||l(a,C),!0}return!1}function n(a,b){a!==b&&k(a,b)||r(a,b)}function r(a,b){a.state_===A&&(a.state_=D,a.data_=b,c(w,a))}function l(a,b){a.state_===A&&(a.state_=D,a.data_=b,c(y,a))}function p(a){var b=a.then_;a.then_=void 0;for(a=
0;a<b.length;a++)h(b[a])}function w(a){a.state_=z;p(a)}function y(a){a.state_=E;p(a)}function m(a){if("function"!==typeof a)throw new TypeError("Promise constructor takes a function argument");if(!(this instanceof m))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this.then_=[];g(a,this)}a.createPromiseCapability=function(){var a={};a.promise=new m(function(b,c){a.resolve=b;a.reject=c});return a};var t=a.Promise,
x=t&&"resolve"in t&&"reject"in t&&"all"in t&&"race"in t&&function(){var a;new t(function(b){a=b});return"function"===typeof a}();"undefined"!==typeof exports&&exports?(exports.Promise=x?t:m,exports.Polyfill=m):"function"===typeof define&&f(19)?define(function(){return x?t:m}):x||(a.Promise=m);var A="pending",D="sealed",z="fulfilled",E="rejected",F=function(){},H="undefined"!==typeof b?b:setTimeout,B=[],G;m.prototype={constructor:m,state_:A,then_:null,data_:void 0,then:function(a,b){a={owner:this,
then:new this.constructor(F),fulfilled:a,rejected:b};this.state_===z||this.state_===E?c(h,a):this.then_.push(a);return a.then},"catch":function(a){return this.then(null,a)}};m.all=function(a){if("[object Array]"!==Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.all().");return new this(function(b,c){function d(a){f++;return function(c){e[a]=c;--f||b(e)}}for(var e=[],f=0,g=0,h;g<a.length;g++)(h=a[g])&&"function"===typeof h.then?h.then(d(g),c):e[g]=h;f||b(e)})};
m.race=function(a){if("[object Array]"!==Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.race().");return new this(function(b,c){for(var d=0,e;d<a.length;d++)(e=a[d])&&"function"===typeof e.then?e.then(b,c):b(e)})};m.resolve=function(a){return a&&"object"===e(a)&&a.constructor===this?a:new this(function(b){b(a)})};m.reject=function(a){return new this(function(b,c){c(a)})}})("undefined"!==typeof window?window:"undefined"!==typeof a?a:"undefined"!==typeof self?
self:void 0)}).call(this,f(7),f(16).setImmediate)},function(b,e,f){(function(a){function b(a,b){this._id=a;this._clearFn=b}var h="undefined"!==typeof a&&a||"undefined"!==typeof self&&self||window,k=Function.prototype.apply;e.setTimeout=function(){return new b(k.call(setTimeout,h,arguments),clearTimeout)};e.setInterval=function(){return new b(k.call(setInterval,h,arguments),clearInterval)};e.clearTimeout=e.clearInterval=function(a){a&&a.close()};b.prototype.unref=b.prototype.ref=function(){};b.prototype.close=
function(){this._clearFn.call(h,this._id)};e.enroll=function(a,b){clearTimeout(a._idleTimeoutId);a._idleTimeout=b};e.unenroll=function(a){clearTimeout(a._idleTimeoutId);a._idleTimeout=-1};e._unrefActive=e.active=function(a){clearTimeout(a._idleTimeoutId);var b=a._idleTimeout;0<=b&&(a._idleTimeoutId=setTimeout(function(){a._onTimeout&&a._onTimeout()},b))};f(17);e.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof a&&a.setImmediate||this&&this.setImmediate;e.clearImmediate=
"undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof a&&a.clearImmediate||this&&this.clearImmediate}).call(this,f(7))},function(b,e,f){(function(a,b){(function(a,e){function d(a){delete w[a]}function c(a){if(y)setTimeout(c,0,a);else{var b=w[a];if(b){y=!0;try{var f=b.callback,g=b.args;switch(g.length){case 0:f();break;case 1:f(g[0]);break;case 2:f(g[0],g[1]);break;case 3:f(g[0],g[1],g[2]);break;default:f.apply(e,g)}}finally{d(a),y=!1}}}}function f(){t=function(a){b.nextTick(function(){c(a)})}}
function g(){if(a.postMessage&&!a.importScripts){var b=!0,c=a.onmessage;a.onmessage=function(){b=!1};a.postMessage("","*");a.onmessage=c;return b}}function h(){var b="setImmediate$"+Math.random()+"$",d=function(d){d.source===a&&"string"===typeof d.data&&0===d.data.indexOf(b)&&c(+d.data.slice(b.length))};a.addEventListener?a.addEventListener("message",d,!1):a.attachEvent("onmessage",d);t=function(c){a.postMessage(b+c,"*")}}function k(){var a=new MessageChannel;a.port1.onmessage=function(a){c(a.data)};
t=function(b){a.port2.postMessage(b)}}function r(){var a=m.documentElement;t=function(b){var d=m.createElement("script");d.onreadystatechange=function(){c(b);d.onreadystatechange=null;a.removeChild(d);d=null};a.appendChild(d)}}function l(){t=function(a){setTimeout(c,0,a)}}if(!a.setImmediate){var p=1,w={},y=!1,m=a.document,t,x=Object.getPrototypeOf&&Object.getPrototypeOf(a);x=x&&x.setTimeout?x:a;"[object process]"==={}.toString.call(a.process)?f():g()?h():a.MessageChannel?k():m&&"onreadystatechange"in
m.createElement("script")?r():l();x.setImmediate=function(a){"function"!==typeof a&&(a=new Function(""+a));for(var b=Array(arguments.length-1),c=0;c<b.length;c++)b[c]=arguments[c+1];w[p]={callback:a,args:b};t(p);return p++};x.clearImmediate=d}})("undefined"===typeof self?"undefined"===typeof a?this:a:self)}).call(this,f(7),f(18))},function(b,e){function f(){throw Error("setTimeout has not been defined");}function a(){throw Error("clearTimeout has not been defined");}function g(a){if(u===setTimeout)return setTimeout(a,
0);if((u===f||!u)&&setTimeout)return u=setTimeout,setTimeout(a,0);try{return u(a,0)}catch(y){try{return u.call(null,a,0)}catch(m){return u.call(this,a,0)}}}function h(b){if(v===clearTimeout)return clearTimeout(b);if((v===a||!v)&&clearTimeout)return v=clearTimeout,clearTimeout(b);try{return v(b)}catch(y){try{return v.call(null,b)}catch(m){return v.call(this,b)}}}function k(){r&&l&&(r=!1,l.length?n=l.concat(n):p=-1,n.length&&d())}function d(){if(!r){var a=g(k);r=!0;for(var b=n.length;b;){l=n;for(n=
[];++p<b;)l&&l[p].run();p=-1;b=n.length}l=null;r=!1;h(a)}}function c(a,b){this.fun=a;this.array=b}function q(){}b=b.exports={};try{var u="function"===typeof setTimeout?setTimeout:f}catch(w){u=f}try{var v="function"===typeof clearTimeout?clearTimeout:a}catch(w){v=a}var n=[],r=!1,l,p=-1;b.nextTick=function(a){var b=Array(arguments.length-1);if(1<arguments.length)for(var e=1;e<arguments.length;e++)b[e-1]=arguments[e];n.push(new c(a,b));1!==n.length||r||g(d)};c.prototype.run=function(){this.fun.apply(null,
this.array)};b.title="browser";b.browser=!0;b.env={};b.argv=[];b.version="";b.versions={};b.on=q;b.addListener=q;b.once=q;b.off=q;b.removeListener=q;b.removeAllListeners=q;b.emit=q;b.prependListener=q;b.prependOnceListener=q;b.listeners=function(a){return[]};b.binding=function(a){throw Error("process.binding is not supported");};b.cwd=function(){return"/"};b.chdir=function(a){throw Error("process.chdir is not supported");};b.umask=function(){return 0}},function(b,e){b.exports={}},function(b,e,f){(function(a){"undefined"===
typeof a.crypto&&(a.crypto={getRandomValues:function(a){for(var b=0;b<a.length;b++)a[b]=256*Math.random()}})})("undefined"===typeof window?self:window)},function(b,e,f){function a(b){"@babel/helpers - typeof";return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},a(b)}var g=f(10),h=f(12),k=null;(function(b){function c(a){l||(l=[]);l.push(a)}var d,
e,f,n,r=!1,l=[],p=function(){function c(){d=function(){}}function p(b){var c=[];return{resource_array:c,msg:JSON.stringify(b.data,function(b,d){if("object"===a(d)&&(b=null,d instanceof Uint8Array?b=d:d instanceof ArrayBuffer&&(b=new Uint8Array(d)),b)){d=f(b.length);var e=n(d);e&&(new Uint8Array(Module.HEAPU8.buffer,e,b.length)).set(b);c.push(d);return{__trn_res_id:d}}return d})}}function m(){r=!0;postMessage({type:"abort",data:{error:"Office worker has terminated unexpectedly"}})}function q(a){if(!r)try{var b=
p(a);e(b.msg)}catch(F){m(F)}}b.basePath="../";var x=b.officeWorkerPath||"";b.workerBasePath&&(b.basePath=b.workerBasePath);b.basePath=b.externalPath?b.externalPath:b.basePath+"external/";importScripts("".concat(b.basePath,"Promise.js"));b.ContinueFunc=function(a){d("ContinueFunc called");setTimeout(function(){onmessage({data:{action:"continue"}})},a)};if(b.pdfWorkerPath)var u=b.pdfWorkerPath;if(b.officeAsmPath)var v=b.officeAsmPath;b.Module={memoryInitializerPrefixURL:u,asmjsPrefix:v,onRuntimeInitialized:function(){d||
c();var a=Date.now()-k;Object(g.a)("load","time duration from start to ready: ".concat(JSON.stringify(a)));e=function(a){if(null!==a&&void 0!==a&&0!==a&&!r){var b=(a.length<<2)+1,c=Module._malloc(b);0<stringToUTF8(a,c,b)&&Module._TRN_OnMessage(c)}};f=function(a){return Module._TRN_CreateBufferResource(a)};n=function(a){return Module._TRN_GetResourcePointer(a)};d("OnReady called");onmessage=q;Module._TRN_InitWorker();for(a=0;a<l.length;++a)onmessage(l[a]);l=null},fetchSelf:function(){k=Date.now();
Object(h.a)("".concat(x,"WebOfficeWorker"),{"Wasm.wasm":5E6,"Wasm.js.mem":1E5,".js.mem":5E6,".mem":3E6},!!navigator.userAgent.match(/Edge/i)||b.wasmDisabled)},onAbort:m,noExitRuntime:!0}};b.onmessage=function(a){"init"===a.data.action&&(b.wasmDisabled=!a.data.wasm,b.externalPath=a.data.externalPath,b.officeAsmPath=a.data.officeAsmPath,b.pdfWorkerPath=a.data.pdfWorkerPath,b.onmessage=c,p(),b.Module.fetchSelf())}})("undefined"===typeof window?self:window)}]);}).call(this || window)