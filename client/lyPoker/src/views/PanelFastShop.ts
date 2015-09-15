module Game {

    export class PanelFastShop extends PanelFastShopUI {

        private mCollectShop: egret.gui.ArrayCollection;

        public constructor() {
            super();
            this.name = "PanelFastShop";
        }

        //--------------------------------------------------------------------------------
        public childrenCreated(): void
        {
            super.childrenCreated();
            var self = this;
            self.mCollectShop = new egret.gui.ArrayCollection([]);
            self.list_shop.itemRenderer = new egret.gui.ClassFactory(ItemRenderFastShop);
            self.list_shop.dataProvider = self.mCollectShop;
            self.update();
            self.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleButton, self);
        }

        //--------------------------------------------------------------------------------
        public handleButton(e: egret.TouchEvent): void
        {
            GameUI.instance.manage_panel("PanelFastShop", "close");
        }

        //--------------------------------------------------------------------------------
        public update(): void
        {
            var self = this;
            var data = DPanelFastShop.DATA_DIAMOND;
            self.mCollectShop.removeAll();

            for (var i in data)
            {
                self.mCollectShop.addItem({
                    left: data[i][0],
                    mid: data[i][1],
                    right: data[i][2]
                });
            }

            self.mCollectShop.refresh();
        }
    }
}