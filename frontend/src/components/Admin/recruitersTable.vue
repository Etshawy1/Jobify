<template>
  <div>
    <v-skeleton-loader
      v-if="firstLoad"
      :loading="loadingState"
      type="table"
    ></v-skeleton-loader>
    <v-data-table
      v-show="!firstLoad"
      :headers="headers"
      :items="recruiters"
      :options.sync="options"
      :server-items-length="totalCount"
      :loading="loadingState"
      :footer-props="{ 'items-per-page-options': [2, 10, 15] }"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ formName }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="550px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to reject this recruiter?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogUpdate" max-width="550px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to accept this recruiter?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeUpdate"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="updateItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-container>
          <v-row>
            <v-flex md6>
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-check-bold
              </v-icon>
            </v-flex>
            <v-flex md6>
              <v-icon small @click="deleteItem(item)">
                mdi-block-helper
              </v-icon>
            </v-flex>
          </v-row>
        </v-container>
      </template>
      <v-spacer></v-spacer>
      <template v-slot:no-data>
        <v-btn @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>

    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <v-btn color="pink" text @click="snackbar = false"> Close </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data: () => ({
    formName: "Recruiters Applications",
    dialogDelete: false,
    dialogUpdate: false,
    loadingState: true,
    snackbar: false,
    headers: [
      { text: "Recruiter linkedIn", sortable: false, value: "linkedIn" },
      { text: "Recruiter Email", sortable: false, value: "email" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    recruiters: [],
    totalCount: 10,
    firstLoad: true,
    editedIndex: -1,
    dialog: false,
    snackbarText: "",
    editedItem: {
      name: "",
    },
    defaultItem: {
      name: "",
    },
    options: {},
  }),
  created() {
    this.initialize();
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    dialogUpdate(val) {
      val || this.closeUpdate();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    initialize() {
      this.getDataFromApi();
    },
    editItem(item) {
      this.editedIndex = this.recruiters.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogUpdate = true;
    },
    deleteItem(item) {
      this.editedIndex = this.recruiters.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      try {
        this.loadingState = true;
        await this.$store.dispatch("adminDeleteRecruiter", {
          userToken: localStorage.getItem("userToken"),
          ...this.editedItem,
        });
        this.recruiters.splice(this.editedIndex, 1);
        this.totalCount--;
        this.loadingState = false;
        this.snackbarText = "Recruiter was rejected.";
        this.closeDelete();
      } catch (error) {
        this.loadingState = false;
        this.closeDelete();
        this.snackbar = true;
        this.snackbarText = "failed to reject recruiter, try again later";
      }
    },
    async updateItemConfirm() {
      try {
        this.loadingState = true;
        await this.$store.dispatch("adminUpdateRecruiter", {
          userToken: localStorage.getItem("userToken"),
          ...this.editedItem,
        });
        this.recruiters.splice(this.editedIndex, 1);
        this.totalCount--;
        this.loadingState = false;
        this.snackbarText = "Recruiter was accepted successfully.";
        this.closeUpdate();
      } catch (error) {
        this.loadingState = false;
        this.closeUpdate();
        this.snackbar = true;
        this.snackbarText = "failed to accept recruiter, try again later";
      }
    },
    closeUpdate() {
      this.dialogUpdate = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    pagination() {
      this.getDataFromApi();
    },
    async getDataFromApi() {
      this.loadingState = true;
      this.errorMessage = "";
      try {
        this.response = await this.$store.dispatch("adminGetAllRecruiters", {
          userToken: localStorage.getItem("userToken"),
          limit: this.options.itemsPerPage,
          offset: (this.options.page - 1) * this.options.itemsPerPage,
        });
        this.items = this.response.items;
        this.loadingState = false;
        this.recruiters = this.items;
        this.totalCount = this.response.total;
        this.firstLoad = false;
      } catch (error) {
        console.log("an error occured");
        this.loadingState = false;
        if (error.status === "fail") {
          this.errorMessage = error.msg;
        } else {
          this.errorMessage = "Please try again later !";
        }
        console.log(error);
      }
    },
  },
};
</script>