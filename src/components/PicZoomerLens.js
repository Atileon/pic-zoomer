export default class PicZoomerLens{

    get CLASSES() {
        return {
            imageContainer: 'pic-zoom__image-container',
            lens: 'pic-zoom__lens',
            showLens: 'show-lens'
        }
    }
    constructor(targetImage, viewerInstance, zoomAmount) {
        this.width = null;
        this.heightImg = null;
        this.image = targetImage;
        this.viewer = viewerInstance;
        this.zoomAmount = zoomAmount;
        this.container = this.image.parentElement;
        this.lens = this.container.querySelector("[data-zoom-lens]") || this.createLens();

        if (!this.container.classList.contains(this.CLASSES.imageContainer)) {
            this.container.classList.add(this.CLASSES.imageContainer);
        }
    }

    createLens() {
        this.viewer.log();
        let el = document.createElement('span');
        el.classList.add(this.CLASSES.lens);
        this.container.append(el);
        return el;
    }

    init() {
        console.log('PICZOOMERLENS');
        this.loadViewer();
    }

    destroy() {
        console.log('PICZOOMERLENS DESTROYED');
        this.hide();
    }

    loadViewer() {
        let widthImg = this.image.offsetWidth * this.zoomAmount;
        let heightImg = this.image.offsetHeight * this.zoomAmount;

        this.viewer.createImg(widthImg,heightImg);
        this.viewer.onLoad(() => {
            this.setLensSpace();
        });
        if (this.viewer.isLoaded) {
            this.setLensSpace();
        }
    }

    setLensSpace() {
        console.log(this.viewer.image.offsetWidth);
        this.width = (this.image.offsetWidth / this.viewer.image.offsetWidth) * this.viewer.width;
        this.height = (this.image.offsetHeight / this.viewer.image.offsetHeight) * this.viewer.height;

        this.lens.style.width = `${this.width}px`;
        this.lens.style.height = `${this.height}px`;
    }

    lensPos(fromLeft, fromTop) {
        this.lens.style.left = `${fromLeft}px`;
        this.lens.style.top = `${fromTop}px`;

        let viewX = fromLeft * this.zoomAmount;
        let viewY = fromTop * this.zoomAmount;
        this.viewer.position(viewX, viewY)
        this.show();
    }
    show() {
        this.lens.classList.add(this.CLASSES.showLens);
    }
    hide() {
        this.lens.classList.remove(this.CLASSES.showLens);
    }

}