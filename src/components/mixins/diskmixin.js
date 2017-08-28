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
      changefilepath:function(file){
        if(file.isdir==0)return;
        this.$router.push({query:{path:file.path}});
      },
      backFileList:function(){
        const cur = this.utils.pathmanager().getBackPath();
        this.$router.push({query:{path:cur}});
      },
      createFolder:function(){
        this.$prompt('默认新建在当前目录，请输入文件夹名称：', '新建文件夹', {
            inputValue: '新建文件夹',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            this.createfolderapi(value);
          }).catch((e)=>{});
      },createfolderapi:function(){},
      deleteFile:function(file){
        this.$confirm(`确认删除文件(夹)'${file.filename}'吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteFileapi(file.path);
        }).catch(() => {});
      },
      add2plaza:function(api,f){
        this.$prompt('请输入留言', '添加到文件广场', {
            inputValue: '无',
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
      _fileTypeUri:function(file){
        const avalibleType = this.utils.getAvalibleType();
        const movie = ['rmvb','mkv']
        let type = this.utils.fileType(file.filename);
        type =  this.utils.ArrContains(avalibleType, type) ? type : 'default';
        type =  this.utils.ArrContains(movie, type) ? 'movie' : type;
        const filetype = file.isdir==0 ? type : 'folder_win10';
        const typeUri = `./static/icons/${filetype}.png`;
        return typeUri;
      },
      doNothing:function(){
        this.$message.info('开发中。。。欢迎提出改进建议~');
      }
    }
}