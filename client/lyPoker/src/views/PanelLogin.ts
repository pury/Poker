module Game {

    export class PanelLogin extends PanelLoginUI {

        private _type: string;

        public constructor() {
            super();
            this.name = "PanelLogin";
            this.width = Game.Config.instance.STAGE_WIDTH;
            this.height = Game.Config.instance.STAGE_HEIGHT;
        }

        //--------------------------------------------------------------------------------
        public childrenCreated():void
        {
            this.type = "login";
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.ti_auth.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTI, this);
            this.ti_name.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTI, this);
            this.ti_phone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTI, this);
            this.ti_pwd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTI, this);
            this.ti_reg_pwd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTI,this);
        }

        //--------------------------------------------------------------------------------
        public partAdded(partName: string, instance: any): void
        {
            super.partAdded(partName, instance);

            if (instance == this.label_version)
            {
                this.label_version.text = "version:" + Config.instance.VERSION;
            }

            if (instance == this.label_ip)
            {
                this.label_ip.visible = Config.instance.DEBUG;
            }

            if (instance == this.ti_ip)
            {
                this.ti_ip.text = Config.instance.LEYAN_POKER_IP;
                this.ti_ip.addEventListener(egret.Event.CHANGE,this.handleChange,this);
                this.ti_ip.visible = Config.instance.DEBUG;
            }

            if (instance == this.ti_name)
            {
                //document.getElementById("egretInput").setAttribute("placeholder", "请输入数字！");
            }
        }

        //--------------------------------------------------------------------------------
        private handleChange(e:egret.Event): void
        {
            if (Config.instance.DEBUG && this.ti_ip)
            {
                Config.instance.LEYAN_POKER_IP = this.ti_ip.text;
                NetCenter.instance.setUrl();
            }
        }

        public handleTI(e: egret.TouchEvent): void
        {
            var self = this;
            self.adjustShow();

            if (e.currentTarget == self.ti_name)
            {
                if (self.ti_name.text == "请输入账号")
                {
                    self.ti_name.text = "";
                }
            }

            if (e.currentTarget == self.ti_pwd)
            {
                if (self.ti_pwd.text == "请输入密码")
                {
                    self.ti_pwd.text = "";
                }
            }

            if (e.currentTarget == self.ti_phone)
            {
                if (self.ti_phone.text == "请输入手机号")
                {
                    self.ti_phone.text = "";
                }
            }

            if (e.currentTarget == self.ti_auth)
            {

            }

            if (e.currentTarget == self.ti_reg_pwd)
            {
                if (self.ti_reg_pwd.text == "请输入密码")
                {
                    self.ti_reg_pwd.text = "";
                }
            }
        }

        //--------------------------------------------------------------------------------
        public handleTap(e: egret.TouchEvent): void
        {
            var obj = e.target;
            var self = this;

            if (obj)
            {
                switch (obj.name)
                {
                    case "btn_login":

                        //if (this.checkLogin())
                       // {
                            NetCenter.instance.ctsLogin(this.ti_name.text, this.ti_pwd.text);
                            Activate.instance.FOT_PANELHALL = true;
                       // }
                            self.adjustShow();
                        break;

                    case "btn_register":
                        
                        if (self.checkRegister())
                        {
                            NetCenter.instance.ctsRegister(this.ti_phone.text, this.ti_reg_pwd.text);
                            Activate.instance.FOT_PANELHALL = true;
                        }

                        self.adjustShow();
                        break;

                    case "btn_go_register":

                        self.type = "register";
                        self.adjustShow();
                        break;

                    case "btn_sendauth":
                        self.adjustShow();
                        break;

                    case "btn_back":

                        self.type = "login";
                        self.adjustShow();
                        break;

                    case "UIA_ly_logo":
                    case "UIA_logo":
                    case "UIA_bg":

                        self.adjustShow();
                        break;

                    default:
                        break;
                }
            }
        }

        //--------------------------------------------------------------------------------
        private adjustShow(): void
        {
            var self = this;

            if (self.ti_name.text == "")
            {
                self.ti_name.text = "请输入账号";
            }

            if (self.ti_pwd.text == "")
            {
                self.ti_pwd.displayAsPassword = false;
                self.ti_pwd.text = "请输入密码";
            }
            else if (self.ti_pwd.text != "请输入密码" )
            {
                self.ti_pwd.displayAsPassword = true;
            }

            if (self.ti_phone.text == "")
            {
                self.ti_phone.text = "请输入手机号";
            }

            if (self.ti_reg_pwd.text == "")
            {
                self.ti_reg_pwd.displayAsPassword = false;
                self.ti_reg_pwd.text = "请输入密码";
            }
            else if (self.ti_reg_pwd.text != "请输入密码")
            {
                self.ti_reg_pwd.displayAsPassword = true;
            }
        }

        /**
         * override重写getCurrentSkinState方法
         */
        //--------------------------------------------------------------------------------
        public getCurrentSkinState(): string
        {
            return this._type;
        }

        /**
         * 设置窗口显示类型 login / register
         */
        //--------------------------------------------------------------------------------
        public set type(type: string)
        {
            this._type = type;
            this.invalidateSkinState();
        }

        //--------------------------------------------------------------------------------
        public get type(): string
        {
            return this._type;
        }

        //--------------------------------------------------------------------------------
        private checkLogin(): boolean
        {
            var warn: string = "";
            var reg: RegExp = /^\d+$/g;
            var regPW: RegExp = /^[A-Za-z0-9]+$/g;

            if (!reg.test(this.ti_name.text) || this.ti_name.text.length != 11 || this.ti_name.text.charAt(0) != "1")
            {
                warn = (warn == "") ? "请输入正确的手机号！" : warn;
            }  
                    
            if (this.ti_pwd.text == "")
            {
                warn = (warn == "") ? "密码不能为空！" : warn;
            }

            if (this.ti_pwd.text.length < 6)
            {
                warn = (warn == "") ? "密码长度不能少于6位！" : warn;
            }

            if (!regPW.test(this.ti_pwd.text))
            {
                warn = (warn == "") ? "密码有非法字符！" : warn;
            }

            Log.L.WARN(warn);
            return (warn == "") ? true : false;
        }

        //--------------------------------------------------------------------------------
        private checkRegister(): boolean
        {
            var warn: string = "";
            var reg: RegExp = /^\d+$/g;
            var regPW: RegExp = /^[A-Za-z0-9]+$/g;

            //if (!reg.test(this.ti_name.text) || this.ti_name.text.length != 11 || this.ti_name.text.charAt(0) != "1")
            //{
            //    warn = (warn == "") ? "请输入正确的手机号！" : warn;
            //}

            if (this.ti_phone.text == "" || this.ti_phone.text == "请输入手机号" )
            {
                warn = (warn == "") ? "请输入正确的手机号！" : warn;
            }

            if (this.ti_reg_pwd.text == "")
            {
                warn = (warn == "") ? "密码不能为空！" : warn;
            }

            if (this.ti_reg_pwd.text.length < 6)
            {
                warn = (warn == "") ? "密码长度不能少于6位！" : warn;
            }

            if (!regPW.test(this.ti_reg_pwd.text))
            {
                warn = (warn == "") ? "密码有非法字符！" : warn;
            }

            GameUI.instance.alertMag(warn,1,3,0);
            Log.L.WARN(warn);
            return (warn == "") ? true : false;
        }
    }
}