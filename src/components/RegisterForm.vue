<template lang="pug">
el-form.register-form(label='注册',v-loading='regLoading')
  el-form-item(label='username')
    el-input#username(v-model='username')
  el-form-item(label='password')
    el-input#password(type='password',v-model='pwd')
  el-form-item
    el-button(type='primary', @click='register')
      | {{sumitstr}}
</template>

<script>
import MD5 from '../libs/cryptos.js';
import Bus from '../libs/eventBus.js';
export default {
  name: 'registerform',
  data () {
    return {
      sumitstr:'REGISTER!',
      username:'',
      pwd:'',
      regLoading:false
    }
  },
  methods:{
    parseRep:function(response){
      this.loginLoading = false;
      let data = response.data;
      let errno = data.errno;
      this.regLoading = false;
      if(errno == 0){
        this.$message(data.message);
        Bus.$emit('registersuccess', 'OK');
      }else{
        this.$message.error(data.message);
      }
    },
    register:function(){
      this.regLoading = true;
	    const url="/signup";
      this.$ajax({
        method:'POST',
        url:url,
        params:{"security":"md5"},
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
          }
          return ret
        }],
        data:{
          "name":encodeURIComponent(this.username),
          "password":MD5(this.pwd).toString()
          }
      })
      .then(response=>this.parseRep(response))
      .catch(err=>{
        if(err.response){
          let eresponse = err.response;
          this.parseRep(eresponse);
        }else{
          console.log('Error',err.message)
        }
      });;
    }
  }
}
</script>