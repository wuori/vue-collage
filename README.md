# vue-collage
Responsive collages with animated images for Vue.js.
After given images are preloaded, component generates collages with different templates.
Every slide can contain up to 5 pictures.
Using transition animation, the component creates a different slide effects for every image in a collage (slide from the left/right/top/bottom).
Collages are made in a way that vertical and horizontal images fit to container as best as possible.
Collages take up 100% of the container height.

## Credits:
This component is just a stripped-down version of `vue-collage-slideshow` from [edicasoft](https://github.com/edicasoft/vue-collage-slideshow), removing the slideshow/carousel components and randomization of the number of images shown (will default to `collageSizeMax` or `images.length`, whichever is greater.

## Demo:
[Check out the demo on jsFiddle](https://jsfiddle.net/wuori/noty8215/9/show)

## Installation:
Just use `npm install --save vue-collage`

## Set up:
```
import Collage from 'vue-collage';

export default {
  ...
  components: {
    Collage
  }
  ...
};
```

## Usage:
```
<collage :images="images" height="600px">
</collage>
```
#### Props:

| Props               | Type      | Default                                         | Description  |
| --------------------|:----------| ------------------------------------------------|--------------|
| images              | Array     | []                                              | Array of Objects with a structure: {image: "https://example.com/images/picture.jpg"} |
| height              | String    | '600px'                                         | Define the height of the slideshow container. Could be 100% etc  |
| collageSizeMin      | Number    |  2                                              | Define the minimum collage size (number of images that can be in one collage) |
| collageSizeMax      | Number    |  5                                              | Define the maximum number of images that can be in one collage |
| showNoImagesMsg     | Boolean   | true                                            | Whether display "no images" text or not |
| noImagesMsg         | String    | 'No Images'                                     | Define the text of the message that shows up if there are no images |
| showLoadingMsg      | Boolean   | true                                            | Whether display the loader for images preloading or not |
| loadingMsg          | String    | 'Loading...'                                    | Define the text of the preloader message |

#### Slots:
"loader" - slot to place loading message when images are loading
```
<template slot="loader">
    <div id="loader">Loading...</div>
</template>
```
"empty" - content to display when no items are present in the `images` array
 ```
<template slot="empty">
    <div id="no-images">No images</div>
</template>
            ```
## Contribution
Feel free to contribute on [GitHub](https://github.com/wuori/vue-collage)
