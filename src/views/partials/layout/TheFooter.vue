<script>
export default {}
</script>

<template>
  <!--doc: add "bg-white" class to have footer with solod background color-->
  <div class="footer py-4 d-flex flex-lg-column " id="kt_footer">
    <!--begin::Container-->
    <div class=" container d-flex flex-column flex-md-row align-items-center justify-content-between">
      <!--begin::Copyright-->
      <div class="text-dark order-2 order-md-1">
        <span class="text-muted font-weight-bold mr-2">Copyright &copy; Xport 2020 All rights reserved</span>
      </div>
      <!--end::Copyright-->

      <!--begin::Nav-->
      <div class="nav nav-dark order-1 order-md-2">
        <router-link :to="{name: 'terms-and-conditions'}" target="_blank" class="nav-link pr-3 pl-0">Terms and Conditions</router-link>
        <router-link :to="{name: 'privacy-policy'}" target="_blank" class="nav-link px-3">Privacy Policy</router-link>
      </div>
      <!--end::Nav-->
    </div>
    <!--end::Container-->
  </div>
</template>
