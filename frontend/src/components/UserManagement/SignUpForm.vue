<template>
  <v-sheet color="white" rounded="lg">
    <v-form v-model="formData.valid" @submit.prevent="onSubmit">
      <v-container>
        <div class="signupTitle">Sign Up and Start Applying For Jobs</div>
        <v-row justify="center" justify-md="center">
          <v-col cols="10" md="5" align-self="auto">
            <v-text-field
              rounded-md
              outlined
              label="First name"
              dense
              v-model="formData.firstName"
              :rules="[required('first name')]"
            >
            </v-text-field>
          </v-col>
          <v-col cols="10" md="5" align-self="auto">
            <v-text-field
              rounded-md
              outlined
              label="Last name"
              dense
              v-model="formData.lastName"
              :rules="[required('last name')]"
            ></v-text-field>
          </v-col>
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
        firstName: "",
        lastName: "",
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
