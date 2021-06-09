<template>
      <v-row justify="center">
          <v-spacer></v-spacer>
          <v-col>
            <v-sheet color="white" rounded="lg">
                <v-form v-model="valid" @submit.prevent="onSubmit">
                    <v-row justify="center" v-if="loadingState">
                        <div class="text-center">
                            <v-progress-circular
                                indeterminate
                                color="primary"
                            ></v-progress-circular>
                        </div>
                    </v-row>
                    <v-row justify="center">
                        <div class="text-h4 mt-3">Reset Password</div>
                    </v-row>
                    <v-row justify="center">
                        <v-img
                        src="../../assets/forgotPass.png"
                        max-width="200px"
                        aspect-ratio
                        >
                        </v-img>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="10">
                            <div class="text-body-1 tipStyle">An email will be sent to the provided email address with details of how to reset your password</div>
                        </v-col>
                    </v-row>
                    <!-- email text field -->
                    <v-row justify="center">
                        <v-col cols="10" >
                            <v-text-field
                            class="mt-3"
                            rounded-md
                            outlined
                            label="Email"
                            dense
                            type="email"
                            v-model="email"
                            :rules="[required('email'), checkEmail()]"
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
                        <div> An Email was sent to your inbox </div>
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
                    <!-- submission button -->
                    <v-row justify="center">
                      <v-col cols="10">
                        <v-btn
                          block
                          color="blue darken-4"
                          type="submit"
                          large
                          class="white--text"
                          :disabled="!valid"
                          >Submit
                        </v-btn>
                      </v-col>
                    </v-row>
                </v-form>
            </v-sheet>
          </v-col>
          <v-spacer></v-spacer>
      </v-row>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            email: '',
            errorMessage: '',
            isSuccessful: false,
            loadingState : false,
            required(propertyType) {
              return (v) =>
                (v && v.length > 0) || `Please enter Your ${propertyType}`;
            },
            checkEmail() {
              return (v) =>
                (v && /.+@.+\..+/.test(v)) || "Please enter a valid email address !";
            }
        }
    },
    methods : {
        async onSubmit() {
            try {
                console.log('On submit')
                this.loadingState = true
                this.errorMessage = ''
                this.isSuccessful = false
                const payload = {
                    email : this.email
                }
                let response = await this.$store.dispatch('resetPassword', payload)
                this.isSuccessful = true;
                this.loadingState = false;
            } catch (error) {
                this.loadingState = false;
                if(error.status === 'fail') {
                    this.errorMessage = error.msg;
                }
                else {
                    this.errorMessage = "Please try again later !";
                }
            }

        }
    }
}
</script>

<style scoped>
.tipStyle {
    text-align: center;
}

</style>