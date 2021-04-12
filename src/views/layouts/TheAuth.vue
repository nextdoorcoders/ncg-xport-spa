<template>
  <div class="d-flex flex-column flex-root">
    <!--begin::Login-->
    <div class="login login-4 wizard d-flex flex-column flex-lg-row flex-column-fluid">
      <!--begin::Content-->
      <router-view :key="$route.path" :bus="bus"/>
      <!--begin::Content-->

      <!--begin::Aside-->
      <div class="login-aside order-1 order-lg-2 bgi-no-repeat bgi-position-x-right">
        <div class="login-conteiner bgi-no-repeat bgi-position-x-right bgi-position-y-bottom">
          <!--begin::Aside title-->
          <h3 class="pt-lg-40 pl-lg-20 pb-lg-0 pl-10 py-20 m-0 d-flex justify-content-lg-start font-weight-boldest display5 display1-lg text-white">
            Trigger<br/>based<br/>Marketing
          </h3>
          <!--end::Aside title-->
        </div>
      </div>
      <!--end::Aside-->
    </div>
    <!--end::Login-->
  </div>
</template>

<script>
export default {
  props: {
    bus: {
      required: true,
      type: Object
    }
  }
}
</script>
