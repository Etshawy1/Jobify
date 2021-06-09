<template>
  <div class="applicantProfile">
      <nav-bar></nav-bar>
            <v-container>
                <v-sheet color="white" rounded="lg" class="pa-3" elevation="5">
                <v-row>
                    <div class="text-h4 mt-2 ml-3">General Information</div>
                </v-row>
                <v-row>
                    <v-col cols="4" class="ml-2">
                        <v-avatar 
                        rounded="circle"
                        size="large">
                            <img :src="GeneralInfo.imageUrl"> 
                        </v-avatar>
                    </v-col>
                    <v-col>
                        <v-row>
                            <v-icon class="mr-1">mdi-account</v-icon>
                            <div class="text-h6 mr-1">Full Name : </div>
                            <div class="text-h6 blue--text">{{ fullName }}</div>
                        </v-row>
                        <v-row>
                            <v-icon class="mr-1">mdi-cake-variant</v-icon>
                            <div class="text-h6 mr-1">Date of Birth : </div>
                            <div class="text-h6 blue--text">{{ GeneralInfo.dateOfBirth }}</div>
                        </v-row>
                        <v-row>
                            <v-icon class="mr-1">mdi-cellphone</v-icon>
                            <div class="text-h6 mr-1">Phone Number : </div>
                            <div class="text-h6 blue--text">{{ GeneralInfo.phone }}</div>
                        </v-row>
                        <v-row>
                            <v-icon class="mr-1">mdi-gender-male-female</v-icon>
                            <div class="text-h6 mr-1">Gender : </div>
                            <div class="text-h6 blue--text">{{ GeneralInfo.gender }}</div>
                        </v-row>
                         <v-row justify="start" class="mt-6">
                             <v-col cols="3">
                                <v-btn
                                    block
                                    color="blue"
                                    v-if="GeneralInfo.applicantCV"
                                    :href="GeneralInfo.applicantCV"
                                    class="white--text">
                                    Preview CV
                                </v-btn>
                             </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-container>

    <v-container>
        <v-sheet color="white" rounded="lg" class="pa-3" elevation="5">
            <v-row>
                <div class="text-h4 ml-3 mb-3">Career Interests</div>
            </v-row>
            <v-row>
                <v-icon class="ml-3">mdi-cash-multiple</v-icon>
                <div class="text-h6 ml-5 mr-1">Expected Salary : </div>
                <div class="text-h6 blue--text" v-if="CareerInterests.salary">
                    {{ CareerInterests.salary }} EGP
                </div>
                <div class="text-h6 blue--text" v-else>
                    Unspecified by Applicant
                </div>
            </v-row>
            <!-- Career Level -->
            <v-row>
                <v-icon class="ml-3">mdi-bookshelf</v-icon>
                <div class="text-h6 ml-5 mr-1">Career Level : </div>
                <div class="text-h6 blue--text" v-if="CareerInterests.careerLevel">
                    {{ CareerInterests.careerLevel }}
                </div>
            </v-row>
            <!-- job Types -->
            <v-row>
                <v-col>
                    <v-row>
                        <v-icon class="ml-3">mdi-bag-checked</v-icon>
                        <div class="text-h6 ml-5 mr-1">Preferred Job Titles : </div>
                    </v-row>
                    <v-row>
                        <v-chip-group
                        class="ml-6" 
                        v-if="CareerInterests.jobTitles"
                        >
                            <v-chip
                                v-for="jobTitle in CareerInterests.jobTitles"
                                :key="jobTitle"
                            >   
                                {{ jobTitle }}
                            </v-chip>
                        </v-chip-group>
                        <div v-else class="blue--text"> Unspecified by Applicant</div>
                    </v-row>
                </v-col>
            </v-row>

            <!-- job Categoires -->
            <v-row>
                <v-col>
                    <v-row>
                        <v-icon class="ml-3">mdi-bag-checked</v-icon>
                        <div class="text-h6 ml-6">Preferred Job Categories : </div>
                    </v-row>
                    <v-row>
                        <v-chip-group
                        class="ml-6" 
                        v-if="CareerInterests.categories"
                        >
                            <v-chip
                                v-for="category in CareerInterests.categories"
                                :key="category"
                            >   
                                {{ category }}
                            </v-chip>
                        </v-chip-group>
                        <div v-else class="blue--text"> Unspecified by Applicant</div>
                    </v-row>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>

    <v-container>
        <v-sheet color="white" rounded="lg" class="pa-3" elevation="5">
            <v-row>
                <div class="text-h4 ml-3 mb-3">Online Presence</div>
            </v-row>
            <!-- linkedIn -->
            <v-row>
                <v-icon class="ml-3 mr-1">mdi-linkedin</v-icon>
                <div class="text-subtitle2 ml-6 mr-1">Linked in : </div>
                <div class="text-subtitle2 blue--text" v-if="OnlinePresence.linkedIn">
                    {{OnlinePresence.linkedIn}}
                </div>
                <div class="text-subtitle2 blue--text" v-else> Unspecified by Applicant</div>
            </v-row>
            <!-- facebook -->
            <v-row>
                <v-icon class="ml-3 mr-1">mdi-facebook</v-icon>
                <div class="text-subtitle2 ml-6 mr-1">Facebook : </div>
                <div class="text-subtitle2 blue--text" v-if="OnlinePresence.facebook">
                    {{OnlinePresence.facebook}}
                </div>
                <div class="text-subtitle2 blue--text" v-else> Unspecified by Applicant</div>
            </v-row>
            <!-- twitter -->
            <v-row>
                <v-icon class="ml-3 mr-1">mdi-twitter</v-icon>
                <div class="text-subtitle2 ml-6 mr-1">Twitter : </div>
                <div class="text-subtitle2 blue--text" v-if="OnlinePresence.twitter">
                    {{OnlinePresence.twitter}}
                </div>
                <div class="text-subtitle2 blue--text" v-else> Unspecified by Applicant</div>
            </v-row>
            <!-- behance -->
            <v-row>
                <v-icon class="ml-3 mr-1">mdi-adobe</v-icon>
                <div class="text-subtitle2 ml-6 mr-1">Behance : </div>
                <div class="text-subtitle2 blue--text" v-if="OnlinePresence.behance">
                    {{OnlinePresence.behance}}
                </div>
                <div class="text-subtitle2 blue--text" v-else> Unspecified by Applicant</div>
            </v-row>
            <!-- instagram -->
            <v-row>
                <v-icon class="ml-3 mr-1">mdi-instagram</v-icon>
                <div class="text-subtitle2 ml-6 mr-1">Instagram : </div>
                <div class="text-subtitle2 blue--text" v-if="OnlinePresence.instagram">
                    {{OnlinePresence.instagram}}
                </div>
                <div class="text-subtitle2 blue--text" v-else> Unspecified by Applicant</div>
            </v-row>
            <!-- gitHub -->
            <v-row>
                <v-icon class="ml-3 mr-1">mdi-github</v-icon>
                <div class="text-subtitle2 ml-6 mr-1">GitHub : </div>
                <div class="text-subtitle2 blue--text" v-if="OnlinePresence.gitHub">
                    {{OnlinePresence.gitHub}}
                </div>
                <div class="text-subtitle2 blue--text" v-else> Unspecified by Applicant</div>
            </v-row>
            <!-- stackOverflow -->
            <v-row>
                <v-icon class="ml-3 mr-1">mdi-code-braces</v-icon>
                <div class="text-subtitle2 ml-6 mr-1">stackOverflow : </div>
                <div class="text-subtitle2 blue--text" v-if="OnlinePresence.stackOverflow">
                    {{OnlinePresence.stackOverflow}}
                </div>
                <div class="text-subtitle2 blue--text" v-else> Unspecified by Applicant</div>
            </v-row>
            <!-- youTube -->
            <v-row>
                <v-icon class="ml-3 mr-1">mdi-youtube</v-icon>
                <div class="text-subtitle2 ml-6 mr-1">YouTube : </div>
                <div class="text-subtitle2 blue--text" v-if="OnlinePresence.youTube">
                    {{OnlinePresence.youTube}}
                </div>
                <div class="text-subtitle2 blue--text" v-else> Unspecified by Applicant</div>
            </v-row>
            <!-- blog -->
            <v-row>
                <v-icon class="ml-3 mr-1">mdi-blogger</v-icon>
                <div class="text-subtitle2 ml-6 mr-1">Blog : </div>
                <div class="text-subtitle2 blue--text" v-if="OnlinePresence.blog">
                    {{OnlinePresence.blog}}
                </div>
                <div class="text-subtitle2 blue--text" v-else> Unspecified by Applicant</div>
            </v-row>
            <!-- website -->
            <v-row>
                <v-icon class="ml-3 mr-1">mdi-web</v-icon>
                <div class="text-subtitle2 ml-6 mr-1">Website : </div>
                <div class="text-subtitle2 blue--text" v-if="OnlinePresence.website">
                    {{OnlinePresence.website}}
                </div>
                <div class="text-subtitle2 blue--text" v-else> Unspecified by Applicant</div>
            </v-row>
            <!-- other -->
            <v-row>
                <v-icon class="ml-3 mr-1">mdi-web</v-icon>
                <div class="text-subtitle2 ml-6 mr-1">Other : </div>
                <div class="text-subtitle2 blue--text" v-if="OnlinePresence.other">
                    {{OnlinePresence.other}}
                </div>
                <div class="text-subtitle2 blue--text" v-else> Unspecified by Applicant</div>
            </v-row>
        </v-sheet>
    </v-container>

    <v-container>
        <v-sheet color="white" rounded="lg" class="pa-3" elevation="5">
            <v-row>
                <v-col>
                    <div class="text-h4 ml-3 mb-3">Skills</div>
                    <div v-if="userSkills">
                        <v-row v-for="skill in userSkills" :key="skill.skillName" class="mb-1">
                            <skill-card :skillName="skill.skill" :yearsOfExperiance="skill.yearsExperiance"></skill-card>
                        </v-row>
                    </div>
                    <div class="text-subtitle2 blue--text" v-else> Unspecified by Applicant</div>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
  </div>
</template>

<script>
import NavBar from "../../components/HomePage/NavBar.vue"
import SkillCard from "../../components/General/skillCard.vue"

export default {
    components: {
        NavBar,
        SkillCard
    },
    data() {
        return {
            GeneralInfo : {
                imageUrl : '',
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                phone: '',
                gender: '',
                applicantCV: ''
            },
            OnlinePresence : {
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
                other: ''
            },
            CareerInterests : {
                careerLevel : '',
                jobTitles: [],
                categories: [],
                salary: []

            },
            userSkills : [],
        }
    },
    async mounted() {
        try {
            const payload = {
                id : this.$route.params.id
            }
            let response = await this.$store.dispatch('getApplicantProfileData', payload);
            let additionalData = response.additionalData
            // Set generalInfo
            this.GeneralInfo.firstName = additionalData.firstName
            this.GeneralInfo.lastName = additionalData.lastName

            const dob = new Date(additionalData.dateOfBirth)
            this.GeneralInfo.dateOfBirth =  `${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}`
            this.GeneralInfo.phone = additionalData.phone
            this.GeneralInfo.gender = additionalData.gender
            this.GeneralInfo.imageUrl = response.imageUrl
            this.GeneralInfo.applicantCV = additionalData.cvURL

            // set online Presence
            let onlinePresence = additionalData.onlinePresence;
            this.OnlinePresence.linkedIn = onlinePresence.linkedIn;
            this.OnlinePresence.facebook = onlinePresence.facebook;
            this.OnlinePresence.twitter = onlinePresence.twitter;
            this.OnlinePresence.behance = onlinePresence.behance;
            this.OnlinePresence.instagram = onlinePresence.instagram;
            this.OnlinePresence.gitHub = onlinePresence.gitHub;
            this.OnlinePresence.stackOverflow = onlinePresence.stackOverflow;
            this.OnlinePresence.youTube = onlinePresence.youTube;
            this.OnlinePresence.blog = onlinePresence.blog;
            this.OnlinePresence.website = onlinePresence.website;
            this.OnlinePresence.other = onlinePresence.other;

            // set career Interests
            this.CareerInterests.jobTitles = additionalData.jobTitles;
            this.CareerInterests.jobTypes = additionalData.jobType[0];
            this.CareerInterests.categories = additionalData.categories;
            this.CareerInterests.salary = additionalData.salary;
            this.CareerInterests.careerLevel = additionalData.careerLevel;
            // set users skills
            this.userSkills = additionalData.skills;
            console.log(additionalData)

        } catch (error) {
            console.log(error)
            this.errorMessage = "Can't retrieve user data currently"
        }
    },
    computed: {
        fullName() {
            return `${this.GeneralInfo.firstName} ${this.GeneralInfo.lastName}`
        }
    }
}

</script>

<style scoped>
    .applicantProfile {
        background-color: rgba(0, 0, 255, 0.6);
        height: 100%;
    }
</style>

