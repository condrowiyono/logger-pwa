<template>
  <v-layout>
    <toolbar :title="title" />
    <v-flex xs-12>
      <div v-if="tab== 'account'">
        <v-list two-line subheader>
            <v-subheader>General</v-subheader>
            <v-list-tile  ripple="ripple">
              <v-list-tile-content>
                <v-list-tile-title>{{ $auth.user.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ $auth.user.phoneNumber }}</v-list-tile-sub-title>
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
      </div>
    </v-flex>
    <v-bottom-nav
      :active.sync="tab"
      :value="true"
      absolute
      color="transparent"
    >
      <v-btn
        color="blue"
        flat
        value="home"
        @click="title = 'Logger PWA'"
      >
        <span>Beranda</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn
        color="blue"
        flat
        value="scan"
        @click="title = 'Scan'"
      >
        <span>Scan</span>
        <v-icon>camera_alt</v-icon>
      </v-btn>
      <v-btn
        color="blue"
        flat
        value="history"
        @click="title = 'Riwayat'"
      >
        <span>Riwayat</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn
        color="blue"
        flat
        value="account"
        @click="title = 'Akun'"
      >
        <span>Akun</span>
        <v-icon>person</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      tab: (this.$route.query.tab) ? this.$route.query.tab : 'home',
      title: (this.$route.query.tab) ? this.$route.query.tab : 'Beranda',
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
}
</script>
