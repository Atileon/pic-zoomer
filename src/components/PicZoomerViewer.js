export default class PicZoomerViewer{
    get CLASSES() {
        return {
            viewer: 'pic-zoom-viewer'
        }
    }

    constructor(element,imageSrc) {
        this.element = element;
        this.imgSrc = imageSrc;
        this.image = new Image();
        this.width = this.element.offsetWidth??0;
        this.height = this.element.offsetHeight ?? 0;
        
        if (!this.element.classList.contains(this.CLASSES.viewer)) {
            this.element.classList.add(this.CLASSES.viewer);
        }

        this.isLoaded = false;
    }

    createImg(width,height) {
        this.image.width = width;
        this.image.height = height;
        if (!this.image.src) {
            this.image.src = this.imgSrc;
            this.image.onload = () => {
                this.element.append(this.image);
                this.isLoaded = true;
                console.log('IMAGE LOADED');
            }
        }
    }

    log() {
        console.log('CI SONO');
    }

    // isLoaded() {
    //     if (this.image.src) {
    //         return true
    //     }
    // }

    onLoad(cb) {
        this.image.addEventListener('load', (e) => {
            cb();
        })
    }

    position(fromLeft,fromTop) {
        console.log(fromLeft);
        console.log(fromTop);
        this.image.style.left = `-${fromLeft}px`;
        this.image.style.top = `-${fromTop}px`;
    }

}