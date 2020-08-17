<template>
  <v-app>
    <!-- <v-navigation-drawer app></v-navigation-drawer> -->
    <Toolbar />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
export default {
  name: "App",

  components: {
    Toolbar
  },

  data: () => ({
    //
  }),
  // created() {
  //   this.$vuetify.theme.dark = true;
  // },
};
</script>
