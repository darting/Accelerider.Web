<template lang="pug">
.square(v-loading='isLoading')
  el-row(type="flex")
    el-col
      el-button(icon='arrow-left', @click='toWebdisk') 回到百度云
  el-row(type="flex")
    el-table.disk-table(ref="filetable", v-bind:data='filelist', style='width:100%')
        el-table-column(label='文件名',prop='FileName',show-overflow-tooltip,min-width='200')
        el-table-column(label='-',show-overflow-tooltip,width='100')
          template(scope="scope")
            el-button(type='text', @click='downloadFile(scope.row)') 下载
        el-table-column(label='分享者',prop='From', width='130')
        el-table-column(label='分享时间',show-overflow-tooltip,width='180')
          template(scope='scope')
            span {{transeTime(scope.row.Time)}}
        el-table-column(label='分享留言',prop='Message',show-overflow-tooltip,width='180')
        el-table-column(label='评论数',width='90')
          template(scope='scope')
            el-button(type='text', @click='showComments(scope.row.Comments)') {{scope.row.Comments.length}}
    .dialog
      el-dialog(v-model='dialogDL',title='下载链接')
        div()
          p {{downName}}
          ul
            li(v-for='url in downlinks',key = 'url')
              a(v-bind:href='url',target='_blank',rel="noreferrer") 链接
      el-dialog(v-model='dialogCm',title='评论区')
        el-table(v-bind:data='comments', empty-text='此文件还没有人评论', height='260')
          el-table-column(label='评论',prop='Message')
          el-table-column(label='评论人',prop='From', width='130')
          el-table-column(label='评论时间')
            template(scope="scope")
              span {{transeTime(scope.row.Time)}}
        //- el-row
        //-   el-col
        //-     el-input(v-model='mycomment', placeholder="说点什么...")
        //-     el-button(@click='comment') 评论
  el-row(type="flex")
    el-col
      el-button(@click='prePage()') PRE PAGE
      el-button(@click='nextPage()') NEXT PAGE
      el-input-number(v-model='page', v-bind:min="1")
      span 当前页码: {{page}}
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'square',
  data () {
    return {
      number: 15,
      page: 0,
      filelist: [],
      dialogDL: false,
      downName: '',
      downlinks: [],
      dialogCm: false,
      comments: [],
      mycomment: '',
    }
  },
  computed: {
    ...mapGetters({
      isLoading:'isLoading',
      uk:'uk',
    })
  },
  methods:{
    toWebdisk:function(){
      this.$router.push({path:'/disk/home'});
    },
    getSquareList:function(){
      this.$store.commit('viewloading',true);
      this.$squareAPI.filelist(this.number, this.page - 1)
      .then(list=>{
        this.$store.commit('viewloading',false);
        this.filelist = list;
      })
      .catch(e=>{
        this.$store.commit('viewloading',false);
        this.$message.error(e.message)});;
    },
    downloadFile:function(file){
      this.downName = file.FileName;
      this.$store.commit('viewloading',true);
      this.$squareAPI.downfiles(file.Md5)
      .then(links=>{
        this.dialogDL = true;
        this.$store.commit('viewloading',false);
        this.downlinks = links;
      })
      .catch(e=>{
        this.$store.commit('viewloading',false);
        this.$message.error(e.message)});
    },
    showComments:function(comments){
      this.comments = comments;
      this.dialogCm = true;
    },
    comment:function(){
      this.$confirm('确认要评论这个文件吗？(一旦评论不可更改)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$squareAPI.comment(token, md5, this.mycomment)
          .then((data)=>{
            this.$message.success(data.message);
          })
          .catch((e)=>{this.$message.error('评论错误。')});
        }).catch(() => {});
    },
    prePage:function(){
      this.page = this.page>0 ? this.page-1 : 0;
      this.getSquareList();
    },
    nextPage:function(){
      this.page += 1;
      this.getSquareList();
    },
    transeTime:function(mtime){
      return this.utils.transeTime(mtime);
    }
  },
  watch: {
    page(){
      this.getSquareList();
    }
  },
  mounted(){
    this.getSquareList();
  }
}
</script>