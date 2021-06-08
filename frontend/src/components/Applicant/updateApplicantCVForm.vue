<template>
<div>
  <v-sheet color="white" rounded="lg">
    <v-form v-model="valid" @submit.prevent="onSubmit">
      <v-container>
        <v-row justify="center">
            <div class="formTitle text-h2 mb-3 mt-3">Update Your CV</div>
        </v-row>

        <!-- alert to show status of response returning from back server -->
        <v-row justify="center">
          <v-col cols = "10">
            <v-alert 
            id="backerr-alert" 
            v-if="errorMessage"
            dense
            outlined
            type="error">
                {{ errorMessage }}
            </v-alert>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols = "10">
            <v-alert 
            id="backsuccess-alert" 
            v-if="isSuccessful === true"
            dense
            outlined
            type="success">
              <div>CV is successfully updated </div>
            </v-alert>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-img
            src="../../assets/cv.png"
            max-width="30%"
            max-height="20%"
          >
          </v-img>
        </v-row>

        <!-- button to preview an already uploaded CV -->
        <v-row justify="center">
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-btn
              block
              color="blue"
              v-if="userCVUrl"
              :href="userCVUrl"
              class="white--text"
            >
              Preview Your CV
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="6">
            <div class="cvUpdated" v-if="userCVUrl">
              You last Updated your CV on {{ userCVLastUpdated }}
            </div>
          </v-col>
          <v-spacer></v-spacer>
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
      userCVUrl : null,
      userCVLastUpdated : null,
      cvInputFile: null,
      errorMessage: "",
      loadingState: false,
      isSuccessful : false,
      required(propertyType) {
        return (v) =>
          (v !== null) || `Please enter Your ${propertyType}`;
      },
    };
  },

  async mounted() {
      try {
          let response = await this.$store.dispatch('getApplicantProfileData', {
              userToken : localStorage.getItem('userToken'),
              id : this.$route.params.id
          })
          this.userCVUrl = response.additionalData.cvURL;

          let lastUpdatedDate = new Date(response.additionalData.cvLastUpdated);

          this.userCVLastUpdated = lastUpdatedDate.getDate()+
                                  "/"+(lastUpdatedDate.getMonth()+1)+
                                  "/"+lastUpdatedDate.getFullYear()+
                                  " "+lastUpdatedDate.getHours()+
                                  ":"+lastUpdatedDate.getMinutes()+
                                  ":"+lastUpdatedDate.getSeconds();
      }
      catch(error) {
          this.errorMessage = "Error loading Uploaded CV"
      }
  },

  methods: {
    async onSubmit() {
      this.isSuccessful = false;
      this.errorMessage = "";
      try {
        let response = await this.$store.dispatch('updateCV', {
          userToken : localStorage.getItem('userToken'),
          file : this.cvInputFile
        })
        this.isSuccessful = true;
        this.userCVUrl = response.cvURL;

        let lastUpdatedDate = new Date(response.cvLastUpdated);

        this.userCVLastUpdated = lastUpdatedDate.getDate()+
                                "/"+(lastUpdatedDate.getMonth()+1)+
                                "/"+lastUpdatedDate.getFullYear()+
                                " "+lastUpdatedDate.getHours()+
                                ":"+lastUpdatedDate.getMinutes()+
                                ":"+lastUpdatedDate.getSeconds();
      }
      catch (error) {
        this.isSuccessful = false;
        if(error.status === 'fail') {
          this.errorMessage = error.msg;
        }
        else {
          this.errorMessage = "Please try again later !";
        }
      }
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

.cvUpdated {
  text-align: center;
}
</style>
