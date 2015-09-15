module Game {
    export class Data {

        public mDRole: DRole;

        public mDAccount: DAccount;

        public mDGameTable: DGameTable;

        public static _instance: Data;

        public constructor() {
            this.mDRole = new DRole();
            this.mDAccount = new DAccount();
            this.mDGameTable = new DGameTable();
        }

        //--------------------------------------------------------------------------------
        public init(): void
        {
            var self = this;
            self.mDRole.init();
            self.mDAccount.init();
            self.mDGameTable.init();
        }

        //--------------------------------------------------------------------------------
        public reset(): void
        {
            DPanelShop.reset();
        }

        //--------------------------------------------------------------------------------
        public static set instance(value:Data)
        {
            this._instance = value;
        }

        //--------------------------------------------------------------------------------
        public static get instance(): Data
        {
            if (this._instance == null)
            {
                this._instance = new Data();
            }

            return <Data><any>(this._instance);
        }
    }
}