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


// window.addEventListener('resize', resize);
// function resize() {
//     _w = window.innerWidth;
//     _h = window.innerHeight;
//     renderer.resize(_w, _h);
// }

let container = new PIXI.Container();
app.stage.addChild(container);

let logo;

const stage = new PIXI.Container();

const texture = PIXI.Texture.from('img/back.png');
const img = new PIXI.Sprite(texture);

img.anchor.x = 0.5;
img.anchor.y = 0.5;
stage.addChild(img);
img.x = app.renderer.screen.width / 2;
img.y = app.renderer.screen.height / 2;


// Logo
logo = new PIXI.Sprite(PIXI.Texture.from('img/logo.png'));
logo.position.set(160, 70);
stage.addChild(logo);

const ticker = new PIXI.Ticker();
ticker.add(animate);
ticker.start();

function animate() {
    
    app.renderer.render(stage);
}