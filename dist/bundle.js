!function(e){var n={};function r(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)r.d(t,i,function(n){return e[n]}.bind(null,i));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=0)}([function(e,n,r){"use strict";r.r(n);r(1);let t;(t=new PIXI.Sprite(PIXI.Texture.from("img/logo.png"))).position.set(20,30);var i=t;const o=document.getElementById("mycanvas");let d=window.innerWidth,c=window.innerHeight;const u=new PIXI.Application({view:o,width:d,height:c,resolution:window.devicePixelRatio,autoDensity:!0}),l=new PIXI.Container,s=PIXI.Texture.from("img/back.png"),a=new PIXI.Sprite(s);let h;a.anchor.x=.5,a.anchor.y=.5,l.addChild(a),a.x=u.renderer.screen.width/2,a.y=u.renderer.screen.height/2,l.addChild(i);let p=PIXI.Loader.shared;p.add("old_chair","img/stair/old_stair.png").load((function(){let e=p.resources.old_chair.texture;(h=new PIXI.Sprite(e)).position.set(window.innerWidth-h.width,window.innerHeight-h.height),l.addChild(h)}));const g=P("img/stair/new_stair_01.png","img/menu/circle1.png"),f=P("img/stair/new_stair_02.png","img/menu/circle1.png"),w=P("img/stair/new_stair_03.png","img/menu/circle1.png");g.position.set(-150,30),f.position.set(-280,130),l.addChild(g),l.addChild(f),l.addChild(w);const I=new PIXI.Ticker;function m(){u.renderer.view.style.width=window.innerWidth+"px",u.renderer.view.style.height=window.innerHeight+"px"}function P(e,n){var r=new PIXI.Container;const t=PIXI.Texture.from(e),i=new PIXI.Sprite(t),o=PIXI.Texture.from(n);let d=new PIXI.Sprite(o);i.scale.set(.13,.13),i.anchor.set(.5,.5),i.position.set(u.renderer.screen.width-260,u.renderer.screen.height/2-240),d.anchor.set(.5,.5),d.position.set(u.renderer.screen.width-260,u.renderer.screen.height/2-240),r.addChild(d),r.addChild(i),r.interactive=!0,r.buttonMode=!0;let c=PIXI.Texture.from("img/menu/ok.png"),s=new PIXI.Sprite(c);return s.anchor.set(.5,.5),s.position.set(u.renderer.screen.width-260,u.renderer.screen.height/2-160),s.buttonMode=!0,r.on("pointerdown",(function(){h._texture=PIXI.Texture.from(e),l.children.forEach(e=>{0!==e.children.length&&(e.children[0]._texture=PIXI.Texture.from("img/menu/circle1.png"),void 0!==e.children[2]&&e.removeChild(e.children[2]))}),d._texture=PIXI.Texture.from("img/menu/choosed.png"),s.removeChild(),r.addChild(s)})),r}I.add((function(){u.renderer.render(l)})),I.start(),m(),window.onresize=function(e){m()}},function(e,n){}]);