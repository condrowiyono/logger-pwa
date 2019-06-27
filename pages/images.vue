<template>
  <v-layout>
    <toolbar :back="'/logs/'+$route.query.id" :title="'Gambar'" />
    <v-container>
      <v-img :src="$route.query.image_path" />
      <v-btn color="primary" :href="$route.query.image_path" > Download </v-btn>
    </v-container>
  </v-layout>
</template>
