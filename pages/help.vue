<template>
  <v-layout>
    <toolbar :back="'/?tab=account'" :title="'Petunjuk Penggunaan'" />
    <v-container>
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
    </v-container>
  </v-layout>
</template>
