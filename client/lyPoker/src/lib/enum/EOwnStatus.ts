module Game {
    export class EOwnStatus {
        /**参与游戏中*/
        public static PARTIN: number = 0;
        /**已坐下，等待下局中*/
        public static WAITING: number = 1;
        /**站起*/
        public static STANDUP: number = 2;
        /**座位满，坐下排队中*/
        public static LINEUP: number = 3;

        public constructor() {

        }
    }
} 