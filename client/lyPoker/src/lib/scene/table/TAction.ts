module Game {
    /**游戏主操作类*/
    export class TAction extends TBase{

        public mActionButton: ActionButton;

        public mVSliderSuper: VSliderSuper;

        public constructor(container) {
            super(container);
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var self = this;
            self.mActionButton = new ActionButton; 
            self.mActionButton.x = 0;
            self.mActionButton.y = self.mStageHeight - self.mActionButton.height;
            self.mActionButton.visible = false;
            self.CONTAINER.addChild(self.mActionButton);

            self.mVSliderSuper = new VSliderSuper();
            self.mVSliderSuper.x = self.mStageWidth - 141;
            self.mVSliderSuper.y = self.mStageHeight - 594;
            self.mVSliderSuper.visible = false;
            self.CONTAINER.addChild(self.mVSliderSuper);

            self.mVSliderSuper.GUI_VSlider.addEventListener(egret.Event.CHANGE, this.handleChange, this);
        }

        /**检测组件是否创建成功*/
        //--------------------------------------------------------------------------------
        public checkCreated(): boolean
        {
            if (!this.mActionButton.CREATED)
            {
                return false;
            }

            if (!this.mVSliderSuper.GUI_VSlider.CREATED)
            {
                return false;
            }

            if (this.mVSliderSuper.GUI_VSlider.CREATED)
            {
                if (!this.mActionButton.ts_left.CREATED || !this.mActionButton.ts_mid.CREATED || !this.mActionButton.ts_right.CREATED)
                {
                    return false;
                }
            }

            this.buildListener();
            return true;
        }

        //--------------------------------------------------------------------------------
        public buildListener(): void
        {
            this.mActionButton.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleButton, this);
            this.mActionButton.btn_mid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleButton, this);
            this.mActionButton.btn_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleButton, this);
        }

        //--------------------------------------------------------------------------------
        private handleButton(e: egret.TouchEvent): void
        {
            var self = this;
            var AB = self.mActionButton;

            switch (e.currentTarget)
            {
                case AB.btn_left:

                    self.mVSliderSuper.visible = false;

                    if (self.mActionButton.btn_left.label == "弃牌")
                    {
                        NetCenter.instance.ctsMainAction(4, 0);
                    }
                    break;

                case AB.btn_mid:

                    self.mVSliderSuper.visible = false;

                    switch (self.mActionButton.btn_mid.label)
                    {
                        case "让牌":
                            NetCenter.instance.ctsMainAction(1, 0);
                            break;
                        case "跟" + Data.instance.mDGameTable.mFollowAnte:
                            NetCenter.instance.ctsMainAction(2, 0);
                            break;
                        case "ALLIN":
                            NetCenter.instance.ctsMainAction(2, 0);
                            break;
                        default:
                            break;
                    }
                    break;

                case AB.btn_right:

                    switch (self.mActionButton.btn_right.label)
                    {
                        case "加注":

                            self.mActionButton.btn_right.label = Data.instance.mDGameTable.mAddAnte.toString();
                            self.mVSliderSuper.visible = true;
                            break;

                        case "ALLIN":
                        default:

                            if (Data.instance.mDGameTable.mAddAnte > 0)
                            {
                                NetCenter.instance.ctsMainAction(3, Data.instance.mDGameTable.mAddAnte);
                                self.mActionButton.btn_right.label = "加注";
                                self.mVSliderSuper.visible = false;
                            }

                            break;
                    }
                    break;
                case AB.ts_left:
                    break;
                case AB.ts_mid:
                    break;
                case AB.ts_right:
                    break;
                default:
                    break;
            }
        }

        //--------------------------------------------------------------------------------
        private handleChange(e: egret.TouchEvent): void
        {
            if (this.mVSliderSuper.visible)
            {
                if (this.mVSliderSuper.GUI_VSlider.label_num)
                {
                    this.mVSliderSuper.GUI_VSlider.updateShow(e.target.value);
                }

                Data.instance.mDGameTable.mAddAnte = e.target.value;
                this.mActionButton.btn_right.label = e.target.value == this.mVSliderSuper.GUI_VSlider.maximum ? "ALLIN" : e.target.value.toString();
            }
        }

        //--------------------------------------------------------------------------------
        public remove(): void
        {
            var self = this;
            self.mActionButton.visible = self.mVSliderSuper.visible = false;
        }

        //--------------------------------------------------------------------------------
        public show(): void
        {
            var self = this;

            self.mActionButton.visible = true;

            if (!self.CONTAINER.contains(self.mActionButton))
            {
                self.CONTAINER.addChild(self.mActionButton);
            }

            if (!self.CONTAINER.contains(self.mVSliderSuper))
            {
                self.CONTAINER.addChild(self.mVSliderSuper);
            }
        }
    }
}