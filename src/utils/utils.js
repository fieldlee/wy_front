export function getUrlParam(name) {
    return decodeURIComponent((new RegExp('[&#63;|&]' + name + '=' + '([^&;]+&#63;)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

export default{
    getUrlKey:function(name){
      return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
    }
}