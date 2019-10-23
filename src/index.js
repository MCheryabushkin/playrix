import logo from './components/logo';
// import stair from './components/stairs';

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


// Контейнер
const stage = new PIXI.Container();

// Фон
const texture = PIXI.Texture.from('img/back.png');
const img = new PIXI.Sprite(texture);

img.anchor.x = 0.5;
img.anchor.y = 0.5;
stage.addChild(img);
img.x = app.renderer.screen.width / 2;
img.y = app.renderer.screen.height / 2;

stage.addChild(logo);

//  Блок отрисовки  лестницы
let stair;
let loader = PIXI.Loader.shared;
loader.add("old_chair", "img/stair/old_stair.png")
    .load(handleLoadComplete);

function handleLoadComplete() {
    let texture = loader.resources.old_chair.texture;
    stair = new PIXI.Sprite(texture);
    stair.position.set(window.innerWidth - stair.width, window.innerHeight - stair.height);
    stage.addChild(stair);
}
// Блок отрисовки  лестницы



// Рисуем кнопочки с лесенками

const buttonStair1 = renderBtn('img/stair/new_stair_01.png', 'img/menu/circle1.png');
const buttonStair2 = renderBtn('img/stair/new_stair_02.png', 'img/menu/circle1.png');
const buttonStair3 = renderBtn('img/stair/new_stair_03.png', 'img/menu/circle1.png');
buttonStair1.position.set(-150, 30);
buttonStair2.position.set(-280, 130);
stage.addChild(buttonStair1);
stage.addChild(buttonStair2);
stage.addChild(buttonStair3);

// Рисуем кнопочки с лесенками

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


function renderBtn(path1, path2) {
    var container = new PIXI.Container();
    const stairSmall1 = PIXI.Texture.from(path1);
    const stairButton1 = new PIXI.Sprite(stairSmall1);
    
    const containerStair1 = PIXI.Texture.from(path2);
    let containerStairSmall1 = new PIXI.Sprite(containerStair1);
    
    stairButton1.scale.set(0.13, 0.13);
    stairButton1.anchor.set(0.5, 0.5);
    stairButton1.position.set(app.renderer.screen.width - 260, app.renderer.screen.height / 2 - 240);
    
    containerStairSmall1.anchor.set(0.5, 0.5);
    containerStairSmall1.position.set(app.renderer.screen.width - 260, app.renderer.screen.height / 2 - 240);
    
    container.addChild(containerStairSmall1);
    container.addChild(stairButton1);
    
    container.interactive = true;
    container.buttonMode = true;

    let agreeBtn = PIXI.Texture.from("img/menu/ok.png");
    let okBtn = new PIXI.Sprite(agreeBtn);
    okBtn.anchor.set(0.5, 0.5);
    okBtn.position.set(app.renderer.screen.width - 260, app.renderer.screen.height / 2 - 160);
    okBtn.buttonMode = true;

    container.on('pointerdown', function() {
        stair._texture = PIXI.Texture.from(path1);
        stage.children.forEach(el => {
            if (el.children.length !== 0) {
                el.children[0]._texture = PIXI.Texture.from("img/menu/circle1.png");
                if (el.children[2] !== undefined) {
                    el.removeChild(el.children[2]);
                }
            } 
        });
        
        containerStairSmall1._texture = PIXI.Texture.from("img/menu/choosed.png");
        okBtn.removeChild();
        container.addChild(okBtn)
    })
    return container;
}