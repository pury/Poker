module Game {
    /**Main Events.*/
    export class NetEvent extends egret.Event {
        /**获得玩家信息*/
        public static EVENT_ROLE: string = "EventRole";
        /**桌子内所有玩家信息*/
        public static EVENT_ROOM_DATA: string = "EventRoomData";
        /**开局信号*/
        public static EVENT_GAME_START: string = "EventGameStart";
        /**开局推送个人手牌*/
        public static EVENT_OWN_CARD: string = "EventOwnCard";
        /**推手牌后桌子数据刷新*/
        public static EVENT_DO_ACTION: string = "EventDoAction";
        /**开牌*/
        public static EVENT_OPEN_CARD: string = "EventOpenCard";
        /**推送自己牌型*/
        public static EVENT_CARD_TYPE: string = "EventCardType";
        /**结算*/
        public static EVENT_GAME_RESULT: string = "EventGameResult";
        
        public static EVENT_GAME_POND: string = "EventGamePond";
        /**支付返回结果*/
        public static EVENT_PAY_RESULT: string = "EventPayResult";
        /**钻石兑换金币*/
        public static EVENT_DIAMOND_TO_GOLD: string = "EventDiamondToGold";
        /**有玩家离开*/
        public static EVENT_COME_OUT: string = "EventComeOut";
        /**有玩家进入*/
        public static EVENT_COME_IN: string = "EventComeIn";
        public mParam: any;

        public constructor(type: string, mParam: any, bubbles: boolean = false, cancelable: boolean = false) {
            super(type, bubbles, cancelable);
            this.mParam = mParam;
        }
    }
}