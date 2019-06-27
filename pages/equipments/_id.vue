<template>
  <v-layout>
    <toolbar 
      :back="'/equipments'" 
      :title="'Peralatan'"
    />
    <v-container
        fluid
        grid-list-lg
      >
      <div style="padding:16px" class="text-xs-center">
        <div style="font-family: 'Oxygen Mono', monospace; font-size:14px">{{item.qrcode}}</div>
        <div style="width:100px;height:100px;margin:auto">
          <qr-code :size="100" v-if="item.qrcode" :text="item.qrcode"></qr-code>
        </div>
        <br/>
        <div class="title">{{item.name}}</div>
      </div>
      <v-list two-line >
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title>Fasilitas</v-list-tile-sub-title>
            <v-list-tile-title>{{item.facility.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title>Sub Fasilitas</v-list-tile-sub-title>
            <v-list-tile-title>{{item.subfacility.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title>Nama</v-list-tile-sub-title>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title>Lokasi</v-list-tile-sub-title>
            <v-list-tile-title>{{item.location}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title>Tipe / Nomor Seri</v-list-tile-sub-title>
            <v-list-tile-title>{{item.attributes}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title>Merek</v-list-tile-sub-title>
            <v-list-tile-title>{{item.brand}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title>Tahun Instalasi</v-list-tile-sub-title>
            <v-list-tile-title>{{item.yearInstalled}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title>Jumlah</v-list-tile-sub-title>
            <v-list-tile-title>{{item.quantity}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title>Deskripsi</v-list-tile-sub-title>
            <v-list-tile-title>{{item.desc}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-container>
  </v-layout>
</template>
<script>

import {mapState} from 'vuex';

export default {
  async fetch({store, params}) {
    await store.dispatch('equipments/show', {equipment_id: params.id});
  },
  computed: {
    ...mapState({
      item: state => {
        return state.equipments.item
      },
    }),
  },
}
</script>
