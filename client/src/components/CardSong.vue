<script>
import { mapActions, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
export default {
  name: 'Breakpoints',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      settings: {
        itemsToShow: 1,
        snapAlign: 'center',
        breakpoints: {
          700: {
            itemsToShow: 3.5,
            snapAlign: 'center',
          },
          1024: {
            itemsToShow: 5,
            snapAlign: 'start',
          },
        },
      },
    };
  },
  computed: {
    ...mapWritableState(useMainStore, ['dataMusic']),
  },
  methods: {
    ...mapActions(useMainStore, ['getMusic', 'toDetailAlbum', 'toDetailArtist', 'addLikedMusic']),
    toSearch() {
      this.getMusic(this.title);
    },
    toAlbumDetail(id) {
      this.toDetailAlbum(id);
    },
    toArtistDetail(id) {
      this.toDetailArtist(id);
    },
    addLike(id) {
      this.addLikedMusic(id);
    },
  },
};
</script>
<template>
  <div class="spotify-playlists">
    <h2 v-if="dataMusic.length > 0">Artists</h2>
    <Carousel :autoplay="2000" :wrap-around="true" class="list" :settings="settings" :breakpoints="breakpoints">
      <Slide class="item" v-for="music in dataMusic" :key="music">
        <div class="carousel__item">
          <img :src="music.artist.picture_medium" />
          <RouterLink :to="`/artist-detail/${music.artist.id}`">
            <div class="play">
              <span class="fa fa-play"></span>
            </div>
          </RouterLink>
          <h4>{{ music.artist.name }}</h4>
          <span>Artis</span>
        </div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>

  <div class="spotify-playlists">
    <h2 v-if="dataMusic.length > 0">Albums</h2>
    <Carousel :autoplay="1500" :wrap-around="false" class="list" :itemsToShow="2.95" :wrapAround="true" :transition="300">
      <Slide class="item" v-for="music in dataMusic" :key="music">
        <div class="carousel__item">
          <img :src="music.album.cover_medium" />
          <RouterLink :to="`/album-detail/${music.album.id}`">
            <div class="play">
              <span class="fa fa-play"></span>
            </div>
          </RouterLink>
          <h4>{{ music.album.title }}</h4>
          <p>{{ music.artist.name }}</p>
        </div>
      </Slide>

      ...
    </Carousel>
  </div>

  <div class="spotify-playlists">
    <h2 v-if="dataMusic.length > 0">Songs</h2>
    <div class="list row">
      <div class="item" v-for="music in dataMusic">
        <img :src="music.artist.picture" />
        <a :href="music.preview">
          <div class="play">
            <span class="fa fa-play"></span>
          </div>
        </a>
        <h4>{{ music.artist.name }}</h4>
        <p>{{ music.title }}</p>
        <button class="btn btn-success" @click.prevent="addLike(music)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
