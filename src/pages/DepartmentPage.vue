<template>
  <div>
    <v-row class="mb-3">
      <v-col>
        <v-btn :to="`/dashboard`">
          <v-icon> mdi-arrow-left-thick</v-icon>
        </v-btn>
      </v-col>
      <v-col class="text-right">
        <v-btn
          class="primary"
          @click="
            dialog = true;
            isNew = true;
          "
        >
          <v-icon>mdi-plus</v-icon>
          New Department
        </v-btn>
      </v-col>
    </v-row>
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
        <div class="d-flex">
          <v-btn tile color="primary" @click="openEmployeePage(item)">
            <v-icon small class="mr-2"> mdi-account-group </v-icon>View
            employees
          </v-btn>

          <v-btn tile color="success" @click="editItem(item)">
            <v-icon small class="mr-2"> mdi-pencil </v-icon>
            Edit
          </v-btn>
          <v-btn tile color="danger" @click="deleteItem(item)">
            <v-icon small> mdi-delete </v-icon> Delete
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <!-- New -->
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card color="#fff">
        <v-card-title>
          <span class="text-h5">{{
            isNew ? "New Department" : "Edit Department"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="name"
                  label="Name"
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
    <!-- delete -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
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
  data() {
    return {
      headers: [
        {
          text: "Department Name",
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
      dialogDelete: false,
      selectedItem: {},
      isNew: true,
    };
  },
  computed: {
    ...mapGetters("department", {
      items: "getDepartments",
    }),
    ...mapFields("department", ["form.name"]),
  },
  mounted() {
    this.fetchAll();
  },
  methods: {
    ...mapActions("department", {
      fetch: "fetchAll",
      store: "store",
      update: "update",
      delete: "delete",
    }),
    fetchAll() {
      this.fetch();
    },
    async save() {
      if (this.isNew) {
        await this.store();
      } else {
        await this.update(this.selectedItem.id);
      }
      this.dialog = false;
      this.fetchAll();
    },
    getColor(status) {
      if (status == 1) {
        return "green";
      } else {
        return "gray";
      }
    },
    editItem(item) {
      this.isNew = false;
      this.dialog = true;
      this.name = item.name;
      this.selectedItem = item;
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.selectedItem = item;
    },
    deleteItemConfirm() {
      this.delete(this.selectedItem.id);
      this.dialogDelete = false;
      this.fetchAll();
    },
    openEmployeePage(item) {
      this.$router.push({ name: "Employee", params: { id: item.id } });
    },
  },
};
</script>
