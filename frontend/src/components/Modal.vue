<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="300px">
      <v-card>
        <v-card-title class="">Selecione as plataformas de busca</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 200px;">
          <v-container fluid>
            <v-checkbox v-model="checkbox.O" input-value="true" :label="`OLX`"></v-checkbox>
            <v-checkbox v-model="checkbox.F" :label="`Facebook`"></v-checkbox>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
  },
  data: () => ({
    items: [
      {
        id: 1,
        name: "OLX",
      },
      {
        id: 2,
        name: "Facebook",
      },
    ],
    checkbox: {
      O: true,
      F: false,
    },
  }),
};
</script>