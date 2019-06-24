<template>
    <v-toolbar
      fixed
      app
      color="primary"
    >
      <v-btn
        v-if="back"
        :to="back"
        icon
        class="white--text"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title  class="white--text" style="text-transform:capitalize;" v-text="title" />
      <v-spacer />
    </v-toolbar>
</template>

<script>
export default {
    props: ['title', 'back'],
}
</script>
