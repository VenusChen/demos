window.__require=function t(i,e,s){function o(a,c){if(!e[a]){if(!i[a]){var h=a.split("/");if(h=h[h.length-1],!i[h]){var n="function"==typeof __require&&__require;if(!c&&n)return n(h,!0);if(r)return r(h,!0);throw new Error("Cannot find module '"+a+"'")}}var p=e[a]={exports:{}};i[a][0].call(p.exports,function(t){return o(i[a][1][t]||t)},p,p.exports,t,i,e,s)}return e[a].exports}for(var r="function"==typeof __require&&__require,a=0;a<s.length;a++)o(s[a]);return o}({Audio:[function(t,i,e){"use strict";cc._RF.push(i,"465c7DYk6NLErVY6xdHjwbl","Audio");var s=cc.Enum({BOMBBLOW:0,BOMBHIT:1,SHOTSUCC:2,SHOTFAILED:3});i.exports={AUDIO_NAME:s},cc.Class({extends:cc.Component,properties:{bombBlow:cc.AudioClip,bombHit:cc.AudioClip,shotSucc:cc.AudioClip,shotFailed:cc.AudioClip},play:function(t){switch(t){case s.BOMBBLOW:cc.audioEngine.play(this.bombBlow,!1,1);break;case s.BOMBHIT:cc.audioEngine.play(this.bombHit,!1,1);break;case s.SHOTSUCC:cc.audioEngine.play(this.shotSucc,!1,1);break;case s.SHOTFAILED:cc.audioEngine.play(this.shotFailed,!1,1)}}}),cc._RF.pop()},{}],Bomb:[function(t,i,e){"use strict";cc._RF.push(i,"cce28We54pK/pigoDQDOCrf","Bomb");var s=cc.Enum({AVAILABLE:0,USED:1});i.exports={STATE:s},cc.Class({extends:cc.Component,properties:{picAvailable:cc.SpriteFrame,picUsed:cc.SpriteFrame,_state:{default:s.AVAILABLE,type:s},state:{get:function(){return this._state},set:function(t){if(t!==this._state)switch(this._state=t,this._state){case s.AVAILABLE:this.getComponent(cc.Sprite).spriteFrame=this.picAvailable;break;case s.USED:this.getComponent(cc.Sprite).spriteFrame=this.picUsed}}}}}),cc._RF.pop()},{}],Fish:[function(t,i,e){"use strict";cc._RF.push(i,"915fbJl9lFB7rovWKREJySr","Fish");var s=cc.Enum({ALIVE:0,DIE:1});i.exports={FISH_STATE:s},cc.Class({extends:cc.Component,properties:{picAlive:cc.SpriteFrame,picDie:cc.SpriteFrame,_state:{default:s.ALIVE,type:s},state:{get:function(){return this._state},set:function(t){if(this._state!==t)switch(this._state=t,this._state){case s.ALIVE:this.getComponent(cc.Sprite).spriteFrame=this.picAlive;break;case s.DIE:this.getComponent(cc.Sprite).spriteFrame=this.picDie}}}}}),cc._RF.pop()},{}],Shot:[function(t,i,e){"use strict";cc._RF.push(i,"1b925hTpVlM7qGVk8pW5zlE","Shot");var s=t("Audio"),o=cc.Enum({PREPARE:0,PLAY:1,DEAD:2,WIN:3}),r={2:{0:"smlFishHead",1:"smlFishTail"},3:{0:"midFishHead",1:"midFishBody",2:"midFishTail"},4:{0:"bigFishHead",1:"bigFishBody",2:"bigFishBack",3:"bigFishTail"}},a={};function c(t,i,e,s){if(t<2||t>4)return console.error("fish length must (2,4]");Math.random()<.5?function t(i,e,s,o){console.log("-");var r=Math.floor(Math.random()*e.length);var c=(r+i)%s;var h=!0;for(var n=0;n<i;n++)if(0!==e[r+n]){h=!1;break}if((0===c||c>=i)&&h)for(var p=0;p<i;p++)e[r+p]=p+1,a[r]||(a[r]=[]),a[r].push({idx:r+p,type:0});else t(i,e,s,o)}(t,i,e,s):function t(i,e,s,o){console.log("|");var r=Math.floor(Math.random()*e.length);var c=!0;for(var h=0;h<i;h++)if(0!==e[r+h*s]){c=!1;break}if(c)for(var n=0;n<i;n++)e[r+n*s]=n+1,a[r]||(a[r]=[]),a[r].push({idx:r+n*s,type:0});else t(i,e,s,o)}(t,i,e,s)}cc.Class({extends:cc.Component,properties:{tilesLayout:cc.Node,bombLayout:cc.Node,fishLayout:cc.Node,bombLabel:cc.Node,tile:cc.Prefab,bomb:cc.Prefab,fish:cc.Prefab,audioCtrl:cc.Node,tiles:[],bombs:[],fishes:[],row:0,col:0,bombNum:0,tarTileNum:0,fishNum:0,gameState:{default:o.PREPARE,type:o},bombrow:0,bombcol:0,_bombUsed:0,_tarTileHit:0,_fishes:null,_fishDieNum:0},onLoad:function(){var i=this;this.Tile=t("Tile"),this.Bomb=t("Bomb"),this.Fish=t("Fish"),this.audioComp=this.audioCtrl.getComponent("Audio");for(var e=this,s=0;s<this.row;s++)for(var o=function(t){var s=cc.instantiate(i.tile);s.on(cc.Node.EventType.TOUCH_END,function(t){e.onTouchTile(s)}),i.tilesLayout.addChild(s),i.tiles.push(s)},r=0;r<this.col;r++)o();for(var a=0;a<this.bombcol;a++)for(var c=0;c<this.bombrow;c++){var h=cc.instantiate(this.bomb);this.bombLayout.addChild(h),this.bombs.push(h)}for(var n=0;n<this.fishNum;n++){var p=cc.instantiate(this.fish);this.fishLayout.addChild(p),this.fishes.push(p)}this.newGame()},newGame:function(){a={},this._bombUsed=0,this._tarTileHit=0,this._fishes=null,this._fishDieNum=0,this.bombLabel.getComponent(cc.Label).string=""+this.bombNum;for(var t=0;t<this.fishes.length;t++)this.fishes[t].getComponent("Fish").state=this.Fish.FISH_STATE.ALIVE;for(var i=0;i<this.bombs.length;i++)this.bombs[i].getComponent("Bomb").state=this.Bomb.STATE.AVAILABLE;var e=this.generateMap(this.col,this.row),s=e.map;this._fishes=e.fishes;for(var r=0;r<s.length;r++){var c=s[r];this.tiles[r].getComponent("Tile").type=c>0?this.Tile.TYPE.BOMB:this.Tile.TYPE.ZERO,this.tiles[r].getComponent("Tile").state=this.Tile.STATE.NONE,this.tiles[r].getComponent("Tile")._idx=r}this.gameState=o.PLAY},onTouchTile:function(t){if(this.gameState===o.PLAY&&t.getComponent("Tile").state!=this.Tile.STATE.CLICKED){if(this.bombs[this._bombUsed].getComponent("Bomb").state=this.Bomb.STATE.USED,this._bombUsed++,this.bombLabel.getComponent(cc.Label).string=this.bombNum-this._bombUsed,t.getComponent("Tile").type!==this.Tile.TYPE.ZERO){this._tarTileHit++,this.audioComp.play(s.AUDIO_NAME.BOMBBLOW),this.node.parent.runAction(cc.shake(.2,5,5));var i=this.checkFishes(t.getComponent("Tile")._idx)}else this.audioComp.play(s.AUDIO_NAME.BOMBHIT);i?(t.getComponent("Tile").state=this.Tile.STATE.HITALL,this.fishes[this._fishDieNum].getComponent("Fish").state=this.Fish.FISH_STATE.DIE,this._fishDieNum++):t.getComponent("Tile").state=this.Tile.STATE.CLICKED,this.gameFinish()}},gameFinish:function(){this._tarTileHit===this.tarTileNum?(this.gameState=o.WIN,this.audioComp.play(s.AUDIO_NAME.SHOTSUCC),Alert.show("congratulations\uff01")):this._bombUsed===this.bombNum&&(this.gameState=o.DEAD,this.audioComp.play(s.AUDIO_NAME.SHOTFAILED),Alert.show("Oh no\uff01You Failed\uff01"))},onBtnReplay:function(){this.newGame()},generateMap:function(t,i){if(t<4||i<4)return console.error("map length/width must >= 4");var e=function(t,i){for(var e=[],s=0;s<t*i;s++)e.push(0);return e}(t,i);return c(2,e,t,i),c(3,e,t,i),c(4,e,t,i),{map:e,fishes:a}},showHelps:function(){Alert.show("\u6211\u662f\u4f60\u5927\u7237")},checkFishes:function(t){var i=[],e=null;for(var s in this._fishes){var o=this._fishes[s],a=!0,c=!1,h=void 0;try{for(var n,p=o[Symbol.iterator]();!(a=(n=p.next()).done);a=!0){var l=n.value;if(l.idx===t){l.type=1,e=o;break}}}catch(t){c=!0,h=t}finally{try{!a&&p.return&&p.return()}finally{if(c)throw h}}if(e)break}var m=!0,u=!1,f=void 0;try{for(var b,d=e[Symbol.iterator]();!(m=(b=d.next()).done);m=!0){var F=b.value;if(0===F.type)return;i.push(F.idx)}}catch(t){u=!0,f=t}finally{try{!m&&d.return&&d.return()}finally{if(u)throw f}}var T=r[i.length],v="h";i[1]-i[0]>1&&(v="v");for(var g=0;g<i.length;g++){var E=i[g];this.tiles[E].getComponent("Tile").piece=v+T[g]}return!0}}),cc._RF.pop()},{Audio:"Audio",Bomb:"Bomb",Fish:"Fish",Tile:"Tile"}],Tile:[function(t,i,e){"use strict";cc._RF.push(i,"882c15ewTJKvp3mU6dshVss","Tile");var s=cc.Enum({ZERO:0,BOMB:1}),o=cc.Enum({NONE:0,CLICKED:1,HITALL:2});i.exports={TYPE:s,STATE:o},cc.Class({extends:cc.Component,properties:{picNone:cc.SpriteFrame,picBomb:cc.SpriteFrame,picZero:cc.SpriteFrame,hsmlFishHead:cc.SpriteFrame,hsmlFishTail:cc.SpriteFrame,hmidFishHead:cc.SpriteFrame,hmidFishBody:cc.SpriteFrame,hmidFishTail:cc.SpriteFrame,hbigFishHead:cc.SpriteFrame,hbigFishBody:cc.SpriteFrame,hbigFishBack:cc.SpriteFrame,hbigFishTail:cc.SpriteFrame,vsmlFishHead:cc.SpriteFrame,vsmlFishTail:cc.SpriteFrame,vmidFishHead:cc.SpriteFrame,vmidFishBody:cc.SpriteFrame,vmidFishTail:cc.SpriteFrame,vbigFishHead:cc.SpriteFrame,vbigFishBody:cc.SpriteFrame,vbigFishBack:cc.SpriteFrame,vbigFishTail:cc.SpriteFrame,_idx:0,_state:{default:o.NONE,type:o},state:{get:function(){return this._state},set:function(t){if(t!==this._state)switch(this._state=t,this._state){case o.NONE:this.getComponent(cc.Sprite).spriteFrame=this.picNone;break;case o.CLICKED:this.showType();break;case o.HITALL:}}},piece:{set:function(t){this.getComponent(cc.Sprite).spriteFrame=this[t]}},type:{default:s.ZERO,type:s}},showType:function(){switch(this.type){case s.ZERO:this.getComponent(cc.Sprite).spriteFrame=this.picZero;break;case s.BOMB:this.getComponent(cc.Animation).play("Hit")}}}),cc._RF.pop()},{}],map:[function(t,i,e){"use strict";function s(t,i,e,s){if(t<2||t>4)return console.error("fish length must (2,4]");Math.random()<.5?function t(i,e,s,o){console.log("horizontal");var r=Math.floor(Math.random()*e.length);var a=(r+i)%s;var c=!0;for(var h=0;h<i;h++)if(1===e[r+h]){c=!1;break}if((0===a||a>=i)&&c)for(var n=0;n<i;n++)e[r+n]=1;else t(i,e,s,o)}(t,i,e,s):function t(i,e,s,o){console.log("vertical");var r=Math.floor(Math.random()*e.length);var a=!0;for(var c=0;c<i;c++)if(1===e[r+c*s]||0!==e[r+c*s]){a=!1;break}if(a)for(var h=0;h<i;h++)e[r+h*s]=1;else t(i,e,s,o)}(t,i,e,s)}cc._RF.push(i,"3f83ap1y0dBcZMFUfw/WxFB","map"),console.log(JSON.stringify(function(t,i){if(t<4||i<4)return console.error("map length/width must >= 4");var e=function(t,i){for(var e=[],s=0;s<t*i;s++)e.push(0);return e}(t,i);return s(2,e,t,i),s(3,e,t,i),s(4,e,t,i),e}(8,8))),cc._RF.pop()},{}]},{},["Audio","Bomb","Fish","Shot","Tile","map"]);