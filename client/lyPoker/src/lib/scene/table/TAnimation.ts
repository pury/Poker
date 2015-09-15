module Game {
    /**桌子上各特效动画管理类*/
    export class TAnimation extends TBase {
        /**发牌动画素材集合*/
        private START_CARD_LIST: egret.gui.UIAsset[];
        /**发牌动画，间隔缓动*/
        private mTimerStart: egret.Timer;
        /**每次发牌的动画个数*/
        private mTimerStartCount: number;
        /**发牌目标数据*/
        private mDataStart: number[][];

        private GUI_UIA_card1: egret.gui.UIAsset;

        private GUI_UIA_card2: egret.gui.UIAsset;

        private GUI_UIA_card3: egret.gui.UIAsset;

        private GUI_UIA_card4: egret.gui.UIAsset;

        private GUI_UIA_card5: egret.gui.UIAsset;

        private GUI_UIA_card6: egret.gui.UIAsset;

        private GUI_UIA_card7: egret.gui.UIAsset;

        private GUI_UIA_card8: egret.gui.UIAsset;

        private GUI_UIA_card9: egret.gui.UIAsset;

        public constructor(container) {
            super(container);
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void {
            var self = this;
            self.GUI_UIA_card1 = new egret.gui.UIAsset("ly_poker_bg_1_png");
            self.GUI_UIA_card2 = new egret.gui.UIAsset("ly_poker_bg_1_png");
            self.GUI_UIA_card3 = new egret.gui.UIAsset("ly_poker_bg_1_png");
            self.GUI_UIA_card4 = new egret.gui.UIAsset("ly_poker_bg_1_png");
            self.GUI_UIA_card5 = new egret.gui.UIAsset("ly_poker_bg_1_png");
            self.GUI_UIA_card6 = new egret.gui.UIAsset("ly_poker_bg_1_png");
            self.GUI_UIA_card7 = new egret.gui.UIAsset("ly_poker_bg_1_png");
            self.GUI_UIA_card8 = new egret.gui.UIAsset("ly_poker_bg_1_png");
            self.GUI_UIA_card9 = new egret.gui.UIAsset("ly_poker_bg_1_png");
            self.START_CARD_LIST = [self.GUI_UIA_card1, self.GUI_UIA_card2, self.GUI_UIA_card3, self.GUI_UIA_card4, self.GUI_UIA_card5, self.GUI_UIA_card6, self.GUI_UIA_card7, self.GUI_UIA_card8, self.GUI_UIA_card9];
        }

        //--------------------------------------------------------------------------------
        public handOutCard(): void
        {
            var self = this;
            var data: number[][] = [];
            var ww = 50;
            var hh = 65;

            for (var i = 0; i <= 8; i++)
            {
                if (i == 5 && self.CONTAINER.mTAvatar.mAvatarOwn.TB.status == 1 && self.CONTAINER.mTAvatar.mAvatarOwn.visible)
                {
                    Data.instance.mDRole.mStatus = EOwnStatus.PARTIN;
                    data.push([i, self.CONTAINER.mTAvatar.mAvatarOwn.x + 125 / 2 - ww / 2, self.CONTAINER.mTAvatar.mAvatarOwn.y + 150 / 2 - hh / 2]);
                    continue;
                }

                if (self.CONTAINER.mTAvatar.AVATAR_LIST[i].TB.status == 1 && self.CONTAINER.mTAvatar.AVATAR_LIST[i].visible)
                {
                    data.push([i, self.CONTAINER.mTAvatar.AVATAR_LIST[i].x + 150 / 2 - ww / 2, self.CONTAINER.mTAvatar.AVATAR_LIST[i].y + 150 / 2 - hh / 2]);
                }
            }

            if (data.length >= 2)
            {
                for (var j in self.START_CARD_LIST)
                {
                    if (self.CONTAINER.contains(self.START_CARD_LIST[j]))
                    {
                        self.CONTAINER.removeChild(self.START_CARD_LIST[j]);
                    }
                }

                for (j in data)
                {
                    var pos = data[j][0].toString();

                    if (!self.CONTAINER.contains(self.START_CARD_LIST[pos]))
                    {
                        self.START_CARD_LIST[pos].width = ww;
                        self.START_CARD_LIST[pos].height = hh;
                        self.START_CARD_LIST[pos].x = self.mStageWidth / 2 - ww / 2;
                        self.START_CARD_LIST[pos].y = self.mStageHeight / 2 - hh / 2;
                        self.CONTAINER.addChild(self.START_CARD_LIST[pos]);
                    }
                }

                self.mDataStart = data;
                self.createTimerStart();
            }
        }

        //--------------------------------------------------------------------------------
        private createTimerStart(): void
        {
            this.destoryTimerStart();
            this.mTimerStart = new egret.Timer(100);
            this.mTimerStart.addEventListener(egret.TimerEvent.TIMER, this.handleStart, this);
            this.mTimerStart.start();
        }

        //--------------------------------------------------------------------------------
        private handleStart(e: egret.TimerEvent): void
        {
            var self = this;
            var data = this.mDataStart[this.mTimerStartCount];
            var target = this.START_CARD_LIST[data[0].toString()];
            var index = self.mTimerStartCount;
            var tw = egret.Tween.get(target).to({
                x: data[1],
                y: data[2]
            }, 250, egret.Ease.sineOut).call(function () {
                var _data = self.mDataStart[index];

                if (_data[0] == 5)
                {
                    var datacard = Data.instance.mDGameTable.mCardOwn;
                    self.CONTAINER.mTAvatar.mAvatarOwn.TB.gc_left.data = datacard[0];
                    self.CONTAINER.mTAvatar.mAvatarOwn.TB.gc_right.data = datacard[1];
                    self.CONTAINER.mTAvatar.mAvatarOwn.TB.status = 2;
                }
                else
                {
                    self.CONTAINER.mTAvatar.AVATAR_LIST[_data[0]].TB.status = 2;
                }

                if (index == self.mDataStart.length - 1)
                {
                    self.CONTAINER.doAction();
                }

                if (self.CONTAINER.contains(self.START_CARD_LIST[_data[0]]))
                {
                    self.CONTAINER.removeChild(self.START_CARD_LIST[_data[0]]);
                }
            });

            this.mTimerStartCount++;

            if (this.mTimerStartCount == this.mDataStart.length)
            {
                this.destoryTimerStart();
            }
        }

        //--------------------------------------------------------------------------------
        private destoryTimerStart(): void
        {
            this.mTimerStartCount = 0;

            if (this.mTimerStart)
            {
                this.mTimerStart.removeEventListener(egret.TimerEvent.TIMER, this.handleStart, false);
                this.mTimerStart.stop();
                this.mTimerStart = null;
            }
        }
    }
} 