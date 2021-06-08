<template>
<div>
  <v-sheet color="white" rounded="lg">
    <v-form v-model="formData.valid" @submit.prevent="onSubmit">
      <v-container>
        <div class="onlinePresenceTitle text-h2 mb-3">Online Presence</div>
        <!-- Linkedin text field -->
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Linkedin"
              dense
              type="text"
              v-model="formData.linkedIn"
            ></v-text-field>
          </v-col>
          <!-- Facebook text field -->
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Facebook"
              dense
              type="text"
              v-model="formData.facebook"
            ></v-text-field>
          </v-col>
        </v-row>
        
        <!-- twitter -->
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Twitter"
              dense
              type="text"
              v-model="formData.twitter"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- behance -->
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Behance"
              dense
              type="text"
              v-model="formData.behance"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- instagram -->
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Instagram"
              dense
              type="text"
              v-model="formData.instagram"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- gitHub -->
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Github"
              dense
              type="text"
              v-model="formData.gitHub"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- stackOverflow -->
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="stackOverFlow"
              dense
              type="text"
              v-model="formData.stackOverflow"
            ></v-text-field>
          </v-col>
        </v-row>
        
        <!-- youTube -->
      <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="youTube"
              dense
              type="text"
              v-model="formData.youTube"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- blog -->
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="blog"
              dense
              type="text"
              v-model="formData.blog"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- website -->
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="Website"
              dense
              type="text"
              v-model="formData.website"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- other -->
                <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              rounded-md
              outlined
              label="other"
              dense
              type="text"
              v-model="formData.other"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- alert to show that data is updated successfully -->
        <v-row justify="center">
          <v-col cols = "10">
            <v-alert 
            id="backsuccess-alert" 
            v-if="isSuccessful"
            dense
            outlined
            type="success">
              <div>Online Presence was successfully updated </div>
            </v-alert>
          </v-col>
        </v-row>
        <!-- alert to show any errors returning from back server -->
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
        <!-- form submission button -->
        <v-row justify="center">
          <v-col cols="5">
            <v-btn
              block
              color="blue darken-4"
              type="submit"
              large
              class="white--text"
              :disabled="!formData.valid"
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
      formData: {
        valid: false,
        linkedIn: '',
        facebook: '',
        twitter: '',
        behance: '',
        instagram: '',
        gitHub: '',
        stackOverflow: '',
        youTube: '',
        blog: '',
        website: '',
        other : ''
      },
      errorMessage: "",
      loadingState: false,
      isSuccessful: false
    };
  },
  async mounted() {
    try {
      const payload = {
        userToken : localStorage.getItem('userToken'),
        id : this.$route.params.id
      }
      let response = await this.$store.dispatch('getApplicantProfileData', payload);
      let onlinePresence = response.additionalData.onlinePresence;

      this.formData.linkedIn = onlinePresence.linkedIn;
      this.formData.facebook = onlinePresence.facebook;
      this.formData.twitter = onlinePresence.twitter;
      this.formData.behance = onlinePresence.behance;
      this.formData.instagram = onlinePresence.instagram;
      this.formData.gitHub = onlinePresence.gitHub;
      this.formData.stackOverflow = onlinePresence.stackOverflow;
      this.formData.youTube = onlinePresence.youTube;
      this.formData.blog = onlinePresence.blog;
      this.formData.website = onlinePresence.website;
      this.formData.other = onlinePresence.other;
      
    } catch (error) {
      console.log(error)
      this.errorMessage = "Can't retrieve user data currently"
    }
  },
  methods: {
    async onSubmit() {
        try {
        this.isSuccessful = false;
        const payload = {
            userToken : localStorage.getItem('userToken'),
            linkedIn : this.formData.linkedIn,
            facebook : this.formData.facebook,
            twitter : this.formData.twitter,
            behance : this.formData.behance,
            instagram : this.formData.instagram,
            gitHub : this.formData.gitHub,
            stackOverflow : this.formData.stackOverflow,
            youTube : this.formData.youTube,
            blog : this.formData.blog,
            website : this.formData.website,
            other : this.formData.other
        } 
        let response = await this.$store.dispatch('updateOnlinePresence', payload);
        this.isSuccessful = true
      } 
      catch (error) {
          console.log(error)
          if(error.status === 'fail') {
              this.errorMessage = error.msg
          }
          else {
              this.errorMessage = "Please try again later !"
          }
      }
    },
  },
};
</script>

<style scoped>
.onlinePresenceTitle {
  text-align: center;
  font-size: 21px;
  padding-bottom: 10px;
}
</style>
