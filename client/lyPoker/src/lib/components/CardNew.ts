module Game {
    /** Card Component*/
    export class CardNew extends egret.gui.SkinnableComponent {

        private _cardNum: number;

        private _cardType: number;

        public label_num: egret.gui.Label;

        public UIA_type: egret.gui.UIAsset;

        public UIA_bg: egret.gui.UIAsset;

        public _data: number[];

        public constructor() {
            super();
            this.width = 78;
            this.height = 104;
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
            this.visible = true;

            if (value && value.length != 2)
            {
                this.visible = false;
                return;
            }

            this.cardType = value[0]
            this.cardNum = value[1];

            if (this.cardType > 0 && this.cardNum > 0)
            {
                var num = "",size = 44;

                switch (this.cardNum)
                {
                    case 1:
                        num = "A";
                        break
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        num = this.cardNum.toString();
                        break;
                    case 10:
                        size = 34;
                        num = this.cardNum.toString();
                        break;
                    case 11:
                        num = "J";
                        break;
                    case 12:
                        num = "Q";
                        size = 40;
                        break;
                    case 13:
                        num = "K";
                        break;
                    default:
                        size = 44;
                        break;
                }

                this.label_num.size = size;
                this.label_num.text = num;
                this.UIA_type.source = "ly_poker_type_" + this.cardType + "_png";
                this.UIA_bg.source = "ly_poker_bg_2_png";
                this.label_num.visible = this.UIA_type.visible = true;
            }
            else
            {
                this.UIA_bg.source = "ly_poker_bg_1_png";
                this.label_num.visible = this.UIA_type.visible = false;
            }
        }

        //--------------------------------------------------------------------------------
        public get data(): number[]
        {
            return this._data;
        }
    }

}