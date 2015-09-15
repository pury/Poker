module Game {
    /**Table 组成组件基类*/
    export class TBase {
        /**舞台宽度*/
        public mStageWidth: number 
        /**舞台高度*/
        public mStageHeight: number;
        /**容器*/
        public CONTAINER: GameTablePlus;

        public constructor(container) {
            this.CONTAINER = container;
            this.mStageWidth = Config.instance.STAGE_WIDTH;
            this.mStageHeight = Config.instance.STAGE_HEIGHT;
        }
    }
}