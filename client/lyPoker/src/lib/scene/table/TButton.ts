module Game {
    /**桌子上的按钮类*/
    export class TButton extends TBase {
        /**返回*/
        private GUI_btn_back: ButtonPlus;
        /**商城、站起*/
        private GUI_btn_action: ButtonPlus;
        /**坐下*/
        private GUI_btn_sit: ButtonPlus;
        /**等待坐下*/
        private GUI_label_sit: LabelPlus;

        private mStandUpSkin: string;

        private mShopSkin: string;

        public constructor(container) {
            super(container);
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var self = this;

            self.mStandUpSkin = "skins.button.ButtonStandUpSkin";
            self.mShopSkin = "skins.button.ButtonShopSkin";
            self.GUI_btn_back = new ButtonPlus;
            self.GUI_btn_back.skinName = "skins.button.ButtonBackSkin";
            self.GUI_btn_back.x = self.GUI_btn_back.y = self.mStageWidth / 45;
            self.CONTAINER.addChild(self.GUI_btn_back);

            self.GUI_btn_action = new ButtonPlus;
            self.GUI_btn_action.skinName = self.mStandUpSkin;
            self.GUI_btn_action.x = self.mStageWidth - 67 - 10;
            self.GUI_btn_action.y = self.GUI_btn_back.y;
            self.CONTAINER.addChild(self.GUI_btn_action);

            self.GUI_btn_sit = new ButtonPlus;
            self.GUI_btn_sit.skinName = "skins.button.ButtonSitDownSkin"; 
            self.GUI_btn_sit.width = 106;
            self.GUI_btn_sit.label = "坐下";
            self.GUI_btn_sit.x = self.mStageWidth / 2 - self.GUI_btn_sit.width / 2;
            self.GUI_btn_sit.y = Math.floor(self.mStageHeight * 3 / 4); 

            self.GUI_label_sit = new LabelPlus;
            self.GUI_label_sit.width = 200;
            self.GUI_label_sit.textAlign = "center";
            self.GUI_label_sit.text = "等待坐下中...";
            self.GUI_label_sit.x = self.mStageWidth / 2 - self.GUI_label_sit.width / 2;
            self.GUI_label_sit.y = Math.floor(self.mStageHeight * 3 / 4); 

            self.GUI_btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleButton, this);
            self.GUI_btn_action.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleButton, this);
        }

        //--------------------------------------------------------------------------------
        public handleButton(e: egret.TouchEvent): void
        {
            var self = this;

            if (e.currentTarget == self.GUI_btn_back)
            {
                egret.gui.Alert.show("离开后桌上筹码不收回。您确定要离开？", "提醒", this.handleConfirm, "确认", "取消",true,true,self);
            }

            if (e.currentTarget == self.GUI_btn_action)
            {
                if (self.GUI_btn_action.skinName == self.mStandUpSkin)
                {
                    egret.gui.Alert.show("站起后桌上筹码不收回。您确定吗？", "提醒", this.handleStandUp, "确认", "取消");
                }
                else if (self.GUI_btn_action.skinName == self.mShopSkin)
                {

                    GameUI.instance.manage_panel("PanelFastShop","open");
                }
            }

            if (e.currentTarget == self.GUI_btn_sit)
            {
                self.setSitDown(false);

                if (Data.instance.mDGameTable.mListPlayer.length < Data.instance.mDGameTable.mPlayerNumber)
                {
                    NetCenter.instance.ctsSitDown();
                }
                else
                {
                    Data.instance.mDRole.mStatus = EOwnStatus.LINEUP;
                    self.setSitDownLabel(true);
                    self.setActionName(false);
                }
            }
        }

        /**确认离开桌子*/
        //--------------------------------------------------------------------------------
        private handleConfirm(e: egret.gui.CloseEvent): void
        {
            if (e.detail == egret.gui.Alert.FIRST_BUTTON)
            {
                this.quit();
            }
        }

        //--------------------------------------------------------------------------------
        private handleStandUp(e: egret.gui.CloseEvent): void
        {
            if (e.detail == egret.gui.Alert.FIRST_BUTTON)
            {
                NetCenter.instance.ctsStandUp();
            }
        }

        /**
         * 坐下按钮
         */
        //--------------------------------------------------------------------------------
        public setSitDown(value: boolean): void
        {
            var self = this;
            
            if (value)
            {
                if (!self.CONTAINER.contains(self.GUI_btn_sit))
                {
                    self.CONTAINER.addChild(self.GUI_btn_sit);
                    self.GUI_btn_sit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleButton, this);
                }
            }
            else
            {
                if (self.CONTAINER.contains(self.GUI_btn_sit))
                {
                    self.CONTAINER.removeChild(self.GUI_btn_sit);
                }
            }
        } 
    
        /**等待坐下中...*/
        //--------------------------------------------------------------------------------
        public setSitDownLabel(value: boolean): void
        {
            var self = this;

            if (value)
            {
                if (!self.CONTAINER.contains(self.GUI_label_sit))
                {
                    self.CONTAINER.addChild(self.GUI_label_sit);
                }
            }
            else
            {
                if (self.CONTAINER.contains(self.GUI_label_sit))
                {
                    self.CONTAINER.removeChild(self.GUI_label_sit);
                }
            }
        } 

        /**
         * true: 站起
         * false: 商城
         */
        //--------------------------------------------------------------------------------
        public setActionName(value:boolean): void
        {
            this.GUI_btn_action.skinName = value ? this.mStandUpSkin : this.mShopSkin;
        }



        //--------------------------------------------------------------------------------
        public quit(): void
        {
            var self = this;
            NetCenter.instance.ctsLeaveTable();
            GameUI.instance.manage_panel("PanelRate", "open");
            Data.instance.mDGameTable.init();
            self.setActionName(true);
            self.setSitDownLabel(false);
            self.setSitDown(false);
            self.CONTAINER.mTCommonCard.TCC.status = 0;
            self.CONTAINER.mTAction.remove();
            self.CONTAINER.mTIndie.quit();
            self.CONTAINER.mTAvatar.quit();
            GameLayer.instance.hideTablePlus();
        }
    }
}