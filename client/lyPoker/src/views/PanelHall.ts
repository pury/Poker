module Game {

    export class PanelHall extends PanelHallUI {

        public constructor() {
            super();
            this.name = "PanelHall";
            this.width = Game.Config.instance.STAGE_WIDTH;
            this.height = Game.Config.instance.STAGE_HEIGHT;
        }

        //--------------------------------------------------------------------------------
        public childrenCreated():void
        {
            this.CREATED = true;
            this.update();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            NetCenter.instance.addEventListener(NetEvent.EVENT_ROLE, this.handleRole, this)
            NetCenter.instance.addEventListener(NetEvent.EVENT_PAY_RESULT, this.handleRole, this)
            NetCenter.instance.addEventListener(NetEvent.EVENT_DIAMOND_TO_GOLD,this.handleRole,this)
        }

        //--------------------------------------------------------------------------------
        public partAdded(partName: string, instance: any): void
        {
            super.partAdded(partName, instance);

            if (instance == this.btn_agaist)
            {

            }
        }

        //--------------------------------------------------------------------------------
        private handleRole(e:NetEvent): void
        {
            this.updateNetData();
        }

        //--------------------------------------------------------------------------------
        public update(): void
        {
            this.updateNetData();
        }

        //--------------------------------------------------------------------------------
        private updateNetData(): void
        {
            this.UIA_role.source = Data.instance.mDRole.mHead || "ly_table_head_big_png";
            this.label_name.text = Data.instance.mDRole.mName;
            this.label_lv.text = "Lv." + Data.instance.mDRole.mLv.toString();
            this.label_coin.text = Data.instance.mDRole.mCoin.toString();
            var ff = Data.instance.mDRole.mDiamond;
            this.label_diamond.text = Data.instance.mDRole.mDiamond.toString();
        }

        //--------------------------------------------------------------------------------
        public handleTap(e: egret.TouchEvent): void
        {
            var obj = e.target;

            if (e.currentTarget == this.btn_back)
            {
                egret.gui.Alert.show("确认退出游戏吗？", "提醒", this.handleConfirm, "确认", "取消");
            }

            if (obj)
            {
                switch (obj.name)
                {
                    case "btn_game":
                        Game.GameUI.instance.manage_panel("PanelHall", "close");
                        Game.GameUI.instance.manage_panel("PanelRate", "open");
                        break;

                    case "btn_shop":

                        DPanelShop.DATA_FLAG = 0;
                        GameUI.instance.manage_panel("PanelShop", "open");
                        Game.GameUI.instance.manage_panel("PanelHall", "close");
                        break;
                    case "btn_social":
                        GameUI.instance.manage_panel("PanelFastShop", "open");
                        break;
                    case "btn_help":
                        GameUI.instance.manage_panel("PanelFastCharge", "open");
                        break;
                    default:
                        break;
                }
            }
        }

        /**确认离开桌子*/
        //--------------------------------------------------------------------------------
        private handleConfirm(e: egret.gui.CloseEvent): void
        {
            if (e.detail == egret.gui.Alert.FIRST_BUTTON)
            {
                NetCenter.instance.quit();
            }
        }
    }
}