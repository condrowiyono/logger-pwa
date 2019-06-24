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
      <div v-if="tab == 'scan'">
        <p class="error">{{ error }}</p>
        <v-container v-if="!error">
          <v-toolbar class="elevation-0"> 
            Result : 
            <span style="font-family: 'Oxygen Mono', monospace;">213120313</span> 
            <v-spacer/>
            <v-btn flat color="primary">PROSES</v-btn>
          </v-toolbar>
          <qrcode-stream @decode="onDecode" @init="onInit" />
          <!-- <div style="width:379px;height:379px;background-color:aqua"/> -->
          <v-divider style="margin-top:10px" />
        </v-container>
        <v-container>
          <p style="text-align:center" class="grey--text text--darken-3">Atau masukkan kode manual</p>
          <v-container fluid>
            <v-layout row>
              <v-flex pa-1 >
                <v-text-field
                  style="font-family: 'Oxygen Mono', monospace;"
                  label="Kode Barang"
                ></v-text-field>
              </v-flex>
              <v-flex pa-1 >
                <v-btn flat color="primary">PROSES</v-btn>                
              </v-flex>
            </v-layout>
          </v-container>
        </v-container>
      </div>
    </v-flex>
    <v-bottom-nav
      :active.sync="tab"
      :value="true"
      fixed
      color="#fff"
    >
      <v-btn
        color="blue"
        flat
        value="home"
        @click="changeTab('home')"
      >
        <span>Beranda</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn
        color="blue"
        flat
        value="scan"
        @click="changeTab('scan')"
      >
        <span>Scan</span>
        <v-icon>camera_alt</v-icon>
      </v-btn>
      <v-btn
        color="blue"
        flat
        value="history"
        @click="changeTab('history')"
      >
        <span>Riwayat</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn
        color="blue"
        flat
        value="account"
        @click="changeTab('account')"
      >
        <span>Akun</span>
        <v-icon>person</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-layout>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  components: { QrcodeStream },
  data () {
    return {
      tab: (this.$route.query.tab) ? this.$route.query.tab : 'home',
      title: (this.$route.query.tab) ? this.$route.query.tab : 'Beranda',
      result: '',
      error: ''
    }
  },
  methods: {
    changeTab(to) {
      this.$router.replace({ path: '/', query: { tab: to } });
      this.title = to;
    },
    async logout() {
      await this.$auth.logout();
    },
    onDecode(result) {
      this.result = result;
      this.$toast.show(`QR Code terdeteksi :  ${this.result}`)
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  },
}
</script>
