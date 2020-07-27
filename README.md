# PIC ZOOMER 

## Structure

```html
<div class="img-wrapper"
        data-pic-zoomer
        data-zoom-amount="9"
        data-zoom-img-src="https://picsum.photos/400/400"
      >
        <div class="img__wrapper">
          <img src="https://picsum.photos/400/400" alt="" data-zoom-target-img />
          <!-- <div class="pic-zoom__lens" data-zoom-lens></div> -->
        </div>

        <div class="img-zoomed" data-zoom-viewer>
        </div>
      </div>
```


# Snowpack preset-env

> ✨ Bootstrapped with Create Snowpack App (CSA).

## Available Scripts



### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds the app for production to the `build/` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.