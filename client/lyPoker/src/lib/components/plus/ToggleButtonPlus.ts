module Game {
    export class ToggleButtonPlus extends egret.gui.ToggleButton{

        public label_name: egret.gui.Label;

        public CREATED: boolean;

        public constructor() {
            super();
            this.skinName = "skins.component.ToggleSwitchSkin";
            this.CREATED = false;
        }

        //--------------------------------------------------------------------------------
        public childrenCreated()
        {
            this.CREATED = true;
        }
    }
} 