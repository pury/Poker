module Game {
    export class ItemRenderFastCharge extends egret.gui.ItemRenderer {

        private label_left: egret.gui.Label;

        private label_mid: egret.gui.Label;

        private btn_charge: egret.gui.Button;

        public constructor() {
            super();
        }

        public dataChanged(): void
        {
            super.dataChanged();
            var self = this;

            self.label_left.text = self.data.left.toString();
            self.label_mid.text = self.data.mid.toString();

            self.btn_charge.label = "兑换";
            this.btn_charge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
        }

        //--------------------------------------------------------------------------------
        private handleTap(e:egret.TouchEvent): void
        {
            Pay.charge(this.data.left);
        }
    }
}