export default function createTexture(path, x, y) {
    let texture;
    texture = new PIXI.Sprite(PIXI.Texture.from(path));
    texture.anchor.set(0.5, 0.5);
    texture.position.set(x, y);

    return texture;
}