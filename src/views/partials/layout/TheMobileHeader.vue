<template>
  <div id="kt_header_mobile" class="header-mobile ">
    <!--begin::Logo-->
    <router-link :to="{name: 'dashboard'}">
      <img alt="Logo" src="@/assets/images/logo-letter.svg" class="logo-default" style="width: 40px"/>
    </router-link>
    <!--end::Logo-->

    <!--begin::Toolbar-->
    <div class="d-flex align-items-center">
      <button class="btn p-0 burger-icon burger-icon-left" id="kt_aside_mobile_toggle">
        <span></span>
      </button>
    </div>
    <!--end::Toolbar-->
  </div>
</template>

<script>
export default {}
</script>
