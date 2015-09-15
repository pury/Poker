module Game {
    export class TableRole extends egret.gui.SkinnableComponent{

        public label_status: egret.gui.Label;

        public label_coin: egret.gui.Label;

        public label_bet_num: egret.gui.Label;

        public label_add: egret.gui.Label;

        public UIA_role: egret.gui.UIAsset;

        public UIA_bet: egret.gui.UIAsset;

        public UIA_head_bg: egret.gui.UIAsset;

        public UIA_rect: egret.gui.UIAsset;

        public group_card: egret.gui.Group;

        public group_add: egret.gui.Group;

        public group_double: egret.gui.Group;

        public cn_left: CardNew;

        public cn_right: CardNew;
        /**
         * Role显示状态
         *@ value:0  无玩家坐下，全部不显示
         *@ value:1  开局前，除了手牌都显示
         *@ value:2  开局，全部显示
         */
        public _status: number;
        /**各组件创建完毕，完成测量*/
        public CREATED: boolean;
        /**下注数目和图标的位置 left up right down*/

        private _type: string;

        public constructor() {
            super();
            this.skinName = "skins.component.ItemRenderRoleSkin";
            this._status = 0;
            this.CREATED = false;
        }


        //--------------------------------------------------------------------------------
        public childrenCreated(): void
        {
            super.childrenCreated();
            this.status = 0;
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

        /**管理手牌*/
        //--------------------------------------------------------------------------------
        public handleCard(visible: boolean, left: number[] = [0, 0], right: number[] = [0, 0]): void
        {
            this.cn_left.data = left;
            this.cn_right.data = right;
            this.group_double.visible = visible;
        }

        /**
         * override重写getCurrentSkinState方法
         */
        //--------------------------------------------------------------------------------
        public getCurrentSkinState(): string
        {
            return this._type;
        }

        /**
         * 设置窗口显示类型
         */
        //--------------------------------------------------------------------------------
        public set type(type: string)
        {
            this._type = type;
            this.invalidateSkinState();
        }

        //--------------------------------------------------------------------------------
        public get type(): string
        {
            return this._type;
        }

        /**
          * TableRole组成: 1、头像和昵称  2、手牌 3、筹码
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
                    this.UIA_head_bg.visible = false;
                    this.label_status.visible = false;
                    this.label_coin.visible = false;
                    this.UIA_role.visible = false;
                    this.group_card.visible = false;
                    this.label_bet_num.visible = false;
                    this.UIA_bet.visible = false;
                    ////////////////////////////////
                    this.UIA_rect.visible = false;
                    this.group_add.visible = false;
                    this.group_double.visible = false;
                    break;
                case 1:
                    this.UIA_head_bg.visible = true;
                    this.label_status.visible = true;
                    this.label_coin.visible = true;
                    this.UIA_role.visible = true;
                    this.group_card.visible = false;
                    this.label_bet_num.visible = false;
                    this.UIA_bet.visible = false;
                    ////////////////////////////////
                    this.UIA_rect.visible = false;
                    this.group_add.visible = false;
                    this.group_double.visible = false;
                    break;
                case 2:
                    this.UIA_head_bg.visible = true;
                    this.label_status.visible = true;
                    this.label_coin.visible = true;
                    this.UIA_role.visible = true;
                    this.group_card.visible = true;
                    this.label_bet_num.visible = false;
                    this.UIA_bet.visible = false;
                    ////////////////////////////////
                    break;
                case 3:
                    this.UIA_head_bg.visible = true;
                    this.label_status.visible = true;
                    this.label_coin.visible = true;
                    this.UIA_role.visible = true;
                    this.group_card.visible = true;
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