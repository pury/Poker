module Game {
    /**底池、主池、边池管理类*/
    export class TPond extends TBase{
        /**底池*/
        private GUI_label_pond: egret.gui.Label;

        private TA_0: TotalAnte;
        private TA_1: TotalAnte;
        private TA_2: TotalAnte;
        private TA_3: TotalAnte;
        private TA_4: TotalAnte;
        private TA_5: TotalAnte;
        private TA_6: TotalAnte;
        private TA_7: TotalAnte;

        private mFactor: number;

        private LIST_TA: TotalAnte[];

        public constructor(container) {
            super(container);
            this.mFactor = 0.8;
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var self = this;

            self.GUI_label_pond = new egret.gui.Label;
            self.GUI_label_pond.width = self.mStageWidth / 3;
            self.GUI_label_pond.size = 24;
            self.GUI_label_pond.x = self.mStageWidth / 2 - self.mStageWidth / 3 / 2;
            self.GUI_label_pond.y = Math.floor(self.mStageHeight / 9);
            self.GUI_label_pond.textAlign = "center";
            self.GUI_label_pond.text = "底池: 0";
            self.CONTAINER.addChild(self.GUI_label_pond);

            self.LIST_TA = [self.TA_0, self.TA_1, self.TA_2, self.TA_3, self.TA_4, self.TA_5, self.TA_6, self.TA_7];
        }

        //--------------------------------------------------------------------------------
        public setPond(): void
        {
            if (this.GUI_label_pond)
            {
                this.GUI_label_pond.text = "底池: " + Data.instance.mDGameTable.mTotalAnte.toString();
            }
        }

        //--------------------------------------------------------------------------------
        public updatePond(): void
        {
            var self = this;

            var pondList = Data.instance.mDGameTable.mPondList;

            if (pondList.length <= 0)
            {
                Log.L.ERROE("pondList length error!");
                return;
            }

            if (self.TA_0 == null)
            {
                self.TA_0 = new TotalAnte;
            }

            self.TA_0.prepare = pondList[0].Ante;

            if (!self.CONTAINER.contains(self.TA_0))
            {
                self.CONTAINER.addChild(self.TA_0);
            }

            if (pondList.length == 1)
            {
                self.TA_0.x = self.mStageWidth / 2 - self.TA_0.width * self.mFactor / 2;
                self.TA_0.y = Math.floor(self.mStageHeight / 7);
            }
            else
            {
                self.TA_0.x = self.mStageWidth / 2 - self.TA_0.width;
                self.TA_0.y = Math.floor(self.mStageHeight / 7);
            }

            for (var i = 1; i < self.LIST_TA.length; i++)
            {
                if (i >= pondList.length)
                {
                    if (self.CONTAINER.contains(self.LIST_TA[i]))
                    {
                        self.CONTAINER.removeChild(self.LIST_TA[i]);
                    }

                    continue;
                }

                if (self.LIST_TA[i] == null)
                {
                    self.LIST_TA[i] = new TotalAnte;
                }

                var TA = self.LIST_TA[i];

                TA.prepare = pondList[i].Ante;

                if (i % 2 == 0)
                {
                    TA.x = self.TA_0.x;
                    TA.y = self.TA_0.y + self.TA_0.height * self.mFactor * (i / 2);
                }
                else
                {
                    TA.x = self.mStageWidth / 2 + self.TA_0.width * (1 - self.mFactor);
                    TA.y = self.TA_0.y + self.TA_0.height * self.mFactor * (i - 1) / 2 + 10;
                }

                if (!self.CONTAINER.contains(self.LIST_TA[i]))
                {
                    self.CONTAINER.addChild(self.LIST_TA[i]);
                }
            }
        }

        //--------------------------------------------------------------------------------
        public resetPond(): void
        {
            for (var i in this.LIST_TA)
            {
                if (this.CONTAINER.contains(this.LIST_TA[i]))
                {
                    this.CONTAINER.removeChild(this.LIST_TA[i]);
                }
            }
        }
    }
}