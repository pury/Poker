
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    private loadingView: LoadingUI;

    private textLog: egret.TextField;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    //--------------------------------------------------------------------------------
    private onAddToStage(event: egret.Event)
    {
        Game.Config.instance.STAGE_WIDTH = this.stage.stageWidth;
        Game.Config.instance.STAGE_HEIGHT = this.stage.stageHeight;

        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        egret.Injector.mapClass("egret.gui.SkinAdapter", SkinAdapter);
        egret.gui.Theme.load("resource/theme.thm");

        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    //--------------------------------------------------------------------------------
    private onConfigComplete(event: RES.ResourceEvent): void
    {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.getResAsync("config_json", this.handleConfig, this);
    }

    //--------------------------------------------------------------------------------
    private handleConfig(result: Array<any>): void
    {
        if (result)
        {
            Game.Config.instance.LANGUAGE_TYPE = result["LANGUAGE"];
            Game.Config.instance.DEBUG = result["DEBUG"];
            Game.Config.instance.LEYAN_POKER_IP = result["IP"];
            Game.Config.instance.LEYAN_POKER_PORT = result["PORT"];
            //Game.Config.instance.VERSION = result["VERSION"];
            Game.Config.instance.VERSION = "0.0.5";
        }

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    //--------------------------------------------------------------------------------
    private onResourceLoadComplete(event: RES.ResourceEvent): void
    {
        if (event.groupName == "preload")
        {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
        }
    }

    //--------------------------------------------------------------------------------
    private onResourceLoadError(event: RES.ResourceEvent): void
    {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }

    //--------------------------------------------------------------------------------
    private onResourceProgress(event: RES.ResourceEvent): void
    {
        if (event.groupName == "preload")
        {
            //this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    //--------------------------------------------------------------------------------
    private createScene(): void
    {
        var url = window.location.href;
        Game.DUrl.URL_ENTER = url

        var GC = Game.Config.instance;
        this.addChild(Game.GameLayer.instance);
        this.addChild(Game.GameUI.instance);

        if (GC.DEBUG)
        {
            egret.Profiler.getInstance().run();

            var ww = document.documentElement.clientWidth || document.body.clientWidth || 1280;
            var hh = document.documentElement.clientHeight || document.body.clientHeight || 720;

            Game.Log.L.LOG("LYPOKER VERSION: " + GC.VERSION);
            Game.Log.L.LOG("LYPOKER IP_PORT: " + GC.LEYAN_POKER_IP + ":" + GC.LEYAN_POKER_PORT);
            Game.Log.L.LOG("STAGE_WIDTH: " + GC.STAGE_WIDTH);
            Game.Log.L.LOG("STAGE_HEIGHT: " + GC.STAGE_HEIGHT);
            Game.Log.L.LOG("clientWidth: " + document.documentElement.clientWidth);
            Game.Log.L.LOG("clientHeight: " + document.documentElement.clientHeight);
            Game.Log.L.visible = false;

            this.textLog = new egret.TextField();
            this.textLog.x = GC.STAGE_WIDTH - 68;
            this.textLog.y = GC.STAGE_HEIGHT - 30;
            this.textLog.text = "LOG";
            this.textLog.touchEnabled = true;
            this.textLog.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLog, this);
            this.addChild(Game.Log.L);
            this.addChild(this.textLog);
        }
    }

    private testImg: egret.Bitmap;

    //--------------------------------------------------------------------------------
    private showLog(): void
    {

        Game.Log.L.visible = !Game.Log.L.visible;

        if (Game.Log.L.visible)
        {

        }
        else
        {

        }
    }

    //--------------------------------------------------------------------------------
    public testRegisterMain(): void
    {
        Game.Log.L.LOG("test succcess!!!");
    }
}


