<template>
    <v-flex xs12>
        <v-list subheader>
          <v-subheader>Informasi Akun</v-subheader>
          <v-list-tile :to="'/account'"  ripple="ripple">
            <v-list-tile-content>
              <v-list-tile-title>{{ $auth.user.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ $auth.user.phoneNumber }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="'/change-password'" ripple="ripple">
            <v-list-tile-content>
              <v-list-tile-title>Ganti Password</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider/>
        <v-list two-line subheader>
          <v-subheader>Alat</v-subheader>
          <v-list-tile :to="'/equipments'"  ripple="ripple">
            <v-list-tile-content>
              <v-list-tile-title>Peralatan</v-list-tile-title>
              <v-list-tile-sub-title>Lihat semua peraltan</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider/>
        <v-list>
          <v-list-tile :to="'/help'" ripple="ripple">
            <v-list-tile-content>
              <v-list-tile-title>Petunjuk Penggunaan</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="'/about'" ripple="ripple">
            <v-list-tile-content>
              <v-list-tile-title>Tentang Aplikasi</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile  @click="logout" ripple="ripple">
            <v-list-tile-content>
              <v-list-tile-title>Keluar</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-flex>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  }
}
</script>
