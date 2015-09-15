module Game {

    export class PanelHallUI extends GamePanel {

        public btn_back: egret.gui.Button;

        public btn_quick: egret.gui.Button;

        public btn_game: egret.gui.Button;

        public btn_agaist: egret.gui.Button;

        public btn_shop: egret.gui.Button;

        public btn_task: egret.gui.Button;

        public btn_social: egret.gui.Button;

        public btn_help: egret.gui.Button;

        public btn_dtg1: egret.gui.Button;

        public btn_dtg2: egret.gui.Button;

        public UIA_role: egret.gui.UIAsset;

        public label_name: egret.gui.Label;

        public label_lv: egret.gui.Label;

        public label_coin: egret.gui.Label;

        public label_diamond: egret.gui.Label;

        public constructor() {
            super();
            this.skinName = "skins.panel.panelHallSkin";
        }
    }
}