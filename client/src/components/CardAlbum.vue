<script>
import { defineComponent } from 'vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';
import 'vue3-carousel/dist/carousel.css';

export default {
  name: 'Autoplay',
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data: () => ({
    currentSlide: 0,
  }),
  computed: {
    ...mapWritableState(useMainStore, ['dataAlbum']),
  },
  methods: {
    ...mapActions(useMainStore, ['getAlbum', 'toDetailAlbum']),
    slideTo(val) {
      this.currentSlide = val;
    },
    detailAlbum(id) {
      this.toDetailAlbum(id);
    },
  },
};
</script>

<template>
  <div class="spotify-playlists">
    <h2 v-if="dataAlbum.length > 0" class="text-center">Spotify Viral</h2>
    <Carousel :autoplay="3000" class="list" :itemsToShow="2.95" :wrapAround="true" :transition="300">
      <Slide class="item" v-for="albums in dataAlbum" :key="albums">
        <div class="carousel__item">
          <img :src="albums.imageUrl" />
          <RouterLink :to="`/album-detail/${albums.id}`">
            <div class="play">
              <span class="fa fa-play"></span>
            </div>
          </RouterLink>
          <h4>{{ albums.title }}</h4>
          <p>{{ albums.artist }}</p>
          <p>{{ albums.releaseDate?.split(' ')[0] }}</p>
        </div>
      </Slide>

      ...
    </Carousel>
  </div>
</template>

<style scoped>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>
