/* eslint-disable */
import PM from './pathmanager'

class Utils{
  percentSize(a,b){
    return Number(((a/b)*100).toFixed(2));
  }
  transeSize(size){
    if(size==0)return '-';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(size) / Math.log(k));
    return `${(size / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  }

  ArrContains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
  }

  getAvalibleType(){
    return ['3ds','7z','accdb','ai','air','apk','arj','as','asax','ascx','ashx','asm','asmx','aspx','bin','bmp','bz2','c','cab','cdr','cer','chm','class','cmd','code','code2','computer','cpp','cs','cshtml','csproj','css','csv','dll','dmg','doc','docm','docx','dot','dotm','dotx','dtd','dwg','dxf','eps','epub','exe','f','file','fla','flv','folder_mac2','folder_public','fon','font','framework','gif','graph_icon','gz','h','hlp','html','indd','ini','ipa','iso','jar','java','jpg','js','json','key','ldf','lnk','makefile','md','mdb','mdf','mht','midi','movie','mp4','mpp','mpt','msg','msi','music','music1','numbers','o','odp','ods','odt','oexe','ogg','pages','pdb','pdf','php','php_small','pkg','pl','png','pps','ppsx','ppt','pptx','prproj','ps1','psd','pspimage','pst','pub','py','rar','rb','recycle','recycle_full','reg','resx','rtf','s','sitx','sln','sql','suo','svg','swf','swift','tar','txt','txt_small','utorrent','vb','vbproj','vbs','vcf','vcproj','vcxproj','vdw','vdx','vsd','vsdx','vss','vst','vsx','vtx','xaml','xap','xls','xlsb','xlsm','xlsx','xlt','xltx','xml','xps','xsd','xsl','y','zip',]
  }

  fileType(filename){
      const index1=filename.lastIndexOf(".");
      const postf=filename.substring(index1+1,filename.length);
      return postf;
  }

  transeTime(mtime){
    const newDate = new Date(mtime * 1000);
    Date.prototype.Format = function (fmt) {
      var o = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    return newDate.Format("yyyy-MM-dd hh:mm");
  }

  pathmanager(){ return new PM() }

}

export default Utils;