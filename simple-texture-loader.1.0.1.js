textureLoader = {
    then: function() {},
    load: function() {},
    loadCount: 0,
    errors:0,
    texturesInput: [],
    texturesOutput: {},
    load: function(arrTextures, fThen, fLoad){
        textureLoader.textures = arrTextures;
        textureLoader.then = fThen;
        textureLoader.load = fLoad;
        for(var i = 0; i < arrTextures.length; i++){
            var loader = new Image();
            loader.onload = (function() {
                textureLoader.loadCount++;
                textureLoader.texturesOutput[this.currentTexture.name] = this.loader;
                textureLoader.load(textureLoader.loadCount, textureLoader.textures.length, false);
                if(textureLoader.loadCount >= textureLoader.texturesInput.length){
                    textureLoader.then(textureLoader.texturesOutput, textureLoader.errors);
                }
            }).bind({currentTexture:arrTextures[i], loader:loader})
            loader.onerror = function() {
                textureLoader.loadCount++;
                textureLoader.errors++;
                textureLoader.load(textureLoader.loadCount, textureLoader.textures.length, true);
                if(textureLoader.loadCount >= textureLoader.texturesInput.length){
                    textureLoader.then(textureLoader.texturesOutput, textureLoader.errors);
                }
            }
            loader.src = arrTextures[i].url;
        }
    }
}
