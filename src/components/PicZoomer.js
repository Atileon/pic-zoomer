import PicZoomerLens from "./PicZoomerLens";
import PicZoomerViewer from "./PicZoomerViewer";

export default class PicZoomer {
  get CONFIG() {
    let dataset = this.element.dataset;
    return {
      bigImgSrc: dataset?.zoomImgSrc ?? null,
      zoomAmount: parseFloat(dataset?.zoomAmount) ?? 2
    };
  }

  constructor(element) {
    this.moveHandler = this.moveHandler.bind(this);
    this.element = element;
    this.image = this.element.querySelector("[data-zoom-target-img]");
    this.viewerElement = document.querySelector("[data-zoom-viewer]");
    this.imageRect = {};
    //instance zoom viewer passing element and image src
    this.viewer = new PicZoomerViewer(this.viewerElement,this.CONFIG.bigImgSrc);
    //instance lens with image as reference setting amount of zoom from data attributes
    this.zoomLens = new PicZoomerLens(this.image, this.viewer,this.CONFIG.zoomAmount);
    
    this.dataW = document.querySelector("[data-w]");
    this.dataMouseX = document.querySelector("[data-mouse-x]");
    this.dataMouseY = document.querySelector("[data-mouse-y]");
    this.zoomOn = false;
  }

  init() {
    console.log("PICZOOMER!");
    this.image.addEventListener('mouseover', (e) => {
      this.zoomLens.init();
    });
    this.image.addEventListener('mousemove', this.moveHandler);

    this.image.addEventListener('mouseout', () => {
      this.zoomLens.destroy();
    })
  }

  moveHandler(event) {
    event.preventDefault();
    //execute only if viewer has been loaded
    if (this.viewer.isLoaded) {
      let pos = this.currentPos(event);
      let x = pos.x - (this.zoomLens.width / 2);
      let y = pos.y - (this.zoomLens.height / 2);

      /* Prevent the lens from being positioned outside the image: */
      if (x > this.image.width - this.zoomLens.width) {x = this.image.width - this.zoomLens.width;}
      if (x < 0) {x = 0;}
      if (y > this.image.height - this.zoomLens.height) {y = this.image.height - this.zoomLens.height;}
      if (y < 0) { y = 0; }
      
      this.zoomLens.lensPos(x, y);
    }
  }
  currentPos(e) {
    console.log(e);
    let rect = this.image.getBoundingClientRect();
    let x = e.pageX - rect.left;
    let y = e.pageY - rect.top;

    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    return {
      x: x,
      y: y
    };
  }

  printData() {
    console.log(this.zoomLens);
    this.image.addEventListener("click", e => {
      console.log(e);
      this.zoomOn = true;
      this.imageRect = this.image.getBoundingClientRect();
      this.dataW.innerText = this.imageRect.width;
      console.log(this.imageRect);
      this.startListener();
    });
    
  }
  startListener() {
    if (this.zoomOn) {
      this.image.addEventListener("mousemove", e => {
        this.setData("x", e);
        this.setData("y", e);
      });
    }
    
  }


  setData(coord, event) {
    switch (coord) {
      case "x":
        this.dataMouseX.innerText = event.pageX - this.imageRect.left;
        console.log(event.pageX);

        break;
      case "y":
        this.dataMouseY.innerText = event.pageY - this.imageRect.top;
        console.log(event.pageY);

        break;

      default:
        break;
    }
  }

  

  /**
   *
   * @param {*} dataEl
   */
  readData(dataEl) {
    let attr = `data-zoom-${dataEl}`;
    let result = this.element.getAttribute(attr);
    if (result && result !== "") {
      return result;
    }
  }
}  