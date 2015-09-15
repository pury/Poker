module Game {
    /**桌子上各独立功能组件集合类*/
    export class TIndie extends TBase{
        /**桌号*/
        private GUI_label_tableid: egret.gui.Label;
        /**庄家标志*/
        private GUI_UIA_dealer: egret.gui.UIAsset;
        /**桌子信息*/
        private GUI_label_table_detail: egret.gui.Label;

        public constructor(container) {
            super(container);
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var self = this;
            self.GUI_label_tableid = new egret.gui.Label;
            self.GUI_label_tableid.x = 0;
            self.GUI_label_tableid.y = Math.floor(self.mStageHeight * 10 / 87);
            self.CONTAINER.addChild(self.GUI_label_tableid);

            self.GUI_label_table_detail = new egret.gui.Label;
            self.GUI_label_table_detail.width = 200;
            self.GUI_label_table_detail.textAlign = "center";
            self.GUI_label_table_detail.textColor = 0x4C4545;
            self.GUI_label_table_detail.x = self.mStageWidth / 2 - self.GUI_label_table_detail.width / 2;
            self.GUI_label_table_detail.y = Math.floor(self.mStageHeight * 5 / 8);
            self.CONTAINER.addChild(self.GUI_label_table_detail);

            self.GUI_UIA_dealer = new egret.gui.UIAsset("ly_table_dealer_png");
            self.GUI_UIA_dealer.x = self.GUI_UIA_dealer.y = 0;
            self.GUI_UIA_dealer.visible = false;
            self.CONTAINER.addChild(self.GUI_UIA_dealer);
        }

        //--------------------------------------------------------------------------------
        public setTableId(): void
        {
            this.GUI_label_tableid.text = "TABLEID:" + Data.instance.mDGameTable.mTableId.toString();
        }

        //--------------------------------------------------------------------------------
        public setTableDetail(): void
        {
            this.GUI_label_table_detail.text = "盲注: " + Data.instance.mDGameTable.mBigAnte / 2 + "/" + Data.instance.mDGameTable.mBigAnte;
        }

        //--------------------------------------------------------------------------------
        public setDealer(): void
        {
            var self = this;
            var data = Data.instance.mDGameTable;
            var point = new egret.Point();
            var pos = self.CONTAINER.mTAvatar.getTablePosition(data.mBanker);
            var flag = true;

            if (pos >= 0 && pos <= 1)
            {
                point.x = self.CONTAINER.mTAvatar.AVATAR_LIST[pos].x - 10 - 35;
                point.y = self.CONTAINER.mTAvatar.AVATAR_LIST[pos].y + 10;
                flag = self.CONTAINER.mTAvatar.AVATAR_LIST[pos].visible;
            }
            else if (pos >= 2 && pos <= 4)
            {
                point.x = self.CONTAINER.mTAvatar.AVATAR_LIST[pos].x - 36 / 2;
                point.y = self.CONTAINER.mTAvatar.AVATAR_LIST[pos].y - 36 / 2;
                flag = self.CONTAINER.mTAvatar.AVATAR_LIST[pos].visible;
            }
            else if (pos == 5)
            {
                if (self.CONTAINER.mTAvatar.mAvatar5.visible)
                {
                    point.x = self.CONTAINER.mTAvatar.AVATAR_LIST[pos].x + 45;
                    point.y = self.CONTAINER.mTAvatar.AVATAR_LIST[pos].y - 35;
                    flag = self.CONTAINER.mTAvatar.AVATAR_LIST[pos].visible;
                }
                else
                {
                    point.x = self.CONTAINER.mTAvatar.mAvatarOwn.x + 45;
                    point.y = self.CONTAINER.mTAvatar.mAvatarOwn.y - 35;
                    flag = self.CONTAINER.mTAvatar.mAvatarOwn.visible;
                }
            }
            else if (pos >= 6 && pos <= 8)
            {
                point.x = self.CONTAINER.mTAvatar.AVATAR_LIST[pos].x + 132 - 36 / 2;
                point.y = self.CONTAINER.mTAvatar.AVATAR_LIST[pos].y - 36 / 2;
                flag = self.CONTAINER.mTAvatar.AVATAR_LIST[pos].visible;
            }

            if (self.CONTAINER.contains(this.GUI_UIA_dealer))
            {
                this.GUI_UIA_dealer.visible = true;
            }

            if (this.GUI_UIA_dealer.x > 0 && this.GUI_UIA_dealer.y > 0)
            {
                if (flag)
                {
                    egret.Tween.get(this.GUI_UIA_dealer).to({ x: point.x, y: point.y }, 300, egret.Ease.sineOut);
                }
            }
            else
            {
                this.GUI_UIA_dealer.x = point.x;
                this.GUI_UIA_dealer.y = point.y;
            }

            point = null;
        }

        public quit(): void
        {
            this.GUI_UIA_dealer.visible = false;
        }
    }
}