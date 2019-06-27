import Vue from "vue";
import Toolbar from '~/components/toolbar';
import VueQRCodeComponent from 'vue-qrcode-component'

Vue.component('qr-code', VueQRCodeComponent)
Vue.component("toolbar", Toolbar);