<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/main';
export default {
  data() {
    return {
      playlistName: '',
    };
  },
  methods: {
    ...mapActions(useMainStore, ['toAddPlaylist']),
    addPlaylist() {
      this.toAddPlaylist(this.playlistName);
      this.playlistName = '';
    },
  },
};
</script>

<template>
  <div class="container-fluid d-flex justify-content-center mt-2">
    <div class="d-flex justify-content-center">
      <form @submit.prevent="addPlaylist">
        <div class="input-group mb-3">
          <input v-model="playlistName" type="text" class="form-control" placeholder="Input Name Playlist" aria-label="playlist" aria-describedby="button-addon2" />
          <button class="btn btn-outline-secondary" type="submit" id="button-addon2" style="position: absolute; padding: 1.2rem">SUBMIT</button>
        </div>
      </form>
    </div>
  </div>
</template>
