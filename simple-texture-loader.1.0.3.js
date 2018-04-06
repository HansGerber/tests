var textureLoader = {
    then: function() {},
    load: function() {},
    loadCount: 0,
    errors:0,
    texturesInput: [],
    texturesOutput: {},
    load: function(arrTextures, fThen, fLoad){
        this.textures = arrTextures;
        this.then = fThen;
        this.load = fLoad;
        for(var i = 0; i < arrTextures.length; i++){
            var loader = new Image();
            loader.onload = (function() {
                this.textureLoader.loadCount++;
                this.textureLoader.texturesOutput[this.currentTexture.name] = this.loader;
                this.textureLoader.load(this.textureLoader.loadCount, this.textureLoader.textures.length, false);
                if(this.textureLoader.loadCount >= this.textureLoader.texturesInput.length){
                    this.textureLoader.then(this.textureLoader.texturesOutput, this.textureLoader.errors);
                }
            }).bind({textureLoader:textureLoader, currentTexture:arrTextures[i], loader:loader})
            loader.onerror = (function() {
                this.textureLoader.loadCount++;
                this.textureLoader.errors++;
                this.textureLoader.load(this.textureLoader.loadCount, this.textureLoader.textures.length, false);
                if(this.textureLoader.loadCount >= this.textureLoader.texturesInput.length){
                    this.textureLoader.then(this.textureLoader.texturesOutput, this.textureLoader.errors);
                }
            }).bind({textureLoader:textureLoader})
            loader.src = arrTextures[i].url;
        }
    }
}
