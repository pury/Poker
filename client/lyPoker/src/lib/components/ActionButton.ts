module Game {
    export class ActionButton extends egret.gui.SkinnableComponent{

        public btn_left: ButtonPlus;

        public btn_mid: ButtonPlus;

        public btn_right: ButtonPlus;

        public ts_left: ToggleSwitchPlus;

        public ts_mid: ToggleSwitchPlus;

        public ts_right: ToggleSwitchPlus;
        /**
         * 预判操作
         * 0：无选择  1-3：左中右
         */
        public mAutoAction: number;
        /**加注数*/
        public mAddAnte: number;

        private _type: string;

        public CREATED: boolean;

        public constructor() {
            super();
            this.skinName = "skins.component.ItemRenderActionButtonSkin";
            this.CREATED = false;
            this.height = 121;
        }

        //--------------------------------------------------------------------------------
        public childrenCreated(): void
        {
            super.childrenCreated();
            this.CREATED = true;
            this.type = "prepare";
        }

        //--------------------------------------------------------------------------------
        public partAdded(partName: string, instance: any): void
        {
            super.partAdded(partName, instance);

            if (instance == this.ts_left)
            {
                this.ts_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            }

            if (instance == this.ts_mid)
            {
                this.ts_mid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            }

            if (instance == this.ts_right)
            {
                this.ts_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTap, this);
            }
        }

        //--------------------------------------------------------------------------------
        private handleTap(e: egret.TouchEvent): void
        {
            var self = this;

            if (e.currentTarget == self.ts_left)
            {
                self.mAutoAction = self.ts_left.selected ? 1 : 0;
                self.ts_mid.selected = self.ts_right.selected = false;
            }

            if (e.currentTarget == self.ts_mid)
            {
                self.mAutoAction = self.ts_mid.selected ? 2 : 0;
                self.ts_left.selected = self.ts_right.selected = false;
            }

            if (e.currentTarget == self.ts_right)
            {
                self.mAutoAction = self.ts_right.selected ? 3 : 0;
                self.ts_mid.selected = self.ts_left.selected = false;
            }
        }

        /**重置预操作*/
        //--------------------------------------------------------------------------------
        public reset(): void
        {
            this.mAutoAction = 0;
            this.ts_left.selected = this.ts_mid.selected = this.ts_right.selected = false;
        }

        //--------------------------------------------------------------------------------
        public getCurrentSkinState(): string
        {
            return this._type;
        }

        //--------------------------------------------------------------------------------
        public get type(): string
        {
            return this._type;
        }

        /**
         * @type "normal" or "prepare"
         */
        //--------------------------------------------------------------------------------
        public set type(type: string)
        {
            this._type = type;
            this.invalidateSkinState();
        }
    }
} 