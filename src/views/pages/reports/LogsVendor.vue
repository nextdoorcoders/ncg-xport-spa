<script>
import Fragment from '../../components/Fragment'
import {mapState} from "vuex";
import ModalData from '../../partials/reports/ModalData'
import JwPagination from 'jw-vue-pagination';

export default {
  components: {
    Fragment,
    JwPagination
  },
  computed: {
    ...mapState('reports/logs',[
      'isLogsCollectionLoading',
      'LogsCollection',
    ])
  },
  data() {
    return {
      pageOfItems: []
    }
  },
  mounted() {
    this.$store.dispatch('reports/logs/get');
  },
  methods: {
    openDialog(window,item) {
      let message = window === 'message' ? item.message : item.data;
      this.$modal.open({
        component: ModalData,
        data:{
          name:item.vendor_service,
          message:message
        },
      })
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
  },
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
            <h2 class="subheader-title text-dark font-weight-bold my-1 mr-3">Vendors logs</h2>
            <!--end::Page Title-->
          </div>
          <!--end::Page Heading-->
        </div>
        <!--end::Info-->
      </div>
    </div>
    <!--end::Subheader-->
    <div class="d-flex flex-column-fluid">
          <!--begin::Container-->
      <div class=" container ">
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
                          <th style="min-width: 120px">ID</th>
                          <th style="min-width: 120px">Time</th>
                          <th style="min-width: 120px">Vendor</th>
                          <th style="min-width: 100px">Code</th>
                          <th style="min-width: 100px">Message</th>
                          <th style="min-width: 100px">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-if="isLogsCollectionLoading">
                          <tr>
                            <td colspan="5" class="text-center">
                              <div class="spinner spinner-track spinner-primary spinner-lg d-inline-block"></div>
                            </td>
                          </tr>
                        </template>
                        <template v-else-if="pageOfItems.length > 0">
                          <tr v-for="item in pageOfItems">
                            <td>{{ item.id }}</td>
                            <td>{{ item.time }}</td>
                            <td>{{ item.vendor_service }}</td>
                            <td>{{ item.http_code }}</td>
                            <td>
                              <button @click="openDialog('message',item)" class="btn btn-info">View message</button>
                            </td>
                            <td>
                              <button @click="openDialog('data',item)" class="btn btn-info">View data</button>
                            </td>
                          </tr>
                        </template>
                        <template v-else>
                          <tr>
                            <td colspan="5" class="text-center">logs not found</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                    <JwPagination :items="LogsCollection" @changePage="onChangePage" :pageSize="25"></JwPagination>
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
      </div>
      <!--end::Container-->
    </div>

  </Fragment>
</template>
