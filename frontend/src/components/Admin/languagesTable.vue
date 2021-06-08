<template>
  <div>
    <v-skeleton-loader v-if="firstLoad" :loading="loadingState" type="table"></v-skeleton-loader>
    <v-data-table
      v-show="!firstLoad"
      :headers="headers"
      :items="languages"
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
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Language
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Language name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
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
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
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
    formName: "Languages",
    dialogDelete: false,
    loadingState: true,
    snackbar: false,
    headers: [
      { text: "Language Name", sortable: false, value: "name" },
      { text: "Actions", value: "actions", sortable: false, width: "10%" },
    ],
    languages: [],
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

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Language" : "Edit Language";
    },
  },

  created() {
    this.initialize();
  },
  watch: {
    options:{
      handler(){
        this.getDataFromApi();
      },deep:true
    },
    dialog(val){
      val || this.close();
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
      console.log(item);
      this.editedIndex = this.languages.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.languages.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        this.loadingState = true;
        await this.$store.dispatch("adminDeleteLanguage", {
          userToken: localStorage.getItem("userToken"),
          ...this.editedItem,
        });
        this.languages.splice(this.editedIndex, 1);
        this.totalCount--;
        this.loadingState = false;
        this.closeDelete();
      } catch (error) {
        this.loadingState = false;
        this.closeDelete();
        this.snackbar = true;
        this.snackbarText = "failed to delete language, try again later";
      }
    },

    close() {
      this.dialog = false;
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
    async save() {
      if (this.editedIndex > -1) {
        try {
          this.loadingState = true;
          await this.$store.dispatch("adminUpdateLanguage", {
            userToken: localStorage.getItem("userToken"),
            ...this.editedItem,
          });
          Object.assign(this.languages[this.editedIndex], this.editedItem);
          this.loadingState = false;
          this.close();
        } catch (error) {
          this.loadingState = false;
          this.close();
          this.snackbar = true;
          this.snackbarText = "failed to edit language, try again later";
        }
      } else {
        try {
          this.loadingState = true;
          await this.$store.dispatch("adminAddLanguage", {
            userToken: localStorage.getItem("userToken"),
            ...this.editedItem,
          });
          this.languages.push(this.editedItem);
          this.totalCount++;
          this.loadingState = false;
          this.close();
        } catch (error) {
          this.loadingState = false;
          this.close();
          this.snackbar = true;
          this.snackbarText = "failed to add language, try again later";
        }
      }
    },
    async getDataFromApi() {
      this.loadingState = true;
      this.errorMessage = "";
      try {
        this.response = await this.$store.dispatch("adminGetAllLanguages", {
          userToken: localStorage.getItem("userToken"),
          limit: this.options.itemsPerPage,
          offset: (this.options.page - 1) * this.options.itemsPerPage,
        });
        this.items = this.response.items;
        this.loadingState = false;
        this.languages = this.items;
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