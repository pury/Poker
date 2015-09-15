module Game{
    export class DComeInRole {
        
        public UserId: number;

        public NickName: string;

        public Pos: number;

        public LeftAnte: number;

        public constructor() {
            this.init();
        }

        //--------------------------------------------------------------------------------
        public init(): void
        {
            this.UserId = 0;
            this.NickName = "";
            this.Pos = -1;
            this.LeftAnte = 0;
        }
    }
}