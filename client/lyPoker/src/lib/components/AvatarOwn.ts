module Game {
    /**桌子上各个玩家的块容器*/
    export class AvatarOwn extends egret.DisplayObjectContainer implements IAvatar{
        /**静态表现*/
        public TB: TableRoleOwn;
        /**位置坐标点数组 0: 舞台外 1:舞台内*/
        public mDataPoint: number[][];

        private mAvatarTimer: AvatarTimer;

        /**实时状态*/
        public _status: number;

        public _alphaA: number;

        public AWIDTH: number = 452;

        public AHEIGHT: number = 121;


        public constructor() {
            super();
            this.mDataPoint = [];
            this._status = 0;
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var self = this;
            self.width = self.AWIDTH;
            self.height = self.AHEIGHT;
            self.mAvatarTimer = new AvatarTimer(self,2,6,4);
            self.TB = new TableRoleOwn;
            self.addChild(self.TB);
        }

        //--------------------------------------------------------------------------------
        public get status(): number
        {
            return this._status;
        }

        //--------------------------------------------------------------------------------
        public startTimer(): void
        {
            this.mAvatarTimer.startTimer();
        }

        //--------------------------------------------------------------------------------
        public stopTimer(): void
        {
            this.mAvatarTimer.stopTimer();
        }

        //--------------------------------------------------------------------------------
        public set status(value: number)
        {
            this._status = value;
        }

        /**自己手牌透明度保持为1*/
        //--------------------------------------------------------------------------------
        public set alphaA(value: number)
        {
            this._alphaA = value;
            this.TB.label_status.alpha = this._alphaA;
            this.TB.label_coin.alpha = this._alphaA;
            this.TB.UIA_role.alpha = this._alphaA;
        }

        //--------------------------------------------------------------------------------
        public get alphaA(): number
        {
            return this._alphaA;
        }
    }
}