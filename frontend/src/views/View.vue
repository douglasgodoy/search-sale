<template>
     
  <v-row v-if="!loading">
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
      <v-card class="mx-auto" max-width="200" max-height="330" :href="card.link" target="_blank">
        <v-img
          height="200px"
          :src="card.img ? card.img : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbitsofco.de%2Fhandling-broken-images-with-service-worker%2F&psig=AOvVaw3tLMuClXv1OVsqdZzTE4Gl&ust=1597714705377000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCICKyaCNoesCFQAAAAAdAAAAABAD'"
        ></v-img>
        <v-card-title class="text-subtitle-2">{{card.title}}</v-card-title>
        <v-card-subtitle>{{card.value}}</v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
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
     
    };
  },
  created() {
    bus.$on("changeSearch", (data) => {
      this.cards = data;
    });
    bus.$on("loading", (boolean) => {
      this.loading = boolean;
    });
  },
};
</script>

<style>
.v-card-title {
  font-size: 10px;
}
</style>