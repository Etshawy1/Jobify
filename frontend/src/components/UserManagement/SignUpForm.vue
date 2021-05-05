<template>
  <v-sheet color="white" rounded="lg">
    <v-form v-model="form.valid" @submit.prevent="onSubmit">
      <v-container>
        <div class="signupTitle">Sign Up and Start Applying For Jobs</div>
        <v-row justify="center" justify-md="center">
          <!-- <v-spacer></v-spacer> -->
          <v-col cols="10" md="5" align-self="auto">
            <v-text-field rounded-md outlined label="First name" dense>
            </v-text-field>
          </v-col>
          <v-col cols="10" md="5" align-self="auto">
            <v-text-field
              rounded-md
              outlined
              label="Last name"
              dense
            ></v-text-field>
          </v-col>
          <!-- <v-spacer></v-spacer> -->
        </v-row>

        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Email"
              dense
              type="email"
            ></v-text-field>
          </v-col>
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Password"
              dense
              type="password"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="10">
            <v-btn block dark color="rgba(0, 0, 255, 0.7)" type="submit" large
              >submit</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      form: {
        valid: false,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("on submit function");
    },
  },
};
</script>

<style>
.signupTitle {
  text-align: center;
  font-size: 21px;
  padding-bottom: 10px;
}
</style>
