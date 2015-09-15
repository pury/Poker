module Game {
    export class ButtonTypePlus extends egret.gui.Button {

        public UIA_bg: egret.gui.UIAsset;

        public _flag: boolean;

        public constructor() {
            super();
        }

        //--------------------------------------------------------------------------------
        public partAdded(partName: string, instance: any): void
        {
            super.partAdded(partName, instance);
        }

        //--------------------------------------------------------------------------------
        public childrenCreated(): void
        {
            super.childrenCreated();
            this.flag = false;
        }

        //--------------------------------------------------------------------------------
        public get flag(): boolean
        {
            return this._flag;
        }

        //--------------------------------------------------------------------------------
        public set flag(value:boolean)
        {
            if (this._flag == value)
            {
                return;
            }

            this._flag = value;

            if (this.UIA_bg)
            {
                this.UIA_bg.visible = this._flag;
            }
        }
    }
}