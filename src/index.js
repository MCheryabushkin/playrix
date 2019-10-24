import createTexture from './components/createTexture';

const canvas = document.getElementById("mycanvas");

let _w = window.innerWidth;
let _h = window.innerHeight;
 
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
stage.addChild(img);
img.x = app.renderer.screen.width / 2;
img.y = app.renderer.screen.height / 2;

const logo = createTexture('img/logo.png', 170, 70);
stage.addChild(logo);

// #startregion Добавляем фурнитуру
const flower1 = createTexture('img/dec_2/plant.png', _w / 2 - 180, 40);
const flower2 = createTexture('img/dec_2/plant.png', _w - 190, _h / 2 - 80);
const sofa = createTexture('img/dec_2/sofa.png', 290, _h - 180);
const table = createTexture('img/dec_2/table.png', 330, _h / 2 - 20);
const globe = createTexture('img/dec_2/globe.png', 140, _h / 2 - 120);
const bookState = createTexture('img/dec_2/book_stand.png', _w / 2 + 220, 90);
const Austin = createTexture('img/Austin.png', _w / 2 + 50, _h / 2 - 60);
stage.addChild(flower1);
stage.addChild(flower2);
stage.addChild(table);
stage.addChild(globe);
stage.addChild(sofa);
stage.addChild(bookState);
stage.addChild(Austin);
// #endregion Добавляем фурнитуру

// #startregion Блок отрисовки  лестницы
let stair;
let loader = PIXI.Loader.shared;
loader.add("old_chair", "img/stair/old_stair.png")
    .load(handleLoadComplete);

function handleLoadComplete() {
    let texture = loader.resources.old_chair.texture;
    stair = new PIXI.Sprite(texture);
    stair.position.set(window.innerWidth - stair.width, window.innerHeight - stair.height);
    stage.addChild(stair);

    const flower3 = createTexture('img/dec_1.png', _w - 100, _h - 110); 
    stage.addChild(flower3);

    game();
}
// #endregion Блок отрисовки  лестницы

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
    let hammer = new PIXI.Sprite(iconHammer);

    hammer.interactive = true;
    hammer.buttonMode = true;
    hammer.anchor.set(0.5, 0.5);
    hammer.position.set(_w - 240, _h / 2 + 10);
    stage.addChild(hammer);

    hammer.on("pointerdown", function () {
        this.destroy();

        stage.addChild(buttonStair1);
        setTimeout(() => stage.addChild(buttonStair2), 400);
        setTimeout(() => stage.addChild(buttonStair3), 800);
    })
    // #endregion Рисуем молоток


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
        okBtn.interactive = true;
        okBtn.buttonMode = true;

        //#startregion Финальное окно
        okBtn.on('pointerdown', function () {
            let final = renderFinal();
            stage.addChild(final);
        });
        //#endregion Финальное окно

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
            // stage.ticker.add(animate);
            containerStairSmall1._texture = PIXI.Texture.from("img/menu/choosed.png");
            okBtn.removeChild();
            container.addChild(okBtn)
        });
        return container;
    }


    function renderFinal () {
        let texture = PIXI.Texture.from("img/final.png");
        let finalWindow = new PIXI.Sprite(texture);

        finalWindow.position.set(window.innerWidth / 2, window.innerHeight / 2);
        finalWindow.anchor.set(0.5, 0.5);

        return finalWindow;
    };


}
