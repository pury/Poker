module Game {
    export class RadioButtonPlus extends egret.gui.RadioButton {


        public constructor() {
            super();
        }

        //--------------------------------------------------------------------------------
        public partAdded(partName: string, instance: any):void
        {
            super.partAdded(partName,instance);
        }

        //--------------------------------------------------------------------------------
        public childrenCreated(): void
        {
            super.childrenCreated();
        }

        //--------------------------------------------------------------------------------
        public buttonReleased(): void
        {
            if (!this.enabled )
                return;

            if (this.selected)
            {
                this.group._removeInstance(this);
                super.buttonReleased();
                this.group._setSelection(null);
                
                return;
            }

            if (!this._radioButtonGroup)
               // this.addToGroup();
            super.buttonReleased();
            this.group._setSelection(this);
        }

        //--------------------------------------------------------------------------------
        public _setSelected(value: boolean) {
            super._setSelected(value);
            this.invalidateDisplayList();
        }
    }
}