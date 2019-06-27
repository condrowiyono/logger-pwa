<template>
    <v-toolbar
      fixed
      app
      color="primary"
    >
      <v-btn
        :active-class="''"
        v-if="back"
        :to="back"
        icon
        @click="onBackClick"
        class="white--text"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title v-if="!searchOpen"  class="white--text" style="text-transform:capitalize;" v-text="title" />
      <v-spacer v-if="(search && !searchOpen) || edit" />
      <div v-if="search">
        <v-btn icon class="white--text" @click="searchOpen = true">
          <v-icon>search</v-icon>
        </v-btn>
      </div>
      <div v-if="edit">
        <v-btn icon class="white--text" @click="onEditClick">
          <v-icon>edit</v-icon>
        </v-btn>
      </div>
      <v-text-field
        dark
        v-model="name"
        v-if="searchOpen"
        autofocus
        color="#fff"
        class="white--text"
        single-line
      ></v-text-field>
      <v-btn 
        v-if="searchOpen" 
        icon 
        class="white--text" 
        @click="onReset">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar>
</template>

<script>
export default {
    props: {
      title: {
        type: String,
        required: true
      },
      back: {
        type: String,
      },
      search: {
        type: Boolean,
        default: false,
      },
      edit: {
        type: Boolean,
        default: false,
      }
      
    },
    data() {
      return {
        searchOpen: false,
        name: '',
      };
    },
    watch: {
      name() {
        this.onSearchClick();
      }
    },
    methods: {
      onBackClick() {
        var params = {};
        this.$emit('on-back-click', params);
      },
      onEditClick() {
        var params = {};
        this.$emit('on-edit-click', params);
      },
      onFilterClick() {
        var params = {};
        this.$emit('on-filter-click', params);
      },
      onSearchClick() {
        var params = {
          name: this.name,
        };
        this.$emit('on-search-click', params);
      },
      onReset() {
        //
        this.searchOpen = false;
        this.name='';
        var params = {
          name: this.name,
        };
        this.$emit('on-reset', params);
      }
      
    }
}
</script>
