module Game {

    export class PanelLoginUI extends GamePanel{
        
        public btn_login: egret.gui.Button;

        public btn_register: egret.gui.Button;

        public btn_go_register: egret.gui.Button;

        public btn_sendauth: egret.gui.Button;

        public btn_back: egret.gui.Button;

        public ti_pwd: egret.gui.TextInput;

        public ti_name: egret.gui.TextInput;

        public ti_phone: egret.gui.TextInput;

        public ti_auth: egret.gui.TextInput;

        public ti_reg_pwd: egret.gui.TextInput;

        public ti_ip: egret.gui.TextInput;

        public label_version: egret.gui.Label;

        public label_ip: egret.gui.Label;

        public constructor() {
            super();
            this.skinName = "skins.panel.panelLoginSkin";
        }
    }
}