<template>
    <div class="vc-slideshow" :style="{height}">
        <transition name="fade">
            <slot name="empty" v-if="noImages  && !isLoading && showNoImagesMsg">
                <div class="vc-slideshow-h1">
                    {{noImagesMsg}}
                </div>
            </slot>
        </transition>
        <slot name="loader" v-if="showLoadingMsg && isLoading">
            <loading-spinner :delay="1500" :loader="isLoading" :text="loadingMsg"></loading-spinner>
        </slot>
        <div :class="['vc-slideshow-slide', 'vc-slideshow-active']">
            <component 
                :is="slideTemplate(slide.length)"
                :animationDuration="animationDuration"
                :status="status"
                :images="slide"
            />
        </div>
    </div>
</template>

<script>
    import SimpleSlide from '@/components/slides/SimpleSlide';
    import TripleSlide from '@/components/slides/TripleSlide';
    import FourImagesSlide from '@/components/slides/FourImagesSlide';
    import FiveImagesSlide from '@/components/slides/FiveImagesSlide';
    import LoadingSpinner from '@/components/LoadingSpinner';
    import './assets/main.scss'
    import './assets/slides.scss'
    import './assets/animation.scss'
    export default {
        name: 'VueCollage',
        components: {
            SimpleSlide, TripleSlide, FourImagesSlide, LoadingSpinner, FiveImagesSlide
        },
        props: {
            images: {
                type: Array,
                required: true
            },
            height: {
                type: String,
                default: '600px'
            },
            collageSizeMin: {
                type: Number,
                default: 1,
                validator: (value) => value >= 1 && value <= 5
            },
            collageSizeMax: {
                type: Number,
                default: 5,
                validator: (value) => value >= 1 && value <= 5
            },
            noImagesMsg: {
                type: String,
                default: 'No Images',
            },
            showNoImagesMsg: {
                type: Boolean,
                default: true,
            },
            showLoadingMsg: {
                type: Boolean,
                default: true,
            },
            loadingMsg: {
                type: String,
                default: 'Loading...',
            },
        },
        data(){
            return {
                slide: {},
                isLoading: false,
                status: 0, //  0 = idle, 1 = running, 2 = paused, 3 = resumed
                animationDuration: 500
            }
        },
        computed: {
            noImages(){
                return !this.images || this.images.length <= 0;
            }
        },
        created(){
            if (this.noImages) return;
            this.isLoading = true;
            this.loadImages(this.images)
                .then(values => {
                    this.createCollage(values.filter(item => !item.is_error));
                })
                .catch(()=> {
                    //console.log(er);
                })
                .finally(()=> {
                    this.isLoading = false;
                });
        },
        methods: {
            slideTemplate(count){
                switch (count) {
                    case 3:
                        return 'TripleSlide';
                    case 4:
                        return 'FourImagesSlide';
                    case 5:
                        return 'FiveImagesSlide';
                    default:
                        return 'SimpleSlide';
                }
            },
            loadImage(src){
                return new Promise(function (resolve) {
                    let img = new Image();
                    img.onload = function () {
                        const isHorizontal = this.width >= this.height;
                        resolve({
                            image: src,
                            isHorizontal: isHorizontal,
                            isVertical: !isHorizontal,
                        });
                    };
                    img.onerror = function () {
                        resolve({
                            image: src,
                            is_error: true
                        });
                    };
                    img.src = src;
                });
            },
            loadImages(images){
                var promises = [];

                images.forEach(item => {
                    promises.push(this.loadImage(item.image));
                });
                return Promise.all(promises);
            },
            createCollage(images){
                let index = 0;
                let size = this.collageSizeMin;
                size = (this.collageSizeMax > this.images.length) ? this.images.length : this.collageSizeMax;
                let slide = images.slice(index, size + index);
                this.slide = slide;
            }
        }
    }
</script>
