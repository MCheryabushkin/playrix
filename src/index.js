import createTexture from './components/createTexture';

const canvas = document.getElementById("mycanvas");

let size = 1390/640;
let _w = window.innerWidth;
let _h = window.innerHeight;
let scale = (function() {
    if (_w > 1390) return (window.innerWidth / 1390);
    return 1;
})();
 
const app = new PIXI.Application({
    view: canvas,
    width: _w,
    height: _h,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    autoResize: true
});


// Контейнер
const stage = new PIXI.Container();

// Фон
const texture = PIXI.Texture.from('img/back.png');
const img = new PIXI.Sprite(texture);

img.anchor.x = 0.5;
img.anchor.y = 0.5;
img.x = app.renderer.screen.width / 2;
img.y = app.renderer.screen.height / 2;
img._width = window.innerWidth; 
img._width = (function() {
    if(_w > 1390) return _w;
    return 1390;
})();
img._height = window.innerHeight;
stage.addChild(img);

const logo = createTexture('img/logo.png', 170, 70);
logo.scale = new PIXI.Point(0, 0);
stage.addChild(logo);


// #startregion Добавляем фурнитуру
const flower1 = createTexture('img/dec_2/plant.png', _w / 2 - 180, 40);
const flower2 = createTexture('img/dec_2/plant.png', _w - 190, _h / 2 - 80);
const sofa = createTexture('img/dec_2/sofa.png', 290, _h - 180);
const table = createTexture('img/dec_2/table.png', 330, _h / 2 - 20);
const globe = createTexture('img/dec_2/globe.png', 140, _h / 2 - 120);
const bookState = createTexture('img/dec_2/book_stand.png', _w / 2 + 220, 90);
const Austin = createTexture('img/Austin.png', _w / 2 + 50, _h / 2 - 60);
const continueBtn = createTexture('img/btn.png', _w / 2 , _h - 80);

bookState.scale = new PIXI.Point(scale, scale);
sofa.scale = new PIXI.Point(scale, scale);
table.scale = new PIXI.Point(scale, scale);
globe.scale = new PIXI.Point(scale, scale);
Austin.scale = new PIXI.Point(scale, scale);
continueBtn.scale = new PIXI.Point(0, 0);
stage.addChild(flower1);
stage.addChild(flower2);
stage.addChild(globe);
stage.addChild(table);
stage.addChild(sofa);
stage.addChild(bookState);
stage.addChild(Austin);
// #endregion Добавляем фурнитуру

// #startregion Блок отрисовки  лестницы
let finalPos = window.innerHeight / 2 + 20;
let stair;
let loader = PIXI.Loader.shared;
loader.add("old_chair", "img/stair/old_stair.png")
    .load(handleLoadComplete);

function handleLoadComplete() {
    let texture = loader.resources.old_chair.texture;
    stair = new PIXI.Sprite(texture);
    stair.anchor.set(0.5, 0.5);
    stair.scale = new PIXI.Point(scale, scale);
    stair.position.set(window.innerWidth - 280, 0); 
    stair.alpha = 0;
    stage.addChild(stair);

    stage.addChild(continueBtn);
    const flower3 = createTexture('img/dec_1.png', _w - 100, _h - 100); 
    flower3.scale = new PIXI.Point(scale, scale);

    game();
}
// #endregion Блок отрисовки  лестницы


let hammer;
function game() {
    // #startregion Рисуем кнопочки с лесенками
    const buttonStair1 = renderBtn('img/stair/new_stair_01.png', 'img/menu/circle1.png');
    const buttonStair2 = renderBtn('img/stair/new_stair_02.png', 'img/menu/circle1.png');
    const buttonStair3 = renderBtn('img/stair/new_stair_03.png', 'img/menu/circle1.png');
    buttonStair2.position.set(-130, 0);
    buttonStair3.position.set(-260, 0);
    // #endregion Рисуем кнопочки с лесенками


    // #startregion Рисуем молоток
    let iconHammer = PIXI.Texture.from('img/icon_hammer.png');
    hammer = new PIXI.Sprite(iconHammer);

    hammer.interactive = true;
    hammer.buttonMode = true;
    hammer.anchor.set(0.5, 0.5);
    hammer.position.set(_w - 240, _h / 2 + 10);
    // stage.addChild(hammer);
    

    hammer.on("pointerdown", function () {
        this.alpha = 0;
        this.scale = new PIXI.Point(0,0);
        
        stage.addChild(buttonStair1);
        setTimeout(() => stage.addChild(buttonStair2), 400);
        setTimeout(() => stage.addChild(buttonStair3), 800);
    })
    // #endregion Рисуем молоток
    
    const ticker = new PIXI.Ticker();
    ticker.add(animate);
    ticker.start();
    app.ticker.add(animateLogo);
    app.ticker.add(animateStair);
    app.ticker.add(pulseBtn);

    resize();
    function animate() {
        app.renderer.render(stage);
    }
    function resize() {
         var w = window.innerWidth;    var h = window.innerHeight;
         app.renderer.view.style.width = w + "px";    
         app.renderer.view.style.height = h + "px";
         app.renderer.resize(w,h);
    }
    window.onresize = function(event) {
        animate();
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
        okBtn.interactive = true;
        okBtn.buttonMode = true;

        //#startregion Финальное окно
        okBtn.on('pointerdown', function () {
            let final = renderFinal();
            final._width = _w;
            final._height = _h;
            stage.addChild(final);
        });
        //#endregion Финальное окно

        container.on('pointerdown', function() {
            let alpha = 0;
            stair.alpha = 0;
            stair._texture = PIXI.Texture.from(path1);
            app.ticker.add(fadeStair)
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
            container.addChild(okBtn);

            function fadeStair() {
                if (alpha < 1) {
                    alpha += 0.05;
                    stair.alpha = alpha;
                }
            }
        });
        return container;
    }


    function renderFinal () {
        let texture = PIXI.Texture.from("img/final.png");
        let finalWindow = new PIXI.Sprite(texture);

        finalWindow.position.set(_w / 2, _h / 2);
        finalWindow.anchor.set(0.5, 0.5);

        return finalWindow;
    };


}

// Анимация первого появления лестницы
let delta = 0;
let alpha = 0;
function animateStair() {
    delta += 20;
    if (stair.position.y < finalPos) {
        stair.position.y = delta; 
    }
    if (alpha < 1) {
        alpha += 0.05;
        stair.alpha = alpha;
    }
    if (stair.position.y >= finalPos) {
        stage.addChild(hammer);
    }
}

// Анимация первого появления лого и кнопки Continue
let scaleLogo = 0; 
function animateLogo() {
    if (scaleLogo < scale) {
        scaleLogo += 0.08;
        logo.scale.set(scaleLogo, scaleLogo);
        continueBtn.scale.set(scaleLogo, scaleLogo);
    }
}

// Анимация пульсации кнопки
let deltaPulse = 0;
function pulseBtn() {
    deltaPulse += 0.1;
    if (scaleLogo >= scale) {
        continueBtn.scale.set(1 + Math.sin(deltaPulse) * 0.05);
    }
}