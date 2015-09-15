module Game {

    export class PanelShopUI extends GamePanel{
        
        public btn_back: egret.gui.Button;

        public tb_buy: egret.gui.TabBar;

        public list_shop: egret.gui.List;

        public list_diamond: egret.gui.List;

        public label_diamond: egret.gui.Label;

        public label_coin: egret.gui.Label;

        public constructor() {
            super();
            this.skinName = "skins.panel.panelShopSkin";
        }
    }
}