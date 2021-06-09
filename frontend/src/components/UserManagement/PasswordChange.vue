<template>
      <v-row justify="center" class="ma-3">
          <v-spacer></v-spacer>
          <v-col>
            <v-sheet color="white" rounded="lg">
                <v-form v-model="valid" @submit.prevent="onSubmit">
                    <v-row justify="center">
                        <div class="text-h4 mt-3">Change Password</div>
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
                            <div class="text-body-1 tipStyle">Please type Your new Password</div>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <!-- password text field -->
                        <v-col cols="10">
                            <v-text-field
                            rounded-md
                            outlined
                            label="Password"
                            dense
                            type="password"
                            v-model="password"
                            maxlength="30"
                            counter="30"
                            :rules="[required('password'), checkLength('password', 8)]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <!-- password confirmed text field -->
                        <v-col cols="10">
                            <v-text-field
                            rounded-md
                            outlined
                            label="confirm Password"
                            dense
                            type="password"
                            v-model="passwordConfirm"
                            maxlength="30"
                            counter="30"
                            :rules="[required('password'), checkLength('password', 8), checkConfirmedPassword()]"
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
                        <div> Password Updated Successfully & You are now logged in </div>
                        </v-alert>
                    </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="5">
                        <v-btn
                          block
                          color="blue"
                          type="submit"
                          dense
                          :to="{path: '/home'}"
                          class="white--text"
                          v-if="isSuccessful"
                          >To Home Page
                        </v-btn>
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
            password: '',
            passwordConfirm : '',
            errorMessage: '',
            isSuccessful: false,
            resetToken : '',
            required(propertyType) {
              return (v) =>
                (v && v.length > 0) || `Please enter Your ${propertyType}`;
            },
            checkLength(propertyType, minLength) {
                return (v) =>
                (v && v.length >= minLength) ||
                `${propertyType} must be longer than ${minLength} characters`;
            },
            checkConfirmedPassword() {
                return (v) => v == this.password || 'not matching with password !';
            }
        }
    },
    created() {
        this.resetToken = this.$route.params.resettoken
    },
    methods : {
        async onSubmit() {
            try {
                console.log('On submit')
                this.errorMessage = ''
                this.isSuccessful = false
                const payload = {
                    resetToken : this.resetToken,
                    password : this.password,
                    passwordConfirm : this.passwordConfirm
                }
                let response = await this.$store.dispatch('changePassword', payload)
                this.isSuccessful = true;
            } catch (error) {
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