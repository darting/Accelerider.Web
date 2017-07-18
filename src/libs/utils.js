import PM from './pathmanager'

class Utils{
  percentSize(a,b){
    return `${((a/b)*100).toFixed(2)}%`;
  }
  transeSize(size){
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

  fileType(filename){
      const index1=filename.lastIndexOf(".");
      const postf=filename.substring(index1+1,filename.length);
      return postf;
  }

  transeTime(mtime){
    let newDate = new Date();
    newDate.setTime(mtime * 1000); 
    return newDate.toLocaleString();
  }

  pathmanager(){ return new PM() }

}

export default Utils;