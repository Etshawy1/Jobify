<template>
  <v-sheet color="white" rounded="lg">
    <v-form v-model="formData.valid" @submit.prevent="onSubmit">
      <v-container>
        <div class="signupTitle">Sign Up and Start Applying For Jobs</div>
        <v-row justify="center" justify-md="center">
          <v-radio-group v-model="formData.type" row>
            <template v-slot:label> <div>Join us as ?</div> </template>
            <v-radio value="employee">
              <template v-slot:label>
                <strong>An Employee</strong>
              </template>
            </v-radio>
            <v-radio value="recruiter">
              <template v-slot:label>
                <strong>A Recruiter</strong>
              </template>
            </v-radio>
          </v-radio-group>
        </v-row>
        <v-row justify="center" justify-md="center">
          <v-img
            src="../../assets/company.jpg"
            max-width="80%"
            v-if="formData.type === 'recruiter'"
          ></v-img>
          <v-img src="../../assets/employee.jpg" max-width="80%" v-else></v-img>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Email"
              dense
              type="email"
              v-model="formData.email"
              :rules="[required('email'), checkEmail()]"
            ></v-text-field>
          </v-col>
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Password"
              dense
              type="password"
              v-model="formData.password"
              :rules="[required('password'), checkLength('password', 8)]"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="10">
            <v-btn
              block
              color="blue darken-4"
              type="submit"
              large
              class="white--text"
              :disabled="!formData.valid"
              >submit
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" justify-md="center" class="mb-2">
          <div>Already a user ?</div>
          <router-link
            :to="{
              path: '/login',
              query: { redirect: this.$route.query.redirect },
            }"
            class="blue--text"
            >Log in
          </router-link>
        </v-row>
      </v-container>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        valid: false,
        type: "employee",
        email: "",
        password: "",
      },
      required(propertyType) {
        return (v) =>
          (v && v.length > 0) || `Please enter Your ${propertyType}`;
      },
      checkEmail() {
        return (v) =>
          (v && /.+@.+\..+/.test(v)) || "Please enter a valid email address !";
      },
      checkLength(propertyType, minLength) {
        return (v) =>
          (v && v.length >= minLength) ||
          `${propertyType} must be longer than ${minLength} characters`;
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
