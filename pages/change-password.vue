<template>
  <v-layout>
    <toolbar :back="'/?tab=account'" :title="'Ganti Password'" />
    <v-container>
      <v-form
        ref="form"
        method="post" 
        v-model="valid"
        lazy-validation
        @submit.prevent="save"
      >
        <v-text-field
          v-model="old_password"
          label="Password Lama"
          type="password"
          box
          :rules="[() => !!old_password || 'This field is required']"
        ></v-text-field>
        <v-text-field
          v-model="new_password"
          type="password"
          label="Masukkan password baru"
          box
          :rules="[() => !!new_password || 'This field is required']"
        ></v-text-field>
        <v-text-field
          v-model="verify_password"
          type="password"
          label="Masukkan password lagi"
          box
          :rules="[() => new_password == verify_password || 'Password tidak sama']"
        ></v-text-field>
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
export default {
  data() {
    return {
      valid:false,
      old_password: '',
      new_password: '',
      verify_password: '',
    }
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        var params = {
          old_password: this.old_password,
          new_password: this.new_password,
          verify_new_password: this.verify_password,
        }
        this.$axios.put(`/users/change_password/${this.$auth.user.id}`,params)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.err == '404') {
            console.log('sd');
              this.$dialog.error({
                text: 'Password lama salah',
                title: 'Gagal diganti',
              })
            } else {
              this.$dialog.message.success(res.data.message, { position: 'bottom'})
            }
          } 
        });
        this.$refs.form.reset()
        
      }
    }
  }
}
</script>
