module Game {
    export class GameTablePlus extends egret.DisplayObjectContainer {
        /**桌子背景*/
        private mTBackground: TBackground;
        /**桌子上各功能按钮*/
        public mTButton: TButton;
        /**独立功能组件合集*/
        public mTIndie: TIndie;
        /**游戏池*/
        public mTPond: TPond;
        /**所有玩家位*/
        public mTAvatar: TAvatar;
        /**公共牌*/
        public mTCommonCard: TCommonCard;
        /**主操作*/
        public mTAction: TAction;
        /**动画集*/
        private mTAnimation: TAnimation;
        /**检测部分组件是否完成创建，多指有皮肤赋值的组件*/
        private mTimerCreated: egret.Timer;
        /**尝试检测组件的次数*/
        private mTimerCreatedCount: number;

        public constructor()
        {
            super();
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var self = this;

            self.mTBackground = new TBackground(self);
            self.mTButton = new TButton(self);
            self.mTPond = new TPond(self);
            self.mTAvatar = new TAvatar(self);
            self.mTIndie = new TIndie(self);
            self.mTCommonCard = new TCommonCard(self);
            self.mTAction = new TAction(self);
            self.mTAnimation = new TAnimation(self);
            self.createTimerCreated();
        }

        /**轮询检测GameTable各组件是否创建完成*/
        //--------------------------------------------------------------------------------
        private createTimerCreated(): void
        {
            this.destoryTimerCreated();
            this.mTimerCreated = new egret.Timer(100);
            this.mTimerCreated.addEventListener(egret.TimerEvent.TIMER, this.handleTimerCreated, this);
            this.mTimerCreated.start();
        }

        //--------------------------------------------------------------------------------
        private handleTimerCreated(e: egret.TimerEvent): void
        {
            var self = this;
            var ok = true;
            self.mTimerCreatedCount++;
            Log.L.LOG("检测Table的次数： " + this.mTimerCreatedCount);
            ok = self.mTAvatar.checkCreated();
            ok = self.mTAction.checkCreated();

            if (ok)
            {
                Activate.instance.FIRST_CREATED_TABLE = true;
                self.destoryTimerCreated();
                self.updateRoomData();
                self.createSuccess();
            }
        }

        //--------------------------------------------------------------------------------
        private destoryTimerCreated(): void
        {
            this.mTimerCreatedCount = 0;

            if (this.mTimerCreated)
            {
                this.mTimerCreated.removeEventListener(egret.TimerEvent.TIMER, this.handleTimerCreated, false);
                this.mTimerCreated.stop();
                this.mTimerCreated = null;
            }
        }

        //--------------------------------------------------------------------------------
        private createSuccess(): void
        {
            NetCenter.instance.addEventListener(NetEvent.EVENT_ROOM_DATA, this.handleRoomData, this);
            NetCenter.instance.addEventListener(NetEvent.EVENT_GAME_START, this.handleGameStart, this);
            NetCenter.instance.addEventListener(NetEvent.EVENT_DO_ACTION, this.handleDoAction, this);
            NetCenter.instance.addEventListener(NetEvent.EVENT_OPEN_CARD, this.handleOpenCard, this);
            NetCenter.instance.addEventListener(NetEvent.EVENT_GAME_RESULT, this.handleGameResult, this);
            NetCenter.instance.addEventListener(NetEvent.EVENT_COME_IN, this.handleComeIn, this);
            NetCenter.instance.addEventListener(NetEvent.EVENT_COME_OUT, this.handleComeOut, this);
        }

        //--------------------------------------------------------------------------------
        private reset(): void
        {
            var self = this;
            var data = Data.instance.mDGameTable;
            data.mPhase = 0;
            data.mTotalAnte = 0;
            data.mComCard = [];
            self.mTCommonCard.TCC.status = 0;
            self.mTAction.remove();

            for (var i in self.mTAvatar.AVATAR_LIST)
            {
                self.mTAvatar.AVATAR_LIST[i].TB.hideRectAdd();
                self.mTAvatar.AVATAR_LIST[i].alpha = 1;
                self.mTAvatar.AVATAR_LIST[i].TB.status = self.mTAvatar.AVATAR_LIST[i].visible ? 1 : 0;
            }

            self.mTAvatar.mAvatarOwn.TB.hideRectAdd();
            self.mTAvatar.mAvatarOwn.TB.label_card.text = "";
            self.mTAvatar.mAvatarOwn.alphaA = 1;
            self.mTAvatar.mAvatarOwn.TB.status = self.mTAvatar.mAvatarOwn.visible ? 1 : 0;
        }

        //--------------------------------------------------------------------------------
        private handleRoomData(e: NetEvent): void
        {
            this.updateRoomData();
        }

        //--------------------------------------------------------------------------------
        private handleGameStart(e: NetEvent): void
        {
            this.gameStart();
        }


        //--------------------------------------------------------------------------------
        private handleOpenCard(e: NetEvent): void
        {
            this.mTCommonCard.openCard();
        }

        //--------------------------------------------------------------------------------
        private handleDoAction(e: NetEvent): void
        {
            //每局的第一次，这里不刷新，在发手牌那边做
            if (Activate.instance.FIRSET_BEFORE_ACTION[2] == 1)
            {
                Activate.instance.FIRSET_BEFORE_ACTION[2] = 2;
            }
            else
            {
                this.doAction();
            }
        }

        //--------------------------------------------------------------------------------
        private handleGameResult(e: NetEvent): void
        {
            this.gameResult();
        }

        //--------------------------------------------------------------------------------
        private handleComeIn(e: NetEvent): void
        {
            this.mTAvatar.comeIn();
        }

        //--------------------------------------------------------------------------------
        private handleComeOut(e: NetEvent): void
        {
            this.mTAvatar.comeOut();
        }

        //--------------------------------------------------------------------------------
        public updateRoomData(): void
        {
            var self = this;
            self.mTIndie.setTableId();
            self.mTIndie.setTableDetail();
            self.mTPond.setPond();
            self.mTAvatar.updateRoomData();
        }

        //--------------------------------------------------------------------------------
        private gameStart(): void
        {
            GameUI.instance.alertMag("开局！");
            this.reset();
            Data.instance.mDGameTable.mPhase = 1;
            this.mTIndie.setDealer();
            this.mTAnimation.handOutCard();
        }

        //--------------------------------------------------------------------------------
        public doAction(): void
        {
            var self = this;
            var pos = -1;
            var data = Data.instance.mDGameTable;
            self.mTPond.setPond();
            self.mTAction.remove();

            for (var i in data.mPosBetList)
            {
                pos = self.mTAvatar.getTablePosition(data.mPosBetList[i].Pos);

                if (pos != DConst.OWN_POSITION || (pos == DConst.OWN_POSITION && self.mTAvatar.mAvatar5.visible))
                {
                    self.mTAvatar.AVATAR_LIST[pos].alpha = 1;
                    self.mTAvatar.AVATAR_LIST[pos].TB.label_coin.text = data.mPosBetList[i].LeftAnte.toString();
                    self.mTAvatar.AVATAR_LIST[pos].TB.UIA_rect.visible = (data.mDoPosition == data.mPosBetList[i].Pos) ? true : false;

                    if (data.mPosBetList[i].BetAnte > 0)
                    {
                        self.mTAvatar.AVATAR_LIST[pos].TB.label_bet_num.text = data.mPosBetList[i].BetAnte.toString();
                        self.mTAvatar.AVATAR_LIST[pos].TB.status = 3;
                    }
                    else
                    {
                        self.mTAvatar.AVATAR_LIST[pos].TB.status = 2;
                    }

                    if (data.mDoPosition < 0)
                    {
                        self.mTAvatar.AVATAR_LIST[pos].stopTimer();
                        self.mTAvatar.AVATAR_LIST[pos].TB.status = 1;
                        self.mTAction.remove();
                    }
                    else
                    {
                        if (data.mPosBetList[i].Pos == data.mDoPosition)
                        {
                            self.mTAvatar.AVATAR_LIST[pos].startTimer();
                            self.mTAvatar.AVATAR_LIST[pos].TB.label_status.text = "思考中";
                        }
                        else
                        {
                            self.mTAvatar.AVATAR_LIST[pos].stopTimer();

                            switch (data.mPosBetList[i].PosState)
                            {
                                case 0:
                                    self.mTAvatar.AVATAR_LIST[pos].alpha = DConst.AVATAR_ALPHA;
                                    self.mTAvatar.AVATAR_LIST[pos].TB.status = 1;
                                    break;
                                case 1:

                                    switch (data.mPosBetList[i].LastOpType)
                                    {
                                        case 0:
                                            break;
                                        case 1:
                                            self.mTAvatar.AVATAR_LIST[pos].TB.label_status.text = "让牌";
                                            break;
                                        case 2:
                                            self.mTAvatar.AVATAR_LIST[pos].TB.label_status.text = "跟注";
                                            break;
                                        case 3:
                                            self.mTAvatar.AVATAR_LIST[pos].TB.label_status.text = "加注";
                                            break;
                                        case 4:
                                            self.mTAvatar.AVATAR_LIST[pos].alpha = DConst.AVATAR_ALPHA;
                                            self.mTAvatar.AVATAR_LIST[pos].TB.label_status.text = "弃牌";
                                            break;
                                        default:
                                            break;
                                    }

                                    break;
                                case 2:
                                case 3:
                                    self.mTAvatar.AVATAR_LIST[pos].alpha = DConst.AVATAR_ALPHA;
                                    self.mTAvatar.AVATAR_LIST[pos].TB.label_status.text = "弃牌";
                                    break;
                                case 4:
                                    self.mTAvatar.AVATAR_LIST[pos].TB.label_status.text = "ALLIN";
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
                else 
                {
                    //--------------------------------------------自己------------------------------------------
                    self.mTAvatar.mAvatarOwn.TB.label_coin.text = data.mPosBetList[i].LeftAnte.toString();
                    self.mTAvatar.mAvatarOwn.TB.UIA_rect.visible = (data.mDoPosition == data.mPosBetList[i].Pos) ? true : false;
                    self.mTAvatar.mAvatarOwn.TB.label_bet_num.text = data.mPosBetList[i].BetAnte.toString();
                    self.mTAvatar.mAvatarOwn.alphaA = 1;
                    self.mTAvatar.mAvatarOwn.TB.status = data.mPosBetList[i].BetAnte > 0 ? 3 : 2;

                    if (data.mDoPosition < 0)
                    {
                        self.mTAvatar.mAvatarOwn.stopTimer();
                        self.mTAvatar.mAvatarOwn.TB.status = 1;
                        self.mTAction.remove();
                    }
                    else
                    {
                        if (data.mDoPosition == data.mPosBetList[i].Pos)
                        {
                             //操作位是自己，优先判断是否存在预操作
                            if (self.mTAction.mActionButton.mAutoAction > 0)
                            {
                                var flag = false;

                                switch (self.mTAction.mActionButton.mAutoAction)
                                {
                                    case 1:

                                        if (data.mPosBetList[i].BetAnte == data.mSingleAnte)
                                        {
                                            NetCenter.instance.ctsMainAction(1, 0);
                                        }
                                        else if (data.mPosBetList[i].BetAnte < data.mSingleAnte)
                                        {
                                            NetCenter.instance.ctsMainAction(4, 0);
                                        }

                                        break;
                                    case 2:

                                        var con = data.mSingleAnte - data.mPosBetList[i].BetAnte;

                                        if (con > 0)
                                        {
                                            con = (data.mPosBetList[i].LeftAnte - con) >= 0 ? (con) : data.mPosBetList[i].LeftAnte;

                                            if (self.mTAction.mActionButton.mAddAnte != con)
                                            {
                                                self.mTAction.mActionButton.mAddAnte = con;
                                                flag = true;
                                            }
                                            else
                                            {
                                                NetCenter.instance.ctsMainAction(2, 0);
                                            }
                                        }
                                        else
                                        {
                                            NetCenter.instance.ctsMainAction(1, 0);
                                        }

                                        break;
                                    case 3:

                                        var con = data.mSingleAnte - data.mPosBetList[i].BetAnte;

                                        if (con > 0)
                                        {
                                            NetCenter.instance.ctsMainAction(2, 0);
                                        }
                                        else
                                        {
                                            flag = true;
                                        }

                                        break;
                                }

                                if (!flag)
                                {
                                    self.mTAction.mActionButton.reset();
                                    self.mTAction.mActionButton.visible = false;
                                    continue;
                                }
                            }

                            self.mTAvatar.mAvatarOwn.startTimer();
                            self.mTAction.show();
                            self.mTAction.mActionButton.reset();
                            self.mTAction.mActionButton.type = "normal";
                            self.mTAvatar.mAvatarOwn.TB.label_status.text = "思考中";
                            self.mTAction.mActionButton.btn_right.visible = data.mCanAddAnte;
                            self.mTAction.mVSliderSuper.GUI_VSlider.maximum = data.mPosBetList[i].LeftAnte;
                            self.mTAction.mActionButton.btn_left.label = "弃牌";
                            self.mTAction.mActionButton.btn_right.label = "加注";

                            var Big: number = data.mBigAnte;
                            self.mTAction.mVSliderSuper.GUI_VSlider.stepSize = Big;

                            if (data.mSingleAnte == 0)
                            {
                                //非第一轮，尚无人加注
                                self.mTAction.mActionButton.btn_mid.label = "让牌";
                                self.mTAction.mVSliderSuper.GUI_VSlider.minimum = Big;
                                self.mTAction.mVSliderSuper.GUI_VSlider.value = self.mTAction.mVSliderSuper.GUI_VSlider.minimum;
                                data.mAddAnte = self.mTAction.mVSliderSuper.GUI_VSlider.value;
                            }
                            else if (data.mSingleAnte > 0)
                            {
                                //有加注
                                var tap = data.mSingleAnte - data.mSingleAnteSecond;
                                var allneed = data.mSingleAnte + Math.max(tap, Big);
                                data.mAddAnte = allneed - data.mPosBetList[i].BetAnte;
                                data.mFollowAnte = data.mSingleAnte - data.mPosBetList[i].BetAnte;
                                self.mTAction.mVSliderSuper.GUI_VSlider.minimum = data.mAddAnte;
                                self.mTAction.mVSliderSuper.GUI_VSlider.value = self.mTAction.mVSliderSuper.GUI_VSlider.minimum;

                                if (data.mFollowAnte <= 0)
                                {
                                    self.mTAction.mActionButton.btn_mid.label = "让牌";
                                }
                                else 
                                {
                                    if (data.mPosBetList[i].LeftAnte <= data.mFollowAnte)
                                    {
                                        self.mTAction.mActionButton.btn_mid.label = "ALLIN";
                                        self.mTAction.mActionButton.btn_right.visible = false;
                                    }
                                    else 
                                    {
                                        self.mTAction.mActionButton.btn_mid.label = "跟" + data.mFollowAnte;
                                    }
                                }

                                if (self.mTAction.mVSliderSuper.GUI_VSlider.maximum - self.mTAction.mVSliderSuper.GUI_VSlider.minimum <= self.mTAction.mVSliderSuper.GUI_VSlider.stepSize)
                                {
                                    self.mTAction.mActionButton.btn_right.label = "ALLIN";
                                }
                            }
                        }
                        else
                        {
                             //操作位非自己
                            self.mTAvatar.mAvatarOwn.stopTimer();
                            self.mTAction.mActionButton.type = "prepare";
                            self.mTAction.mActionButton.btn_left.label = "";
                            self.mTAction.mActionButton.btn_mid.label = "";
                            self.mTAction.mActionButton.btn_right.label = "";
                            self.mTAvatar.mAvatarOwn.TB.label_status.text = Data.instance.mDRole.mName;

                            switch (data.mPosBetList[i].PosState)
                            {
                                case 0:
                                    self.mTAction.remove();
                                    self.mTAvatar.mAvatarOwn.TB.status = 1;
                                    self.mTAvatar.mAvatarOwn.alphaA = DConst.AVATAR_ALPHA;
                                    break;
                                case 1:

                                    self.mTAction.show();
                                    self.mTAction.mActionButton.ts_left.label_name.text = "让或弃";
                                    self.mTAction.mActionButton.ts_right.label_name.text = "跟任何注";
                                    var con = data.mSingleAnte - data.mPosBetList[i].BetAnte;

                                    if (con <= 0)
                                    {
                                        //自动让牌
                                    }
                                    else
                                    {
                                        con = (data.mPosBetList[i].LeftAnte - con) >= 0 ? (con) : data.mPosBetList[i].LeftAnte;
                                    }

                                    self.mTAction.mActionButton.ts_mid.label_name.text = con <= 0 ? "自动让牌" : ("跟" + con);

                                    if (self.mTAction.mActionButton.mAddAnte != con)
                                    {
                                        self.mTAction.mActionButton.mAddAnte = con;

                                        if (self.mTAction.mActionButton.mAutoAction == 2)
                                        {
                                            self.mTAction.mActionButton.reset();
                                        }
                                    }

                                    switch (data.mPosBetList[i].LastOpType)
                                    {
                                        case 0:
                                            break;
                                        case 1:
                                            self.mTAvatar.mAvatarOwn.TB.label_status.text = "让牌";
                                            break;
                                        case 2:
                                            self.mTAvatar.mAvatarOwn.TB.label_status.text = "跟注";
                                            break;
                                        case 3:
                                            self.mTAvatar.mAvatarOwn.TB.label_status.text = "加注";
                                            break;
                                        case 4:
                                            self.mTAction.remove();
                                            self.mTAvatar.mAvatarOwn.alphaA = DConst.AVATAR_ALPHA;
                                            self.mTAvatar.mAvatarOwn.TB.label_status.text = "弃牌";
                                            self.mTAvatar.mAvatarOwn.TB.status = 2;
                                            break;
                                        default:
                                            break;
                                    }

                                    break;
                                case 2:
                                case 3:
                                    self.mTAction.remove();
                                    self.mTAvatar.mAvatarOwn.alphaA = DConst.AVATAR_ALPHA;
                                    self.mTAvatar.mAvatarOwn.TB.label_status.text = "弃牌";
                                    self.mTAvatar.mAvatarOwn.TB.status = 2;
                                    break;
                                case 4:
                                    self.mTAction.remove();
                                    self.mTAvatar.mAvatarOwn.TB.label_status.text = "ALLIN";
                                     self.mTAvatar.mAvatarOwn.TB.status = 2;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
        }

        /**
         * 结算阶段:1-3同步进行，4占据翻牌时间，4-7有先后时间依赖关系
         * 1、部分显示优化处理
         * 2、主池、边池更新
         * 3、亮牌
         * 4、检测公共牌
         * 5、各个池依次处理
         * 6、重置数据
         * 7、等待下局开始提示
         */
        //--------------------------------------------------------------------------------
        public gameResult(): void
        {
            var self = this;
            GameUI.instance.alertMag("本局结束！", 0, 3, 1);
            Data.instance.mDGameTable.mPhase = 5;

            self.mTAction.remove();
            self.mTAction.mActionButton.reset();

            self.mTPond.updatePond();

            self.mTAvatar.showCard();

            self.mTCommonCard.effectShowComCard();

            //self.mTAvatar.gameOver();
            
        }
    }
}