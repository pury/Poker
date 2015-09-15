module Game{
    export class DRole {
        
        public mUserId: number;

        public mName: string;

        public mLv: number;

        public mHead: string;

        public mCoin: number;

        public mDiamond: number;

        public mGender: number;

        public mPosition: number;
        /**牌型*/
        public mCardType: number;
        /**牌型索引*/
        public mCardIndex: number[];
        /**剩余筹码数*/
        public mLeftAnte: number;

        public mStatus: number;

        public constructor() {
            this.init();
        }

        //--------------------------------------------------------------------------------
        public init(): void
        {
            this.mUserId = 0;
            this.mName = "思密达叫兽";
            this.mLv = 56;
            this.mHead = "ly_hall_boy_png";
            this.mCoin = 43234;
            this.mPosition = DConst.OWN_POSITION;
            this.mCardType = -1;
            this.mCardIndex = [0, 0, 0, 0, 0];
            this.mLeftAnte = 0;
            this.mDiamond = 0;
            this.mStatus = 0;
        }
    }
}