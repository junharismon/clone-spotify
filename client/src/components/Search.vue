<script>
import { mapActions, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';
import CardSong from '../components/CardSong.vue';
export default {
  data() {
    return {
      title: '',
    };
  },
  computed: {
    ...mapWritableState(useMainStore, ['dataMusic']),
  },
  components: { CardSong },
  methods: {
    ...mapActions(useMainStore, ['getMusic']),
    toSearch() {
      this.getMusic(this.title);
    },
  },
};
</script>
<template>
  <div>
    <div class="container-fluid d-flex justify-content-center mt-2">
      <div class="d-flex justify-content-center">
        <form @submit.prevent="toSearch">
          <div class="input-group mb-3">
            <input v-model="title" type="search" class="form-control" placeholder="Search music" aria-label="Search music" aria-describedby="button-addon2" />
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2" style="position: absolute; padding: 0.6rem">Search</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <CardSong />
</template>
