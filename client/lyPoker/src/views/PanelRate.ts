module Game {

    export class PanelRate extends PanelRateUI {
        
        private mListButton: any[];

        private _table: number;

        public constructor() {
            super();
            this.name = "PanelRate";
            this.width = Game.Config.instance.STAGE_WIDTH;
            this.height = Game.Config.instance.STAGE_HEIGHT;
            this._table = 0;
            this.mListButton = [];
        }

        //--------------------------------------------------------------------------------
        public childrenCreated():void
        {
            this.CREATED = true;
            this.mListButton = [this.btn_top_1, this.btn_top_2, this.btn_top_3, this.btn_blind1, this.btn_blind2, this.btn_blind3, this.btn_blind4, this.btn_down_1, this.btn_down_2];
            this.openPanel();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleTap,this);
        }

        //--------------------------------------------------------------------------------
        public partAdded(partName: string, instance: any): void
        {
            super.partAdded(partName, instance);
        }

        //--------------------------------------------------------------------------------
        public openPanel(): void
        {
            super.openPanel();
            this.btn_top_1.flag = true;
            this.btn_top_2.flag = false;
            this.btn_top_3.flag = false;
            this.btn_down_1.flag = true;
            this.btn_down_2.flag = false;
            this.handleTopButton(1);
            this.table = 1001;
        }

        //--------------------------------------------------------------------------------
        public update(): void
        {

        }

        //--------------------------------------------------------------------------------
        private handleTopButton(value: number): void
        {
            var data = DPanelRate.getTableData(value);

            for (var i = 0; i < data.length; i++)
            {
                this.mListButton[i + 3].label = data[i][0];
                this.mListButton[i + 3].label_blind.text = data[i][1];
            }

            for (var j = 0; j <= 2; j++)
            {
                this.mListButton[j].flag = ((value - 1) == j) ? true : false;
            }
        }

        //--------------------------------------------------------------------------------
        private handleDownButton(value: number): void
        {
            for (var j = 0; j <= 1; j++)
            {
                this.mListButton[j + 7].flag = ((value - 1) == j) ? true : false;
            }
        }

        //--------------------------------------------------------------------------------
        public handleTap(e: egret.TouchEvent): void
        {
            var obj = e.target;
            
            if (obj)
            {
                switch (obj.name)
                {
                    case "btn_back":
                        GameUI.instance.manage_panel("PanelRate", "close");
                        GameUI.instance.manage_panel("PanelHall", "open");
                        break;
                        
                    case "btn_top_1":
                    case "btn_top_2":
                    case "btn_top_3":

                        this.handleTopButton(obj.name.substr(8));
                        break;

                    case "btn_down_1":
                    case "btn_down_2":

                        this.handleDownButton(obj.name.substr(9));
                        break;

                    case "btn_blind1":
                    case "btn_blind2":
                    case "btn_blind3":
                    case "btn_blind4":

                        this.enterTable(parseInt(obj.name.substr(9)));
                        break;

                    case "btn_shop":

                        DPanelShop.DATA_FLAG = 1;
                        GameUI.instance.manage_panel("PanelShop", "open");
                        Game.GameUI.instance.manage_panel("PanelRate", "close");
                        break;

                    default:
                        break;
                }
            }
        }

        //--------------------------------------------------------------------------------
        private enterTable(value:number): void
        {
            var table = this.getTableType(value);

            if (table > 0)
            {
                if (this.checkCoin(table))
                {
                    NetCenter.instance.ctsRoomAsk(this.table);
                    Activate.instance.FOT_GAMETABLE = true;
                }
                else
                {
                    GameUI.instance.alertMag("金币不足", 1, 3, 1);
                }
            }
            else
            {
                Log.L.ERROE("unknown table type!");
            }
        }

        //--------------------------------------------------------------------------------
        private getTableType(value: number): number
        {
            //top:1-3    mid:1-4    down:1-2
            var self = this;
            var top = 0, mid = 0, down = 0;

            for (var i = 0; i < self.mListButton.length; i ++)
            {
                if (i <= 2)
                {
                    top = self.mListButton[i].flag ? (parseInt(self.mListButton[i].name.substr(8))) : top;
                }
                else if (i >= 3 && i <= 6)
                {
                    mid = value;
                }
                else
                {
                    down = self.mListButton[i].flag ? (parseInt(self.mListButton[i].name.substr(9))) : down;
                }
            }

            if (top > 0 && mid > 0 && down > 0)
            {
                var table = 1000;
                table += (top - 1) * 4 + mid + (down == 1 ? 0 : 12);
                self.table = table;
                return table;
            }
            else
            {
                return 0;
            }
        }

        //--------------------------------------------------------------------------------
        private checkCoin(value:number): boolean
        {
            var table = value > 1012 ?( value - 12 ): value;

            if (DPanelRate.DATA_NUMBER[table.toString()] <= Data.instance.mDRole.mCoin)
            {
                return true;
            }

            return false;
        }

        //--------------------------------------------------------------------------------
        public get table(): number
        {
            return this._table;
        }

        //--------------------------------------------------------------------------------
        public set table(value: number)
        {
            this._table = value;
        }
    }
}