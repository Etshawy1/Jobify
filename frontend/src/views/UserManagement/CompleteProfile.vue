<template>
  <div class="completeProfile">
    <v-container fluid fill-height>
      <v-spacer></v-spacer>
      <v-col cols="6">
        <applicant-mandatory-form v-if="userType === 'applicant'"/>
        <recruiter-mandaotry-form v-if="userType === 'recruiter'"/>
      </v-col>
      <v-spacer></v-spacer>
    </v-container>
  </div>
</template>

<script>
import ApplicantMandatoryForm from "../../components/Applicant/applicantMandatoryForm.vue"
import RecruiterMandaotryForm from "../../components/Recuiter/RecruiterMandatoryForm.vue"

export default {
    name: "CompleteProfile",
    components: {
        ApplicantMandatoryForm,
        RecruiterMandaotryForm
    },
    data() {
        return {
            userType: "applicant"
        }
    },
    beforeMount() {
        this.userType = localStorage.getItem("userType")
    }
}
</script>

<style>
    .completeProfile {
    background-color: rgba(0, 0, 255, 0.6);
    }
</style>