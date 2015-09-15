module Game {
    export class VSliderPlus extends egret.gui.VSlider{

        public label_num: egret.gui.Label;

        public UIA_light: egret.gui.Label;

        private _rect: egret.Rectangle;

        private _rectX: number;

        private _rectY: number;

        public CREATED: boolean;

        public constructor() {
            super();
            this.skinName = "skins.component.VSliderSkin";
            this.CREATED = false;
        }

        //--------------------------------------------------------------------------------
        public childrenCreated()
        {
            this.CREATED = true;
            this._rectX = 0;
            this._rectY = this.UIA_light.height;
            this.UIA_light.touchEnabled = false;
            this._rect = new egret.Rectangle(this._rectX, this._rectY, this.UIA_light.width, this.UIA_light.height);
            this.UIA_light.mask = this._rect;
        }

        //--------------------------------------------------------------------------------
        public updateShow(value: number): void
        {
            this.label_num.text = value.toString();
            this._rect.y = this._rectY - this.UIA_light.height * (value - this.minimum) / (this.maximum - this.minimum); 
        }

        //--------------------------------------------------------------------------------
        public reset(): void
        {
            this.label_num.text = this.minimum.toString();
            this._rect.y = this._rectY;
        }

        //--------------------------------------------------------------------------------
        public get minimum(): number
        {
            return this._minimum;
        }

        //--------------------------------------------------------------------------------
        public set minimum(value: number)
        {
            if (this.label_num)
            {
                if (value != parseInt(this.label_num.text))
                {
                    this.label_num.text = value.toString();

                    if (this._rect)
                    {
                        this._rect.y = this._rectY;
                    }
                }
            }

            if (value == this._minimum)
                return;

            this._setMinimun(value);
            this.invalidateDisplayList();
        }
    }
}