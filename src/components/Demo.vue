<template>
    <div id="app">
        <collage 
            :images="images"
            :collageSizeMin="6"
            :collageSizeMax="6"
            :showNoImagesMsg="true"
            noImagesMsg="No Images"
            :showLoadingMsg="true"
            loadingMsg="Loading..."
            height="100%"
            :noGutter="true"
        >
        </collage>
    </div>
</template>

<script type="text/ecmascript-6">
    import Collage from "../App.vue";

    export default {
        name: 'Demo',
        components: {
            Collage
        },
        data() {
            return {
                images: [
                    {image: "https://wallpapershome.com/images/pages/pic_v/5111.jpg"},
                    {image: "https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Fannabel%2Ffiles%2F2018%2F02%2FLouisville_Skyline-1200x801.jpg"},
                    {image: "https://cdn.pixabay.com/photo/2014/02/17/10/20/statue-of-liberty-267949_1280.jpg"},
                    {image: "https://i.pinimg.com/originals/08/ec/94/08ec94ecf38048a2102ec4783dc88fa8.jpg"},
                    {image: "https://t-ec.bstatic.com/images/hotel/max1024x768/873/87316855.jpg"},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/802px-Eiffel_Tower_Vertical.JPG"},
                    {image: "http://nexusandme.com/wp-content/uploads/2014/06/Ferris-Wheel.jpg"},
                    {image: "http://unmaskmycity.org/wp-content/uploads/2017/01/cityneighborhood.jpg"},
                    {image: "https://wallpapershome.com/images/pages/pic_v/660.jpg"},
                    {image: "https://cdn.pixabay.com/photo/2019/09/28/05/10/sunset-4509879_1280.jpg"},
                    {image: "https://images.wallpaperscraft.com/image/road_marking_bridge_123398_1920x1080.jpg"},
                    {image: "https://stmed.net/sites/default/files/cities-wallpapers-28512-590093.jpg"},
                    {image: "https://img4.goodfon.com/wallpaper/nbig/b/d1/skyscrapers-building-architecture-vertical-night-lights-city.jpg"},
                    {image: "https://images.wallpaperscraft.com/image/architecture_city_view_from_above_buildings_river_118446_1920x1080.jpg"},
                    {image: "https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://cdn.pixabay.com/photo/2019/09/30/18/41/taxi-4516525_1280.jpg"},
                    {image: "https://images.unsplash.com/photo-1541780815498-ffd0f2d0d0af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.unsplash.com/photo-1536235799634-c6c21fdc2b9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.wallpaperscraft.com/image/bridge_night_city_lighting_125945_1280x720.jpg"},
                    {image: "https://images.unsplash.com/photo-1501464915526-070295e4768d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.wallpaperscraft.com/image/architecture_building_sky_114682_1920x1080.jpg"},
                ]
            }
        }
    }
</script>
<style>
    html, body, #app {
        margin: 0;
        height: 100%;
    }
</style>