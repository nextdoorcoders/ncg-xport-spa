<script>
export default {
  data: () => ({
    isFormLoading: false,
    step: 1,
    form: {
      email: null,
      code: null,
      password: null,
      password_confirmation: null
    }
  }),
  methods: {
    onSendCode(event) {
      event.preventDefault()

      this.isFormLoading = true

      this.$store.dispatch('account/user/forgotSendCode', {
            data: this.form
          })
          .then(response => {
            this.isFormLoading = false

            this.step = 2
          })
          .catch(error => {
            this.isFormLoading = false
          })
    },
    onConfirmCode(event) {
      event.preventDefault()

      this.isFormLoading = true

      this.$store.dispatch('account/user/forgotConfirmCode', {
            data: this.form
          })
          .then(response => {
            this.isFormLoading = false

            this.step = 3
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
      class="login-container d-flex flex-center flex-row flex-row-fluid order-2 order-lg-1 flex-row-fluid bg-white py-lg-0 pb-lg-0 pt-15 pb-12"
      :class="{'overlay overlay-block rounded': isFormLoading}"
  >
    <div class="overlay-wrapper p-5">
      <!--begin::Container-->
      <div class="login-content login-content-signup d-flex flex-column">
        <!--begin::Aside Top-->
        <div class="d-flex flex-column-auto flex-column px-10">
          <!--begin::Aside header-->
          <router-link :to="{name: 'home'}" class="login-logo pb-lg-4 pb-10">
            <img src="@/assets/images/logo.svg" class="max-h-70px" alt=""/>
          </router-link>
          <!--end::Aside header-->

          <!--begin: Wizard Nav-->
          <div class="wizard-nav pt-5 pt-lg-15 pb-10">
            <!--begin::Wizard Steps-->
            <div class="wizard-steps d-flex flex-column flex-sm-row">
              <!--begin::Wizard Step 1 Nav-->
              <div class="wizard-step">
                <div class="wizard-wrapper pr-7">
                  <div class="wizard-icon">
                    <i class="wizard-check ki ki-check"></i>
                    <span class="wizard-number">1</span>
                  </div>
                  <div class="wizard-label">
                    <h3 class="wizard-title">Account</h3>
                    <div class="wizard-desc">Account details</div>
                  </div>
                  <span class="svg-icon pl-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <polygon points="0 0 24 0 24 24 0 24"/>
                      <rect fill="#000000" opacity="0.3" transform="translate(8.500000, 12.000000) rotate(-90.000000) translate(-8.500000, -12.000000) " x="7.5" y="7.5" width="2" height="9" rx="1"/>
                      <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) "/>
                    </g>
                  </svg>
                </span>
                </div>
              </div>
              <!--end::Wizard Step 1 Nav-->

              <!--begin::Wizard Step 2 Nav-->
              <div class="wizard-step">
                <div class="wizard-wrapper pr-7">
                  <div class="wizard-icon">
                    <i class="wizard-check ki ki-check"></i>
                    <span class="wizard-number">2</span>
                  </div>
                  <div class="wizard-label">
                    <h3 class="wizard-title">Code</h3>
                    <div class="wizard-desc">Code from the email</div>
                  </div>
                  <span class="svg-icon pl-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <polygon points="0 0 24 0 24 24 0 24"/>
                      <rect fill="#000000" opacity="0.3" transform="translate(8.500000, 12.000000) rotate(-90.000000) translate(-8.500000, -12.000000) " x="7.5" y="7.5" width="2" height="9" rx="1"/>
                      <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) "/>
                    </g>
                  </svg>
                </span>
                </div>
              </div>
              <!--end::Wizard Step 2 Nav-->

              <!--begin::Wizard Step 3 Nav-->
              <div class="wizard-step">
                <div class="wizard-wrapper">
                  <div class="wizard-icon">
                    <i class="wizard-check ki ki-check"></i>
                    <span class="wizard-number">3</span>
                  </div>
                  <div class="wizard-label">
                    <h3 class="wizard-title">Complete</h3>
                    <div class="wizard-desc">Submit form</div>
                  </div>
                </div>
              </div>
              <!--end::Wizard Step 3 Nav-->
            </div>
            <!--end::Wizard Steps-->
          </div>
          <!--end: Wizard Nav-->
        </div>
        <!--end::Aside Top-->

        <!--begin::Signin-->
        <div class="login-form">
          <!--begin::Form-->
          <form class="form px-10">
            <!--begin: Wizard Step 1-->
            <div v-if="step === 1" class="">
              <!--begin::Title-->
              <div class="pb-10 pb-lg-12">
                <h3 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Forgotten Password ?</h3>
                <p class="text-muted font-weight-bold font-size-h4">Enter your email to reset your password</p>
              </div>
              <!--begin::Title-->

              <!--begin::Form Group-->
              <div class="form-group">
                <label class="font-size-h5 font-weight-bolder text-dark">Email</label>
                <input v-model="form.email" class="form-control form-control-solid h-auto py-7 px-6 border-0 rounded-lg font-size-h5"/>
              </div>
              <!--end::Form Group-->
            </div>
            <!--end: Wizard Step 1-->

            <!--begin: Wizard Step 2-->
            <div v-if="step === 2" class="pb-5">
              <!--begin::Title-->
              <div class="pt-lg-0 pt-5 pb-15">
                <h3 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Confirm email address</h3>
                <p class="text-muted font-weight-bold font-size-h4">Enter code from the Email and enter a new password</p>
              </div>
              <!--begin::Title-->

              <!--begin::Form Group-->
              <div class="form-group">
                <label class="font-size-h5 font-weight-bolder text-dark">Code from the Email</label>
                <input v-model="form.code" class="form-control form-control-solid h-auto py-7 px-6 border-0 rounded-lg font-size-h5"/>
              </div>
              <!--end::Form Group-->

              <!--begin::Form Group-->
              <div class="form-group">
                <label class="font-size-h5 font-weight-bolder text-dark">Password</label>
                <input v-model="form.password" class="form-control form-control-solid h-auto py-7 px-6 border-0 rounded-lg font-size-h5" type="password"/>
              </div>
              <!--end::Form Group-->

              <!--begin::Form Group-->
              <div class="form-group">
                <label class="font-size-h5 font-weight-bolder text-dark">Password confirmation</label>
                <input v-model="form.password_confirmation" class="form-control form-control-solid h-auto py-7 px-6 border-0 rounded-lg font-size-h5" type="password"/>
              </div>
              <!--end::Form Group-->
            </div>
            <!--end: Wizard Step 2-->

            <!--begin: Wizard Step 3-->
            <div v-if="step === 3" class="pb-5">
              <!--begin::Title-->
              <div class="pt-lg-0 pt-5 pb-15">
                <h3 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Reset password completed</h3>
                <div class="text-muted font-weight-bold font-size-h4">
                  You can enter the control panel using your email and password
                  <router-link :to="{name: 'auth.login'}" class="text-primary font-weight-bolder">Login</router-link>
                </div>
              </div>
              <!--begin::Title-->
            </div>
            <!--end: Wizard Step 3-->

            <!--begin: Wizard Actions-->
            <div class="d-flex justify-content-between pt-7">
              <button
                  v-if="step === 1"
                  @click="onSendCode"
                  class="btn btn-primary font-weight-bolder font-size-h5 pl-8 py-4 my-3"
                  :class="[{'spinner spinner-white spinner-right': isFormLoading, 'pr-4': !isFormLoading}]"
                  type="submit"
              >
                Send code
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
              <button
                  v-if="step === 2"
                  @click="onConfirmCode"
                  class="btn btn-primary font-weight-bolder font-size-h5 pl-8 py-4 my-3"
                  :class="[{'spinner spinner-white spinner-right': isFormLoading, 'pr-4': !isFormLoading}]"
                  type="submit"
              >
                Confirm code
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
              <router-link v-if="step === 3" :to="{name: 'auth.login'}" class="btn btn-light-primary font-weight-bolder font-size-h5 pr-8 pl-6 py-4 my-3 mr-3">
                <span class="svg-icon svg-icon-md mr-2">
                  <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Left-2.svg-->
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <polygon points="0 0 24 0 24 24 0 24"/>
                      <rect fill="#000000" opacity="0.3" transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) " x="14" y="7" width="2" height="10" rx="1"/>
                      <path d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "/>
                    </g>
                  </svg>
                  <!--end::Svg Icon-->
                </span> Login
              </router-link>
            </div>
            <!--end: Wizard Actions-->
          </form>
          <!--end::Form-->
        </div>
        <!--end::Signin-->
      </div>
      <!--end::Container-->
    </div>
    <div v-if="isFormLoading" class="overlay-layer rounded bg-primary-o-20">
      <div class="spinner spinner-primary"></div>
    </div>
  </div>
</template>
