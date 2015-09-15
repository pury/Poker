module Game {
    /**桌子上各个玩家的块容器*/
    export class Avatar extends egret.DisplayObjectContainer implements IAvatar{
        /**静态表现*/
        public TB: TableRole;
        /**位置坐标点数组 0: 舞台外 1:舞台内*/
        public mDataPoint: number[][];

        private mAvatarTimer: AvatarTimer;

        /**实时状态*/
        public _status: number;

        public _action: number;

        public AWIDTH: number;

        public AHEIGHT: number;


        public constructor() {
            super();
            this.mDataPoint = [];
            this._status = 0;
            this._action = -1;
            this.AWIDTH = 132;
            this.AHEIGHT = 121;
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var self = this;
            self.width = self.AWIDTH;
            self.height = self.AHEIGHT;
            self.mAvatarTimer = new AvatarTimer(self,2,9,0);
            self.TB = new TableRole;
            self.addChild(self.TB);
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
        public get status(): number
        {
            return this._status;
        }

        //--------------------------------------------------------------------------------
        public set status(value: number)
        {
            this._status = value;
        }

        //--------------------------------------------------------------------------------
        public get action(): number
        {
            return this._action;
        }

        //--------------------------------------------------------------------------------
        public set action(value:number)
        {
            var self = this;

            if (self._action == value)
            {
                return;
            }

            self._action = value;
        }
    }
}