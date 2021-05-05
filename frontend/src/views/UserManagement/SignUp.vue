<template>
  <v-sheet color="rgba(0, 0, 255, 0.5)" width="100%" height="100%">
    <v-container fluid fill-height>
      <v-spacer></v-spacer>
      <v-col cols="12" md="5">
        <sign-up-form />
      </v-col>
      <v-spacer></v-spacer>
    </v-container>
  </v-sheet>
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

<style></style>
