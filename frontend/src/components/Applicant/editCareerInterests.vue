<template>
<div>
  <edit-salary class="mb-5"></edit-salary>
  <edit-career-data class="mb-5"></edit-career-data>
  <edit-job-titles class="mb-5"></edit-job-titles>
  <edit-job-categories class="mb-5"></edit-job-categories>
</div>
</template>

<script>
import editSalary from '../Applicant/editSalary.vue'
import editCareerData from '../Applicant/editCareerData.vue'
import editJobTitles from '../Applicant/editJobTitles.vue'
import editJobCategories from '../Applicant/editJobCategories.vue'

export default {
    components: {
        editSalary,
        editCareerData,
        editJobTitles,
        editJobCategories
    }
}
</script>

<style>

</style>