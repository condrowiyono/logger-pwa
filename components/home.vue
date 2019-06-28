<template>
    <v-container grid-list-md>
        <div class="theme--light mb-4">
            <span class="title">Selamat Datang, </span>
            <span class="body-1">{{$auth.user.name}}</span>
        </div>

        <v-layout row wrap text-xs-center class="mb-4">
            <v-flex xs3>
                <v-card @click="onScanClick" ripple class="elevation-0" style="border-radius:5px;padding:">
                    <v-card-text class="px-0">
                        <v-icon>camera_alt</v-icon>
                    </v-card-text>
                </v-card>
                <div class="my-2">
                    Scan
                </div>
            </v-flex>
            <v-flex xs3>
                <v-card @click="onHistoryClick" ripple class="elevation-0" style="border-radius:5px;padding:">
                    <v-card-text class="px-0">
                        <v-icon>history</v-icon>
                    </v-card-text>
                </v-card>
                <div class="my-2">
                    Riwayat
                </div>
            </v-flex>
        </v-layout>
        <div>
            <div class="title mb-3">Langkah Awal</div>
            <ol class="mb-3">
                <li>Tambahkan aplikasi ke layar utama. Tekan tanda <v-icon>more_vert</v-icon>, kemudian pilih <span class="body-2">Add to homescreen</span>, dan klik OK</li>
                <li>Buka aplikasi dari Home Screen</li>
            </ol>
            <div class="title mb-3">Langkah Scan</div>
            <ol class="mb-3">
                <li>Pilih menu scan melalui menu diatas atau tab di bawah <v-icon>camera_alt</v-icon>. Arahkan pada qr code yang tertera</li>
                <li>Akan muncul konfirmasi barang yang akan dicatat log-nya. Klik lanjut untuk melanjutkan mengisi</li>
                <li>Catat semua detail informasi sekaligus tambahkan beberapa foto. Kemudian klik simpan</li>
            </ol>
            <div class="title mb-3">Melihat riwayat</div>
            <ol class="mb-3">
                <li>Riwayat berisi data log yang telah Anda lakukan</li>
            </ol>
        </div>
    </v-container>
</template>

<script>
export default {
    methods: {
        onScanClick() {
            this.$emit('scan-click')
        },
        onHistoryClick() {
            this.$emit('history-click')
        }
    }
}
</script>
