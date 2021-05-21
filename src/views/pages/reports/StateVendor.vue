<script>
import {mapState} from "vuex";

export default {
  name: "DataSource",
  computed: {
    ...mapState('reports/state',[
      'isStateCollectionLoading',
      'StateCollection',
    ])
  },
  mounted() {
    this.$store.dispatch('reports/state/get');
  }
}
</script>
<template>
  <div>
    <!--begin::Subheader-->
    <div class="subheader py-3 py-lg-8 subheader-transparent">
      <div class=" container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <!--begin::Info-->
        <div class="d-flex align-items-center flex-wrap mr-1">
          <!--begin::Page Heading-->
          <div class="d-flex align-items-baseline flex-wrap mr-5">
            <!--begin::Page Title-->
            <h2 class="subheader-title text-dark font-weight-bold my-1 mr-3">Data Source</h2>
            <!--end::Page Title-->
          </div>
          <!--end::Page Heading-->
        </div>
        <!--end::Info-->
      </div>
    </div>
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
                        <th style="min-width: 120px">Vendor name</th>
                        <th style="min-width: 120px">Vendor state</th>
                        <th style="min-width: 100px">Last call</th>
<!--                        <th style="min-width: 100px"></th>-->
                      </tr>
                      </thead>
                      <tbody>
                      <template v-if="isStateCollectionLoading">
                        <tr>
                          <td colspan="5" class="text-center">
                            <div class="spinner spinner-track spinner-primary spinner-lg d-inline-block"></div>
                          </td>
                        </tr>
                      </template>
                      <template v-else-if="StateCollection.length > 0">
                        <tr v-for="item in StateCollection">
                          <td class="pl-7 py-8">{{ item.name }}</td>
                          <td>
                            <div class="mb-3">
                              <span v-if="item.state_for_show === 'Active'"
                                    class="label label-lg label-inline font-weight-bold label-light-primary text-uppercase">
                                {{item.state_for_show}}
                              </span>
                              <span v-else
                                    class="label label-lg label-inline font-weight-bold label-light-danger text-uppercase">
                                {{item.state_for_show}}
                              </span>
                            </div>
                          </td>
                          <td>{{ item.time  }}</td>
                          <!--                        <td class="pr-0 text-right">
                                                    <router-link :to="{name: 'marketing.project.update', params: {project: item.id}}"
                                                                 class="btn btn-light-success font-weight-bolder font-size-sm">View Project
                                                    </router-link>
                                                  </td>-->
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                          <td colspan="5" class="text-center">No source found</td>
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
  </div>
</template>