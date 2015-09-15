module Game{
    export class DGameTable {
        /**桌子当前状态*/
        public mStatus: number;
        /**庄家位置*/
        public mBanker: number;
        /**房间编号*/
        public mRoomId: number;
        /**桌子编号*/
        public mTableId: number;
        /**桌子所有玩家信息集合*/
        public mListPlayer: any[];
        /**庄家位置*/
        public mHostPosition: number;
        /**
          * 玩家自己手牌 
          * @ param cardType 花色  0：无   1-4:黑红梅方
          * @ param cardNum  点数  范围：1-13
          */
        public mCardOwn: number[][];
        /**5张公共牌数据*/
        public mComCard: number[][];
        /**操作位*/
        public mDoPosition: number;
        /**是否可以加注*/
        public mCanAddAnte: boolean;
        /**单人最大下注数*/
        public mSingleAnte: number;
        /**单人下注数第二名*/
        public mSingleAnteSecond: number;
        /**底池*/
        public mTotalAnte: number;
        /**
         *桌子上各玩家下注状态
         *@ Pos
         *@ PosState  Poswait:0   Posplay:1  PosDiscard: 2  PosQuit: 3  PosAllin:4
         *@ LastOpType  OpNone: 0  pCheck: 1  OpFollowAnte: 2  OpAddAnte: 3  OpDiscard: 4
         *@ BetAnte
         *@ LeftAnte
         */
        public mPosBetList: any[];
        /**
         * 根据公共牌的发放划分5个阶段
         * @ 0: 开局前
         * @ 1: 开局后
         * @ 2: 开前三张牌
         * @ 3: 开第四张
         * @ 4: 开第五张
         * @ 5: 结束
         */
        public mPhase: number;
        /**中间按钮跟注筹码数*/
        public mFollowAnte: number;
        /**加注按钮处的筹码数*/
        public mAddAnte: number;
        /**大盲注*/
        public mBigAnte: number;
        /**各赢家位置*/
        public mWinPositionList: number[];
        /**
         * 各赢家位置和其赢取金额
         * @ param Pos
         * @ param WinAnte 
         */
        public mWinList: any[];
        /**
         * 需要比较大小的各玩家牌型
         * @ param Pos
         * @ param (int 1- 10) GroupType 
         * @ param CardType_1
         * @ param CardNum_1
         * @ param CardType_2
         * @ param CardNum_2
         */
        public mGroupTypeList:any[];
        /**
         * 池信息
         * @ param Id 池序号 0,1,2...
         * @ param winPosList  include Pos 当前池内赢家位置 
         * @ param Ante 池内筹码数
         */
        public mPondList: DPond[];
        /**是否站起模式*/
        public mStandUp: boolean;
        /**是否处于等待坐下状态*/
        public mWaiting: boolean;
        /**离开玩家位置*/
        public mLeavePosition: number;
        /**进入玩家信息*/
        public mComeInRole: DComeInRole;
        /**桌子人数上限*/
        public mPlayerNumber: number;
        /**位置偏移标志*/
        public mFlagPosition: boolean;

        public mActionName: ActionName;

        public constructor() {
            this.init();
        }

        //--------------------------------------------------------------------------------
        public init(): void
        {
            this.mStatus = 0;
            this.mRoomId = 0;
            this.mTableId = 0;
            this.mListPlayer = [];
            this.mHostPosition = 0;
            this.mCardOwn = [];
            this.mComCard = [];
            this.mDoPosition = -1;
            this.mCanAddAnte = false;
            this.mPhase = 0;
            this.mFollowAnte = 0;
            this.mAddAnte = 0;
            this.mSingleAnte = 0;
            this.mSingleAnteSecond = 0;
            this.mBigAnte = 0;
            this.mWinPositionList = [];
            this.mWinList = [];
            this.mGroupTypeList = [];
            this.mPondList = [];
            this.mStandUp = false;
            this.mWaiting = false;
            this.mLeavePosition = -1;
            this.mComeInRole = new DComeInRole;
            this.mPlayerNumber = 9;
            this.mFlagPosition = false;
            this.mTotalAnte = 0;
        }
    }

    /*--------------------------------------------------------------------------------
                                    data struct
     --------------------------------------------------------------------------------*/

    class ActionName {

        public static LEFT = {
            "PASS": "让牌",
            "DISCARD": "弃牌"
        };

        public static MIDDLE = {
            
        };

        public static RIGHT = {
            "ALLIN": "ALLIN",

        };

        public static PREPARE_LEFT = {
            "PASS": "让或弃"
        };

        public static PREPARE_MIDDELE = {
            "PASS": "让或弃"
        };

        public static PREPARE_RIGHT = {
            "PASS": "让或弃"
        };

        public constructor() {

        }
    }
}