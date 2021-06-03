<template>
<div>
  <v-sheet color="white" rounded="lg">
    <v-form v-model="valid" @submit.prevent="onSubmit">
      <v-container>
        <v-row justify="center">
            <div class="formTitle text-h2 mb-3 mt-3">Update Your CV</div>
        </v-row>
        <v-row justify="center">
          <v-img
            src="../../assets/cv.png"
            max-width="50%"
            max-height="20%"
          >
          </v-img>
        </v-row>
        <v-row justify="center">
            <v-col cols="5">
                <v-file-input
                    label="CV"
                    outlined
                    dense
                    chip
                    v-model="cvInputFile"
                    :rules="[required('CV')]"
                ></v-file-input>
            </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="6">
            <v-btn
              block
              color="blue darken-4"
              type="submit"
              large
              class="white--text ml-3"
              :disabled="!valid"
              >Save Changes
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      cvInputFile: null,
      errorMessage: "",
      loadingState: false,
      required(propertyType) {
        return (v) =>
          (v !== null) || `Please enter Your ${propertyType}`;
      },
    };
  },
  methods: {
    async onSubmit() {
      console.log("on submit function")
    },
  },
};
</script>

<style scoped>
.formTitle {
  text-align: center;
  font-size: 21px;
  padding-bottom: 10px;
}
</style>
