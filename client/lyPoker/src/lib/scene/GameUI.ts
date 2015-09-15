module Game {
    export class GameUI extends egret.gui.UIStage{

        public PANEL_ALL: Object;

        public PANEL_NAME: string[];

        public runtimeClass: RuntimeClass;

        public mAlert: egret.gui.Label;

        public mAlertTimer: egret.Timer;

        public static _instance: GameUI;

        public constructor()
        {
            super();
            this.PANEL_ALL = new Object;
            this.PANEL_NAME = [];
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            this.manage_panel("PanelLogin", "open");
            NetCenter.instance.init();
        }

        /**
         * @ name: panelName
         * @ action: "open" or "close"
         */
        //--------------------------------------------------------------------------------
        public manage_panel(name:string,action:string): void
        {
            var self = this;
            var panel = self.PANEL_ALL[name];
            
            if (!panel)
            {
                panel = self.createPanel(name);
            }

            if (panel)
            {
                if (action == "open")
                {
                    if (!self.contains(panel))
                    {
                        self.addElement(panel);
                       
                        if (panel.CREATED)
                        {
                            panel.openPanel();
                            panel.update();
                        }
                    }
                }
                else if(action == "close")
                {
                    if (panel.parent && panel.parent.contains(panel))
                    {
                        panel.parent.removeElement(panel);
                    }
                    else
                    {
                        Log.L.ERROE("error: close " + name);
                    }
                }
            }
        }

        //--------------------------------------------------------------------------------
        public createPanel(name: string): any
        {
            var panel = null;
            var classname = "Game." + name;
            var panelClass = egret.getDefinitionByName(classname);

            if (panelClass)
            {
                panel = new panelClass;
                this.PANEL_ALL[name] = panel;
            }
            else
            {
                Log.L.ERROE(name + " is not found!");
            }

            return panel;
        }

        /**alert 
         *@ color:0  #FFFFFF   white
         *@ color:1  #EE0000   red
         *@ y:0  this.mAlert.y  down
         *@ y:1  this.mAlert.y  middle
         */
        //--------------------------------------------------------------------------------
        public alertMag(msg: string, color: number = 0, cout: number = 3, y: number = 1): void
        {
            if (this.mAlert == null)
            {
                this.mAlert = new egret.gui.Label();
            }

            this.mAlert.touchEnabled = false;
            this.mAlert.textColor = color == 1 ? 0xEE0000 : 0xFFFFFF;
            this.mAlert.size = 28;
            this.mAlert.fontFamily = "Adobe 黑体 Std R";
            this.mAlert.horizontalCenter = 0;
            var yy: number = y == 0 ? (this.stage.stageHeight - 40) : this.stage.stageHeight / 2;
            this.mAlert.y = yy;
            this.mAlert.text = msg;
            this.addElement(this.mAlert);

            if (this.mAlertTimer)
            {
                this.mAlertTimer.stop();
                this.mAlertTimer = null;
            }

            this.mAlertTimer = new egret.Timer(1000, cout);
            this.mAlertTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.removeAlertMsg, this);
            this.mAlertTimer.start();
        }

        //--------------------------------------------------------------------------------
        private removeAlertMsg(e: egret.TimerEvent): void
        {
            this.mAlertTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.removeAlertMsg, this);

            if (this.contains(this.mAlert))
            {
                this.removeElement(this.mAlert);
            }

            this.mAlert.text = "";
            this.mAlertTimer.stop();
            this.mAlertTimer = null;
        }

        //--------------------------------------------------------------------------------
        public reset(): void
        {
            var self = this;
            self.removeAllElements();
        }

        //--------------------------------------------------------------------------------
        public static get instance(): GameUI
        {
            if (this._instance == null)
            {
                this._instance = new GameUI();
            }

            return this._instance;
        }

        //--------------------------------------------------------------------------------
        public static set instance(value:GameUI)
        {
            this._instance = value;
        }
    }
}