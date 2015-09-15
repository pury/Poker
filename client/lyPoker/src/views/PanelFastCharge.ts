module Game {

    export class PanelFastCharge extends PanelFastChargeUI {

        private mCollectShop: egret.gui.ArrayCollection;

        public constructor() {
            super();
            this.name = "PanelFastCharge";
        }

        //--------------------------------------------------------------------------------
        public childrenCreated(): void
        {
            super.childrenCreated();
            var self = this;
            self.mCollectShop = new egret.gui.ArrayCollection([]);
            self.list_charge.itemRenderer = new egret.gui.ClassFactory(ItemRenderFastCharge);
            self.list_charge.dataProvider = self.mCollectShop;
            self.update();
            self.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleButton, self);
            self.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleButton, self);
            NetCenter.instance.addEventListener(NetEvent.EVENT_PAY_RESULT, this.handleRole, this);
            NetCenter.instance.addEventListener(NetEvent.EVENT_DIAMOND_TO_GOLD, this.handleRole, this);
        }

        //--------------------------------------------------------------------------------
        public handleButton(e: egret.TouchEvent): void
        {
            if (e.currentTarget == this.btn_back)
            {
                GameUI.instance.manage_panel("PanelFastCharge", "close");
            }

            if (e.currentTarget == this.btn_buy)
            {
                DPanelShop.DATA_FLAG = 2;
                GameUI.instance.manage_panel("PanelFastCharge", "close");
                GameUI.instance.manage_panel("PanelShop", "open");
            }
        }

        //--------------------------------------------------------------------------------
        public update(): void
        {
            var self = this;
            var data = DPanelFastCharge.DATA_COIN;
            self.mCollectShop.removeAll();

            for (var i in data) {
                self.mCollectShop.addItem({
                    left: data[i][0],
                    mid: data[i][1],
                    right: data[i][2]
                });
            }

            self.mCollectShop.refresh();
            self.updateNetData();
        }

        //--------------------------------------------------------------------------------
        private handleRole(e: NetEvent): void
        {
            this.updateNetData();
        }

        //--------------------------------------------------------------------------------
        private updateNetData(): void
        {
            this.label_coin.text = Data.instance.mDRole.mCoin.toString();
            this.label_diamond.text = Data.instance.mDRole.mDiamond.toString();
        }
    }
}