<template>
  <v-card color="#fff">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title
          class="text-h5 company-name"
          v-text="company.name"
        ></v-card-title>

        <v-card-subtitle v-text="company.description"></v-card-subtitle>
      </div>

      <v-avatar class="ma-3" size="125" tile>
        <v-img src="../assets/images/company.png"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters("company", {
      company: "getCompany",
    }),
  },

  methods: {},
};
</script>
<style lang="scss">
.company-name {
  color: #3f51b5;
  font-weight: 800;
}
</style>
