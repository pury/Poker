module Game {
    export class ItemRenderFastShop extends egret.gui.ItemRenderer {

        private label_left: egret.gui.Label;

        private label_mid: egret.gui.Label;

        private label_right: egret.gui.Label;

        private label_equal: egret.gui.Label;

        private UIA_type: egret.gui.UIAsset;

        private btn_buy: egret.gui.Button;

        public constructor() {
            super();
        }

        public dataChanged(): void
        {
            super.dataChanged();
            var self = this;
            self.UIA_type.source = "ly_shop_3_png";
            //self.label_left.x = 70;
            //self.label_equal.x = 167;
            //self.label_mid.x = 210;

            self.label_left.width = 85;
            self.label_mid.width = 60;

            self.label_left.text = "￥" + self.data.left.toString();
            self.label_mid.text = self.data.mid.toString();
            self.label_right.text = "";

            self.btn_buy.label = "购买";
            this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
        }

        //--------------------------------------------------------------------------------
        private handleTap(e:egret.TouchEvent): void
        {
            Pay.pushPrepare(this.data.mid);
            Pay.pay(this.data.mid);
        }
    }
}