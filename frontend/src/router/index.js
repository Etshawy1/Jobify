import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import SignUp from '../views/UserManagement/SignUp.vue';
import AdminHome from '../views/Admin/AdminHome.vue';
import Skills from '../views/Admin/Skills.vue';
import JobTitles from '../views/Admin/JobTitles.vue';
import Languages from '../views/Admin/Languages.vue';
import Categories from '../views/Admin/Categories.vue';
import Login from '../views/UserManagement/Login.vue';
import CompleteProfile from '../views/UserManagement/CompleteProfile.vue';
import JobApply from '../views/JobApply/JobApply.vue';
import MyJobs from '../views/Recuiter/MyJobs.vue';
import ReviewApplicants from '../views/Recuiter/ReviewApplicants.vue';
import ReviewRecruiters from '../views/Admin/RecruiterApplication.vue';
import PostJob from '../views/Recuiter/PostJob.vue';
import editApplicantProfile from '../views/Applicant/editApplicantProfile.vue';
import editPersonalInfoForm from '../components/Applicant/editPersonalInfoForm.vue';
import updateApplicantCVForm from '../components/Applicant/updateApplicantCVForm.vue';
import updateSkillsForm from '../components/Applicant/updateSkillsForm.vue';
import EditJob from '../views/Recuiter/EditJob.vue';
import editOnlinePresenceForm from '../components/Applicant/editOnlinePresenceForm.vue';
import editCareerInterests from '../components/Applicant/editCareerInterests.vue';
import applicantProfile from '../views/Applicant/applicantProfile.vue';
import RecruiterProfile from '../views/Recuiter/RecruiterProfile.vue';
import editRecruiterProfile from '../views/Recuiter/editRecruiterProfile.vue';
import entry from '../views/entry.vue';
import ForgotPassword from '../views/UserManagement/ForgotPassword.vue';
import PasswordReset from '../components/UserManagement/PasswordReset.vue';
import PasswordChange from '../components/UserManagement/PasswordChange.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: "entry",
    component : entry,
    meta : {
      allowAnonymous : true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta : {
      allowAnonymous : false
    }
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome,
    meta : {
      allowAnonymous : false
    }
  },
  {
    path: '/admin/skills',
    name: 'Skills',
    component: Skills,
    meta : {
      allowAnonymous : false
    }
  },
  {
    path: '/admin/job-titles',
    name: 'Jobtitles',
    component: JobTitles,
    meta : {
      allowAnonymous : false
    }
  },
  {
    path: '/admin/categories',
    name: 'Categories',
    component: Categories,
    meta : {
      allowAnonymous : false
    }
  },
  {
    path: '/admin/languages',
    name: 'Languages',
    component: Languages,
    meta : {
      allowAnonymous : false
    }
  },
  {
    path: '/admin/recruiters',
    name: 'ReviewRecruiters',
    component: ReviewRecruiters,
    meta : {
      allowAnonymous : false
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta : {
      allowAnonymous : true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta : {
      allowAnonymous : true
    }
  },
  {
    path: '/completeprofile',
    name: 'CompleteProfile',
    component: CompleteProfile,
    meta : {
      allowAnonymous : false
    }
  },
  {
    path: '/apply/:id',
    name: 'JobApply',
    component: JobApply,
    meta : {
      allowAnonymous : false
    }
  },
  {
    path: '/jobs/:profile_id',
    name: 'MyJobs',
    component: MyJobs,
    meta : {
      allowAnonymous : false
    }
  },
  {
    path: '/review/:job_id',
    name: 'ReviewApplicants',
    component: ReviewApplicants,
    meta : {
      allowAnonymous : false
    }
  },
  {
    path: '/postjob',
    name: 'PostJob',
    component: PostJob,
    meta : {
      allowAnonymous : false
    }
  },
  {
    path: '/editjob/:job_id',
    name: 'EditJob',
    component: EditJob,
    meta : {
      allowAnonymous : false
    }
  },
  // the applicant edit profile url
  {
    path: '/editapplicantprofile/:id',
    name: 'editApplicantProfile',
    component: editApplicantProfile,
    meta : {
      allowAnonymous : false
    },
    children: [
      {
        path: '',
        name: 'editPersonalInfoForm',
        component: editPersonalInfoForm,
        meta : {
          allowAnonymous : false
        }
      },
      {
        path: 'updatecv',
        name: 'updatecv',
        component: updateApplicantCVForm,
        meta : {
          allowAnonymous : false
        }
      },
      {
        path: 'updateskills',
        name: 'updateskills',
        component: updateSkillsForm,
        meta : {
          allowAnonymous : false
        }
      },
      {
        path: 'onlinepresence',
        name: 'onlinepresence',
        component: editOnlinePresenceForm,
        meta : {
          allowAnonymous : false
        }
      },
      {
        path: 'careerinterests',
        name: 'careerinterests',
        component: editCareerInterests,
        meta : {
          allowAnonymous : false
        }
      },
    ],
  },
  {
    path: '/applicantprofile/:id',
    name: 'applicantProfile',
    component: applicantProfile,
    meta : {
      allowAnonymous : true
    }
  },
  {
    path: '/editrecruiterprofile/:id',
    name: 'editRecruiterProfile',
    component: editRecruiterProfile,
    meta : {
      allowAnonymous : false
    }
  },
  {
    path: '/recruiterprofile/:id',
    name: 'RecruiterProfile',
    component: RecruiterProfile,
    meta : {
      allowAnonymous : true
    }
  },
  {
    path: "/password-reset",
    name: "forgotpassword",
    component: ForgotPassword,
    redirect: "/password-reset/reset",
    meta : {
      allowAnonymous : true
    },
    children: [
      {
        path: "reset",
        name: "reset",
        component: PasswordReset,
        meta : {
          allowAnonymous : true
        }
      },
      {
        path: "change/:resettoken",
        name: "change",
        component: PasswordChange,
        meta : {
          allowAnonymous : true
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if(!RegExp('^/admin').test(to.path) && localStorage.getItem('userType') == 'admin')
  {
    next({
      path: '/admin',
    });
  }
  if (
    /^\/admin/.test(to.path) &&
    (!localStorage.getItem('userToken') ||
      localStorage.getItem('userType') != 'admin')
  ) {
    next({
      path: '/login',
    });
  }
  if (to.name == "Login" && (localStorage.getItem('userToken'))) {
    next({
      path: "/home"
    });
  } else if (to.name == "SignUp" && (localStorage.getItem('userToken'))) {
    next({
      path: "/home"
    });
  } else if (!to.meta.allowAnonymous && !(localStorage.getItem('userToken'))) {
    next({
      path: "/",
    });
  }else {
    next();
  }
});

export default router;
