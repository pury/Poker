module Game {
    export class ButtonRatePlus extends egret.gui.Button {

        public label_blind: egret.gui.Label;

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
        }
    }
}