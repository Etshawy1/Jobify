<template>
    <div class="recruiterProfile">
        <nav-bar></nav-bar>
        <v-container fill-height>
            <v-row justify="center">
                <v-col align-self="center">
                    <v-sheet color="white" rounded="lg" class="mb-3 ml-3 mr-3">
                            <v-row>
                                <v-col cols="4" class="ml-2">
                                    <v-avatar 
                                    rounded="circle"
                                    size="large">
                                        <img :src="companyData.imageUrl"> 
                                    </v-avatar>
                                </v-col>
                                <v-col>
                                    <v-row class="mt-5">
                                        <v-icon class="mr-1">mdi-factory</v-icon>
                                        <div class="text-h6 mr-1">Company Name : </div>
                                        <div class="text-h6 blue--text">{{ companyData.companyName }}</div>
                                    </v-row>
                                    <v-row class="mt-5">
                                        <v-icon class="mr-1">mdi-google-maps</v-icon>
                                        <div class="text-h6 mr-1">Company Address : </div>
                                        <div class="text-h6 blue--text">{{ companyData.companyAddress }}</div>
                                    </v-row>
                                    <v-row class="mt-5">
                                        <v-icon class="mr-1">mdi-account-multiple</v-icon>
                                        <div class="text-h6 mr-1">Number of employees : </div>
                                        <div class="text-h6 blue--text">{{ companyData.employeesCount }}</div>
                                    </v-row>
                                    <v-row class="mt-5">
                                        <v-icon class="mr-1">mdi-factory</v-icon>
                                        <div class="text-h6 mr-1">Field : </div>
                                        <div class="text-h6 blue--text">{{ companyData.field }}</div>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row justify="start" class="ml-11">
                                <v-col cols="9">
                                    <div class="text-h6">Description : </div>
                                    <div class="text-body-1">{{companyData.description}}</div>
                                </v-col>
                            </v-row>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </div>  
</template>

<script>
import NavBar from "../../components/HomePage/NavBar.vue"

export default {
    components : {
        NavBar
    },
    data() {
        return {
            companyData : {
                companyAddress: '',
                description: '',
                employeesCount: '',
                field: '',
                companyName: '',
                imageUrl: '',
            },
            errorMessage : ''
        }
    },
    async mounted() {
        try {
            const payload = {
                id : this.$route.params.id
            };
            let response = await this.$store.dispatch('getRecruiterProfileData', payload);
            let additionalData = response.additionalData;
            this.companyData.companyName = additionalData.name;
            this.companyData.companyAddress = additionalData.address;
            this.companyData.employeesCount = additionalData.employeesCount;
            this.companyData.field = additionalData.field;
            this.companyData.description = additionalData.description;
            this.companyData.imageUrl = response.imageUrl;
        } catch (error) {
            console.log(error)
            this.errorMessage = "Couln't Retrieve Recruiter Data";
      }
    }
}
</script>

<style scoped>
    .recruiterProfile {
        background-color: rgba(0, 0, 255, 0.6);
        height: 100%;
    }
</style>