<template>
  <div class="navbar">
    <nav class="nav-extended inidgo darken-2">
      <div class="nav-content">
        <!-- <router-link to="/"> -->
        <router-link to="/">
          <span class="nav-title">Ninja Smoothies</span>
        </router-link>
        <!-- </router-link> -->
        <a href class="btn-floating btn-large halfway-fab pink">
          <!-- <router-lnk to="/"> -->
          <router-link :to="{name:'AddSmoothie'}">
            <i class="material-icons">add</i>
          </router-link>
          <!-- </router-lnk> -->
          d
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style scoped>
.nav-extended {
  padding: 0 20px;
}
</style>
