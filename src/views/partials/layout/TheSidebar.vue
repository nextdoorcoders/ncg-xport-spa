<script>
import ability from '../../../scripts/service/ability.service'
import {ADD_BODY_CLASSNAME, REMOVE_BODY_CLASSNAME} from '../../../scripts/store/template/htmlclass.store'
import {mapState} from 'vuex'

export default {
  props: {
    bus: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      currentTab: 'map',
      isAsideMinimize: false,

      search: {
        mapSearch: '',
        projectSearch: '',
        userSearch: '',
        organizationSearch: ''
      }
    }
  },
  computed: {
    ...mapState('trigger/map', [
      'isMapCollectionLoading',
      'mapCollection',
    ]),
    ...mapState('marketing/project', [
      'isProjectCollectionLoading',
      'projectCollection',
    ]),
    ...mapState('account/user', [
      'isUserCollectionLoading',
      'userCollection',
    ]),
    ...mapState('marketing/organization', [
      'isOrganizationCollectionLoading',
      'organizationCollection',
    ]),
    filteredMapCollection() {
      return this.mapCollection.filter(map => {
        return map.name.toLowerCase().includes(this.search.mapSearch.toLowerCase())
      })
    },
    filteredProjectCollection() {
      return this.projectCollection.filter(project => {
        return project.name.toLowerCase().includes(this.search.projectSearch.toLowerCase())
      })
    },
    filteredUserCollection() {
      return this.userCollection.filter(organization => {
        return organization.name.toLowerCase().includes(this.search.userSearch.toLowerCase())
      })
    },
    filteredOrganizationCollection() {
      return this.organizationCollection.filter(organization => {
        return organization.name.toLowerCase().includes(this.search.organizationSearch.toLowerCase())
      })
    }
  },
  mounted() {
    let module = this.$route.meta.module

    if (module === 'map' || module === 'project' || module === 'organization') {
      this.currentTab = module
    } else {
      this.currentTab = 'map'
    }

    this.$store.dispatch('trigger/map/get')
    this.$store.dispatch('marketing/project/get')

    // if (this.$can('view all', 'users')) {
    this.$store.dispatch('account/user/get')
    // }

    // this.$store.dispatch('marketing/organization/get')
  },
  methods: {
    switchSession(user) {
      this.$store.dispatch('account/user/switch', {
        user: user.id
      })
          .then(response => {
            this.$router.push({
              name: 'auth.login'
            })
          })
    },
    onSelectTab(tab) {
      this.currentTab = tab

      if (this.isAsideMinimize) {
        this.$store.dispatch(REMOVE_BODY_CLASSNAME, 'aside-minimize')

        this.isAsideMinimize = false
      }
    },
    onToggleSidebar() {
      if (this.isAsideMinimize) {
        this.$store.dispatch(REMOVE_BODY_CLASSNAME, 'aside-minimize')
      } else {
        this.$store.dispatch(ADD_BODY_CLASSNAME, 'aside-minimize')
      }

      this.isAsideMinimize = !this.isAsideMinimize
    }
  }
}
</script>

<template>
  <div class="aside aside-left d-flex aside-fixed" id="kt_aside">
    <!--begin::Primary-->
    <div class="aside-primary d-flex flex-column align-items-center flex-row-auto">
      <!--begin::Brand-->
      <div class="aside-brand d-flex flex-column align-items-center flex-column-auto py-5 py-lg-12">
        <!--begin::Logo-->
        <router-link :to="{name: 'dashboard'}">
          <img alt="Logo" src="@/assets/images/logo-letter.svg" style="width: 40px" />
        </router-link>
        <!--end::Logo-->
      </div>
      <!--end::Brand-->

      <!--begin::Nav Wrapper-->
      <div class="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull"
           data-scroll="true">
        <!--begin::Nav-->
        <ul class="nav flex-column" role="tablist">
          <!--begin::Item-->
          <li class="nav-item mb-3" data-toggle="tooltip" data-placement="right" data-container="body"
              data-boundary="window" title="Trigger map">
            <button @click="onSelectTab('map')" class="nav-link btn btn-icon btn-clean btn-lg"
                    :class="{'active': currentTab === 'map'}">
              <span class="svg-icon svg-icon-xl">
                <!--begin::Svg Icon | path:assets/images/svg/icons/Layout/Layout-4-blocks.svg-->
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect id="Rectangle-5" x="0" y="0" width="24" height="24"></rect>
                    <rect id="Rectangle" fill="#000000" opacity="0.3" x="5" y="8" width="2" height="8" rx="1"></rect>
                    <path
                        d="M6,21 C7.1045695,21 8,20.1045695 8,19 C8,17.8954305 7.1045695,17 6,17 C4.8954305,17 4,17.8954305 4,19 C4,20.1045695 4.8954305,21 6,21 Z M6,23 C3.790861,23 2,21.209139 2,19 C2,16.790861 3.790861,15 6,15 C8.209139,15 10,16.790861 10,19 C10,21.209139 8.209139,23 6,23 Z"
                        id="Oval-7-Copy" fill="#000000" fill-rule="nonzero"></path>
                    <rect id="Rectangle-Copy" fill="#000000" opacity="0.3" x="17" y="8" width="2" height="8"
                          rx="1"></rect>
                    <path
                        d="M18,21 C19.1045695,21 20,20.1045695 20,19 C20,17.8954305 19.1045695,17 18,17 C16.8954305,17 16,17.8954305 16,19 C16,20.1045695 16.8954305,21 18,21 Z M18,23 C15.790861,23 14,21.209139 14,19 C14,16.790861 15.790861,15 18,15 C20.209139,15 22,16.790861 22,19 C22,21.209139 20.209139,23 18,23 Z"
                        id="Oval-7-Copy-2" fill="#000000" fill-rule="nonzero"></path>
                    <path
                        d="M6,7 C7.1045695,7 8,6.1045695 8,5 C8,3.8954305 7.1045695,3 6,3 C4.8954305,3 4,3.8954305 4,5 C4,6.1045695 4.8954305,7 6,7 Z M6,9 C3.790861,9 2,7.209139 2,5 C2,2.790861 3.790861,1 6,1 C8.209139,1 10,2.790861 10,5 C10,7.209139 8.209139,9 6,9 Z"
                        id="Oval-7" fill="#000000" fill-rule="nonzero"></path>
                    <path
                        d="M18,7 C19.1045695,7 20,6.1045695 20,5 C20,3.8954305 19.1045695,3 18,3 C16.8954305,3 16,3.8954305 16,5 C16,6.1045695 16.8954305,7 18,7 Z M18,9 C15.790861,9 14,7.209139 14,5 C14,2.790861 15.790861,1 18,1 C20.209139,1 22,2.790861 22,5 C22,7.209139 20.209139,9 18,9 Z"
                        id="Oval-7-Copy-3" fill="#000000" fill-rule="nonzero"></path>
                  </g>
                </svg>
                <!--end::Svg Icon-->
              </span>
            </button>
          </li>
          <!--end::Item-->
          <!--begin::Item-->
          <li class="nav-item mb-3" data-toggle="tooltip" data-placement="right" data-container="body"
              data-boundary="window" title="Projects">
            <button @click="onSelectTab('project')" class="nav-link btn btn-icon btn-clean btn-lg"
                    :class="{'active': currentTab === 'project'}">
              <span class="svg-icon svg-icon-xl">
                <!--begin::Svg Icon | path:assets/media/svg/icons/General/Shield-check.svg-->
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect id="bound" x="0" y="0" width="24" height="24"></rect>
                    <path
                        d="M3.5,3 L5,3 L5,19.5 C5,20.3284271 4.32842712,21 3.5,21 L3.5,21 C2.67157288,21 2,20.3284271 2,19.5 L2,4.5 C2,3.67157288 2.67157288,3 3.5,3 Z"
                        id="Rectangle-169" fill="#000000"></path>
                    <path
                        d="M6.99987583,2.99995344 L19.754647,2.99999303 C20.3069317,2.99999474 20.7546456,3.44771138 20.7546439,3.99999613 C20.7546431,4.24703684 20.6631995,4.48533385 20.497938,4.66895776 L17.5,8 L20.4979317,11.3310353 C20.8673908,11.7415453 20.8341123,12.3738351 20.4236023,12.7432941 C20.2399776,12.9085564 20.0016794,13 19.7546376,13 L6.99987583,13 L6.99987583,2.99995344 Z"
                        id="Rectangle-170" fill="#000000" opacity="0.3"></path>
                  </g>
                </svg>
                <!--end::Svg Icon-->
              </span>
            </button>
          </li>
          <!--end::Item-->
          <!--begin::Item-->
          <li v-if="$can('view all', 'users')" class="nav-item mb-3" data-toggle="tooltip" data-placement="right"
              data-container="body" data-boundary="window" title="Users">
            <button @click="onSelectTab('user')" class="nav-link btn btn-icon btn-clean btn-lg"
                    :class="{'active': currentTab === 'user'}">
              <span class="svg-icon svg-icon-xl">
                <!--begin::Svg Icon | path:assets/media/svg/icons/General/Shield-check.svg-->
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                    <path
                        d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z"
                        id="Combined-Shape" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                    <path
                        d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z"
                        id="Combined-Shape" fill="#000000" fill-rule="nonzero"></path>
                  </g>
                </svg>
                <!--end::Svg Icon-->
              </span>
            </button>
          </li>
          <!--end::Item-->
          <!--begin::Item-->

<!--          <li class="nav-item mb-3" data-toggle="tooltip" data-placement="right" data-container="body" data-boundary="window" title="Organizations">
            <button @click="onSelectTab('organization')" class="nav-link btn btn-icon btn-clean btn-lg" :class="{'active': currentTab === 'organization'}">
              <span class="svg-icon svg-icon-xl">
                &lt;!&ndash;begin::Svg Icon | path:assets/media/svg/icons/General/Shield-check.svg&ndash;&gt;
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                    <path d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                    <path d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero"></path>
                  </g>
                </svg>
                &lt;!&ndash;end::Svg Icon&ndash;&gt;
              </span>
            </button>
          </li>-->

          <!-- end::Item-->
          <!-- begin::Item-->

          <li class="nav-item mb-3" data-toggle="tooltip" data-placement="right" data-container="body" data-boundary="window" title="System">
            <button @click="onSelectTab('system')" class="nav-link btn btn-icon btn-clean btn-lg" :class="{'active': currentTab === 'system'}">
              <span class="svg-icon svg-icon-xl">

                <!--begin::Svg Icon | path:assets/media/svg/icons/General/Shield-check.svg-->
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect id="bound" x="0" y="0" width="24" height="24"></rect>
                    <rect id="Rectangle-62-Copy" fill="#000000" opacity="0.3" x="13" y="4" width="3" height="16" rx="1.5"></rect>
                    <rect id="Rectangle-62-Copy-2" fill="#000000" x="8" y="9" width="3" height="11" rx="1.5"></rect>
                    <rect id="Rectangle-62-Copy-4" fill="#000000" x="18" y="11" width="3" height="9" rx="1.5"></rect>
                    <rect id="Rectangle-62-Copy-3" fill="#000000" x="3" y="13" width="3" height="7" rx="1.5"></rect>
                  </g>
                </svg>
                <!--end::Svg Icon-->
              </span>
            </button>
          </li>
          <!--end::Item-->

        </ul>
        <!--end::Nav-->
      </div>
      <!--end::Nav Wrapper-->

      <!--begin::Footer-->
      <div class="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10">
        <!--begin::Aside Toggle-->
        <span @click="onToggleSidebar" class="aside-toggle btn btn-icon btn-primary btn-hover-primary shadow-sm"
              title="Toggle Aside">
          <i class="ki ki-bold-arrow-back icon-sm"></i>
        </span>
        <!--end::Aside Toggle-->


        <!--begin::Reports -->
        <router-link :to="{name: 'reports.vendors'}" class="btn btn-icon btn-clean btn-lg w-40px h-40px"
                     data-toggle="tooltip" data-placement="right" data-container="body" data-boundary="window"
                     title="Reports">
          <span class="symbol symbol-30 symbol-lg-40">
              <span class="svg-icon svg-icon-xl">
                  <!--begin::Svg Icon | path:assets/media/svg/icons/General/Shield-check.svg-->
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect id="bound" x="0" y="0" width="24" height="24"></rect>
                      <rect id="Rectangle-62-Copy" fill="#000000" opacity="0.3" x="13" y="4" width="3" height="16"
                            rx="1.5"></rect>
                      <rect id="Rectangle-62-Copy-2" fill="#000000" x="8" y="9" width="3" height="11" rx="1.5"></rect>
                      <rect id="Rectangle-62-Copy-4" fill="#000000" x="18" y="11" width="3" height="9" rx="1.5"></rect>
                      <rect id="Rectangle-62-Copy-3" fill="#000000" x="3" y="13" width="3" height="7" rx="1.5"></rect>
                    </g>
                  </svg>
                <!--end::Svg Icon-->
              </span>
          </span>
        </router-link>
        <!-- end:: Reports-->

        <!--begin::User-->
        <router-link :to="{name: 'profile.update'}" class="btn btn-icon btn-clean btn-lg w-40px h-40px"
                     data-toggle="tooltip" data-placement="right" data-container="body" data-boundary="window"
                     title="User profile">
          <span class="symbol symbol-30 symbol-lg-40">
            <span class="svg-icon svg-icon-xl">
              <!--begin::Svg Icon | path:assets/images/svg/icons/General/User.svg-->
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <polygon points="0 0 24 0 24 24 0 24" />
                  <path
                      d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                      fill="#000000" fill-rule="nonzero" opacity="0.3" />
                  <path
                      d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                      fill="#000000" fill-rule="nonzero" />
                </g>
              </svg>
              <!--end::Svg Icon-->
            </span>
            <!--<span class="symbol-label font-size-h5 font-weight-bold">S</span>-->
          </span>
        </router-link>
        <!--end::User-->
      </div>
      <!--end::Footer-->
    </div>
    <!--end::Primary-->

    <!--begin::Secondary-->
    <div class="aside-secondary d-flex flex-row-fluid">
      <!--begin::Workspace-->
      <div class="aside-workspace scroll scroll-push my-2">
        <!--begin::Tab Content-->
        <div class="tab-content">
          <!--begin::Tab Pane-->
          <div class="tab-pane p-3 px-lg-7 py-lg-5 fade" :class="{'show active': currentTab === 'map'}">
            <!--begin::Form-->
            <div class="p-2 p-lg-3">
              <div class="d-flex">
                <div class="input-icon h-40px">
                  <input v-model="search.mapSearch" type="text"
                         class="form-control form-control-lg form-control-solid h-40px" placeholder="Search..." />
                  <span>
                    <span class="svg-icon svg-icon-lg">
                      <!--begin::Svg Icon | path:assets/images/svg/icons/General/Search.svg-->
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
                           version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24" />
                          <path
                              d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
                              fill="#000000" fill-rule="nonzero" opacity="0.3" />
                          <path
                              d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
                              fill="#000000" fill-rule="nonzero" />
                        </g>
                      </svg>
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                </div>

                <router-link :to="{name: 'trigger.map.create'}"
                             class="btn btn-icon btn-default btn-hover-primary ml-2 h-40px w-40px flex-shrink-0"
                             data-toggle="tooltip" title="New Trigger Map" data-placement="bottom">
                  <span class="svg-icon svg-icon-lg">
                    <!--begin::Svg Icon | path:assets/images/svg/icons/Code/Plus.svg-->
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
                         version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect id="bound" x="0" y="0" width="24" height="24"></rect>
                        <circle id="Oval-5" fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle>
                        <path
                            d="M11,11 L11,7 C11,6.44771525 11.4477153,6 12,6 C12.5522847,6 13,6.44771525 13,7 L13,11 L17,11 C17.5522847,11 18,11.4477153 18,12 C18,12.5522847 17.5522847,13 17,13 L13,13 L13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 L11,13 L7,13 C6.44771525,13 6,12.5522847 6,12 C6,11.4477153 6.44771525,11 7,11 L11,11 Z"
                            id="Combined-Shape" fill="#000000"></path>
                      </g>
                    </svg>
                    <!--end::Svg Icon-->
                  </span>
                </router-link>
              </div>
            </div>
            <!--end::Form-->

            <h3 class="p-2 p-lg-3 my-1 my-lg-3">Trigger Maps</h3>

            <!--begin::List-->
            <div class="list list-hover">
              <!--begin::Item-->
              <router-link v-for="map in filteredMapCollection"
                           :to="{name: 'trigger.map.update', params: {map: map.id}}" :key="map.id"
                           class="list-item hoverable p-2 p-lg-3 mb-2">
                <div class="d-flex align-items-center">
                  <!--begin::Text-->
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <span class="text-dark-75 font-size-h6 mb-0">{{ map.name }}</span>
                    <span class="text-muted text-hover-primary font-weight-bold">{{ map.desc }}</span>
                  </div>
                  <!--begin::End-->
                </div>
              </router-link>
              <!--end::Item-->
            </div>
            <!--end::List-->
          </div>
          <!--end::Tab Pane-->

          <!--begin::Tab Pane-->
          <div class="tab-pane p-3 px-lg-7 py-lg-5 fade" :class="{'show active': currentTab === 'project'}">
            <!--begin::Form-->
            <div class="p-2 p-lg-3">
              <div class="d-flex">
                <div class="input-icon h-40px">
                  <input v-model="search.projectSearch" type="text"
                         class="form-control form-control-lg form-control-solid h-40px" placeholder="Search..." />
                  <span>
                    <span class="svg-icon svg-icon-lg">
                      <!--begin::Svg Icon | path:assets/images/svg/icons/General/Search.svg-->
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
                           version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24" />
                          <path
                              d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
                              fill="#000000" fill-rule="nonzero" opacity="0.3" />
                          <path
                              d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
                              fill="#000000" fill-rule="nonzero" />
                        </g>
                      </svg>
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                </div>

                <router-link :to="{name: 'marketing.project.create'}"
                             class="btn btn-icon btn-default btn-hover-primary ml-2 h-40px w-40px flex-shrink-0"
                             data-toggle="tooltip" title="New Project" data-placement="bottom">
                  <span class="svg-icon svg-icon-lg">
                    <!--begin::Svg Icon | path:assets/images/svg/icons/Code/Plus.svg-->
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
                         version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect id="bound" x="0" y="0" width="24" height="24"></rect>
                        <circle id="Oval-5" fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle>
                        <path
                            d="M11,11 L11,7 C11,6.44771525 11.4477153,6 12,6 C12.5522847,6 13,6.44771525 13,7 L13,11 L17,11 C17.5522847,11 18,11.4477153 18,12 C18,12.5522847 17.5522847,13 17,13 L13,13 L13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 L11,13 L7,13 C6.44771525,13 6,12.5522847 6,12 C6,11.4477153 6.44771525,11 7,11 L11,11 Z"
                            id="Combined-Shape" fill="#000000"></path>
                      </g>
                    </svg>
                    <!--end::Svg Icon-->
                  </span>
                </router-link>
              </div>
            </div>
            <!--end::Form-->

            <h3 class="p-2 p-lg-3 my-1 my-lg-3">Projects</h3>

            <!--begin::List-->
            <div class="list list-hover">
              <!--begin::Item-->
              <router-link v-for="project in filteredProjectCollection"
                           :to="{name: 'marketing.project.update', params: {project: project.id}}" :key="project.id"
                           class="list-item hoverable p-2 p-lg-3 mb-2">
                <div class="d-flex align-items-center">
                  <!--begin::Text-->
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <span class="text-dark-75 font-size-h6 mb-0">{{ project.name }}</span>
                    <span class="text-muted text-hover-primary font-weight-bold">
                      <template v-if="project.parameters.account_id">#{{ project.parameters.account_id }}</template>
                      <template v-if="project.parameters.account_id && project.account"> / </template>
                      <template v-if="project.account">{{ project.account.email }}</template>
                    </span>
                  </div>
                  <!--begin::End-->
                </div>
              </router-link>
              <!--end::Item-->
            </div>
            <!--end::List-->
          </div>
          <!--end::Tab Pane-->

          <!--begin::Tab Pane-->
          <div v-if="$can('view all', 'users')" class="tab-pane p-3 px-lg-7 py-lg-5 fade"
               :class="{'show active': currentTab === 'user'}">
            <!--begin::Form-->
            <div class="p-2 p-lg-3">
              <div class="d-flex">
                <div class="input-icon h-40px">
                  <input v-model="search.organizationSearch" type="text"
                         class="form-control form-control-lg form-control-solid h-40px" placeholder="Search..." />
                  <span>
                    <span class="svg-icon svg-icon-lg">
                      <!--begin::Svg Icon | path:assets/images/svg/icons/General/Search.svg-->
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
                           version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24" />
                          <path
                              d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
                              fill="#000000" fill-rule="nonzero" opacity="0.3" />
                          <path
                              d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
                              fill="#000000" fill-rule="nonzero" />
                        </g>
                      </svg>
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <!--end::Form-->

            <h3 class="p-2 p-lg-3 my-1 my-lg-3">Users</h3>

            <!--begin::List-->
            <div class="list list-hover">
              <!--begin::Item-->
              <router-link @click.native="switchSession(user)" to="/" v-for="user in filteredUserCollection"
                           :to="{name: 'profile.update', params: {user: user.id}}" :key="user.id"
                           class="list-item hoverable p-2 p-lg-3 mb-2">
                <div class="d-flex align-items-center">
                  <!--begin::Text-->
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <span class="text-dark-75 font-size-h6 mb-0">{{ user.name }}</span>
                    <span class="text-muted text-hover-primary font-weight-bold">{{ user.email }}</span>
                  </div>
                  <!--begin::End-->
                </div>
              </router-link>
              <!--end::Item-->
            </div>
            <!--end::List-->
          </div>
          <!--end::Tab Pane-->

          <!--begin::Tab Pane-->
<!--          <div class="tab-pane p-3 px-lg-7 py-lg-5 fade" :class="{'show active': currentTab === 'organization'}">
            &lt;!&ndash;begin::Form&ndash;&gt;
            <div class="p-2 p-lg-3">
              <div class="d-flex">
                <div class="input-icon h-40px">
                  <input v-model="search.organizationSearch" type="text" class="form-control form-control-lg form-control-solid h-40px" placeholder="Search..."/>
                  <span>
                    <span class="svg-icon svg-icon-lg">
                      &lt;!&ndash;begin::Svg Icon | path:assets/images/svg/icons/General/Search.svg&ndash;&gt;
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
                          <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero"/>
                        </g>
                      </svg>
                      &lt;!&ndash;end::Svg Icon&ndash;&gt;
                    </span>
                  </span>
                </div>
                <router-link :to="{name: 'marketing.organization.create'}" class="btn btn-icon btn-default btn-hover-primary ml-2 h-40px w-40px flex-shrink-0" data-toggle="tooltip" title="New Organization" data-placement="bottom">
                  <span class="svg-icon svg-icon-lg">
                    &lt;!&ndash;begin::Svg Icon | path:assets/images/svg/icons/Code/Plus.svg&ndash;&gt;
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect id="bound" x="0" y="0" width="24" height="24"></rect>
                        <circle id="Oval-5" fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle>
                        <path d="M11,11 L11,7 C11,6.44771525 11.4477153,6 12,6 C12.5522847,6 13,6.44771525 13,7 L13,11 L17,11 C17.5522847,11 18,11.4477153 18,12 C18,12.5522847 17.5522847,13 17,13 L13,13 L13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 L11,13 L7,13 C6.44771525,13 6,12.5522847 6,12 C6,11.4477153 6.44771525,11 7,11 L11,11 Z" id="Combined-Shape" fill="#000000"></path>
                      </g>
                    </svg>
                    &lt;!&ndash;end::Svg Icon&ndash;&gt;
                  </span>
                </router-link>
              </div>
            </div>
                      &lt;!&ndash;end::Form&ndash;&gt;

            <h3 class="p-2 p-lg-3 my-1 my-lg-3">Organizations</h3>

            &lt;!&ndash;begin::List&ndash;&gt;
            <div class="list list-hover">
              &lt;!&ndash;begin::Item&ndash;&gt;
              <router-link v-for="organization in filteredOrganizationCollection" :to="{name: 'marketing.organization.update', params: {organization: organization.id}}" :key="organization.id" class="list-item hoverable p-2 p-lg-3 mb-2">
                <div class="d-flex align-items-center">
                  &lt;!&ndash;begin::Text&ndash;&gt;
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <span class="text-dark-75 font-size-h6 mb-0">{{ organization.name }}</span>
                    <span class="text-muted text-hover-primary font-weight-bold">#{{ organization.email }}</span>
                  </div>
                  &lt;!&ndash;begin::End&ndash;&gt;
                </div>
              </router-link>
              &lt;!&ndash;end::Item&ndash;&gt;
            </div>
            &lt;!&ndash;end::List&ndash;&gt;
          </div>-->
          <!--end::Tab Pane-->

          <!--begin::Tab Pane-->
          <div class="tab-pane p-3 px-lg-7 py-lg-5 fade" :class="{'show active': currentTab === 'system'}">

            <h3 class="p-2 p-lg-3 my-1 my-lg-3">System</h3>

            <!--begin::List-->
            <div class="list list-hover">
              <!--begin::Item-->
              <router-link :to="{name: 'system.data-source'}" class="list-item hoverable p-2 p-lg-3 mb-2">
                <div class="d-flex align-items-center">
                  <!--begin::Text-->
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <span class="text-dark-75 font-size-h6 mb-0">Data Source</span>
                    <span class="text-muted text-hover-primary font-weight-bold">System data</span>
                  </div>
                  <!--begin::End-->
                </div>
              </router-link>
              <router-link :to="{name: 'system.logs'}" class="list-item hoverable p-2 p-lg-3 mb-2">
                <div class="d-flex align-items-center">
                  <!--begin::Text-->
                  <div class="d-flex flex-column flex-grow-1 mr-2">
                    <span class="text-dark-75 font-size-h6 mb-0">Logs</span>
                    <span class="text-muted text-hover-primary font-weight-bold">System logs</span>
                  </div>
                  <!--begin::End-->
                </div>
              </router-link>
              <!--end::Item-->
            </div>
            <!--end::List-->
          </div>
          <!--end::Tab Pane-->
        </div>
        <!--end::Tab Content-->
      </div>
      <!--end::Workspace-->
    </div>
    <!--end::Secondary-->
  </div>
</template>
