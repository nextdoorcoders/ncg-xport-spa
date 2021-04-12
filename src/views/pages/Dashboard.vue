<script>
import Fragment from '../components/Fragment'
import {mapState} from 'vuex'

export default {
  components: {
    Fragment
  },
  computed: {
    ...mapState('marketing/project', [
        'isProjectCollectionLoading',
        'projectCollection'
    ]),
    ...mapState('trigger/map', [
        'isMapCollectionLoading',
        'mapCollection'
    ]),
    ...mapState('marketing/campaign', [
        'isCampaignCollectionLoading',
        'campaignCollection',
    ])
  },
  mounted() {
    this.$store.dispatch('trigger/map/get')
    this.$store.dispatch('marketing/project/get')
    this.$store.dispatch('marketing/campaign/index')
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
            <h2 class="subheader-title text-dark font-weight-bold my-1 mr-3">Dashboard</h2>
            <!--end::Page Title-->
          </div>
          <!--end::Page Heading-->
        </div>
        <!--end::Info-->

        <!--begin::Toolbar-->
        <div class="d-flex align-items-center">
          <!--begin::Button-->
          <router-link :to="{name: 'trigger.map.create'}" class="btn btn-fixed-height btn-white btn-hover-primary font-weight-bold px-2 px-lg-5 mr-2">
            <span class="svg-icon svg-icon-success svg-icon-lg">
              <!--begin::Svg Icon | path:assets/images/svg/icons/Layout/Layout-4-blocks.svg-->
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect id="Rectangle-5" x="0" y="0" width="24" height="24"></rect>
                  <rect id="Rectangle" fill="#000000" opacity="0.3" x="5" y="8" width="2" height="8" rx="1"></rect>
                  <path d="M6,21 C7.1045695,21 8,20.1045695 8,19 C8,17.8954305 7.1045695,17 6,17 C4.8954305,17 4,17.8954305 4,19 C4,20.1045695 4.8954305,21 6,21 Z M6,23 C3.790861,23 2,21.209139 2,19 C2,16.790861 3.790861,15 6,15 C8.209139,15 10,16.790861 10,19 C10,21.209139 8.209139,23 6,23 Z" id="Oval-7-Copy" fill="#000000" fill-rule="nonzero"></path>
                  <rect id="Rectangle-Copy" fill="#000000" opacity="0.3" x="17" y="8" width="2" height="8" rx="1"></rect>
                  <path d="M18,21 C19.1045695,21 20,20.1045695 20,19 C20,17.8954305 19.1045695,17 18,17 C16.8954305,17 16,17.8954305 16,19 C16,20.1045695 16.8954305,21 18,21 Z M18,23 C15.790861,23 14,21.209139 14,19 C14,16.790861 15.790861,15 18,15 C20.209139,15 22,16.790861 22,19 C22,21.209139 20.209139,23 18,23 Z" id="Oval-7-Copy-2" fill="#000000" fill-rule="nonzero"></path>
                  <path d="M6,7 C7.1045695,7 8,6.1045695 8,5 C8,3.8954305 7.1045695,3 6,3 C4.8954305,3 4,3.8954305 4,5 C4,6.1045695 4.8954305,7 6,7 Z M6,9 C3.790861,9 2,7.209139 2,5 C2,2.790861 3.790861,1 6,1 C8.209139,1 10,2.790861 10,5 C10,7.209139 8.209139,9 6,9 Z" id="Oval-7" fill="#000000" fill-rule="nonzero"></path>
                  <path d="M18,7 C19.1045695,7 20,6.1045695 20,5 C20,3.8954305 19.1045695,3 18,3 C16.8954305,3 16,3.8954305 16,5 C16,6.1045695 16.8954305,7 18,7 Z M18,9 C15.790861,9 14,7.209139 14,5 C14,2.790861 15.790861,1 18,1 C20.209139,1 22,2.790861 22,5 C22,7.209139 20.209139,9 18,9 Z" id="Oval-7-Copy-3" fill="#000000" fill-rule="nonzero"></path>
                </g>
              </svg>
              <!--end::Svg Icon-->
            </span> New Trigger Map
          </router-link>
          <!--end::Button-->

          <!--begin::Button-->
          <router-link :to="{name: 'marketing.project.create'}" class="btn btn-fixed-height btn-white btn-hover-primary font-weight-bold px-2 px-lg-5 mr-2">
            <span class="svg-icon svg-icon-success svg-icon-lg">
              <!--begin::Svg Icon | path:assets/media/svg/icons/General/Shield-check.svg-->
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect id="bound" x="0" y="0" width="24" height="24"></rect>
                  <path d="M3.5,3 L5,3 L5,19.5 C5,20.3284271 4.32842712,21 3.5,21 L3.5,21 C2.67157288,21 2,20.3284271 2,19.5 L2,4.5 C2,3.67157288 2.67157288,3 3.5,3 Z" id="Rectangle-169" fill="#000000"></path>
                  <path d="M6.99987583,2.99995344 L19.754647,2.99999303 C20.3069317,2.99999474 20.7546456,3.44771138 20.7546439,3.99999613 C20.7546431,4.24703684 20.6631995,4.48533385 20.497938,4.66895776 L17.5,8 L20.4979317,11.3310353 C20.8673908,11.7415453 20.8341123,12.3738351 20.4236023,12.7432941 C20.2399776,12.9085564 20.0016794,13 19.7546376,13 L6.99987583,13 L6.99987583,2.99995344 Z" id="Rectangle-170" fill="#000000" opacity="0.3"></path>
                </g>
              </svg>
              <!--end::Svg Icon-->
            </span> New Project
          </router-link>
          <!--end::Button-->

          <!--end::Button-->
        </div>
        <!--end::Toolbar-->
      </div>
    </div>
    <!--end::Subheader-->

    <!--begin::Entry-->
    <div class="d-flex flex-column-fluid">
      <!--begin::Container-->
      <div class=" container ">
        <!--begin::Dashboard-->

        <!--begin::Row-->
        <div class="row">
          <div class="col-lg-12 col-xxl-12">
            <!--begin::Advance Table Widget 9-->
            <div class="card card-custom card-stretch gutter-b">
              <!--begin::Body-->
              <div class="card-body pt-12 pb-3">
                <div class="tab-content">
                  <!--begin::Table-->
                  <div class="table-responsive">
                    <table class="table table-head-custom table-vertical-center table-head-bg table-borderless">
                      <thead>
                        <tr class="text-left">
                          <th style="min-width: 250px" class="pl-7"><span class="text-dark-75">Trigger maps</span></th>
                          <th style="min-width: 120px">Project</th>
                          <th style="min-width: 100px">Status</th>
                          <th style="min-width: 100px"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-if="isMapCollectionLoading">
                          <tr>
                            <td colspan="4" class="text-center"><div class="spinner spinner-track spinner-primary spinner-lg d-inline-block"></div></td>
                          </tr>
                        </template>
                        <template v-else-if="mapCollection.length > 0">
                          <tr v-for="item in mapCollection">
                            <td class="pl-7 py-8">
                              <router-link :to="{name: 'trigger.map.update', params: {map: item.id}}" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">{{ item.name }}</router-link>
                              <span class="text-muted font-weight-bold d-block">{{ item.desc }}</span>
                            </td>
                            <td>
                              <router-link v-if="item.project" :to="{name: 'marketing.project.update', params: {project: item.project.id}}" class="text-dark-75 font-weight-bolder text-hover-primary d-block font-size-lg">{{ item.project.name }}</router-link>
                              <span v-else class="text-dark-75 font-weight-bolder d-block font-size-lg"> - template - </span>
                            </td>
                            <td>
                              <div class="mb-3">
                                <span v-if="item.is_enabled" class="label label-lg label-inline font-weight-bold label-light-primary text-uppercase">Enabled</span>
                                <span v-else class="label label-lg label-inline font-weight-bold label-light-danger text-uppercase">Disabled</span>
                              </div>

                              <span class="font-weight-bold"><span class="text-muted">Delay:</span> <span class="text-dark">{{ item.shutdown_delay }} seconds</span></span>
                            </td>
                            <td class="pr-0 text-right">
                              <router-link :to="{name: 'trigger.map.update', params: {map: item.id}}" class="btn btn-light-success font-weight-bolder font-size-sm">View Trigger Map</router-link>
                            </td>
                          </tr>
                        </template>
                        <template v-else>
                          <tr>
                            <td colspan="4" class="text-center">No records found</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                  <!--end::Table-->
                </div>
              </div>
              <!--end::Body-->
            </div>
            <!--end::Advance Table Widget 9-->
          </div>
          <div class="col-lg-12 col-xxl-12">
            <!--begin::Advance Table Widget 9-->
            <div class="card card-custom card-stretch gutter-b">
              <!--begin::Body-->
              <div class="card-body pt-12 pb-3">
                <div class="tab-content">
                  <!--begin::Table-->
                  <div class="table-responsive">
                    <table class="table table-head-custom table-vertical-center table-head-bg table-borderless">
                      <thead>
                        <tr class="text-left">
                          <th style="min-width: 250px" class="pl-7"><span class="text-dark-75">Projects</span></th>
                          <th style="min-width: 120px">Organization</th>
                          <th style="min-width: 120px">Account</th>
                          <th style="min-width: 100px">Status</th>
                          <th style="min-width: 100px"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-if="isProjectCollectionLoading">
                          <tr>
                            <td colspan="5" class="text-center"><div class="spinner spinner-track spinner-primary spinner-lg d-inline-block"></div></td>
                          </tr>
                        </template>
                        <template v-else-if="projectCollection.length > 0">
                          <tr v-for="item in projectCollection">
                            <td class="pl-7 py-8">
                              <router-link :to="{name: 'marketing.project.update', params: {project: item.id}}" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">{{ item.name }}</router-link>
                              <span class="text-muted font-weight-bold d-block">{{ item.desc }}</span>
                            </td>
                            <td>
                              <router-link v-if="item.organization" :to="{name: 'marketing.organization.update', params: {organization: item.organization.id}}" class="text-dark-75 font-weight-bolder text-hover-primary d-block font-size-lg">{{ item.organization.name }}</router-link>
                              <span v-else class="text-dark-75 font-weight-bolder d-block font-size-lg"> - unknown organization - </span>
                            </td>
                            <td>
                              <span v-if="item.account" class="text-dark-75 font-weight-bolder d-block font-size-lg">{{ item.account.email }}</span>
                              <span v-else class="text-dark-75 font-weight-bolder d-block font-size-lg"> - unknown account - </span>

                              <span v-if="item.account" class="text-muted font-weight-bold">{{ item.account.provider_name }} account</span>
                            </td>
                            <td>
                              <div class="mb-3">
                                <span v-if="item.is_enabled" class="label label-lg label-inline font-weight-bold label-light-primary text-uppercase">Enabled</span>
                                <span v-else class="label label-lg label-inline font-weight-bold label-light-danger text-uppercase">Disabled</span>
                              </div>

                              <span class="font-weight-bold">
                              <span class="text-muted">Date start-end:</span>
                              <template v-if="item.date_start_at">{{ item.date_start_at|date }}</template><template v-else>not set</template>
                              <span class="text-muted">-</span>
                              <template v-if="item.date_end_at">{{ item.date_end_at|date }}</template><template v-else>not set</template>
                            </span>
                            </td>
                            <td class="pr-0 text-right">
                              <router-link :to="{name: 'marketing.project.update', params: {project: item.id}}" class="btn btn-light-success font-weight-bolder font-size-sm">View Project</router-link>
                            </td>
                          </tr>
                        </template>
                        <template v-else>
                          <tr>
                            <td colspan="5" class="text-center">No records found</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                  <!--end::Table-->
                </div>
              </div>
              <!--end::Body-->
            </div>
            <!--end::Advance Table Widget 9-->
          </div>
          <div class="col-lg-12 col-xxl-12">
            <!--begin::Advance Table Widget 9-->
            <div class="card card-custom card-stretch gutter-b">
              <!--begin::Body-->
              <div class="card-body pt-12 pb-3">
                <div class="tab-content">
                  <!--begin::Table-->
                  <div class="table-responsive">
                    <table class="table table-head-custom table-vertical-center table-head-bg table-borderless">
                      <thead>
                        <tr class="text-left">
                          <th style="min-width: 250px" class="pl-7"><span class="text-dark-75">Campaigns</span></th>
                          <th style="min-width: 120px">Trigger Map</th>
                          <th style="min-width: 100px">Status</th>
                          <th style="min-width: 100px"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-if="isCampaignCollectionLoading">
                          <tr>
                            <td colspan="4" class="text-center"><div class="spinner spinner-track spinner-primary spinner-lg d-inline-block"></div></td>
                          </tr>
                        </template>
                        <template v-else-if="campaignCollection.length > 0">
                          <tr v-for="item in campaignCollection">
                            <td class="pl-7 py-8">
                              <router-link :to="{name: 'marketing.campaign.update', params: {campaign: item.id}}" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">{{ item.name }}</router-link>
                              <span class="text-muted font-weight-bold d-block">{{ item.foreign_campaign_id|adwordsID }}</span>
                            </td>
                            <td>
                              <router-link v-if="item.map" :to="{name: 'marketing.map.update', params: {map: item.map.id}}" class="text-dark-75 font-weight-bolder text-hover-primary d-block font-size-lg">{{ item.map.name }}</router-link>
                              <span v-else class="text-dark-75 font-weight-bolder d-block font-size-lg"> - unknown trigger map - </span>
                            </td>
                            <td>
                              <div class="mb-3">
                                <span v-if="item.is_enabled" class="label label-lg label-inline font-weight-bold label-light-primary text-uppercase">Enabled</span>
                                <span v-else class="label label-lg label-inline font-weight-bold label-light-danger text-uppercase">Disabled</span>
                              </div>
                            </td>
                            <td class="pr-0 text-right">
                              <router-link :to="{name: 'marketing.campaign.update', params: {campaign: item.id}}" class="btn btn-light-success font-weight-bolder font-size-sm">View Campaign</router-link>
                            </td>
                          </tr>
                        </template>
                        <template v-else>
                          <tr>
                            <td colspan="4" class="text-center">No records found</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                  <!--end::Table-->
                </div>
              </div>
              <!--end::Body-->
            </div>
            <!--end::Advance Table Widget 9-->
          </div>
        </div>
        <!--end::Row-->

        <!--end::Dashboard-->
      </div>
      <!--end::Container-->
    </div>
    <!--end::Entry-->
  </Fragment>
</template>
