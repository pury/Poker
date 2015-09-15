module Game {
    export class NetProtocol {
        /**注册*/
        public static ctsRegister: number = 1003;
        /**登录*/
        public static ctsLogin: number = 1004;
        /**支付返回结果*/
        public static stcPayResult: number = 1007;
        /**钻石兑换金币*/
        public static ctsDiamondToGold: number = 1008;
        /**进桌子请求*/
        public static ctsRoomAsk: number = 4002;
        /**获取桌子信息*/
        public static stcRoomData: number = 4003;
        /**离开桌子*/
        public static ctsLeaveTable: number = 4004;
        /**开局信号*/
        public static stcGameStart: number = 4005;
        /**新的一轮*/
        public static stcNewCircle: number = 4006;
        /**开局推送玩家自己手牌*/
        public static stcCardOwn: number = 4007;
        /**桌面一些操作相关信息*/
        public static stcDoAction: number = 4008;
        /**下方三个按钮操作*/
        public static stcMainAction: number = 4009;
        /**自己牌型*/
        public static stcCardType: number = 4010;
        /**结算*/
        public static stcGameResult: number = 4011;
        /**坐下*/
        public static ctsSitDown: number = 4012;
        /**站起*/
        public static ctsStandUp: number = 4013;
        /**通知玩家进入*/
        public static stcComeIn: number = 4014;
        /**通知玩家离开*/
        public static stcComeOut: number = 4015;
        /**获取玩家信息*/
        public static stcGetRole: number = 4001;


        public constructor() {

        }
    }
}