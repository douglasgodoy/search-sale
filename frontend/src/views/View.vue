<template>
  <div v-if="!loading">
    <v-row>
      <v-col
        v-for="card in cards"
        :key="card.link"
        class="d-flex child-flex"
        cols="12"
        sm="6"
        md="4"
        lg="2"
        xl="2"
      >
        <v-card
          class="mx-auto"
          max-width="200"
          max-height="330"
          :href="card.link"
          target="_blank"
        >
          <v-img height="200px" :src="card.img"></v-img>
          <v-card-title class="text-subtitle-2">{{ card.title }}</v-card-title>
          <v-card-subtitle>{{ card.value }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center" v-if="this.countPages > 1">
      <v-pagination
        :length="this.countPages"
        v-model="page"
        @input="searchForPagination"
        circle
      ></v-pagination>
    </div>
  </div>
  <v-row align="center" justify="center" v-else>
    <v-col class="text-center" cols="12">
      <div class="my-2">
        <v-btn text x-large color="#000" :loading="loading">Pesquisar</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import bus from "../bus";

export default {
  data() {
    return {
      cards: [],
      loading: false,
      page: 1,
      countPages: 1,
    };
  },
  methods: {
    searchForPagination() {
      bus.$emit("page", this.page);
    },
  },
  created() {
    bus.$on("changeSearch", (data) => {
      this.cards = data;
      const lengthPages = data[0]["pages"] || 1;
      this.countPages = lengthPages;
    });
    bus.$on("loading", (boolean) => {
      this.loading = boolean;
    });
    bus.$on("pageDefault", () => (this.page = 1));
  },
};
</script>

<style>
.v-card-title {
  font-size: 10px;
}
</style>