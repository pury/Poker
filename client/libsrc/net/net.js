/*
 * Scut sdk lib for websocket.
 */

var Scut = Scut || {};

//var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;
/**
 * function tools
 */
Scut.Utils = {
	/**
	 * parse string to json object. 
	 * @param {String} data
	 * @returns {Object}
	 */
	parseJson: function(data){
		return JSON.parse(data);
	},
	/**
	 * serialize json object to string.
	 * @param {Object} json
	 * @returns {String}
	 */
	serializeJson: function(json) {
		return JSON.stringify(json);
	},
	/**
	 * extend parent's object property.
	 * @param {Object} parent
	 * @param {Object} child
	 * @returns {Object}
	 */
	extend: function(parent, child) {
		var target = child || {};
		var src = parent || {};
		var name, val;
		for (name in src) {
			val = src[name];

			if ( target === val ) {
				continue;
			} else if ( val !== undefined ) {
				target[ name ] = val;
			}
		}
		return target;
	},
	/**
	 * md5 process.
	 * @param {String} str
	 * @returns
	 */
	md5: function(str) {
		return Crypto.md5(str);
	},
	/**
	 * url encode.
	 * @param {Object} param
	 * @returns {String}
	 */
	urlEncode: function(param) {
		var params = param || {};
		var name, val, result;
		for (name in params) {
			val = params[name];
			if(typeof val !== "object" && typeof val !== "function"){
				if(result !== undefined) result = result + '&';
				else result ='';				
				result = result + name + '=' + val;
			}
		}
		return result;
	},
	/**
	 * build request pack.
	 * @param {Object} param
	 * @param {String} key
	 * @returns {String}
	 */
	buildPack: function(param, key) {
		var paramStr = '?d=' + this.sign(this.urlEncode(param), key);
		//console.log('param='+paramStr);
		return paramStr;
	},
	/**
	 * Request param sign.
	 * @param {String} str
	 * @param {String} key
	 * @returns {String}
	 */
	sign: function(str, key) {
		var signKey = str + (key ||'');
		var md5Str = this.md5(signKey);
		/*cc.log('signKey='+signKey+', md5='+md5Str);
		 */
		var result = str + '&sign=' + md5Str;
		if(encodeURIComponent) result = encodeURIComponent(result);
		return result;
	},
	splitStr: function(str, width, fontName, fontSize) {
		var getWidth = function(str) {
			var tmpLabel = cc.LabelTTF.create(str, fontName, fontSize);
			return tmpLabel.getContentSize().width;
		};

		var c = str.length,
		i = 0,
		l = parseInt(width / fontSize, 10),
		lines = [];

		while(i < c) {
			var last = current = '';

			while(true) {
				if(i + l > c) {
					break;
				}

				var s = str.substr(i, l),
				w = getWidth(s);

				if(w != width) {
					if(w > width) {
						current = '-';
						l--;
					} else {
						current = '+';
						l++;
					}

					if(last && last != current) {
						if(current == '+') {
							l--;
						}
						break;
					}

					last = current;

				} else {
					break;
				}
			}

			lines.push(str.substr(i, l));
			i += l;
		}

		return lines;
	}
};

/**
 * Net request.
 */
Scut.Net = {
	OpCode : {
		Close: 8
	},
	_url: '',
	_signKey: '',
	_callback: null,
	_openCall: null,
	_closedCall: null,
	_errorCall: null,
	_instance: null,
	
	setUrl: function(url, callback) {
		this._url = url;
		this._callback = callback;
	},
	setSignKey: function(key) {
		this._signKey = key;
	},
	connect: function() {
		this.Instance();
	},
	isConnect:function(){
	    if (this._instance) {
	        return this._instance.isOpened();
	    }
	    return false;
	},
	reset: function() {
		if(this._instance) this._instance.close();
		this._instance = null;
		Scut.Net.Params.reset();
	},
	regOpenCallback: function (callback) {
	    this._openCall = callback;
	},
	regClosedCallback: function(callback) {
		this._closedCall = callback;
	},
	regErrorCallback: function(callback) {
		this._errorCall = callback;
	},
	Params: {
		_packNumber: 0,
		_uid: 0,
		_sid: '',
		_st: 'st',
		_p: {},
		_getMsgId: function(){ 
			this._packNumber++;
			return this._packNumber;
		},
		reset: function() {
			this._uid = 0;
			this._sid = '';
		},
		getUserId: function() {
			return this._uid ;
		},
		bind: function(uid, sid) {
			this._uid = uid;
			this._sid = sid;
		},
		extend: function(p){
			this._p = Scut.Utils.extend(p, {
				MsgId: this._getMsgId(),
				Sid: this._sid,
				Uid: this._uid,
				St : this._st
			});
			return this._p;
		}
		
	},

	Instance: function() {
		if(!this._instance){
			this._instance = this.ctor(this._url);
		}
		return this._instance;
	},
	/**
	 * init.
	 * @param {string} url
	 */
	ctor: function(url){
		var parent = this;
		
		var _net = {};
	    try {
	        _net._wsClient = new window.WebSocket(url);
	    }
	    catch (e) {
	        console.log("create websocket error");
	    }
		
		_net._wsClient.onopen = function (evt) {
		    console.log("websocket successed!!!!");
		    if (parent._openCall) parent._openCall();
		};
		_net._wsClient.onmessage = function (evt) {
		    console.log(evt);
		    var data = evt.data;
		    console.log("[ws.rec]:" + data);
		    //To determine whether a message conform to the rules!!!
		    isOK= function (data) {
		        var isjson = typeof (data) == "string" && Object.prototype.toString.call(data).toLowerCase() == "[object string]" && (data.length > 0 ? true : false);
		        var A = typeof (data) == "string";
		        var B = Object.prototype.toString.call(data).toLowerCase() == "[object string]";
		        var C = !data.length;
		        return isjson;
		    }
		    if (isOK(data)) {
		        var jsonData = Scut.Utils.parseJson(data) || {};
		        if (parent._callback) {
		            parent._callback(jsonData);
		        }
		    }else{
				console.error("意外的数据类型，请检查！！！");
			}
		};
		_net._wsClient.onerror = function(){
			console.error("websocket error!!!");
			if(parent._errorCall) parent._errorCall();
		};
		_net._wsClient.onclose = function(){
			console.warn("websocket is closed!!!");
			if(parent._closedCall) parent._closedCall();
			parent.reset();
		};
		
		_net.isConnected = function(){
			var state = this._wsClient.readyState;
			return state != WebSocket.CLOSED;
		};
		_net.isOpened = function() {
			var state = this._wsClient.readyState;
			return state == WebSocket.OPEN;
		};
		_net.send = function(data){
			var jsonStr;
			if(typeof data === "object" ){
				jsonStr = Scut.Utils.buildPack(data, Scut.Net._signKey);
			} else{
				jsonStr = data || "";
			}
			//console.log("test server info " + jsonStr);
			//console.log("state: " + this._wsClient.readyState);
			this._wsClient.send(jsonStr);
		};
		_net.close = function(){
			this._wsClient.close();
		};
		return _net;
	}
};
