<template>
  <div class="min-h-screen w-full">
    <template v-if="!isLogin">
		<div class="flex">
		<Menu class="flex-shrink-0"/>
    <main id="main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
        <component :is="Component" />
        </transition>
      </router-view>
    </main>
		</div>
    </template>
    <router-view name="login" />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue';
import {api} from '@/services';
export default {
  components: {
    Menu,
  },
  computed: {
    isLogin() {
      return this.$route.name === 'Login'
    }
  },
  methods: {
    async getUser() {
      try {
        const response = await api.get('/me');
        this.$store.commit('UPDATE_USER', response.data.data);
      } catch (error) {
        this.error(error.response);
      }
    }
  },
  created() {
    if(this.$route.name !== 'Login') {
      this.getUser();
    }
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
html, body {
  font-family: 'Montserrat', sans-serif;
}
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#main {
  flex: 1 1 0%;
  min-height: 100vh;
  padding-left: 30px;
  padding-right: 30px;
}
</style>