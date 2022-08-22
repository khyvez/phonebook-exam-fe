<template>
  <div>
    <v-row>
      <v-col>
        <div class="d-flex">
          <v-avatar color="indigo">
            <v-icon dark> mdi-account-circle </v-icon>
          </v-avatar>
          <div class="profile-section align-self-center">
            <div class="user-name">Rod Kevin Potazo</div>
            <div class="user-title">ADMIN</div>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h1>Welcome back!</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <company-card></company-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h3>Company details</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" sm="6" md="6">
        <v-card color="#ff7600"
          ><v-card-title>
            <div class="card-title">Departments</div>
          </v-card-title>
          <v-card-text class="text-center">
            <h3 class="details-count">{{ company.departments.length }}</h3>
            <v-btn class="btn-view" :to="`/department`">View All</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" sm="6" md="6">
        <v-card color="#429bff">
          <v-card-title class="card-title">Employee's</v-card-title
          ><v-card-text class="text-center">
            <h3 class="details-count">0</h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <hr class="mt-5" />
    <v-row class="mt-5">
      <v-col class="text-right">
        <v-btn
          class="primary"
          @click="
            dialog = true;
            isNew = true;
          "
        >
          <v-icon>mdi-plus</v-icon>
          New Company
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="items.data"
          :items-per-page="5"
          class="elevation-1"
        >
          <template #[`item.status`]="{ item }">
            <v-chip :color="getColor(item.status)" dark>
              {{ item.status ? "Active" : "Deactivated" }}
            </v-chip>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-btn color="primary" v-if="company.id === item.id">
              Selected</v-btn
            >
            <v-btn color="gray" v-else @click="select(item)"> Select</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- New company -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card color="#fff">
        <v-card-title>
          <span class="text-h5">{{
            isNew ? "New Company" : "Edit Company"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="name"
                  label="Company name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col class="text-right">
              <v-btn
                outlined
                color="primary"
                class="mr-2"
                @click="dialog = false"
                >Cancel</v-btn
              >
              <v-btn color="primary" @click="save()">Save</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  components: {
    CompanyCard: () => import("@/components/company-card.vue"),
  },
  data() {
    return {
      headers: [
        {
          text: "Company name",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "Status",
          value: "status",
        },
        {
          text: "Created",
          align: "start",
          sortable: true,
          value: "created_at",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      dialog: false,
      isNew: true,
    };
  },
  computed: {
    ...mapGetters("company", {
      items: "getCompanies",
      company: "getCompany",
    }),
    ...mapFields("company", ["form.name"]),
  },
  mounted() {
    this.fetchAll();
  },
  methods: {
    ...mapActions("company", {
      fetch: "fetchAll",
      store: "store",
    }),
    ...mapMutations("company", {
      selectCompany: "setCompany",
    }),
    async save() {
      await this.store();
      this.dialog = false;
      this.fetchAll();
    },
    fetchAll() {
      this.fetch();
    },
    select(item) {
      this.selectCompany(item);
    },
    getColor(status) {
      if (status == 1) {
        return "green";
      } else {
        return "gray";
      }
    },
  },
};
</script>
<style lang="scss">
.d-flex {
  gap: 1.5rem;
}
.user-name {
  font-size: 15px;
  font-weight: 600;
}
.user-title {
  font-size: 12px;
  font-weight: 400;
}
.details-count {
  color: #fff;
  font-size: 50px;
  font-weight: 600;
}
.btn-view {
  margin-top: 20px !important;
  color: rgb(235, 235, 235);
  text-decoration: underline;
  font-weight: 600;
  font-size: 11px !important;
  border-radius: 20px;
}

.card-title {
  color: #fff;
}
</style>
