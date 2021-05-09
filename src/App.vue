<template>
  <div id="app">    
    <router-view></router-view>
    
  </div>
</template>

<script>


export default {
  name: 'App',
  // created(){
  //   const vm = this;
  //   var UserName = JSON.parse(localStorage.getItem('UserName'))||[];
  //   vm.userName = UserName[0].name; 
  //   const api =`${process.env.APIPATH}/api/${vm.userName}/getTodo`;
  //   console.log(api)
  //    this.$http.get(api).then((response) => {
  //     console.log(response.data)
  //    })
  // },
}
</script>

<style lang="scss">
@import "./assets/all.scss";

  body{
  background-color: #3C3C3C;
}
</style>
