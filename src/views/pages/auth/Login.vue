<script>
import GoogleAuth from '../../components/buttons/GoogleAuth'
import FacebookAuth from '../../components/buttons/FacebookAuth'

export default {
  components: {
    FacebookAuth,
    GoogleAuth
  },
  data: () => ({
    isFormLoading: false,
    form: {
      email: null,
      password: null
    }
  }),
  methods: {
    onLogin(event) {
      event.preventDefault()

      this.isFormLoading = true

      this.$store.dispatch('account/user/login', {
            data: this.form
          })
          .then(response => {
            this.isFormLoading = false

            this.$router.push({
              name: 'dashboard'
            })
          })
          .catch(error => {
            this.isFormLoading = false
          })
    }
  }
}
</script>

<template>
  <div
      class="login-container order-2 order-lg-1 d-flex flex-center flex-row-fluid px-7 pt-lg-0 pb-lg-0 pt-4 pb-6 bg-white"
      :class="{'overlay overlay-block rounded': isFormLoading}"
  >
    <!--begin::Wrapper-->
    <div class="overlay-wrapper p-5">
      <div class="login-content d-flex flex-column pt-lg-0 pt-12">
        <!--begin::Logo-->
        <router-link :to="{name: 'home'}" class="login-logo pb-xl-20 pb-15">
          <img src="@/assets/images/logo.svg" class="max-h-70px" alt=""/>
        </router-link>
        <!--end::Logo-->

        <!--begin::Signin-->
        <div class="login-form">
          <!--begin::Form-->
          <form class="form">
            <!--begin::Title-->
            <div class="pb-5 pb-lg-15">
              <h3 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Sign In</h3>
              <div class="text-muted font-weight-bold font-size-h4">
                New Here?
                <router-link :to="{name: 'auth.register'}" class="text-primary font-weight-bolder">Create Account</router-link>
              </div>
              <div class="text-muted font-weight-bold font-size-h4">
                Please read our
                <router-link :to="{name: 'terms-and-conditions'}" class="text-primary font-weight-bolder">Terms and Conditions</router-link>
                and
                <router-link :to="{name: 'privacy-policy'}" class="text-primary font-weight-bolder">Privacy Policy</router-link>
              </div>
            </div>
            <!--begin::Title-->

            <!--begin::Form group-->
            <div class="form-group">
              <label class="font-size-h5 font-weight-bolder text-dark">Your Email</label>
              <input v-model="form.email" class="form-control form-control-solid h-auto py-7 px-6 border-0 rounded-lg font-size-h5" type="text" autocomplete="off"/>
            </div>
            <!--end::Form group-->

            <!--begin::Form group-->
            <div class="form-group">
              <div class="d-flex justify-content-between mt-n5">
                <label class="font-size-h5 font-weight-bolder text-dark pt-5">Your Password</label>
                <router-link :to="{name: 'auth.forgot'}" class="text-primary font-size-h5 font-weight-bolder text-hover-primary pt-5">Forgot Password ?</router-link>
              </div>
              <input v-model="form.password" class="form-control form-control-solid h-auto py-7 px-6 border-0 rounded-lg font-size-h5" type="password" autocomplete="off"/>
            </div>
            <!--end::Form group-->

            <!--begin::Action-->
            <div class="pb-lg-0 pb-5">
              <button
                  @click="onLogin"
                  class="btn btn-primary font-weight-bolder font-size-h5 pl-8 py-4 my-3 mr-3"
                  :class="[{'spinner spinner-white spinner-right': isFormLoading}, {'pr-4': !isFormLoading}]"
                  type="submit"
              >
                Sign In
                <span v-if="!isFormLoading" class="svg-icon svg-icon-md ml-2">
                  <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Right-2.svg-->
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <polygon points="0 0 24 0 24 24 0 24"/>
                      <rect fill="#000000" opacity="0.3" transform="translate(8.500000, 12.000000) rotate(-90.000000) translate(-8.500000, -12.000000) " x="7.5" y="7.5" width="2" height="9" rx="1"/>
                      <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) "/>
                    </g>
                  </svg>
                  <!--end::Svg Icon-->
                </span>
              </button>
              <GoogleAuth/>
              <FacebookAuth/>
            </div>
            <!--end::Action-->
          </form>
          <!--end::Form-->
        </div>
        <!--end::Signin-->
      </div>
    </div>
    <!--end::Wrapper-->
    <div v-if="isFormLoading" class="overlay-layer rounded bg-primary-o-20">
      <div class="spinner spinner-primary"></div>
    </div>
  </div>
</template>
