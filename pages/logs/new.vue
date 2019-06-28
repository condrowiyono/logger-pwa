<template>
  <v-layout>
    <toolbar 
      :back="'/?tab=scan'" 
      :title="'Tambah Catatan Baru'"
    />
    <v-container>
      <div style="padding:16px" class="text-xs-center">
        <div style="font-family: 'Oxygen Mono', monospace; font-size:14px">{{item.qrcode}}</div>
        <div style="width:100px;height:100px;margin:auto">
          <qr-code :size="100" v-if="item.qrcode" :text="item.qrcode"></qr-code>
        </div>
        <br/>
        <div class="title">{{item.name}}</div>
      </div>
      <v-form
        ref="form"
        method="post" 
        v-model="valid"
        lazy-validation
        @submit.prevent="save"
      >
        <v-flex xs12 sm6 md4>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateFormat"
                label="Tanggal"
                readonly
                box
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-flex>
        <v-flex xs12>
          <v-dialog
            ref="dialog"
            v-model="modalTime"
            :return-value.sync="time"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="time"
                label="Waktu"
                box
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="modalTime"
              v-model="time"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modalTime = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-text-field
            v-model="shift"
            label="Shift"
            box
            :rules="[() => !!shift || 'This field is required']"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-textarea
            name="input-7-1"
            label="Uraian Pekerjaan"
            v-model="jobDesc"
            box
            :rules="[() => !!jobDesc || 'This field is required']"
          ></v-textarea>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-textarea
            name="input-7-1"
            label="Tindak Lanjut"
            v-model="followUp"
            box
            :rules="[() => !!followUp || 'This field is required']"
            hint="Deskripsi"
          ></v-textarea>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-textarea
            name="input-7-1"
            label="Keterangan"
            v-model="desc"
            box
            :rules="[() => !!desc || 'This field is required']"
            hint="Deskripsi"
          ></v-textarea>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <vue-upload-multiple-image
            idUpload="log"
            idEdit="logEdit"
            @upload-success="logUploadImageSuccess"
            @before-remove="logBeforeRemove"
            @edit-image="logEditImage"
            @data-change="logDataChange"
            :data-images="logImages"
            :maxImage="5"
            primaryText="Gambar"
            />
            <div v-if="isUploading">
              <v-progress-circular
                indeterminate
                :size="24"
                :width="2"
                color="primary"
              ></v-progress-circular>
            Uploading
            </div>
        </v-flex>
        <div style="justify-content:flex-end; display:flex" >
          <v-btn
            type="submit"
            color="primary"
          >
            Simpan
          </v-btn>
        </div>
      </v-form>
    </v-container>
</v-layout>
</template>
<script>
import VueUploadMultipleImage from '~/components/uploadMultiple';
import {mapState} from 'vuex';

export default {
  components: {
    VueUploadMultipleImage,
  },
  created() {
    this.loadData();
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      modalTime: false,
      item: {},
      isUploading: false,
      log: [],
      valid: false,
      shift:'',
      jobDesc:'',
      followUp:'',
      desc:'',
      time:new Date().toISOString().substr(11, 8),
      logImages: [],
    }
  },
  computed: {
    dateFormat () {
      return this.date ? this.$moment(this.date).format('dddd, Do MMMM  YYYY') : ''
    },
  },
  methods: {
    loadData() {
      this.$axios.get(`equipments/${this.$route.query.id}`,{validateStatus: () => true})
      .then((res) => {
        if (res.status==200) {
          this.item = res.data.data;
        } else if (res.status==404) {
          this.$dialog.error({
            persistent: true,
            title: 'Tidak dikenal',
            text: `Kode barang yang Anda masukkan tidak dikenali`,
            actions: {
              true: {
                text: 'OK',
                handle: () => {
                  this.$router.push('/?tab=scan')
                }
              }
            }
          })
        }

      })
      .catch((err) => {
        console.log(err);
      })
    },
    deleteImage(url, fileList) {
      this.isUploading = true;
      this.$axios.delete(url)
        .then(() => this.isUploading = false)
        .catch(err => console.log(err));
    },
    logUploadImageSuccess(formData, index, fileList) {
      this.isUploading = true;
      this.$axios.post('/logs/log_image', formData).then((response) => {
        fileList[index].deleteUrl = response.data.data.deleteUrl;
        fileList[index].imageId = response.data.data.id;
        fileList[index].uploadUrl = response.data.data.uploadUrl;
        this.logImages = fileList;
        this.log = fileList.map(({ path, ...id }) => id);
        this.isUploading = false;
      }).catch(err => console.log(err));
    },
    logBeforeRemove(index, done, fileList) {
      const r = confirm('Remove Current Images?');
      if (r) {
        this.deleteImage(fileList[index].deleteUrl, fileList);
        this.logImages = fileList;
        this.log.splice(index, 1);
        done();
      }
    },
    logEditImage(formData, index, fileList) {
      this.isUploading = true;
      this.deleteImage(fileList[index].deleteUrl, fileList);
      this.$axios.post('/logs/log_image', formData).then((response) => {
        fileList[index].deleteUrl = response.data.data.deleteUrl;
        fileList[index].imageId = response.data.data.id;
        fileList[index].uploadUrl = response.data.data.uploadUrl;
        this.logImages = fileList;
        this.log = fileList.map(({ path, ...id }) => id);
        this.isUploading = false;
      }).catch(err => console.log(err));
    },
    logDataChange(data) {
      console.log(data);
    },
    save() {
      if (this.$refs.form.validate()) {
        var params = {
          user_id: this.$auth.user.id,
          equipment_id: this.item.id,
          date: this.$moment(this.date).format('YYYY-MM-DD'),
          shift: this.shift,
          time: this.time,
          job_desc: this.jobDesc,
          follow_up: this.followUp,
          desc : this.desc,
          images : this.log.map(el=> el.imageId)
        }
        
        this.$store.dispatch('logs/create', params)
          .then((resp) => {
            this.$dialog.message.success('Data Log berhasil dimasukkan', { position: 'bottom'})
            this.$router.push('/?tab=history')
          })
          .catch((resp) => {
            console.log(resp);
          })
      }
    }
  }
}
</script>

