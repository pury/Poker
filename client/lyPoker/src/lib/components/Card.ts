module Game {
    /**Beer Card Component*/
    export class Card extends egret.gui.SkinnableComponent {
        /**card number: 1 - 13*/
        private _cardNum: number;
        /**card type: 0 1 2 3 4   0:反面  1-4：花色*/
        private _cardType: number;

        public UIA_num: egret.gui.UIAsset;

        public UIA_type_up: egret.gui.UIAsset;

        public UIA_type_down: egret.gui.UIAsset;

        public UIA_bg: egret.gui.UIAsset;

        public _data: number[];

        public constructor() {
            super();
            this.width = 128;
            this.height = 165;
        }

        //--------------------------------------------------------------------------------
        public childrenCreated(): void
        {
            this.data = [this.cardType,this.cardNum];
        }

        //--------------------------------------------------------------------------------
        public partAdded(partName: string, instance: any): void
        {
            super.partAdded(partName, instance);
        }

        //--------------------------------------------------------------------------------
        public get cardNum(): number
        {
            return this._cardNum;
        }

        //--------------------------------------------------------------------------------
        public set cardNum(value: number)
        {
            if (value != this._cardNum)
            {
                this._cardNum = value;
            }
        }

        //--------------------------------------------------------------------------------
        public get cardType(): number
        {
            return this._cardType;
        }

        //--------------------------------------------------------------------------------
        public set cardType(value: number)
        {
            if (value != this._cardType)
            {
                this._cardType = value;
            }
        }

        //--------------------------------------------------------------------------------
        public set data(value:number[])
        {
            this._data = value;
            this.cardType = value[0]
            this.cardNum = value[1];
            this.UIA_bg.source = this.cardType > 0 ? "game_pai01_png" : "game_pai02_png";
            this.UIA_num.visible = this.UIA_type_down.visible = this.UIA_type_up.visible = this.cardType == 0 ? false : true;

            if (this._cardType > 0)
            {
                this.UIA_num.source = "num_" + this.cardNum + "_" + (this.cardType % 2 == 0 ? 1 : 2) + "_png";
                this.UIA_type_up.source = "game_" + this.cardType + "_png";
                var source = "";

                if (this.cardNum >= 1 && this.cardNum <= 10)
                {
                    source = "game_" + this.cardType + "_png"
                }
                else
                {
                    var num = this.cardType % 2 == 0 ? (this.cardNum % 10 + 3) : (this.cardNum % 10);
                    source = "game_hua" + num + "_png";
                }

                this.UIA_type_down.source = source;
            }
        }

        //--------------------------------------------------------------------------------
        public get data(): number[]
        {
            return this._data;
        }
    }

}