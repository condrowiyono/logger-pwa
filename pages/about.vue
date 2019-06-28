<template>
  <v-layout>
    <toolbar :back="'/?tab=account'" :title="'Tentang Aplikasi'" />
    <v-container>
      <div class="title">Tentang Aplikasi</div>
      <p>
        Aplikasi dikembangkan untuk membantu mencatatan log peralatan dilingkungan Bandara Pattimura Ambon
      </p>
      <v-container grid-list-sm fluid>
        <v-layout>
          <v-flex>
            <img src="/logo.png" style="width:100%"/>
          </v-flex>
        </v-layout>
      </v-container>
      <p>
        Dikembangkan dengan menggunakan Nuxt JS
      </p>
    </v-container>
  </v-layout>
</template>
