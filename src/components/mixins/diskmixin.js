import { mapGetters } from 'vuex'

export const diskmixin = {
    name: 'diskmixin',
    data () {
      return {
        token: '',
        dialogDL:false,
        downlinks:[],
        curFile:{},
      }
    },
    computed:{
      ...mapGetters({
        uk:'uk',
        isLoading:'isLoading',
        filelist:'filelist',
        m4sfilelist:'m4sfilelist',
      })
    },
    methods:{
      changefilepath:function(file, isdir){
        if(isdir==0)return;
        this.$router.push({query:{path:file.path}});
      },
      backFileList:function(){
        const cur = this.utils.pathmanager().getBackPath();
        this.$router.push({query:{path:cur}});
      },
      add2plaza:function(api,f,filename){
        f.filename=filename;
        this.$prompt('请输入留言', '添加到文件广场', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            api.add2square(this.token, f, value)
            .then(msg=>{
              this.$message.success(msg);
            })
            .catch(e=>this.$message.error(e.message));
          }).catch((e)=>{});
      },
      _fileTypeUri:function(filename,isdir){
        const avalibleType = this.utils.getAvalibleType();
        const movie = ['rmvb','mkv']
        let type = this.utils.fileType(filename);
        type =  this.utils.ArrContains(avalibleType, type) ? type : 'default';
        type =  this.utils.ArrContains(movie, type) ? 'movie' : type;
        const filetype = isdir==0 ? type : 'folder_win10';
        const typeUri = `./static/icons/${filetype}.png`;
        return typeUri;
      },
    }
}