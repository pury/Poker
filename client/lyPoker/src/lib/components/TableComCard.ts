module Game {
    export class TableComCard extends egret.gui.SkinnableComponent{

        public card1: Card;

        public card2: Card;

        public card3: Card;

        public card4: Card;

        public card5: Card;

        public LIST_CARD: Card[];

        public _status: number;

        public constructor() {
            super();
            this.skinName = "skins.component.ItemRenderComCardSkin";
            this._status = 0;
        }

        //--------------------------------------------------------------------------------
        public partAdded(partName: string, instance: any): void
        {
            super.partAdded(partName, instance);
            
            if (instance == this.card1)
            {
                this.card1.anchorX = this.card1.anchorY = 0.5;
            }

            if (instance == this.card2)
            {
                this.card2.anchorX = this.card2.anchorY = 0.5;
            }

            if (instance == this.card3)
            {
                this.card3.anchorX = this.card3.anchorY = 0.5;
            }

            if (instance == this.card4)
            {
                this.card4.anchorX = this.card4.anchorY = 0.5;
            }

            if (instance == this.card5)
            {
                this.card5.anchorX = this.card5.anchorY = 0.5;
            }
        }

        //--------------------------------------------------------------------------------
        public childrenCreated(): void
        {
            super.childrenCreated();
            this.LIST_CARD = [this.card1, this.card2, this.card3, this.card4, this.card5];
            this.status = 0;
        }

        /**
         *设置公共牌的状态
         *@ value:0 全部隐藏
         */
        //--------------------------------------------------------------------------------
        public set status(value:number)
        {
            this._status = value;

            switch (value)
            {
                case 0:
                    this.card1.visible = this.card2.visible = this.card3.visible = this.card4.visible = this.card5.visible = false;
                    break;
                default:
                    break;
            }
        }

        //--------------------------------------------------------------------------------
        public get status(): number
        {
            return this._status;
        }
    }
} 