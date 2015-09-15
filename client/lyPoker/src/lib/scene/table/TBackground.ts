module Game {
    /**桌子背景管理类*/
    export class TBackground extends TBase{

        private BitmapBG: egret.Bitmap;

        private BitmapTable: egret.Bitmap;

        private BitmapLogo: egret.Bitmap;

        public constructor(container) {
            super(container);
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var self = this;

            self.BitmapBG = new egret.Bitmap();
            self.BitmapBG.texture = RES.getRes("ly_table_bg_black_jpg");
            self.BitmapBG.touchEnabled = true;
            self.CONTAINER.addChild(self.BitmapBG);

            self.BitmapLogo = new egret.Bitmap();
            self.BitmapLogo.texture = RES.getRes("ly_table_logo_png");
            self.BitmapLogo.width = 284;
            self.BitmapLogo.x = self.mStageWidth / 2 - self.BitmapLogo.width / 2;
            self.BitmapLogo.y = Math.floor(self.mStageHeight * 13 / 25);
            self.CONTAINER.addChild(self.BitmapLogo);

            //self.BitmapTable = new egret.Bitmap();
            //self.BitmapTable.touchEnabled = true;
            //self.BitmapTable.texture = RES.getRes("ly_table_table_bg_png");
            //self.BitmapTable.x = self.mStageWidth / 2 - 667 / 2;
            //self.BitmapTable.y = self.mStageHeight / 2 - 953 / 2;
            //self.CONTAINER.addChild(self.BitmapTable);

            self.BitmapBG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
        }

        //--------------------------------------------------------------------------------
        private handleTap(e: egret.TouchEvent): void
        {
            var self = this;

            if (e.currentTarget == self.BitmapBG)
            {
                if (self.CONTAINER.mTAction.mVSliderSuper.GUI_VSlider.visible)
                {
                    self.CONTAINER.mTAction.mVSliderSuper.visible = false;
                    self.CONTAINER.mTAction.mActionButton.btn_right.label = "加注";
                }
            }
        }
    }
}