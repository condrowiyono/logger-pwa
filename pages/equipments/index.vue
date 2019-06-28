<template>
  <v-layout>
    <toolbar 
      :back="(redirect) ? redirect :'/?tab=account'" 
      :title="'Peralatan'"
      @on-back-click="onBack"
      @on-filter-click="onFilter"
      @on-search-click="onSearch"
      @on-reset="onReset"
      search/>
    <v-container
        fluid
        grid-list-lg
      >
      <v-layout row wrap>
        <template v-for="(item, index) in list">
          <v-flex xs12 md12 lg12 :key="index">
            <v-card :to="'/equipments/'+item.id" ripple>
              <v-card-title primary-title>{{ item.name }} </v-card-title>
              <v-card-text>{{ item.desc }} </v-card-text>
            </v-card>
          </v-flex>
        </template>
        <v-flex xs12>
          <p v-if="list<=0" class="text-xs-center">Tidak ada hasil ditemukan</p>
          <p v-if="pagination.page >= Math.ceil(pagination.totalItems/pagination.rowsPerPage)" class="text-xs-center">Semua sudah ditampilkan</p>
          <p v-else class="text-xs-center">
            <v-progress-circular
              :width="3"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>
<script>
import {mapState} from 'vuex';
export default {
  async fetch({store}) {
    await store.dispatch('equipments/get')
  },
  data() {
    return {
      bottom: false,
      redirect: this.$route.query.redirect,
    }
  },
  computed: {
    ...mapState({
      list: state => {
        return state.equipments.list
      },
    }),
    pagination: {
      get: function () {
        return this.$store.getters['equipments/pagination'];
      },
      set: function (value) {
        this.$store.commit('equipments/setPagination', value)
      }
    },
  },
  watch: {
    bottom(bottom) {
      if (bottom && this.pagination.page <= Math.ceil(this.pagination.totalItems/this.pagination.rowsPerPage)) {
        console.log(this.pagination.page);
        this.$store.dispatch('equipments/append');
      }
    }
  },
  created() {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
    

    //Kemanusiaan
    this.onBack();
    this.$store.dispatch('equipments/get');
  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    onBack(params) {
      //reset query
      console.log(params)
      this.$store.commit('equipments/resetParamsAndPagination');
    },
    onFilter(params) {
      console.log(params);
    },
    onSearch(params) {
      console.log(params);
      this.$store.commit('equipments/setParams', {name: params.name});
      this.$store.dispatch('equipments/get');
    },
    onReset(params) {
      console.log(params);
      this.$store.commit('equipments/resetParamsAndPagination');
    }

  },
}
</script>
