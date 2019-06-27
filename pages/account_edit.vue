<template>
  <v-layout>
    <toolbar :back="'/?tab=account'" :title="'Edit Akun'" />
    <v-container>
      <v-form
        ref="form"
        method="post" 
        v-model="valid"
        lazy-validation
        @submit.prevent="save"
      >
        <v-text-field
              v-model="name"
              label="Name"
              :rules="[() => !!name || 'This field is required']"
            ></v-text-field>
            
            <v-text-field
              v-model="username"
              label="Username"
              :rules="[() => !!username || 'This field is required']"
            ></v-text-field>
            <v-text-field
              v-model="phoneNumber"
              label="Nomor Telepon"
              :rules="[() => !!phoneNumber || 'This field is required']"
            ></v-text-field>

            <v-text-field
              type="email"
              v-model="email"
              label="E-mail"
              :rules="[() => !!email || 'This field is required']"
            ></v-text-field>

            <v-select
              v-model="role"
              :items="roles"
              label="Role"
              required
            ></v-select>

            <v-text-field
              v-model="position"
              label="Posisi"
              required
            ></v-text-field>

            <v-text-field
              v-model="address"
              label="Alamat"
              required
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
//Belum implementasi
export default {
  data() {
      return {
        valid: false,
        id: this.$auth.user.id,
        name: this.$auth.user.name,
        username: this.$auth.user.username,
        email: this.$auth.user.email,
        phoneNumber: this.$auth.user.phoneNumber,
        role: this.$auth.user.role,
        position: this.$auth.user.position,
        address: this.$auth.user.address,
        roles: [
          'member',
          'admin',
        ],
      }
    },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        var params = {
          id : this.id,
          name : this.name,
          username : this.username,
          email : this.email,
          phone_number : this.phoneNumber,
          role : this.role,
          position : this.position,
          address : this.address,
        }
        this.$store.dispatch('users/update', params)
          .then((resp) => {
            this.$router.push('/account')
          })
          .catch((resp) => {
            console.log(resp);
          })
        this.$refs.form.reset()
      }
    }
  }
}
</script>
