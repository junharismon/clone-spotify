<script>
import { mapActions, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';
import Navbar from '../components/Navbar.vue';
import CardSong from '../components/CardSong.vue';
import FormPlaylist from '../components/FormPlaylist.vue';
import CardAlbum from '../components/CardAlbum.vue';
export default {
  data() {
    return {
      title: '',
    };
  },
  computed: {
    ...mapWritableState(useMainStore, ['dataMusic', 'dataAlbum', 'buttonLogin']),
  },
  components: { Navbar, CardSong, FormPlaylist, CardAlbum },
  methods: {
    ...mapActions(useMainStore, ['getMusic', 'getAlbum', 'getPlaylist', 'getAllUser', 'toDetailAlbum', 'toDetailArtist']),
    toSearch() {
      this.getMusic(this.title);
    },
    toSignup() {
      this.$router.push({ name: 'register' });
    },
  },
  created() {
    this.getAlbum();
    // this.getPlaylist();
    // this.getAllUser();
    // this.toDetailAlbum();
    // this.toDetailArtist();
  },
};
</script>

<template>
  <Navbar />
  <div class="main-container">
    <RouterView />
  </div>
  <div v-if="buttonLogin" class="preview">
    <div class="text">
      <h6>Preview of Spotify</h6>
      <p>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
    </div>
    <div class="button">
      <button type="button" @click="toSignup">Sign up free</button>
    </div>
  </div>
</template>
