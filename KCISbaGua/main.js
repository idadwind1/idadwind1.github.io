function getHashCode(str,caseSensitive){
    if(!caseSensitive){
        str = str.toLowerCase();
    }
    var hash  =   1315423911,i,ch;
    for (i = str.length - 1; i >= 0; i--) {
        ch = str.charCodeAt(i);
        hash ^= ((hash << 5) + ch + (hash >> 2));
    }
    return  (hash & 0x7FFFFFFF);
}
function password()
{
var sword;
while(sword!="527647021")
{
  sword=prompt("请输入密码登录");
  if (sword==null)
  {window.location.href("about:blank");}
  sword=getHashCode(sword);
  if (sword!="527647021")
  {alert("密码错误");}
}
alert("登录成功");
}
