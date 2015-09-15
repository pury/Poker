module Game {
    /**控制开关类*/
    export class Activate {

        public FOT_PANELHALL: boolean;

        public FOT_GAMETABLE: boolean;
        /**
         * 为GameTable创建完成前的三条协议做缓存 4005 4007 4008
         * @ 0-->1-->2 0：未缓存 1：缓存 2：创建完成  
         * @ 不一定每次游戏都需要缓存
         */
        public FIRSET_BEFORE_ACTION: number[];

        public FIRST_CREATED_TABLE: boolean;

        public static _instance: Activate;

        public constructor()
        {
            this.FIRST_CREATED_TABLE = false;
            this.reset();
        }

        public reset(): void
        {
            this.FOT_PANELHALL = false;
            this.FOT_GAMETABLE = false;
            this.FIRSET_BEFORE_ACTION = [0, 0, 0];
        }

        //--------------------------------------------------------------------------------
        public static set instance(value: Activate)
        {
            this._instance = value;
        }

        //--------------------------------------------------------------------------------
        public static get instance(): Activate
        {
            if (!this._instance)
            {
                this._instance = new Activate();
            }

            return <Activate><any>(this._instance);
        }
    }
}