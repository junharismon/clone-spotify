<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/main';
export default {
  computed: {
    ...mapState(useMainStore, ['dataDetailAlbum']),
  },
  methods: {
    ...mapActions(useMainStore, ['addLikedMusic', 'toDetailAlbum']),
    toLike(id) {
      console.log(id);
      this.addLikedMusic(id);
    },
  },
  created() {
    this.toDetailAlbum(this.$route.params.id);
  },
};
</script>
<template>
  <div class="container">
    <div class="row profile">
      <div class="col-md-3">
        <div class="profile-content">
          <!-- SIDEBAR USERPIC -->
          <div class="profile-userpic" style="border-radius: 10%">
            <img :src="dataDetailAlbum.cover_big" class="img-responsive" alt="" />
          </div>
          <!-- END SIDEBAR USERPIC -->
          <!-- SIDEBAR USER TITLE -->
          <div class="profile-usertitle">
            <div class="profile-usertitle-name text-start">Title: {{ dataDetailAlbum?.title }}</div>
            <div class="profile-usertitle-name text-start">Artist: {{ dataDetailAlbum.artist?.name }}</div>
            <div class="profile-usertitle-name text-start">Release: {{ dataDetailAlbum.release_date }}</div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="profile-content">
          <h2 class="text-center fw-bold"></h2>
        </div>
      </div>
    </div>
  </div>
  <div class="spotify-playlists">
    <h2 class="fw-bold" v-if="dataDetailAlbum.tracks?.data.length > 0">Songs</h2>
    <div class="list row">
      <div class="item" v-for="song in dataDetailAlbum.tracks?.data">
        <img :src="song.album.cover" />
        <a :href="song.preview">
          <div class="play">
            <span class="fa fa-play"></span>
          </div>
        </a>
        <p>{{ song.artist.name }}</p>
        <h4 class="fw-bold">{{ song.title }}</h4>
        <button @click="toLike(song)" class="btn btn-success">
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
