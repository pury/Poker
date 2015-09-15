module Game {
    export class ItemRenderDiamond extends egret.gui.ItemRenderer {

        private label_left: egret.gui.Label;

        private label_mid: egret.gui.Label;

        private label_right: egret.gui.Label;

        private UIA_typeGive: egret.gui.UIAsset;

        private btn_buy: egret.gui.Button;

        public constructor() {
            super();
        }

        public dataChanged(): void
        {
            super.dataChanged();
            var self = this;

            if (self.data.type == 0)
            {
                self.label_left.text = "￥" + self.data.left;
                self.label_mid.width = 60;
                self.label_right.text = self.data.right == 0 ? "" : ("送 " + self.data.right);
                self.UIA_typeGive.visible = !(self.data.right == 0);
            }


            self.label_mid.text = self.data.mid.toString();
           // this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.buttonTouchHandler, this);
            this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
        }

        /**取消事件的传递，避免按钮操作影响列表操作*/
        //--------------------------------------------------------------------------------
        private buttonTouchHandler(evt: egret.Event): void
        {
            evt.stopImmediatePropagation();
        }

        //--------------------------------------------------------------------------------
        private handleTap(e:egret.TouchEvent): void
        {
            Log.L.LOG("test  " + this.data.left);

            if (this.data.type == 0)
            {
                Pay.pay(this.data.left);
            }
        }
    }
}