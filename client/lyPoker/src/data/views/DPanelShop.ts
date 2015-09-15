module Game {
    export class DPanelShop {
        /**购买钻石*/
        public static DATA_DIAMOND: number [][] = [
            [2, 10, 0],
            [5, 25, 5],
            [10, 50, 10],
            [30, 150, 50],
            [100, 500, 500],
            [300, 1500, 1800],
            [500, 2500, 3500]
        ];

        /**兑换筹码*/
        public static DATA_COIN = [
            [1, "1000", 0],
            [10, "1万", 0],
            [100, "10万", 0],
            [1000, "100万", 0],
        ];
        /**
         * 打开商城的来源
         * value :0  PanelHall
         * value :1  PanelRate
         * value :2  PanelFastCharge
         */
        public static DATA_FLAG: number = 0;

        public constructor()
        {

        }

        //--------------------------------------------------------------------------------
        public static reset(): void
        {
            this.DATA_FLAG = 0;
        }
    }
}