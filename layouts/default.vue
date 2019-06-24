<template>
  <v-app>
    <v-content>
        <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      miniVariant: false,
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
}
</script>