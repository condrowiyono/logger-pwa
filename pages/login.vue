<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg4>
          <v-form method="post" @submit.prevent="login">
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4">Logger PWA</h1>
                </div>
                <v-text-field 
                    append-icon="person" 
                    name="login" 
                    label="Login" 
                    type="text"
                    v-model="email"></v-text-field>
                <v-text-field 
                    append-icon="lock" 
                    name="password" 
                    label="Password" 
                    id="password" 
                    type="password"
                    v-model="password"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn type="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>


export default {
  layout: 'plain',
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })

        this.$router.push('/')
      } catch (e) {
        //this.error = e.response.data.message
        console.log(e);
      }
    }
  }
}
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
