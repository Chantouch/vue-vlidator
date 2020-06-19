<template>
    <div id="app">
        <transition name="page" mode="out-in">
            <b-container>
                <router-view/>
            </b-container>
        </transition>
    </div>
</template>

<script>
  import { router } from './bootstrap'

  export default {
    name: 'app',
    router,
    data () {
      return {
        menuVisible: false,
        routes: []
      }
    },
    methods: {
      goTo (name) {
        this.$router.push({ name })
        this.menuVisible = false
      }
    },
    created () {
      this.routes = this.$router.options.routes
    }
  }
</script>

<style lang="scss">
    @import '~bootstrap/scss/bootstrap';
    @import '~bootstrap-vue/src/index';

    html, body, #app {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    #app .md-content {
        position: relative;
        padding: 0;
    }

    #app .md-content > div {
        position: relative;
        height: 100%;
        width: 100%;
    }

    .page-icon {
        margin-right: 10px;
    }

    .md-drawer {
        background-color: white;
    }

    a {
        color: #42b983;
    }
</style>
