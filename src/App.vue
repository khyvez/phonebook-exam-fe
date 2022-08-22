<template>
  <v-app>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="white"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Company Phonebook</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto"
        max-height="600"
      >
        <v-main>
          <v-container style="height: 1500px; margin-top: 100px">
            <v-container fluid>
              <router-view />
            </v-container>
          </v-container>
        </v-main>
      </v-sheet>
    </v-card>

    <v-footer app> </v-footer>

    <toast-notif
      v-for="(notif, index) in notifs"
      :key="index"
      :text="notif.text"
    ></toast-notif>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",

  components: {
    ToastNotif: () => import("@/components/common/toast-notification.vue"),
  },
  computed: {
    ...mapGetters({
      notifs: "getNotification",
    }),
  },

  data: () => ({
    //
  }),
};
</script>
