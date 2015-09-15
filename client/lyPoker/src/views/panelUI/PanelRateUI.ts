module Game {

    export class PanelRateUI extends GamePanel{

        public btn_blind1: ButtonRatePlus;

        public btn_blind2: ButtonRatePlus;

        public btn_blind3: ButtonRatePlus;

        public btn_blind4: ButtonRatePlus;

        public btn_down_1: ButtonTypePlus;

        public btn_down_2: ButtonTypePlus;

        public btn_top_1: ButtonTypePlus;

        public btn_top_2: ButtonTypePlus;

        public btn_top_3: ButtonTypePlus;

        public btn_back: egret.gui.Button;

        public btn_shop: egret.gui.Button;

        public btn_task: egret.gui.Button;

        public btn_social: egret.gui.Button;

        public btn_help: egret.gui.Button;

        public constructor() {
            super();
            this.skinName = "skins.panel.panelRateSkin";
        }
    }
}