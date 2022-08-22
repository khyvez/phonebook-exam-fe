<template>
  <div>
    <v-row class="mb-3">
      <v-col>
        <v-btn :to="`/department`">
          <v-icon> mdi-arrow-left-thick</v-icon>
        </v-btn>
      </v-col>
      <v-col class="text-right">
        <v-btn dark class="green mr-2" @click="setSms" v-if="selected.length">
          <v-icon>mdi-send </v-icon>
          Send SMS
        </v-btn>
        <v-btn
          class="primary"
          @click="
            dialog = true;
            isNew = true;
            form = {};
          "
        >
          <v-icon>mdi-plus</v-icon>
          New Employee
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items.data"
      :items-per-page="5"
      class="elevation-1"
      show-select
      item-key="mobile"
    >
      <template #[`item.name`]="{ item }">
        {{ `${item.first_name} ${item.last_name}` }}
      </template>
      <template #[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark>
          {{ item.status ? "Active" : "Deactivated" }}
        </v-chip>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <!-- New/Edit -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card color="#fff">
        <v-card-title>
          <span class="text-h5">{{
            isNew ? "New Employee" : "Edit Employee"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  v-model="form.first_name"
                  label="First Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  v-model="form.last_name"
                  label="Last Name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  v-model="form.mobile"
                  label="Mobile"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="form.position"
                  label="Position"
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

    <!-- DElete -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  props: ["id"],
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "mobile",
          value: "mobile",
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
      isNew: true,
      dialogDelete: false,
      dialog: false,
      selectedItem: {},
      selected: [],
    };
  },
  computed: {
    ...mapGetters("employee", {
      items: "getEmployees",
    }),
    ...mapFields("employee", {
      form: "form",
    }),
  },
  mounted() {
    this.fetchAll();
  },
  methods: {
    ...mapActions("employee", {
      fetch: "fetchAll",
      store: "store",
      update: "update",
      delete: "delete",
    }),
    ...mapActions("sendSms", {
      sendSms: "sendSms",
    }),
    fetchAll() {
      this.fetch();
    },
    async save() {
      if (this.isNew) {
        this.form.department_id = this.$route.params.id;
        await this.store();
      } else {
        await this.update(this.selectedItem.id);
      }

      this.fetchAll();
      this.dialog = false;
    },
    getColor(status) {
      if (status == 1) {
        return "green";
      } else {
        return "gray";
      }
    },
    editItem(item) {
      Object.assign(this.form, item);

      this.isNew = false;
      this.dialog = true;
      // this.name = item.name;
      this.selectedItem = item;
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.selectedItem = item;
    },
    async deleteItemConfirm() {
      await this.delete(this.selectedItem.id);
      this.dialogDelete = false;
      this.fetchAll();
    },
    async setSms() {
      await this.sendSms(this.selected);
    },
  },
};
</script>
