/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module Scut {
    export class Utils {
        static parseJson(data);
        static serializeJson(data);
        static extend(parent, child);
        static md5(str);
        static urlEncode(param);
        static buildPack(param, key);
        static sign(str, key);
        static splitStr(str, width, fontName, fontSize);     
    }
    
    export class Net{
        static _url;
		static _signKey;
		static _callback;
		static _closedCall;
		static _errorCall;
		static _instance;
        
		static setUrl(url,callback);
		static setSignKey(key);
        static connect();
        static isConnect();
        static reset();
        static regOpenCallback(callback);
		static regClosedCallback(callback);
		static regErrorCallback(callback);
        static Params;
		static Instance();
		static ctor(url);
    }
	
    export class Crypto {
        static md5(string, isLowerCase);
    }
	
	export class Action{
		static events;
		static createReader(jsonData);
		static receive(jsonData);
		static close();
		static error();
	}
}




































