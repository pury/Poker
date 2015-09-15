module Game {

    export class PanelFastChargeUI extends GamePanel{
        
        public btn_back: egret.gui.Button;

        public btn_buy: egret.gui.TabBar;

        public list_charge: egret.gui.List;

        public label_diamond: egret.gui.Label;

        public label_coin: egret.gui.Label;

        public constructor() {
            super();
            this.skinName = "skins.panel.panelFastChargeSkin";
        }
    }
}