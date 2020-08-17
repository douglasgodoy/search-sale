<template>
  <v-card color="grey lighten-4" flat height="auto" tile>
    <v-toolbar dense dark elevation="10">
      <v-toolbar-title color="#FFFFFF">O que procura?</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="mdi-magnify"
        hide-details="true"
        placeholder="ex: Geladeira ultra power freeee!!!"
        @keypress.enter="searchAd"
        :loading="search.loading"
        :disabled="search.loading"
        v-model="search.value"
        color="white"
      ></v-text-field>
    </v-toolbar>
  </v-card>
</template>

<script>
import axios from "axios";
import bus from "../bus.js";
export default {
  data: () => ({
    search: {
      value: "",
      loading: false,
    },
  }),
  methods: {
    searchAd: async function () {
      const dirAPI = "http://localhost:3000";
      this.search.loading = true;
      bus.$emit("loading", true);
      try {
        const { data } = await axios.post(dirAPI, {
          search: this.search.value,
        });
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