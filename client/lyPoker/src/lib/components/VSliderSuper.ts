module Game
{
    export class VSliderSuper extends egret.DisplayObjectContainer {

        public GUI_VSlider: VSliderPlus;

        public constructor() {
            super();
            this.height = 431;
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var self = this;

            self.GUI_VSlider = new VSliderPlus();
            self.GUI_VSlider.x = 0;
            self.GUI_VSlider.y = 0;
            self.GUI_VSlider.minimum = 5;
            self.GUI_VSlider.maximum = 100;
            self.GUI_VSlider.value = 5;
            self.addChild(self.GUI_VSlider);
        }
    }
}