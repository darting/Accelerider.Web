export const loginmixin = {
    name: 'loginmixin',
    data () {
      return {
      }
    },
    methods:{
      getToken: function () {
        return sessionStorage.getItem('accessToken');
      },
      logout: function () {
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('autologin');
      }
    }
}
