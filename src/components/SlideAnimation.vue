<template>
    <transition functional
        @enter="enterEl"
        @leave="leaveEl"
        @before-enter="beforeEnterEl"
        :css="false"
    >
        <slot></slot>
    </transition>
</template>

<script>
    let animations = [];
    export default {
        name: 'SlideAnimation',
        props: ['animationDuration'],
        created(){
            animations = [
                {name: 'left', isTaken: false},
                {name: 'right', isTaken: false},
                {name: 'top', isTaken: false},
                {name: 'bottom', isTaken: false}
            ];
        },
        methods: {
            getRandomElement(arr){
                return arr[Math.floor(Math.random() * arr.length)]
            },
            getAnimation(el){
                let freeAnimations = animations.filter(item => !item.isTaken);
                let animation = freeAnimations.length > 0 ? this.getRandomElement(freeAnimations) : this.getRandomElement(animations);
//                console.log('freeAnimations', freeAnimations);
                animation.isTaken = true;
                el.classList.add(`vc-slideshow-slide-${animation.name}-enter`);
                el.setAttribute('data-animation', animation.name);
//                console.log('animation', animation.name);
                return animation.name;
            },
            beforeEnterEl(el) {
                this.getAnimation(el);
            },
            enterEl(el, done){
                setTimeout(()=> {
                    const animationName = el.getAttribute('data-animation');
//                   console.log('enterEl', animationName);
                    el.classList.remove(`vc-slideshow-slide-${animationName}-enter`);
                    done();
                }, 100);
            },
            leaveEl(el, done) {
                //exit animation
                const animationName = el.getAttribute('data-animation');
                //console.log('leave', animationName);
                el.classList.add(`vc-slideshow-slide-${animationName}-leave-active`);
                setTimeout(()=> {
//                   console.log('done');
                    done();
                }, this.animationDuration);
            },
        }
    }
</script>