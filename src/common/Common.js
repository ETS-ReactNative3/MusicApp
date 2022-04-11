

export default class Common {
    static isEmpty = (prop) => {
        return (
          prop == null || prop == undefined ||
          (prop.hasOwnProperty('length') && prop.length == 0) ||
          (prop.constructor == Object && Object.keys(prop).length == 0) ||
          (prop instanceof Date && isNaN(prop.getTime()))
        );
      }

      
    static millisToMinutesAndSeconds=(millis,seek)=> {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        if(seek == "seek"){
            return minutes + "." + (seconds < 10 ? '0' : '') + seconds;
        }
        else{
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
        
        }

    static secondsToMins=(sec,seek)=> {
      var minutes = Math.floor(sec / 60);
      var seconds = sec - minutes * 60;
      if(seek == "seek"){
        return minutes + "." + (seconds < 10 ? '0' : '') + seconds;
      }
        else{
          return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
      }
}