<template lang="pug">
  .container
    mu-appbar.header(title='LOGIN')
    form
      .form-group
        mu-text-field#username(label='username',v-model='username',v-bind:labelFloat='true',v-bind:maxLength='64')
      .form-group
        mu-text-field#password(label='password',type='password',v-model='pwd',v-bind:labelFloat='true',v-bind:maxLength='256')
      .form-group
        mu-raised-button(primary, v-on:click='login')
         | {{sumitstr}}
    mu-toast(v-if="toast" v-bind:message="errMsg")
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      sumitstr:'LOGIN!',
      username:'',
      pwd:'',
      toast:false,
      errMsg:''
    }
  },
  methods:{
    parseRep:function(response){
      let data = response.data;
      let errno = data.errno;
      if(errno == 0){
       let token = data.token;
        sessionStorage.setItem('accessToken', token);
        this.$router.push({path:"/main"});
      }else{
        this.errMsg = data.message;
      }
      this.toast = true;
      if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { this.toast = false }, 1000)
      
    },
    login:function(){
	    const url="http://api.pescn.top/login";
      let datas = {
        "name":this.username,
        "password":this.pwd
      };

      this.$ajax({
        method:'POST',
        url:url,
        params:{"security":"express"},
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
          }
          return ret
        }],
        data:datas
      })
      .then(response=>{
        this.parseRep(response);
      })
      .catch(err=>{
        if(err.response){
          let eresponse = err.response;
          this.parseRep(eresponse);
        }else{
          console.log('Error',err.message)
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-group{
	margin:10px
}
</style>