module Game {
    export class ToggleSwitchPlus extends egret.gui.ToggleButton{

        public label_name: egret.gui.Label;

        public CREATED: boolean;

        public constructor() {
            super();
            this.skinName = "skins.component.ToggleSwitchSkin";
            this.CREATED = false;
        }

        //--------------------------------------------------------------------------------
        public childrenCreated():void
        {
            super.childrenCreated();
            this.CREATED = true;
        }

        //--------------------------------------------------------------------------------
        public partAdded(partName: string, instance: any): void
        {
            super.partAdded(partName, instance);
        }
    }
} 