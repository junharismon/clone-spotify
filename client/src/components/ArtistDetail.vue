<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';
export default {
  computed: {
    ...mapWritableState(useMainStore, ['dataDetailArtist']),
  },
  methods: {
    ...mapActions(useMainStore, ['toDetailArtist']),
  },
  created() {
    this.toDetailArtist(this.$route.params.id);
  },
};
</script>

<template>
  <div class="container">
    <div class="row profile">
      <div class="col-md-4">
        <div class="profile-content">
          <div class="profile-userpic">
            <img :src="dataDetailArtist.picture_medium" class="img-responsive" alt="" />
          </div>
          <div class="profile-usertitle">
            <div class="profile-usertitle-name">Name: {{ dataDetailArtist.name }}</div>
            <div class="profile-usertitle-name">Total Album: {{ dataDetailArtist.nb_album }}</div>
            <div class="profile-usertitle-name">Total Fans: {{ dataDetailArtist.nb_fan }}</div>
            <div class="profile-usertitle-name"></div>
          </div>
          <div class="profile-usermenu">
            <ul class="nav justify-content-center">
              <li>
                <a :href="dataDetailArtist.tracklist">
                  <i class="glyphicon glyphicon-home"></i>
                  Overview
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <center>
    <strong>Powered by <a href="#" target="_blank">Spotify Clone</a></strong>
  </center>
  <br />
  <br />
</template>
