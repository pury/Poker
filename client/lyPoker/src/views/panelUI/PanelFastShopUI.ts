module Game {

    export class PanelFastShopUI extends GamePanel{

        public list_shop: egret.gui.List;

        public btn_back: egret.gui.Button;

        public constructor() {
            super();
            this.skinName = "skins.panel.panelFastShopSkin";
        }
    }
}