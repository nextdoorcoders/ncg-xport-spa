<script>
import {mapGetters, mapState} from 'vuex'
import Modal from '../../components/Modal'
import Fragment from '../../components/Fragment'
import GoogleAuth from '../../components/buttons/GoogleAuth'
import FacebookAuth from '../../components/buttons/FacebookAuth'
import ModalAccountDelete from '../../partials/user/ModalAccountDelete'
import ModalContactCreate from '../../partials/user/ModalContactCreate'
import ModalContactDelete from '../../partials/user/ModalContactDelete'
import ModalLogout from '../../partials/user/ModalLogout'

export default {
  components: {
    FacebookAuth,
    GoogleAuth,
    Fragment,
    Modal
  },
  data() {
    return {
      isUserResourceLoaded: false,
      userResource: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  computed: {
    ...mapGetters('account/user', [
      'currentUser'
    ]),
    ...mapState('marketing/account', [
      'accountCollection'
    ]),
    ...mapState('account/contact', [
      'contactCollection'
    ])
  },
  mounted() {
    this.getProfile()

    this.$store.dispatch('marketing/account/get')

    this.$store.dispatch('account/contact/get')
  },
  methods: {
    getProfile() {
      this.$store.dispatch('account/user/readCurrentUser')
          .then(response => {
            this.userResource.name = response.data.name
            this.userResource.email = response.data.email

            this.isUserResourceLoaded = true
          })
    },
    updateProfile() {
      this.$store.dispatch('account/user/updateCurrentUser', {
            data: this.userResource
          })
          .then(response => {
            this.userResource.password = null
            this.userResource.password_confirmation = null
          })
    },
    onShowAccountDelete(account) {
      this.$modal.open({
        component: ModalAccountDelete,
        props: {
          resourceAccount: account
        }
      })
    },
    onShowContactCreate() {
      this.$modal.open({
        component: ModalContactCreate
      })
    },
    onShowContactDelete(contact) {
      this.$modal.open({
        component: ModalContactDelete,
        props: {
          contactResource: contact
        }
      })
    },
    onShowLogout() {
      this.$modal.open({
        component: ModalLogout
      })
    }
  }
}
</script>

<template>
  <Fragment>
    <!--begin::Subheader-->
    <div class="subheader py-3 py-lg-8 subheader-transparent">
      <div class=" container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <!--begin::Info-->
        <div class="d-flex align-items-center flex-wrap mr-1">
          <!--begin::Page Heading-->
          <div class="d-flex align-items-baseline flex-wrap mr-5">
            <!--begin::Page Title-->
            <h2 class="subheader-title text-dark font-weight-bold my-1 mr-3">Personal account</h2>
            <!--end::Page Title-->
          </div>
          <!--end::Page Heading-->
        </div>
        <!--end::Info-->

        <!--begin::Toolbar-->
        <div class="d-flex align-items-center">
          <!--begin::Button-->
          <button @click="onShowLogout" class="btn btn-fixed-height btn-white btn-hover-danger font-weight-bold px-2 px-lg-5 mr-2">
            <span class="svg-icon svg-icon-danger svg-icon-lg">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"/>
                  <path
                      d="M14.0069431,7.00607258 C13.4546584,7.00607258 13.0069431,6.55855153 13.0069431,6.00650634 C13.0069431,5.45446114 13.4546584,5.00694009 14.0069431,5.00694009 L15.0069431,5.00694009 C17.2160821,5.00694009 19.0069431,6.7970243 19.0069431,9.00520507 L19.0069431,15.001735 C19.0069431,17.2099158 17.2160821,19 15.0069431,19 L3.00694311,19 C0.797804106,19 -0.993056895,17.2099158 -0.993056895,15.001735 L-0.993056895,8.99826498 C-0.993056895,6.7900842 0.797804106,5 3.00694311,5 L4.00694793,5 C4.55923268,5 5.00694793,5.44752105 5.00694793,5.99956624 C5.00694793,6.55161144 4.55923268,6.99913249 4.00694793,6.99913249 L3.00694311,6.99913249 C1.90237361,6.99913249 1.00694311,7.89417459 1.00694311,8.99826498 L1.00694311,15.001735 C1.00694311,16.1058254 1.90237361,17.0008675 3.00694311,17.0008675 L15.0069431,17.0008675 C16.1115126,17.0008675 17.0069431,16.1058254 17.0069431,15.001735 L17.0069431,9.00520507 C17.0069431,7.90111468 16.1115126,7.00607258 15.0069431,7.00607258 L14.0069431,7.00607258 Z"
                      fill="#000000" fill-rule="nonzero" opacity="0.3" transform="translate(9.006943, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-9.006943, -12.000000) "/>
                  <rect fill="#000000" opacity="0.3" transform="translate(14.000000, 12.000000) rotate(-270.000000) translate(-14.000000, -12.000000) " x="13" y="6" width="2" height="12" rx="1"/>
                  <path d="M21.7928932,9.79289322 C22.1834175,9.40236893 22.8165825,9.40236893 23.2071068,9.79289322 C23.5976311,10.1834175 23.5976311,10.8165825 23.2071068,11.2071068 L20.2071068,14.2071068 C19.8165825,14.5976311 19.1834175,14.5976311 18.7928932,14.2071068 L15.7928932,11.2071068 C15.4023689,10.8165825 15.4023689,10.1834175 15.7928932,9.79289322 C16.1834175,9.40236893 16.8165825,9.40236893 17.2071068,9.79289322 L19.5,12.0857864 L21.7928932,9.79289322 Z" fill="#000000" fill-rule="nonzero" transform="translate(19.500000, 12.000000) rotate(-90.000000) translate(-19.500000, -12.000000) "/>
                </g>
              </svg>
            </span>
            Logout
          </button>
          <!--end::Button-->
        </div>
        <!--end::Toolbar-->
      </div>
    </div>
    <!--end::Subheader-->

    <!--begin::Entry-->
    <div class="d-flex flex-column-fluid">
      <!--begin::Container-->
      <div class="container">
        <!--begin::Profile Account Information-->
        <div class="row">
          <!--begin::Aside-->
          <div class="col-12 col-sm-4">
            <!--begin::Profile Card-->
            <div class="card card-custom">
              <!--begin::Header-->
              <div class="card-header py-3">
                <div class="card-title align-items-start flex-column">
                  <h3 class="card-label font-weight-bolder text-dark">{{ this.currentUser.name ? this.currentUser.name : 'Unknown' }}</h3>
                  <span class="text-muted font-weight-bold font-size-sm mt-1">{{ this.currentUser.email }}</span>
                </div>
                <div class="card-toolbar">
                  <button @click="onShowContactCreate" class="btn btn-success">Add contact</button>
                </div>
              </div>
              <!--end::Header-->
              <!--begin::Body-->
              <div class="card-body pt-4">
                <!--begin::Contact-->
                <template v-if="contactCollection.length > 0">
                  <div v-for="contact in contactCollection" class="d-flex align-items-center justify-content-between mb-2">
                    <span class="font-weight-bold mr-2">{{ contact.type_text }}:</span>
                    <span v-if="contact.type === 'phone'" class="text-muted"><a :href="`tel:${contact.value}`">{{ contact.value }}</a></span>
                    <span v-else-if="contact.type === 'email'" class="text-muted"><a :href="`mailto:${contact.value}`">{{ contact.value }}</a></span>
                    <span v-else-if="contact.type === 'website'" class="text-muted"><a :href="contact.value" target="_blank">{{ contact.value }}</a></span>
                    <span v-else class="text-muted">{{ contact.value }}</span>
                    <button @click="onShowContactDelete(contact)" class="btn btn-hover-light-primary btn-sm btn-icon" data-toggle="tooltip" title="" data-placement="left" data-original-title="Delete contact information">
                      <i class="la la-trash"></i>
                    </button>
                  </div>
                </template>
                <template v-else>There is no contact information</template>
                <!--end::Contact-->
              </div>
              <!--end::Body-->
            </div>
            <!--end::Profile Card-->
          </div>
          <!--end::Aside-->

          <!--begin::Content-->
          <div class="col-12 col-sm-8">
            <!--begin::Card-->
            <div class="card card-custom">
              <!--begin::Header-->
              <div class="card-header py-3">
                <div class="card-title align-items-start flex-column">
                  <h3 class="card-label font-weight-bolder text-dark">Account Information</h3>
                  <span class="text-muted font-weight-bold font-size-sm mt-1">Change your account settings</span>
                </div>
                <div class="card-toolbar">
                  <button @click="updateProfile" class="btn btn-success">Save Changes</button>
                </div>
              </div>
              <!--end::Header-->
              <!--begin::Form-->
              <div class="card-body">
                <div class="form-group row">
                  <label class="col-12 col-md-4 col-form-label" for="name">Name</label>
                  <div class="col-12 col-md-6">
                    <input v-model="userResource.name" class="form-control" id="name"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-12 col-md-4 col-form-label" for="email">Email</label>
                  <div class="col-12 col-md-6">
                    <input v-model="userResource.email" class="form-control" id="email"/>
                  </div>
                </div>

                <div class="separator separator-dashed mt-8 mb-8"></div>

                <div class="form-group row">
                  <label class="col-12 col-md-4 col-form-label" for="password">Password</label>
                  <div class="col-12 col-md-6">
                    <input v-model="userResource.password" class="form-control" type="password" id="password"/>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-12 col-md-4 col-form-label" for="password_confirmation">Password confirmation</label>
                  <div class="col-12 col-md-6">
                    <input v-model="userResource.password_confirmation" class="form-control" type="password" id="password_confirmation"/>
                  </div>
                </div>
              </div>
              <!--end::Form-->
            </div>
            <!--end::Card-->

            <!--begin::Card-->
            <div class="card card-custom mt-5">
              <!--begin::Header-->
              <div class="card-header py-3">
                <div class="card-title align-items-start flex-column">
                  <h3 class="card-label font-weight-bolder text-dark">Marketing accounts</h3>
                  <span class="text-muted font-weight-bold font-size-sm mt-1">Attach and detach your marketing accounts</span>
                </div>
              </div>
              <!--end::Header-->
              <!--begin::Form-->
              <div class="card-body">
                <div class="row">
                  <div class="col-4">
                    <GoogleAuth label="Attach Google" css-class="btn-block"/>
                    <FacebookAuth label="Attach Facebook" css-class="btn-block mt-5"/>
                  </div>
                  <div class="col-8">
                    <!--begin::Item-->
                    <template v-if="accountCollection.length > 0">
                      <div v-for="account in accountCollection" class="d-flex align-items-center mb-5">
                        <div class="symbol symbol-50 symbol-light-primary mr-5">
                          <span class="symbol-label">
                            <svg v-if="account.provider_name === 'google'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.879 15.7789 19.9895 13.221 19.9895 10.1871Z" fill="#4285F4"/>
                              <path d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9466L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z" fill="#34A853"/>
                              <path d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z" fill="#FBBC05"/>
                              <path d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z" fill="#EB4335"/>
                            </svg>
                            <svg v-if="account.provider_name === 'facebook'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" version="1.1">
                              <path style=" stroke:none;fill-rule:nonzero;fill:rgb(21.960784%,36.078431%,55.686275%);fill-opacity:1;"
                                    d="M 5.269531 10.652344 L 7.464844 10.652344 L 7.464844 19.675781 C 7.464844 19.855469 7.609375 20 7.785156 20 L 11.503906 20 C 11.679688 20 11.824219 19.855469 11.824219 19.675781 L 11.824219 10.695312 L 14.347656 10.695312 C 14.511719 10.695312 14.648438 10.570312 14.667969 10.410156 L 15.050781 7.085938 C 15.058594 6.996094 15.03125 6.902344 14.96875 6.835938 C 14.910156 6.765625 14.820312 6.726562 14.730469 6.726562 L 11.824219 6.726562 L 11.824219 4.644531 C 11.824219 4.015625 12.164062 3.699219 12.832031 3.699219 C 12.925781 3.699219 14.730469 3.699219 14.730469 3.699219 C 14.90625 3.699219 15.050781 3.554688 15.050781 3.375 L 15.050781 0.324219 C 15.050781 0.148438 14.90625 0.00390625 14.730469 0.00390625 L 12.113281 0.00390625 C 12.09375 0 12.054688 0 11.992188 0 C 11.539062 0 9.960938 0.0898438 8.714844 1.234375 C 7.335938 2.507812 7.527344 4.027344 7.574219 4.289062 L 7.574219 6.726562 L 5.269531 6.726562 C 5.09375 6.726562 4.949219 6.871094 4.949219 7.050781 L 4.949219 10.328125 C 4.949219 10.507812 5.09375 10.652344 5.269531 10.652344 Z M 5.269531 10.652344 "/>
                            </svg>
                          </span>
                        </div>
                        <div class="d-flex flex-column flex-grow-1 font-weight-bold">
                          <span class="text-dark mb-1 font-size-lg">{{ account.email }}</span>
                          <span class="text-muted">Attached: {{ account.created_at|datetime }}</span>
                        </div>
                        <button @click="onShowAccountDelete(account)" class="btn btn-hover-light-primary btn-sm btn-icon" data-toggle="tooltip" title="" data-placement="left" data-original-title="Detach account">
                          <i class="la la-trash"></i>
                        </button>
                      </div>
                    </template>
                    <template v-else>There is no attached marketing accounts</template>
                    <!--end::Item-->
                  </div>
                </div>
              </div>
              <!--end::Form-->
            </div>
            <!--end::Card-->
          </div>
          <!--end::Content-->
        </div>
        <!--end::Profile Account Information-->
      </div>
      <!--end::Container-->
    </div>
    <!--end::Entry-->
  </Fragment>
</template>
