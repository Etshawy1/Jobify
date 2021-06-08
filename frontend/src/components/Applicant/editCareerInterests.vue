<template>
<div>
  <edit-salary class="mb-5"></edit-salary>
  <edit-career-data class="mb-5"></edit-career-data>
</div>
</template>

<script>
import editSalary from '../Applicant/editSalary.vue'
import editCareerData from '../Applicant/editCareerData.vue'

export default {
    components: {
        editSalary,
        editCareerData
    }
}
</script>

<style>

</style>