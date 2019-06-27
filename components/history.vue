<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-list three-line subheader>
        <v-subheader>Log</v-subheader>
        <template v-for="(item, index) in list">
          <v-list-tile
            :key="item.title"
            avatar
            ripple
            :to="'/logs/'+item.id"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ item.equipment.name }}</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{ item.user.name }} - <span class="grey--text text--darken-1">{{item.date + ' ' + item.time}}</span></v-list-tile-sub-title>
              <v-list-tile-sub-title  >{{item.jobDesc}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-list-tile-action-text>{{$moment(item.createdAt).fromNow()}}</v-list-tile-action-text>
            </v-list-tile-action>

          </v-list-tile>
          <v-divider
            v-if="index + 1 < list.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list>
    </v-flex>
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
</template>
<script>
import {mapState} from 'vuex';

export default {
  async fetch({store}) {
    await store.dispatch('logs/get')
  },
  data() {
    return {
      bottom: false,
    }
  },
  computed: {
    ...mapState({
      list: state => {
        return state.logs.list
      },
    }),
    pagination: {
      get: function () {
        return this.$store.getters['logs/pagination'];
      },
      set: function (value) {
        this.$store.commit('logs/setPagination', value)
      }
    },
  },
  watch: {
    bottom(bottom) {
      if (bottom && this.pagination.page <= Math.ceil(this.pagination.totalItems/this.pagination.rowsPerPage)) {
        console.log(this.pagination.page);
        this.$store.dispatch('logs/append');
      }
    }
  },
  created() {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
    

    //Kemanusiaan
    this.onBack();
    this.$store.dispatch('logs/get');
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
      this.$store.commit('logs/resetParamsAndPagination');
    },
    onFilter(params) {
      console.log(params);
    },
    onSearch(params) {
      console.log(params);
      this.$store.commit('logs/setParams', {name: params.name});
      this.$store.dispatch('logs/get');
    },
    onReset(params) {
      console.log(params);
      this.$store.commit('logs/resetParamsAndPagination');
    }

  },
}
</script>
