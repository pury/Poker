module Game {
    export class AvatarTimer {
        
        public mTimerBG: egret.gui.UIAsset;

        public mTimerLine: egret.gui.UIAsset;

        public mTimer: egret.Timer;

        public mRect: egret.Rectangle;

        private xx: number;

        private yy: number;

        private zz: number;

        private mTime: number;

        public BOX: egret.DisplayObjectContainer;

        public constructor(box:egret.DisplayObjectContainer,xx,yy,zz) {
            this.BOX = box;
            this.xx = xx;
            this.yy = yy;
            this.zz = zz;
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var self = this;
            self.mTime = DConst.AVATAE_TIME;
        }

        //--------------------------------------------------------------------------------
        public startTimer(): void
        {
            var self = this;

            if (self.mTimerBG == null)
            {
                self.mTimerBG = new egret.gui.UIAsset("ly_table_timer2_png");
                self.mTimerBG.width = 126;
                self.mTimerBG.height = 102;
            }

            if (self.mTimerLine == null)
            {
                self.mTimerLine = new egret.gui.UIAsset("ly_table_timer1_png");
            }

            if (self.mRect == null)
            {
                self.mRect = new egret.Rectangle(self.xx, self.yy, self.mTimerBG.width, self.mTimerBG.height);
            }

            if (!self.BOX.contains(self.mTimerBG))
            {
                self.BOX.addChild(self.mTimerBG);
            }

            if (!self.BOX.contains(self.mTimerLine))
            {
                self.BOX.addChild(self.mTimerLine);
            }

            self.mTimerBG.x = self.xx;
            self.mTimerLine.x = self.xx - 2;
            self.mTimerBG.y = self.yy;
            self.mTimerLine.y = self.yy - self.zz;
            self.mRect.x = self.xx;
            self.mRect.y = self.yy;
            self.mTimerBG.mask = self.mRect;
            self.destoryTimer();
            self.mTimer = new egret.Timer(100, self.mTime * 10);
            self.mTimer.addEventListener(egret.TimerEvent.TIMER, self.handleTimer, self);
            self.mTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, self.handleTimerComplete, self);
            self.mTimer.start();
        }

        //--------------------------------------------------------------------------------
        private handleTimer(e: egret.TimerEvent): void
        {
            var self = this;
            self.mTimerLine.y += 1;
            self.mRect.y = self.mTimerLine.y;
        }

        //--------------------------------------------------------------------------------
        private handleTimerComplete(e: egret.TimerEvent): void
        {
            var self = this;
            self.destoryTimer();
        }

        //--------------------------------------------------------------------------------
        private destoryTimer(): void
        {
            var self = this;

            if (self.mTimer)
            {
                self.mTimer.removeEventListener(egret.TimerEvent.TIMER, self.handleTimer, self);
                self.mTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, self.handleTimerComplete, self);
                self.mTimer.stop();
                self.mTimer = null;
            }
        }

        //--------------------------------------------------------------------------------
        public stopTimer(): void
        {
            var self = this;
            self.destoryTimer();

            if (self.mTimerBG && self.BOX.contains(self.mTimerBG))
            {
                self.BOX.removeChild(self.mTimerBG);
                self.mTimerBG.mask = null;
                self.mTimerBG = null;
            }

            if (self.mTimerLine && self.BOX.contains(self.mTimerLine))
            {
                self.BOX.removeChild(self.mTimerLine);
                self.mTimerLine = null;
            }
        }
    }
}