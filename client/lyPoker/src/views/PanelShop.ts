module Game {

    export class PanelShop extends PanelShopUI {

        private mCollectShop: egret.gui.ArrayCollection;

        public constructor() {
            super();
            this.name = "PanelShop";
            this.width = Game.Config.instance.STAGE_WIDTH;
            this.height = Game.Config.instance.STAGE_HEIGHT;
        }

        //--------------------------------------------------------------------------------
        public childrenCreated():void
        {
            var self = this;
            self.CREATED = true;
            self.mCollectShop = new egret.gui.ArrayCollection([]);
            self.list_shop.itemRenderer = new egret.gui.ClassFactory(ItemRenderFastCharge);
            self.list_shop.dataProvider = self.mCollectShop;
            self.list_diamond.itemRenderer = new egret.gui.ClassFactory(ItemRenderDiamond);
            self.list_diamond.dataProvider = self.mCollectShop;
            self.update();
            self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.handleTap, self);
            self.tb_buy.addEventListener(egret.gui.ListEvent.ITEM_CLICK, self.onBarItemClick, self);
            self.list_shop.addEventListener(egret.gui.ListEvent.ITEM_CLICK, self.listClickhandler, this);
            self.list_diamond.addEventListener(egret.gui.ListEvent.ITEM_CLICK, self.listClickhandler, this);
            NetCenter.instance.addEventListener(NetEvent.EVENT_PAY_RESULT, this.handleRole, this)
            NetCenter.instance.addEventListener(NetEvent.EVENT_DIAMOND_TO_GOLD, this.handleRole, this)
        }

        //--------------------------------------------------------------------------------
        public partAdded(partName: string, instance: any): void
        {
            super.partAdded(partName, instance);
        }

        //--------------------------------------------------------------------------------
        public update(): void
        {
            this.updateList(0);
            this.updateNetData();
        }

        //--------------------------------------------------------------------------------
        private onBarItemClick(e: egret.gui.ListEvent): void
        {
            var index = e.itemIndex;
            this.updateList(index);
        }

        //--------------------------------------------------------------------------------
        private listClickhandler(evt: egret.gui.ListEvent): void
        {

            var dataList: egret.gui.List = evt.currentTarget;

            console.log(evt.item.name + " clicked");

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

        //--------------------------------------------------------------------------------
        private updateList(value: number): void
        {
            var self = this;
            var data = value == 0 ? DPanelShop.DATA_DIAMOND : DPanelShop.DATA_COIN;
            self.tb_buy.selectedIndex = value;
            self.mCollectShop.removeAll();

            for (var i in data)
            {
                self.mCollectShop.addItem({
                    type: value,
                    left: data[i][0],
                    mid: data[i][1],
                    right: data[i][2]
                });
            }

            self.mCollectShop.refresh();

            self.list_shop.visible = !(value == 0);
            self.list_diamond.visible = (value == 0);
        }

        //--------------------------------------------------------------------------------
        public handleTap(e: egret.TouchEvent): void
        {
            var obj = e.target;
            
            if (obj)
            {
                switch (obj.name)
                {
                    case "btn_back":

                        this.handleBack();
                        break;

                    default:
                        break;
                }
            }
        }

        //--------------------------------------------------------------------------------
        private handleBack(): void
        {

            GameUI.instance.manage_panel("PanelShop", "close");

            if (DPanelShop.DATA_FLAG == 0)
            {
                GameUI.instance.manage_panel("PanelHall", "open");
            }
            else if (DPanelShop.DATA_FLAG == 1)
            {
                GameUI.instance.manage_panel("PanelRate", "open");
            }
            else if (DPanelShop.DATA_FLAG == 2)
            {

            }
        }
    }
}