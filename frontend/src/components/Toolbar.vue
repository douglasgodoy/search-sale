<template>
  <v-card color="grey lighten-4" flat height="auto" tile>
    <v-toolbar dense dark elevation="10">
      <v-toolbar-title color="#FFFFFF">O que procura?</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-col col="2">
        <v-row align="center" justify="end">
          <v-icon dark right color="blue darken-3">mdi-facebook</v-icon>
        </v-row>
      </v-col> -->
      <v-text-field
        append-icon="mdi-magnify"
        hide-details="true"
        placeholder="ex: ps4"
        @keypress.enter="searchAd"
        :loading="search.loading"
        :disabled="search.loading"
        v-model="search.value"
        color="white"
      ></v-text-field>
    </v-toolbar>
    <v-snackbar
      v-model="snackbar.snackbar"
      :bottom="snackbar.y === 'bottom'"
      :color="snackbar.color"
      :left="snackbar.x === 'left'"
      :multi-line="snackbar.mode === 'multi-line'"
      :right="snackbar.x === 'right'"
      :timeout="snackbar.timeout"
      :top="snackbar.y === 'top'"
      :vertical="snackbar.mode === 'vertical'"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <!-- <Modal :dialog="true" /> -->
  </v-card>
</template>

<script>
import axios from "axios";
import bus from "../bus.js";
// import Modal from "./Modal";

export default {
  components: {
    // Modal,
  },
  data: () => ({
    dialog: true,
    search: {
      value: "",
      loading: false,
      page: 1,
    },
    snackbar: {
      color: "success",
      mode: "",
      snackbar: false,
      text: `Aqui estão os resultados da busca`,
      timeout: 3000,
      x: "left",
      y: "top",
    },
  }),
  created() {
    bus.$on("page", (page) => this.searchAd(null, page));
  },
  methods: {
    searchAd: async function (ev, page = 1) {
      this.search.page = page;
      if (this.search.page === 1) bus.$emit("pageDefault", this.search.page);
      const dataView = { search: this.search.value, page: this.search.page };
      const dirAPI = "http://localhost:3000";
      this.search.loading = true;
      bus.$emit("loading", true);

      try {
        const { data } = await axios.post(dirAPI, dataView);
        this.snackbar.snackbar = true;
        bus.$emit("loading", false);
        bus.$emit("changeSearch", data);
        this.search.loading = false;
      } catch (error) {
        bus.$emit("loading", false);
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>