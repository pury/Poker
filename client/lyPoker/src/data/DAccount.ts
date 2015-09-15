module Game{
    export class DAccount {
        
        public mAccount: string

        public mPassword: string;

        public constructor() {
            this.init();
        }

        //--------------------------------------------------------------------------------
        public init(): void
        {
            this.mAccount = "";
            this.mPassword = "";
        }
    }
}