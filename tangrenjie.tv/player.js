var killErrors = function (value) {
    return true
};
//window.onerror = null;
//window.onerror = killErrors;
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return out
}

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3]
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4]
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
    }
    return out
}

function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i)
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        }
    }
    return out
}

function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                break
        }
    }
    return out
}
var _0x4e27 = ['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', 'W6KGWPjQW5nXW6xcG37cG0XV', 'W5tcJau6pSkuW4W', 'WO05WPzJW54yvmohW5Ppbmoo', 'lg/dRKhdPmkmjutcNCo7W5BcQge', 'W6OLWP9PW5SwW5NcJvRcM0m', 'WQ4/WQdcI8oMWPKmW4NcKwSZh2C', 'a8o3WPLDiCkQaMBcRcGhrW', 'WQ48WQ3cJSoGWPGeW6pcLM8IhLq', 'EwGcE2VdPCkLz8oLW4VcKGW', 'oWaR', 'WP/cIsueW5JcVmoS', 'WRNdG8o7tYxdSwi', 'mJvaiJVcSSkI', 'oSkTW7OXDSo1uKZdM39dWOm', 'W7RdLmoMwd/dIf43', 'bCotjSo/hmo4WPNcGti9WONcImoA', 'W54pdmoqhdpdU2JcRxpdQx8', 'sgdcQMNdMvJdImkGW6XTgfG', 'WPqWWRzPW7BdS8k8lmk4nmoB'];
var _0x1084 = function (_0x343ada, _0xa58c38) {
    _0x343ada = _0x343ada - 0x18c;
    var _0x4e275 = _0x4e27[_0x343ada];
    if (_0x1084['DSjgyq'] === undefined) {
        var _0x10840e = function (_0x4bc250) {
            var _0x45fe3c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
            var _0x17ddd7 = '';
            for (var _0x281434 = 0x0, _0x5b6fa2, _0x462688, _0x1d0253 = 0x0; _0x462688 = _0x4bc250['charAt'](_0x1d0253++); ~_0x462688 && (_0x5b6fa2 = _0x281434 % 0x4 ? _0x5b6fa2 * 0x40 + _0x462688 : _0x462688,
                    _0x281434++ % 0x4) ? _0x17ddd7 += String['fromCharCode'](0xff & _0x5b6fa2 >> (-0x2 * _0x281434 & 0x6)) : 0x0) {
                _0x462688 = _0x45fe3c['indexOf'](_0x462688);
            }
            return _0x17ddd7;
        };
        var _0x118586 = function (_0x145cc4, _0x388d4e) {
            var _0x1a048b = [],
                _0x3fa85f = 0x0,
                _0x527f6a, _0xb940f = '',
                _0x1bfa23 = '';
            _0x145cc4 = _0x10840e(_0x145cc4);
            for (var _0x3e70b8 = 0x0, _0x167582 = _0x145cc4['length']; _0x3e70b8 < _0x167582; _0x3e70b8++) {
                _0x1bfa23 += '%' + ('00' + _0x145cc4['charCodeAt'](_0x3e70b8)['toString'](0x10))['slice'](-0x2);
            }
            _0x145cc4 = decodeURIComponent(_0x1bfa23);
            var _0x4e6e47;
            for (_0x4e6e47 = 0x0; _0x4e6e47 < 0x100; _0x4e6e47++) {
                _0x1a048b[_0x4e6e47] = _0x4e6e47;
            }
            for (_0x4e6e47 = 0x0; _0x4e6e47 < 0x100; _0x4e6e47++) {
                _0x3fa85f = (_0x3fa85f + _0x1a048b[_0x4e6e47] + _0x388d4e['charCodeAt'](_0x4e6e47 % _0x388d4e['length'])) % 0x100,
                    _0x527f6a = _0x1a048b[_0x4e6e47],
                    _0x1a048b[_0x4e6e47] = _0x1a048b[_0x3fa85f],
                    _0x1a048b[_0x3fa85f] = _0x527f6a;
            }
            _0x4e6e47 = 0x0,
                _0x3fa85f = 0x0;
            for (var _0x2d270e = 0x0; _0x2d270e < _0x145cc4['length']; _0x2d270e++) {
                _0x4e6e47 = (_0x4e6e47 + 0x1) % 0x100,
                    _0x3fa85f = (_0x3fa85f + _0x1a048b[_0x4e6e47]) % 0x100,
                    _0x527f6a = _0x1a048b[_0x4e6e47],
                    _0x1a048b[_0x4e6e47] = _0x1a048b[_0x3fa85f],
                    _0x1a048b[_0x3fa85f] = _0x527f6a,
                    _0xb940f += String['fromCharCode'](_0x145cc4['charCodeAt'](_0x2d270e) ^ _0x1a048b[(_0x1a048b[_0x4e6e47] + _0x1a048b[_0x3fa85f]) % 0x100]);
            }
            return _0xb940f;
        };
        _0x1084['iSjmAR'] = _0x118586,
            _0x1084['aSAfXI'] = {},
            _0x1084['DSjgyq'] = !![];
    }
    var _0x456b8a = _0x4e27[0x0],
        _0x2c5a81 = _0x343ada + _0x456b8a,
        _0x13789e = _0x1084['aSAfXI'][_0x2c5a81];
    return _0x13789e === undefined ? (_0x1084['lOSswF'] === undefined && (_0x1084['lOSswF'] = !![]),
            _0x4e275 = _0x1084['iSjmAR'](_0x4e275, _0xa58c38),
            _0x1084['aSAfXI'][_0x2c5a81] = _0x4e275) : _0x4e275 = _0x13789e,
        _0x4e275;
};
var _0x57d899 = _0x1084;
(function (_0x34d334, _0x3998db) {
        var _0x2e7fc5 = _0x1084,
            _0x5beee1 = _0x1084,
            _0x513a9e = _0x1084;
        while (!![]) {
            try {
                var _0x32ef4f = parseInt(_0x2e7fc5(0x192, 'rBsG')) + -parseInt(_0x5beee1(0x19f, 'Z([j')) * -parseInt(_0x5beee1(0x18f, '08H^')) + parseInt(_0x513a9e(0x195, 'Ny0n')) + parseInt(_0x513a9e(0x199, ')WIY')) * -parseInt(_0x2e7fc5(0x18c, 'L&Y#')) + parseInt(_0x513a9e(0x19e, 'K%6P')) + -parseInt(_0x2e7fc5(0x193, 'Ny0n')) + -parseInt(_0x5beee1(0x19b, 'DodX'));
                if (_0x32ef4f === _0x3998db)
                    break;
                else
                    _0x34d334['push'](_0x34d334['shift']());
            } catch (_0x3c0985) {
                _0x34d334['push'](_0x34d334['shift']());
            }
        }
    }(_0x4e27, 0xedf6c),
    eval(function (_0x2d3172, _0x2c2539, _0x38bd6c, _0x3cf295, _0x48e9dc, _0x5e54e9) {
        var _0x17e035 = _0x1084;
        _0x48e9dc = function (_0x153ee3) {
            var _0x3f0463 = _0x1084,
                _0x5f7d27 = _0x1084;
            return (_0x153ee3 < _0x2c2539 ? '' : _0x48e9dc(parseInt(_0x153ee3 / _0x2c2539))) + ((_0x153ee3 = _0x153ee3 % _0x2c2539) > 0x23 ? String[_0x3f0463(0x190, 'BlEY')](_0x153ee3 + 0x1d) : _0x153ee3[_0x5f7d27(0x19c, ')WIY')](0x24));
        };
        if (!'' [_0x17e035(0x19a, 'm0lZ')](/^/, String)) {
            while (_0x38bd6c--)
                _0x5e54e9[_0x48e9dc(_0x38bd6c)] = _0x3cf295[_0x38bd6c] || _0x48e9dc(_0x38bd6c);
            _0x3cf295 = [function (_0x246c21) {
                    return _0x5e54e9[_0x246c21];
                }],
                _0x48e9dc = function () {
                    var _0x24a432 = _0x1084;
                    return _0x24a432(0x197, 'hzuX');
                },
                _0x38bd6c = 0x1;
        };
        while (_0x38bd6c--)
            if (_0x3cf295[_0x38bd6c])
                _0x2d3172 = _0x2d3172['replace'](new RegExp('\x5cb' + _0x48e9dc(_0x38bd6c) + '\x5cb', 'g'), _0x3cf295[_0x38bd6c]);
        return _0x2d3172;
    }('y\x20e={\x2715\x27:7(f,t){c(!t){t=1F\x201G()}y\x20a=[\x27日\x27,\x27一\x27,\x27二\x27,\x27三\x27,\x27四\x27,\x27五\x27,\x27六\x27];f=f.4(/1H|1I/,t.1J());f=f.4(/1K|1L/,(t.U()%6)>9?(t.U()%6).q():\x270\x27+(t.U()%6));f=f.4(/1M/,t.E()>9?t.E().q():\x270\x27+t.E());f=f.4(/M/g,t.E());f=f.4(/w|W/g,a[t.1N()]);f=f.4(/1O|1P/,t.F()>9?t.F().q():\x270\x27+t.F());f=f.4(/d|D/g,t.F());f=f.4(/1Q|1R/,t.G()>9?t.G().q():\x270\x27+t.G());f=f.4(/h|H/g,t.G());f=f.4(/1S/,t.I()>9?t.I().q():\x270\x27+t.I());f=f.4(/m/g,t.I());f=f.4(/1T|1U/,t.J()>9?t.J().q():\x270\x27+t.J());f=f.4(/s|S/g,t.J());16\x20f},\x2717\x27:7(s,n){16\x203.18.4(\x27{V}\x27,s).4(\x27{V}\x27,s).4(\x27{X}\x27,n).4(\x27{X}\x27,n)},\x271V\x27:7(s,n){1W.1X=3.17(s,n)},\x271Y\x27:7(){$(\x27#j\x27).Y(\x27k\x27,3.19);1Z(7(){e.1a()},3.1b*20);$(\x22#Z\x22).10(0).21=3.22+\x27\x27;y\x20a=K.23(\x271c\x27);a.24=\x2725/26\x27;a.27=1d;a.28=\x2729-8\x27;a.k=11(\x272a=\x27)+\x27?r=\x27+3.15(\x272b\x27);y\x20b=K.2c(\x271c\x27)[0];b.2d.2e(a,b)},\x272f\x27:7(){c($(\x22#j\x22).Y(\x27k\x27)!=3.12){$(\x22#j\x22).Y(\x27k\x27,3.12)}$(\x22#j\x22).1e()},\x271a\x27:7(){$(\x27#j\x27).2g()},\x272h\x27:7(){3.1f=2i;$(\x27#1g\x27).1e()},\x271h\x27:7(){K.1i(\x27<A>.e{2j:\x20#2k;2l-2m:2n;2o:#2p;2q:1j;2r:1j;L:2s;2t:2u;u:\x27+3.v+\x27;l:\x27+3.x+\x27;2v-l:2w;}.e\x2013{u:6%;l:6%;}.e\x20#Z{L:2x;!2y;u:6%;l:6%;}</A><1k\x202z=\x22e\x22>\x27+\x27<N\x20O=\x22j\x22\x20k=\x22\x22\x201l=\x220\x22\x201m=\x2214\x22\x20u=\x226%\x22\x20l=\x226%\x22\x20A=\x22L:1n;z-1o:1p;\x22></N><N\x20O=\x221g\x22\x20k=\x22\x22\x201l=\x220\x22\x201m=\x2214\x22\x20u=\x226%\x22\x20l=\x226%\x22\x20A=\x22L:1n;z-1o:1p;2A:2B;\x22></N>\x27+\x27<13\x202C=\x220\x22\x202D=\x220\x22\x202E=\x220\x22><2F><1q\x20O=\x22Z\x22\x202G=\x222H\x22\x20A=\x22\x22>&2I;</1q></13></1k>\x27);3.1r=$(\x27.e\x27).10(0).1r;3.1s=$(\x27.e\x27).10(0).1s;K.1i(\x27<1t\x27+\x271u\x20k=\x22\x27+3.1v+3.o+\x27.2J\x22></1t\x27+\x271u>\x27)},\x271w\x27:7(){},\x272K\x27:7(){3.1f=1d;3.1x=\x27\x27;y\x20a=2L;c(a.1y==\x271\x27){a.B=P(a.B);a.C=P(a.C)}1z\x20c(a.1y==\x272\x27){a.B=P(11(a.B));a.C=P(11(a.C))}3.p=2M.2N.2O();3.v=5.u;3.x=5.l;c(3.p.i(\x222P\x22)>0||3.p.i(\x222Q\x22)>0||3.p.i(\x222R\x22)>0||3.p.i(\x222S\x22)>0||3.p.i(\x222T\x22)>0||3.p.i(\x222U\x22)>0){3.v=5.2V;3.x=5.2W}c(3.v.i(\x221A\x22)==-1&&3.v.i(\x22%\x22)==-1){3.v=\x276%\x27}c(3.x.i(\x221A\x22)==-1&&3.x.i(\x22%\x22)==-1){3.x=\x276%\x27}3.19=5.2X;3.12=5.j;3.1b=5.2Y;3.1B=a.2Z;3.30=a.31;3.32=a.33;3.18=34(a.35);3.o=a.36;3.37=a.38;3.Q=a.1C==\x2714\x27?\x27\x27:a.1C;3.39=a.B;3.3a=a.C;3.3b=a.3c;3.3d=a.3e;3.3f=a.O;3.3g=a.V;3.3h=a.X;c(5.1D[3.Q]!=1E){3.Q=5.1D[3.Q].3i}c(5.R[3.o]!=1E){c(5.R[3.o].3j==\x221\x22){3.1x=5.R[3.o].T==\x27\x27?5.T:5.R[3.o].T;3.o=\x27T\x27}}3.1v=3k.3l+\x27/3m/3n/\x27;c(3.1B==\x223o\x22){e.1w()}1z{e.1h()}}};', 0x3e, 0xd3, _0x57d899(0x18d, '3][3')['split']('|'), 0x0, {})));
//MacPlayer.Init();

var html = fetch(input, {});
var playerHtml = parseDomForHtml(html, ".player_video&&Html");
var script = playerHtml.match(/<script.*?>(.*?)<\\/script > /i)[1];
eval(script);
var script_links = playerHtml.match(/ < script[ ^ < > ] * ? src = "([^<>]*?)" / g);
var i;
for (i = 0; i < script_links.length; i++) {
    var url_js = "https://www.tangrenjie.tv" + script_links[i].replace(/.*?src="/, "").replace(/"$/, "");
    var trj_js = fetch(url_js, {});
    trj_js = trj_js.replace(/window.onerror=null;window.onerror=killErrors;/m, "").replace(/MacPlayer.Init(.+?);/g, "");
    eval(trj_js);
}
var play_url = unescape(base64decode(player_aaaa.url));

if (getVar('magedn$local') == '0') {
    putVar('fftq', play_url);
    refreshPage();
    'toast://切换选集成功！'
} else {
    play_url
}


//{"name":callback_function}
var message_callbacks = {};
function setup_callback(name,callback){
    message_callbacks[name] = callback;
}

this.message_callbacks["parseDomForArray"](data,error);

function parseDomForArray(input, selector) {
    return new Promise(function (resolve, reject){
        console.log("call parseDomForArray")
        setup_callback("parseDomForArray",function(data,error){
            resolve(data)
        })
        sendMessage("parseDomForArray", JSON.stringify([input, selector]))
    });
}


var res = {};
var d = [];
var html = getResCode();
var tabs;
var conts;
var desc;
var pic_url;
var title;

var promiseDoms = [
    parseDomForArray(html, '.play_source_tab > a'),
    parseDomForArray(html, 'body .content_playlist'),
    parseDomForHtml(html, '.data&&Text')
];

Promise.all(promiseDoms).then((result) => {
    console.log(result);
    tabs = result[0];
    conts = result[1];
    desc = result[2]
}).catch((error) => {
    console.log(error)
});


var htmlContent = "";

var message_callbacks = {};
var callId = -1;
function setup_callback(name,cb){
   callId +=1;
    message_callbacks[callId] = {
      callback: cb
    };
    return callId;
}

function sendMessageWithCallback(name, paramsArray, cb){
  var id = setup_callback("parseDomForArray",cb);
  paramsArray[paramsArray.length] = id;
  console.log(paramsArray);
  sendMessage(name, JSON.stringify(paramsArray));
}

///////////////////////////////////////
//Publish functions
///////////////////////////////////////
function getResCode(){
  return htmlContent;
}

function parseDomForArray(input, selector){
  return new Promise(function (resolve, reject){
      console.log("call parseDomForArray");
      sendMessageWithCallback("parseDomForArray",[input, selector],function(data,error){
           resolve(data)
       });
  });
}

function parseDomForHtml(input, selector){
  return new Promise(function (resolve, reject){
      console.log("call parseDomForHtml");
      sendMessageWithCallback("parseDomForHtml",[input, selector],function(data,error){
           resolve(data)
       });
  });
}

function setHomeResult(res){
  sendMessage("setHomeResult",JSON.stringify(res))
}

function fetchSync(url){
  sendMessage("fetchSync",JSON.stringify(url))
  return ret_fetchSync;
}


var withlabelConts = [];
for (var i = 0; i = contsResult.length; i++) {
    for (var j = 0; j = contsResult[i].length; j++) {
        withlabelConts.push({
            label: tabsResult[i],
            url_html: contsResult[i][j]
        })
    }
}

Promise.all(withlabelConts.map((subCont) => {
    return parseDomForHtml(subCont.url_html, 'a&&href');
})).then((urlsResult) => {
    res.play_urls = urlsResult;
    return Promise.all(withlabelConts.map((subCont) => {
        return parseDomForHtml(subCont.url_html, 'a&&Text');
    }));
}).then((label) => {
    for (var idx = 0; idx < res.play_urls.length; idx++) {
        labels.push(withlabelConts[idx] + label);
    }
    res.play_labels = labels;
    setHomeResult(res);

}).catch((error) => {
    console.log("subCont error:" + error)
});


var withlabelConts = [];
Promise.all(promiseDoms).then((result) => {
    console.log("final result: ");
    console.log(result);
    tabs = result[0];
    conts = result[1]

    res.pic_url = "test url"
    res.description = result[2];
    res.casts = result[3];

    return Promise.all(conts.map((cont) => {
        return parseDomForArray(cont, 'ul > li');
    }));

}).then((contsResult) => {
    console.log("===========");
    console.log(contsResult);
    contsHtml = contsResult;

    return Promise.all(tabs.map((tab) => {
        return parseDomForHtml(tab, 'a b&&Text');
    }));

}).then((tabsResult) => {
    console.log("----------");
    console.log(tabsResult);
    for (var i = 0; i < contsHtml.length; i++) {
        for (var j = 0; j < contsHtml[i].length; j++) {
            withlabelConts.push({
                areaLabel: tabsResult[i],
                url_html: contsHtml[i][j]
            })
        }
    }
    return Promise.all(withlabelConts.map((subCont) => {
        return parseDomForHtml(subCont.url_html, 'a&&href');
    }))

}).then((urlsResult) => {
    res.play_urls = urlsResult;
    return Promise.all(withlabelConts.map((subCont) => {
        return parseDomForHtml(subCont.url_html, 'a&&Text');
    }));
}).then((resLabels) => {
    var labels = [];
    for (var idx = 0; idx < res.play_urls.length; idx++) {
        labels.push(withlabelConts[idx].areaLabel + " - " + resLabels[idx]);
    }
    res.play_labels = labels;

    setHomeResult(res);
}).catch((error) => {
    console.log(error)
});

function get_real_play_url(){
    return new Promise(function (resolve, reject){
        fetch(play_url).then((html) => {
            return parseDomForHtml(html, ".player_video&&Html");
        }).then((playerHtml)=>{
            var script = playerHtml.match(/<script.*?>(.*?)<\/script > /i)[1];
            eval(script);
            var script_links = playerHtml.match(/<script[^<>]*? src = "([^<>]*?)"/g);
        
            var promises = script_links.map((e)=>{
                var url_js = "https://www.tangrenjie.tv" + script_links[i].replace(/.*?src="/, "").replace(/"$/, "");
                return fetch(url_js);
            })
            return Promise.all(promises);
        
            for (var i = 0; i < script_links.length; i++) {
                var url_js = "https://www.tangrenjie.tv" + script_links[i].replace(/.*?src="/, "").replace(/"$/, "");
                var trj_js = fetch(url_js, {});
                trj_js = trj_js.replace(/window.onerror=null;window.onerror=killErrors;/m, "").replace(/MacPlayer.Init(.+?);/g, "");
                eval(trj_js);
            }
        
        }).then((jsresults)=>{
            jsresults.forEach((trj) => {
                var work_js = trj.replace(/window.onerror=null;window.onerror=killErrors;/m, "").replace(/MacPlayer.Init(.+?);/g, "");
                eval(trj_js);
            });
        
            var play_url = unescape(base64decode(player_aaaa.url));
            resolve(play_url);
        }).catch((error) => {
            console.log(error)
            reject(error);
        });
    });

}

if(real_urls.length >0){
    console.log(real_urls);
    //if real url is html, delete it.
    for(var j=real_urls.length-1; j >=0 real_urls.length; j--){
      var re= new RegExp("(.htm|.html)$");
      if (re.test(real_urls[j].toLowerCase())){
        real_urls = real_urls.slice(j,1);
      }
    }
  }
  res.play_urls = real_urls;
  setHomeResult(res);
