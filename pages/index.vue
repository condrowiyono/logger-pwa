<template>
  <v-layout>
    <toolbar :title="title" />
    <v-flex xs-12 >
      <div v-if="tab== 'home'" style="margin-bottom:60px">
        <home @scan-click="changeTab('scan')" @history-click="changeTab('history')" />
      </div>
      <div v-if="tab== 'account'" style="margin-bottom:60px">
        <account />
      </div>
      <div v-if="tab == 'scan'" style="margin-bottom:60px">
        <p class="error">{{ error }}</p>
        <v-container v-if="!error">
          <v-toolbar class="elevation-0"> 
            Result : 
            <span style="font-family: 'Oxygen Mono', monospace;">{{result}}</span> 
            <v-spacer/>
            <v-btn flat color="primary">PROSES</v-btn>
          </v-toolbar>
          <qrcode-stream @decode="onDecode" @init="onInit" />
          <v-progress-circular
            indeterminate
            v-if="ready"
          ></v-progress-circular>
          <!-- <div style="width:379px;height:379px;background-color:aqua"/> -->
          <v-divider style="margin-top:10px" />
        </v-container>
        <v-container>
          <p style="text-align:center" class="grey--text text--darken-3">Atau masukkan kode manual</p>
          <v-container fluid>
              <v-text-field
                style="font-family: 'Oxygen Mono', monospace;"
                label="Kode Barang"
                v-model="resultManual"
                box></v-text-field>
              <div style="justify-content:flex-end; display:flex" >
                <v-btn
                  color="primary"
                  @click="afterDecode(resultManual)">
                  Proses
                </v-btn>
            </div>            
          </v-container>
        </v-container>
      </div>
      <div v-if="tab == 'history'" style="margin-bottom:60px">
        <history />
      </div>
    </v-flex>
    <v-bottom-nav
      :active.sync="tab"
      :value="true"
      fixed
      color="#fff">
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
import {mapState} from 'vuex';
import History from '~/components/history';
import Account from '~/components/account';
import Home from '~/components/home';

export default {
  components: { QrcodeStream, History, Account, Home },
  data () {
    return {
      tab: (this.$route.query.tab) ? this.$route.query.tab : 'home',
      title: (this.$route.query.tab) ? this.$route.query.tab : 'Beranda',
      result: '',
      resultManual: '',
      error: '',
      ready:false,
    }
  },
  methods: {
    changeTab(to) {
      this.tab = to;
      this.$router.replace({ path: '/', query: { tab: to } });
      this.title = to;
    },
    onDecode(result) {
      this.result = result;
      this.afterDecode(result)
    },
    afterDecode(result) {
      this.$axios.get(`/equipments/get-by-qrcode/${result}`,{validateStatus: () => true})
        .then((res) => {
          if (res.status === 200) {
            this.$dialog.warning({
              persistent: true,
              title: 'Barang Terdeteksi',
              text: `Kode Barang terdeteksi apakah Anda ingin mencatat log untuk barang ini <br><br> Nama Barang : <br><b>${res.data.data.name}</b>`,
              actions: {
                false: 'Tidak',
                true: {
                  text: 'Lanjut',
                  handle: () => {
                    this.$router.push({path:'/logs/new', query: {id: res.data.data.id}})
                  }
                }
              }
            })
          } else if (res.status === 404) {
            this.$dialog.error({
              persistent: true,
              title: 'Tidak dikenal',
              text: `Kode barang yang Anda masukkan tidak dikenali`,
            })
          }
        }).catch((err)=> {
          console.log(err)
        });
    },
    async onInit (promise) {
      try {
        await promise
        this.ready = true;
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
