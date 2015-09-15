module Game {
    export class GameLayer extends egret.DisplayObjectContainer {

        public gameTablePlus: GameTablePlus;

        public static _instance: GameLayer;

        public constructor() {
            super();
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var GC = Config.instance;
            //var shape: egret.Shape = new egret.Shape();
            //shape.graphics.beginFill(0x007500, 1);
            //shape.graphics.drawRect(0, 0, GC.STAGE_WIDTH, GC.STAGE_HEIGHT);
            //shape.graphics.endFill();
            //this.addChild(shape);
        }

        //--------------------------------------------------------------------------------
        public showTablePlus(): void
        {
            if (this.gameTablePlus == null)
            {
                this.gameTablePlus = new GameTablePlus();
            }

            if (!this.contains(this.gameTablePlus))
            {
                this.addChild(this.gameTablePlus);
                
                if (Activate.instance.FIRST_CREATED_TABLE)
                {
                    this.gameTablePlus.updateRoomData();
                }
            }
        }

        //--------------------------------------------------------------------------------
        public hideTablePlus(): void
        {
            if (this.contains(this.gameTablePlus))
            {
                this.removeChild(this.gameTablePlus);
            }
        }

        //--------------------------------------------------------------------------------
        public static get instance(): GameLayer
        {
            if (this._instance == null)
            {
                this._instance = new GameLayer();
            }

            return this._instance;
        }

        //--------------------------------------------------------------------------------
        public static set instance(value: GameLayer)
        {
            this._instance = value;
        }
    }
}