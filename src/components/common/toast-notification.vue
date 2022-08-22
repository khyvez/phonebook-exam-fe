<template>
  <v-snackbar v-model="showNotif" :multi-line="true">
    {{ text }}

    <!-- <template v-slot:action="{ attrs }">
     <v-btn color="red" text v-bind="attrs" @click="showNotif = false">
        x
      </v-btn> 
    </template> -->
  </v-snackbar>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      textContent: "",
    };
  },
  computed: {
    showNotif: {
      get() {
        if (this.text !== "" || this.text !== null) {
          return true;
        } else {
          return false;
        }
      },
      // set(val) {
      //   this.showNotif = val;
      // },
    },
  },
};
</script>
