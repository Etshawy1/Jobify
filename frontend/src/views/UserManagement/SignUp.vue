<template>
  <div class="signup">
    <v-container fluid fill-height>
      <v-spacer></v-spacer>
      <v-col cols="12" md="5">
        <sign-up-form />
      </v-col>
      <v-spacer></v-spacer>
    </v-container>
  </div>
</template>

<script>
import SignUpForm from "../../components/UserManagement/SignUpForm.vue";

export default {
  name: "SignUp",
  components: {
    SignUpForm,
  },
};
</script>

<style>
.signup {
  background-color: rgba(0, 0, 255, 0.6);
  height: 100vh;
}
</style>
