<script>
import Fragment from '../../components/Fragment'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  components: {
    Fragment,
    DataTable,
    Column
  },
  data() {
    return {
      reportCollection: []
    }
  },
  mounted() {
    axios.get('reports/vendors')
        .then(response => {
          this.reportCollection = response.data
        })
  },
  methods: {}
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

    <!--begin::Entry-->
    <div class="d-flex flex-column-fluid">
      <!--begin::Container-->
      <div class=" container ">
        <DataTable :value="reportCollection" :paginator="true" :rows="10"
                   sortMode="multiply"
                   stripedRows
                   paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                   :rowsPerPageOptions="[10,20,50]" responsiveLayout="scroll"
                   currentPageReportTemplate=" Showing {first} to {last} of {totalRecords}">
          <Column field="id" header="ID" sortable></Column>
          <Column field="time" header="Time" sortable></Column>
          <Column field="vendor_service" header="Vendor" sortable></Column>
          <Column field="http_code" header="Code" sortable></Column>
          <Column field="message" header="Message"></Column>
          <Column field="data" header="Data"></Column>
        </DataTable>
      </div>
      <!--end::Container-->
    </div>
    <!--end::Entry-->
  </Fragment>
</template>
