<template>
  <Fragment>
    <TheMobileHeader/>

    <div class="d-flex flex-column flex-root">
      <!--begin::Page-->
      <div class="d-flex flex-row flex-column-fluid page">
        <!--begin::Aside-->
        <TheSidebar :bus="bus"/>
        <!--end::Aside-->

        <!--begin::Wrapper-->

        <div class="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
          <!--begin::Content-->
          <div class="content  d-flex flex-column flex-column-fluid" id="kt_content">
            <router-view :key="$route.path" :bus="bus"/>
          </div>
          <!--end::Content-->

          <!--begin::Footer-->
          <TheFooter/>
          <!--end::Footer-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Page-->
    </div>

    <TheFloatingSidebar/>
  </Fragment>
</template>

<script>
import Fragment from '../components/Fragment'
import TheFloatingSidebar from '../partials/layout/TheFloatingSidebar'
import TheFooter from '../partials/layout/TheFooter'
import TheMobileHeader from '../partials/layout/TheMobileHeader'
import TheSidebar from '../partials/layout/TheSidebar'

export default {
  components: {
    Fragment,
    TheFloatingSidebar,
    TheFooter,
    TheMobileHeader,
    TheSidebar,
  },
  props: {
    bus: {
      required: true,
      type: Object
    }
  }
}
</script>
