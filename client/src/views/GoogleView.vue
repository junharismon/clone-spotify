<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/main';
export default {
  data() {
    return {
      log: '',
    };
  },
  methods: {
    ...mapActions(useMainStore, ['googleLogin']),
    callback(response) {
      this.log = response;
      this.googleLogin(response);
    },
  },
};
</script>

<template>
  <GoogleLogin :callback="callback" />
</template>
