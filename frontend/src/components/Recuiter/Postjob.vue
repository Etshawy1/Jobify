<template>
    <div>
        <h2 style="text-align: center; margin: 10px">Posting a new Job</h2>
        <v-form class="form-post">
            <v-text-field 
            style="margin: 20px"
            label="Job Title"
            outlined
            ></v-text-field>
        </v-form>
        <v-form outline class="form-post">
            <h3 style="margin: 10px; margin-left:15px">Job Details</h3>
            <v-text-field 
            style="margin: 20px"
            label="Experience Needed"
            outlined
            ></v-text-field>
        </v-form>
        
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    }
};
</script>

<style>
.form-post{
    margin: 10px; 
    max-width: 80%
}

</style>
