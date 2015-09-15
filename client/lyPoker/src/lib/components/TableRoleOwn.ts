module Game {
    export class TableRoleOwn extends egret.gui.SkinnableComponent{

        public label_status: egret.gui.Label;

        public label_coin: egret.gui.Label;

        public label_bet_num: egret.gui.Label;
        /**牌型*/
        public label_card: egret.gui.Label;

        public label_add: egret.gui.Label;

        public UIA_role: egret.gui.UIAsset;

        public gc_left: Card;

        public gc_right: Card;

        public UIA_bet: egret.gui.UIAsset;

        public UIA_rect: egret.gui.UIAsset;

        public group_add: egret.gui.Group;
        /**
         *Role显示状态
         *@ value:0  无玩家坐下，全部不显示
         *@ value:1  开局前，除了手牌都显示
         *@ value:2  开局，全部显示
         */
        public _status: number;
        /**各组件创建完毕，完成测量*/
        public CREATED: boolean;

        public constructor() {
            super();
            this.skinName = "skins.component.ItemRenderRoleOwnSkin";
            this._status = 0;
            this.CREATED = false;
        }

        //--------------------------------------------------------------------------------
        public childrenCreated(): void
        {
            this.status = 0;
            this.label_card.text = "";
            this.CREATED = true;
        }

        //--------------------------------------------------------------------------------
        public partAdded(partName: string, instance: any): void
        {
            super.partAdded(partName, instance);
        }

        /**隐藏边框和赢筹码数*/        
        //--------------------------------------------------------------------------------
        public hideRectAdd(): void
        {
            this.UIA_rect.visible = false;
            this.group_add.visible = false;
        }

        /**
          * 组成: 1、头像和昵称  2、手牌 3、筹码
          *@ value=0: 无玩家，全部隐藏
          *@ value=1: 尚未发牌，手牌和筹码不显示
          *@ value=2: 未投注，筹码不显示
          *@ value=3: 有投注，全部显示
          */
        //--------------------------------------------------------------------------------
        public set status(value: number)
        {
            if (this._status != value)
            {
                this._status = value;
            }

            switch (this._status)
            {
                case 0:
                    this.label_status.visible = false;
                    this.label_coin.visible = false;
                    this.UIA_role.visible = false;
                    this.gc_left.visible = false;
                    this.gc_right.visible = false;
                    this.label_bet_num.visible = false;
                    this.UIA_bet.visible = false;
                    ////////////////////////////////
                    this.UIA_rect.visible = false;
                    this.group_add.visible = false;
                    this.label_card.text = "";
                    break;

                case 1:
                    this.label_status.visible = true;
                    this.label_coin.visible = true;
                    this.UIA_role.visible = true;
                    this.gc_left.visible = false;
                    this.gc_right.visible = false;
                    this.label_bet_num.visible = false;
                    this.UIA_bet.visible = false;
                    ////////////////////////////////
                    this.UIA_rect.visible = false;
                    this.group_add.visible = false;
                    this.label_card.text = "";
                    break;

                case 2:
                    this.label_status.visible = true;
                    this.label_coin.visible = true;
                    this.UIA_role.visible = true;
                    this.gc_left.visible = true;
                    this.gc_right.visible = true;
                    this.label_bet_num.visible = false;
                    this.UIA_bet.visible = false;
                    ////////////////////////////////
                    break;

                case 3:
                    this.label_status.visible = true;
                    this.label_coin.visible = true;
                    this.UIA_role.visible = true;
                    this.gc_left.visible = true;
                    this.gc_right.visible = true;
                    this.label_bet_num.visible = true;
                    this.UIA_bet.visible = true;
                    ////////////////////////////////
                    break;
                default:
                    break;
            }
        }

        //--------------------------------------------------------------------------------
        public get status(): number
        {
            return this._status;
        }
    }
} 