module Game {
    export class TotalAnte extends egret.gui.SkinnableComponent{
        
        public UIA_bg: egret.gui.UIAsset;

        public label_ante: egret.gui.Label;

        public _pond: number;

        public _prepare: number;

        public key: string = "totalAnte";

        public CREATED: boolean;

        public constructor() {
            super();
            this.skinName = "skins.component.ItemRenderTotalAnteSkin";
            this.width = 204;
            this.height = 56;
            this.CREATED = false;
            this._pond = 0;
            this._prepare = 0;
        }

        //--------------------------------------------------------------------------------
        public childrenCreated(): void
        {
            this.CREATED = true;
            this.label_ante.text = this.prepare.toString();
        }

        /**
         * 设置池背景
         * @ value   0：主池   1：边池
         */
        //--------------------------------------------------------------------------------
        public set pond(value:number)
        {
            this._pond = value;
            //更换背景或者筹码资源来做区分，待定
            //this.UIA_bg.source = 
        }

        //--------------------------------------------------------------------------------
        public get pond(): number
        {
            return this._pond;
        }

        /**预设定数据以及后续更新*/
        //--------------------------------------------------------------------------------
        public set prepare(value: number)
        {
            if (this._prepare == value)
            {
                return;
            }

            this._prepare = value;

            if (this.label_ante)
            {
                this.label_ante.text = this._prepare.toString();
            }
        }

        //--------------------------------------------------------------------------------
        public get prepare(): number
        {
            return this._prepare;
        }
    }
} 