import logo from './components/logo';

const canvas = document.getElementById("mycanvas");

let _w = window.innerWidth;
let _h = window.innerHeight;
 
const app = new PIXI.Application({
    view: canvas,
    width: _w,
    height: _h,
    resolution: window.devicePixelRatio,
    autoDensity: true
});



let container = new PIXI.Container();
app.stage.addChild(container);



const stage = new PIXI.Container();

const texture = PIXI.Texture.from('img/back.png');
const img = new PIXI.Sprite(texture);

img.anchor.x = 0.5;
img.anchor.y = 0.5;
stage.addChild(img);
img.x = app.renderer.screen.width / 2;
img.y = app.renderer.screen.height / 2;

stage.addChild(logo);

const ticker = new PIXI.Ticker();
ticker.add(animate);
ticker.start();

resize();
function animate() {
    
    app.renderer.render(stage);
}


function resize() {
    app.renderer.view.style.width = window.innerWidth + 'px';
    app.renderer.view.style.height = window.innerHeight + 'px';
}
window.onresize = function(event) {
    resize();
};