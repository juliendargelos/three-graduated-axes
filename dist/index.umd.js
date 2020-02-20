!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("three"),require("three/examples/jsm/renderers/CSS3DRenderer")):"function"==typeof define&&define.amd?define(["exports","three","three/examples/jsm/renderers/CSS3DRenderer"],e):e((t=t||self).THREEGraduatedAxes={},t.THREE,t.THREE)}(this,(function(t,e,i){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)};function n(t,e){function i(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}var o=function(){return(o=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)},s=function(){function t(t){var e=t.orientation,i=t.spacing,r=t.size,n=void 0===r?10:r,o=t.labels,s=void 0===o?[]:o,a=t.prefix,l=void 0===a?"":a,u=t.suffix,c=void 0===u?"":u,f=t.decimals,h=void 0===f?void 0:f,p=t.graduations,d=void 0===p?1:p,y=t.root,v=void 0!==y&&y,g=t.relative,m=void 0!==g&&g,b=t.lineWidth,x=void 0===b?.02:b,z=t.progress,P=void 0===z?1:z,O=t.margin,w=void 0===O?.2:O,M=t.padding,j=void 0===M?0:M,S=t.distance,_=void 0===S?0:S;this.startOffset=0,this.endOffset=0,this.orientation=e,this.spacing=i,this.size=n,this._labels=s,this.prefix=l,this.suffix=c,this.decimals=h,this.graduations=d,this.root=v,this.relative=m,this.lineWidth=x,this.progress=P,this.margin=w,this.padding=j,this.distance=_}return t.prototype.isPrime=function(t){for(var e=2,i=Math.sqrt(t);e<=i;e++)if(t%e==0)return!1;return t>1},t.prototype.adjustDelta=function(t,e,i,r){var n=i/2;return t=Math.max(e,t),(t*=i/t/r)>=n?n:t},t.prototype.updateRootPosition=function(){if(this.relative)if(this.labels.length){var t=this.labels.findIndex((function(t){return 0===parseFloat(t)}));this.rootPosition=-1===t?0:t/(this.labels.length-1)}else this.rootPosition=.5;else this.rootPosition=0},Object.defineProperty(t.prototype,"labels",{get:function(){return this._labels},set:function(t){this._labels=t,this.updateRootPosition()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"relative",{get:function(){return this._relative},set:function(t){this._relative=t,this.updateRootPosition()},enumerable:!0,configurable:!0}),t.prototype.generate=function(t,e){var i=void 0===e?{}:e,r=i.targetDensity,n=void 0===r?4:r,o=i.minimumDelta,s=void 0===o?1:o,a=i.rounding,l=void 0===a?2:a,u=i.avoidPrime,c=void 0===u||u,f=i.includeZero,h=void 0!==f&&f,p=i.autoRelative,d=void 0===p||p,y=i.minimumOffset,v=void 0===y?0:y,g=i.maximumOffset,m=void 0===g?0:g;i.symmetric;this.reset();var b,x=1/0,z=-1/0,P=1/0,O=0,w=function(t){return t};t.forEach((function(e){e<x&&(x=e),e>z&&(z=e),t.forEach((function(t){var i=Math.abs(e-t);i&&i<P&&(P=i)}))}));var M=(z+=m)-(x-=v),j=this.adjustDelta(P,s,M,n);if(d&&(this.relative=x<0&&z>0),void 0!==l){var S=Math.pow(10,l),_=~~(x*S)/S;_!==x&&x--,O+=x-_,x=_,M+=O,j=(w=function(t){return Math.round(t*S)/S})(this.adjustDelta(P,s,M,n))}var F=M/j+1,E=Math.ceil(F);if(c)for(;this.isPrime(E+1);)E++;if(z+=b=(E-F)*j||0,M+=b,h||d&&this.relative){for(var D=1/0,R=0;D&&R<E;R++){var C=x+R*j;Math.abs(C)<Math.abs(D)&&(D=C)}D<0&&(D+=j),x-=D,O+=D,M+=D,j=w(this.adjustDelta(P,s,M,n))}var N=[];for(R=0;R<E;R++)N.push(w(x+R*j));this.startOffset=O/M,this.endOffset=b/M,this.labels=N},t.prototype.reset=function(){this.startOffset=this.endOffset=0,this.labels.splice(0),this.root=!1,this.relative=!1},t}(),a=function(t){function e(){var e=t.call(this,document.createElement("div"))||this;return e.wrapper=document.createElement("div"),e.content=document.createElement("div"),e.wrapper.appendChild(e.content),e.element.appendChild(e.wrapper),e}return n(e,t),Object.defineProperty(e.prototype,"style",{get:function(){return this.wrapper.style},enumerable:!0,configurable:!0}),e.prototype.generate=function(t,e){var i=void 0!==t.decimals&&Math.pow(10,t.decimals);this.content.textContent=""+t.prefix+(i?Math.round(e*i)/i:e)+t.suffix},e.prototype.resize=function(t,e,i,r){void 0===r&&(r=10);var n=!!e.rootPosition,o=(e.rootPosition-.5)*e.size;i=(i/(t.labels.length-1)-.5)*t.size;var s=t.spacing.x*(n||!t.orientation.x),a=t.spacing.y*(n||!t.orientation.y);this.content.style.transform="translate("+50*s+"%, "+-50*a+"%)",this.position.setX(r*(t.orientation.x*i+t.orientation.y*o+t.margin*s-t.padding*t.orientation.y*(1-n))).setY(r*(t.orientation.y*i+t.orientation.x*o+t.margin*a-t.padding*t.orientation.x*(1-n))).setZ(t.distance*r)},e}(i.CSS3DObject),l=function(t){function r(r){var n=void 0===r?{}:r,o=n.opacity,s=void 0===o?1:o,a=n.color,l=void 0===a?"#ffffff":a,u=n.fontSize,c=void 0===u?.3:u,f=n.fontFamily,h=void 0===f?"sans-serif":f,p=n.faceCamera,d=void 0!==p&&p,y=n.renderingScale,v=void 0===y?100:y,g=t.call(this)||this;return g.css3DRenderer=new i.CSS3DRenderer,g.originalMatrix=new e.Matrix4,g.style=g.css3DRenderer.domElement.style,g.opacity=s,g.color=l,g.fontSize=c,g.fontFamily=h,g.faceCamera=d,g.renderingScale=v,g.matrixAutoUpdate=!1,g.style.position="absolute",g.style.pointerEvents="none",g.style.top=g.style.left="0",g.style.zIndex="2",document.body.appendChild(g.css3DRenderer.domElement),g}return n(r,t),r.prototype.iterate=function(t,e,i){return[t,e].reduce((function(t,e,r,n){return e.labels.reduce((function(t,o,s){return i(e,n[(r+1)%n.length],t,s,o),t+1}),t)}),0)},r.prototype.scaleFont=function(){this.style.fontSize=this.fontSize*this.renderingScale+"px"},Object.defineProperty(r.prototype,"opacity",{get:function(){return parseFloat(this.style.opacity)},set:function(t){this.style.opacity=t},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"color",{get:function(){return this.style.color},set:function(t){this.style.color=t},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"fontFamily",{get:function(){return this.style.fontFamily},set:function(t){this.style.fontFamily=t},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"faceCamera",{get:function(){return this._faceCamera},set:function(t){this._faceCamera=t,t||this.children.forEach((function(t){return t.rotation.set(0,0,0)}))},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"visible",{get:function(){return!this.style||"none"!==this.style.display},set:function(t){this.style&&(this.style.visibility=t?null:"none")},enumerable:!0,configurable:!0}),r.prototype.setRendererSize=function(t,e){this.css3DRenderer.setSize(t,e)},r.prototype.render=function(t){var e=this.parent,i=t.position.x,r=t.position.y,n=t.position.z;this.originalMatrix.copy(this.matrix),this.parent=null,t.position.multiplyScalar(this.renderingScale),this.updateWorldMatrix(!0,!1),e.updateWorldMatrix(!0,!1),this.applyMatrix(e.matrixWorld),this.updateWorldMatrix(!1,!1),this.faceCamera&&this.children.forEach((function(e){e.lookAt(t.position)})),this.position.multiplyScalar(this.renderingScale),this.updateMatrix(),this.updateMatrixWorld(!0),this.css3DRenderer.render(this,t),t.position.set(i,r,n),this.parent=e,this.matrix.copy(this.originalMatrix),this.matrix.decompose(this.position,this.quaternion,this.scale)},r.prototype.generate=function(t,e){var i=this;this.scaleFont(),this.children.slice(this.iterate(t,e,(function(t,e,r,n,o){var s=i.children[r];s||i.add(s=new a),s.generate(t,o),s.resize(t,e,n,i.renderingScale)}))).forEach((function(t){return i.remove(t)}))},r.prototype.resize=function(t,e){var i=this;this.scaleFont(),this.iterate(t,e,(function(t,e,r,n){var o=i.children[r];o&&o.resize(t,e,n,i.renderingScale)}))},r}(e.Object3D),u=function(t){function i(){var e=null!==t&&t.apply(this,arguments)||this;return e.graduations=[],e}return n(i,t),i.prototype.generate=function(t,i){for(var r=this,n=6*[t,i].reduce((function(t,e,i){var n=e.graduations,o=e.root,s=e.rootPosition,a=e.labels,l=a.length-1;if(n)if(a.length)if(n<1){s*=l;for(var u=Math.min(l,Math.round(1/n));l%u||s%u;)u--;n=Math.ceil(a.length/u)}else n=Math.round(n)*l+1;else n=Math.round(n);else n=0+o;return r.graduations[i]=n,t+n}),0),o=new Uint16Array(n),s=0,a=0;a<n;a+=6)o[a]=o[a+3]=s,o[a+1]=o[a+5]=s+2,o[a+2]=s+1,o[a+4]=s+3,s+=4;this.setIndex(new e.BufferAttribute(o,1)),this.setAttribute("position",new e.BufferAttribute(new Float32Array(2*n),3)),this.resize(t,i)},i.prototype.resize=function(t,e){for(var i=this.getAttribute("position"),r=i.array,n=this.graduations[0],o=this.graduations[1],s=t.size/2,a=e.size/2,l=t.size/Math.max(1,n-1),u=e.size/Math.max(1,o-1),c=s+e.padding,f=a+t.padding,h=t.lineWidth/2,p=e.lineWidth/2,d=c+h,y=f+p,v=1===n?t.rootPosition*t.size:0,g=1===o?e.rootPosition*e.size:0,m=2*t.progress,b=2*e.progress,x=0,z=0;z<n;z++){var P=z*l-s+v;r[x]=r[x+9]=P-h,r[x+3]=r[x+6]=P+h,r[x+7]=r[x+10]=-y,r[x+1]=r[x+4]=y*m-y,x+=12}for(z=0;z<o;z++){P=z*u-a+g;r[x+7]=r[x+10]=P-p,r[x+1]=r[x+4]=P+p,r[x]=r[x+9]=-d,r[x+3]=r[x+6]=d*b-d,x+=12}i.needsUpdate=!0},i}(e.BufferGeometry),c=function(t){function i(i){var r=t.call(this)||this;if(r._size=new e.Vector2,i){var n=i.map((function(t,e){var r=t.x,n=t.y,o={x:parseFloat(r),y:parseFloat(n)};return isNaN(o.x)&&(o.x=e/(i.length-1)),isNaN(o.y)&&(o.y=e/(i.length-1)),o}));r.setFromPoints(n)}return r}return n(i,t),Object.defineProperty(i.prototype,"size",{get:function(){return this.getSize(this._size)},enumerable:!0,configurable:!0}),i.prototype.normalizePoint=function(t,i){return void 0===i&&(i=new e.Vector2),i.subVectors(t,this.min).divide(this.size)},i.prototype.interpolatePoint=function(t,i,r){return void 0===r&&(r=new e.Vector2),(i?i.normalizePoint(t,r):r).multiply(this.size).add(this.min)},i.prototype.interpolatePoints=function(t,r){var n=this;void 0===r&&(r=t.map((function(){return new e.Vector2})));var o=new i(t);return t.some((function(e,i){if(i>=r.length)return!0;var s={x:parseFloat(e.x),y:parseFloat(e.y)};isNaN(s.x)&&(s.x=i/(t.length-1)),isNaN(s.y)&&(s.y=i/(t.length-1)),n.interpolatePoint(s,o,r[i])})),r},i.prototype.resize=function(t,e){var i=t.size/2,r=e.size/2;this.min.set(t.startOffset*t.size-i,e.startOffset*e.size-r),this.max.set(i-t.endOffset*t.size,r-e.endOffset*e.size)},i}(e.Box2),f=function(t){function i(i){var r=void 0===i?{}:i,n=r.x,a=void 0===n?{}:n,f=r.y,h=void 0===f?{}:f,p=r.labels,d=void 0===p?{}:p,y=r.opacity,v=void 0===y?1:y,g=r.color,m=void 0===g?16777215:g,b=r.generate,x=void 0===b||b,z=t.call(this,new u)||this;return z.container=new c,z.x=new s(o({},a,{orientation:new e.Vector2(1,0),spacing:new e.Vector2(1,-1)})),z.y=new s(o({},h,{orientation:new e.Vector2(0,1),spacing:new e.Vector2(-1,1)})),z.graduations=z.geometry,z.labels=new l(d),z.opacity=v,z.color.set(m),z.add(z.labels),x&&z.generate(),z}return n(i,t),Object.defineProperty(i.prototype,"visible",{get:function(){return this.labels.visible},set:function(t){this.labels&&(this.labels.visible=t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"color",{get:function(){return this.material.color},set:function(t){this.material.color=t},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"opacity",{get:function(){return this.material.opacity},set:function(t){this.material.transparent=1!==t,this.material.opacity=t},enumerable:!0,configurable:!0}),i.prototype.generate=function(t,e){var i=void 0===e?{}:e,r=i.x,n=void 0===r?{}:r,o=i.y,s=void 0===o?{}:o;if(t){var a=t.map((function(t){return t.x})),l=t.map((function(t){return t.y})),u=a.map(parseFloat),c=l.map(parseFloat);u.includes(NaN)?this.x.labels=a:this.x.generate(u,n),c.includes(NaN)?this.y.labels=l:this.y.generate(c,s)}this.generateGraduations(),this.generateLabels()},i.prototype.resize=function(){this.resizeGraduations(),this.resizeLabels()},i.prototype.generateGraduations=function(){this.graduations.generate(this.x,this.y),this.container.resize(this.x,this.y)},i.prototype.resizeGraduations=function(){this.graduations.resize(this.x,this.y),this.container.resize(this.x,this.y)},i.prototype.generateLabels=function(){this.labels.generate(this.x,this.y)},i.prototype.resizeLabels=function(){this.labels.resize(this.x,this.y)},i}(e.Mesh);t.Axes=f,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=index.umd.js.map
