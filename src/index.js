console?.log('ready.')

import PicZoomer from "./components/PicZoomer.js";

class App {
  init() {
    let target = document.querySelector("[data-pic-zoomer]");
    let zoomer = new PicZoomer(target);
    zoomer.init();      
  }
}

const app = new App();

app.init();
