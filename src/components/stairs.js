let stair;
let loader = PIXI.Loader.shared;
loader.add("old_chair", "img/stair/old_stair.png")
    .load(handleLoadComplete);

function handleLoadComplete() {
    let texture = loader.resources.old_chair.texture;
    stair = new PIXI.Sprite.from(texture);
    stair.position.set(window.innerWidth - 445.6, window.innerHeight - 468.8);
    console.log(stair);
    stair.scale = new PIXI.Point(0.8, 0.8);
    stage.addChild(stair);
}

export default stair;