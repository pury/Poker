module Game {
    /**各玩家位管理类*/
    export class TAvatar extends TBase{

        public mAvatar0: Avatar;

        public mAvatar1: Avatar;

        public mAvatar2: Avatar;

        public mAvatar3: Avatar;

        public mAvatar4: Avatar;

        public mAvatar5: Avatar;

        public mAvatar6: Avatar;

        public mAvatar7: Avatar;

        public mAvatar8: Avatar;
        
        public mAvatarOwn: AvatarOwn;

        public AVATAR_LIST: Avatar[];

        public constructor(container) {
            super(container);
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var self = this;
            var hTap = 0;
            var vTap = self.mStageHeight / 13;

            self.mAvatar0 = new Avatar;
            self.mAvatar0.x = self.mStageWidth / 2 - self.mAvatar0.width - self.mStageWidth / 18;
            self.mAvatar0.y = -self.mAvatar0.height;
            self.mAvatar0.mDataPoint.push([self.mAvatar0.x, self.mAvatar0.y]);
            self.mAvatar0.mDataPoint.push([self.mAvatar0.x, self.mStageHeight / 36])
            self.mAvatar0.TB.type = "down";
            self.CONTAINER.addChild(self.mAvatar0);

            self.mAvatar1 = new Avatar;
            self.mAvatar1.x = self.mStageWidth / 2 + self.mStageWidth / 18;
            self.mAvatar1.y = -self.mAvatar1.height;
            self.mAvatar1.mDataPoint.push([self.mAvatar1.x, self.mAvatar1.y]);
            self.mAvatar1.mDataPoint.push([self.mAvatar1.x, self.mStageHeight / 36]);
            self.mAvatar1.TB.type = "down";
            self.CONTAINER.addChild(self.mAvatar1);

            self.mAvatar2 = new Avatar;
            self.mAvatar2.x = self.mStageWidth;
            self.mAvatar2.y = self.mAvatar2.height / 36 + self.mAvatar2.height + vTap;
            self.mAvatar2.mDataPoint.push([self.mAvatar2.x, self.mAvatar2.y]);
            self.mAvatar2.mDataPoint.push([self.mStageWidth - self.mAvatar2.width, self.mAvatar2.y]);
            self.mAvatar2.TB.type = "left";
            self.CONTAINER.addChild(self.mAvatar2);

            self.mAvatar3 = new Avatar;
            self.mAvatar3.x = self.mStageWidth;
            self.mAvatar3.y = self.mAvatar2.y + self.mAvatar3.height + vTap;
            self.mAvatar3.mDataPoint.push([self.mAvatar3.x, self.mAvatar3.y]);
            self.mAvatar3.mDataPoint.push([self.mStageWidth - self.mAvatar3.width, self.mAvatar3.y]);
            self.mAvatar3.TB.type = "left";
            self.CONTAINER.addChild(self.mAvatar3);

            self.mAvatar4 = new Avatar;
            self.mAvatar4.x = self.mStageWidth;
            self.mAvatar4.y = self.mAvatar3.y + self.mAvatar4.height + vTap;
            self.mAvatar4.mDataPoint.push([self.mAvatar4.x, self.mAvatar4.y]);
            self.mAvatar4.mDataPoint.push([self.mStageWidth - self.mAvatar4.width, self.mAvatar4.y]);
            self.mAvatar4.TB.type = "left";
            self.CONTAINER.addChild(self.mAvatar4);

            self.mAvatar5 = new Avatar;
            self.mAvatar5.x = self.mStageWidth / 2 - self.mAvatar5.width / 2;
            self.mAvatar5.y = self.mStageHeight;
            self.mAvatar5.mDataPoint.push([self.mAvatar5.x, self.mAvatar5.y]);
            self.mAvatar5.mDataPoint.push([self.mAvatar5.x, self.mStageHeight - self.mAvatar5.height - self.mAvatar5.height / 2]);
            self.mAvatar5.TB.type = "up";
            self.CONTAINER.addChild(self.mAvatar5);

            self.mAvatar6 = new Avatar;
            self.mAvatar6.x = - self.mAvatar6.width;
            self.mAvatar6.y = self.mAvatar4.y;
            self.mAvatar6.mDataPoint.push([self.mAvatar6.x, self.mAvatar6.y]);
            self.mAvatar6.mDataPoint.push([0, self.mAvatar6.y]);
            self.mAvatar6.TB.type = "right";
            self.CONTAINER.addChild(self.mAvatar6);

            self.mAvatar7 = new Avatar;
            self.mAvatar7.x = - self.mAvatar7.width;
            self.mAvatar7.y = self.mAvatar3.y;
            self.mAvatar7.mDataPoint.push([self.mAvatar7.x, self.mAvatar7.y]);
            self.mAvatar7.mDataPoint.push([0, self.mAvatar7.y]);
            self.mAvatar7.TB.type = "right";
            self.CONTAINER.addChild(self.mAvatar7);

            self.mAvatar8 = new Avatar;
            self.mAvatar8.x = - self.mAvatar8.width;
            self.mAvatar8.y = self.mAvatar2.y;
            self.mAvatar8.mDataPoint.push([self.mAvatar8.x, self.mAvatar8.y]);
            self.mAvatar8.mDataPoint.push([0, self.mAvatar8.y]);
            self.mAvatar8.TB.type = "right";
            self.CONTAINER.addChild(self.mAvatar8);

            self.mAvatarOwn = new AvatarOwn;
            self.mAvatarOwn.x = 0;
            self.mAvatarOwn.y = self.mStageHeight;
            self.mAvatarOwn.mDataPoint.push([self.mAvatarOwn.x, self.mAvatarOwn.y]);
            self.mAvatarOwn.mDataPoint.push([self.mAvatarOwn.x, self.mStageHeight - self.mAvatarOwn.height * 2 - self.mAvatarOwn.height / 3]);
            self.CONTAINER.addChild(self.mAvatarOwn);

            self.AVATAR_LIST = [self.mAvatar0, self.mAvatar1, self.mAvatar2, self.mAvatar3, self.mAvatar4, self.mAvatar5, self.mAvatar6, self.mAvatar7, self.mAvatar8];
        }

        /**检测组件是否创建成功*/
        //--------------------------------------------------------------------------------
        public checkCreated(): boolean
        {
            for (var i in this.AVATAR_LIST)
            {
                if (!this.AVATAR_LIST[i].TB.CREATED)
                {
                    return false;
                }
            }

            if (!this.mAvatarOwn.TB.CREATED)
            {
                return false;
            }

            return true;
        }

        //--------------------------------------------------------------------------------
        public updateRoomData(): void
        {
            var self = this;
            var listplayer = Data.instance.mDGameTable.mListPlayer;
            var showid: number = -1;
            var action:Game.EAction = Game.EAction.RemoveNormal;
            self.doAvatar(action, self.mAvatarOwn);

            for (var i in self.AVATAR_LIST)
            {
                self.doAvatar(EAction.RemoveNormal, self.AVATAR_LIST[i]);
            }

            for (i in listplayer)
            {
                if (listplayer[i].UserId > 0)
                {
                    showid = self.getTablePosition(listplayer[i].Pos);

                    if (showid >= 0)
                    {
                        if (showid != DConst.OWN_POSITION)
                        {
                            self.AVATAR_LIST[showid].TB.label_status.text = listplayer[i].NickName;
                            self.AVATAR_LIST[showid].TB.label_coin.text = listplayer[i].LeftAnte;
                            self.AVATAR_LIST[showid].TB.UIA_role.source = "ly_table_head_small_png";
                            self.AVATAR_LIST[showid].TB.status = 1;
                            self.doAvatar(EAction.AddNormal, self.AVATAR_LIST[showid]);
                        }
                        else
                        {
                            self.mAvatarOwn.TB.label_status.text = listplayer[i].NickName;
                            self.mAvatarOwn.TB.label_coin.text = listplayer[i].LeftAnte;
                            self.mAvatarOwn.TB.UIA_role.source = "ly_table_head_big_png";
                            self.mAvatarOwn.TB.status = 1;
                            self.doAvatar(EAction.AddNormal, self.mAvatarOwn);
                        }
                    }
                }
            }
        }

        /**逻辑位转换桌面位*/
        //--------------------------------------------------------------------------------
        public getTablePosition(value: number): number
        {
            var myposition = Data.instance.mDRole.mPosition;
            var pos = value;

            if (Data.instance.mDRole.mPosition >= 0)
            {
                var tap = 5 - myposition;

                pos += tap;

                if (pos < 0)
                {
                    pos += 9;
                }
                else if (pos > 8)
                {
                    pos = 9 - pos;
                }
            }

            return pos;
        }

        //--------------------------------------------------------------------------------
        private doAvatar(action:EAction, target:any): void
        {
            var self = this;

            switch (action)
            {
                case EAction.AddSpecial:
                    break;
                case EAction.AddNormal:

                //    if (!self.CONTAINER.contains(target))
                    {
                        target.x = target.mDataPoint[1][0];
                        target.y = target.mDataPoint[1][1];
                        target.visible = true;
                 //       self.CONTAINER.addChild(target);
                    }
                    break;
                case EAction.RemoveSpecial:
                    break;
                case EAction.RemoveNormal:

                    target.visible = false;

                 //   if (self.CONTAINER.contains(target))
                    {
                 //       self.CONTAINER.removeChild(target);
                    }
                    break;
            }
        }

        //--------------------------------------------------------------------------------
        private clone(source:Avatar, target:Avatar): void
        {
            var third: Avatar = new Avatar;
            third = source;
        }

        //--------------------------------------------------------------------------------
        public comeIn(): void
        {
            var self = this;
            var data = Data.instance.mDGameTable;
            var ok = false;

            for (var i in data.mListPlayer)
            {
                if (data.mListPlayer[i].UserId == data.mComeInRole.UserId)
                {
                    ok = true;
                }
            }

            if (!ok)
            {
                var ComeInRole = new DComeInRole;
                ComeInRole.UserId = data.mComeInRole.UserId;
                ComeInRole.NickName = data.mComeInRole.NickName;
                ComeInRole.Pos = data.mComeInRole.Pos;
                ComeInRole.LeftAnte = data.mComeInRole.LeftAnte;
                data.mListPlayer.push(ComeInRole);

                if (ComeInRole.UserId == Data.instance.mDRole.mUserId)
                {
                    Data.instance.mDRole.mPosition = ComeInRole.Pos;
                    Data.instance.mDRole.mLeftAnte = ComeInRole.LeftAnte;
                    Data.instance.mDRole.mStatus = EOwnStatus.WAITING;
                    Data.instance.mDGameTable.mFlagPosition = true;
                }

                if (data.mPosBetList)
                {
                    data.mPosBetList.push({ Pos: ComeInRole.Pos, PosState: 0, LastOptype: 0, BetAnte: 0, LeftAnte: ComeInRole.LeftAnte });
                }
            }

            var showid = self.getTablePosition(data.mComeInRole.Pos);
            
            if (showid >= 0)
            {
                if (data.mComeInRole.UserId == Data.instance.mDRole.mUserId)
                {
                    self.mAvatarOwn.TB.status = 1;
                    self.mAvatarOwn.TB.label_status.text = data.mComeInRole.NickName;
                    self.mAvatarOwn.TB.label_coin.text = data.mComeInRole.LeftAnte.toString();
                    self.mAvatarOwn.TB.UIA_role.source = "ly_table_head_small_png";
                    self.mAvatarOwn.TB.hideRectAdd();
                    self.mAvatarOwn.TB.label_card.text = "";
                    self.mAvatarOwn.alphaA = Data.instance.mDGameTable.mPhase != 0 ? DConst.AVATAR_ALPHA : 1;
                    self.doAvatar(EAction.AddNormal, self.mAvatarOwn);
                    self.CONTAINER.mTButton.setSitDownLabel(false);
                    self.CONTAINER.mTButton.setActionName(true);
                    self.adjustPosition();
                }
                else
                {
                    self.AVATAR_LIST[showid].TB.status = 1;
                    self.AVATAR_LIST[showid].TB.label_status.text = data.mComeInRole.NickName;
                    self.AVATAR_LIST[showid].TB.label_coin.text = data.mComeInRole.LeftAnte.toString();
                    self.AVATAR_LIST[showid].TB.UIA_role.source = "ly_table_head_small_png";
                    self.AVATAR_LIST[showid].TB.hideRectAdd();
                    self.AVATAR_LIST[showid].alpha = Data.instance.mDGameTable.mPhase != 0 ? DConst.AVATAR_ALPHA : 1;
                    self.doAvatar(EAction.AddNormal, self.AVATAR_LIST[showid]);
                }
            }
        }


        //--------------------------------------------------------------------------------
        public comeOut(): void
        {
            var self = this;
            var data = Data.instance.mDGameTable;
            var showid = self.getTablePosition(data.mLeavePosition);

            for (var i in data.mListPlayer)
            {
                if (data.mListPlayer[i].Pos == data.mLeavePosition)
                {
                    data.mListPlayer.splice(i, 1);
                    break;
                }
            }

            if (data.mPosBetList)
            {
                for (i in data.mPosBetList)
                {
                    if (data.mPosBetList[i].Pos == data.mLeavePosition)
                    {
                        data.mPosBetList.splice(i, 1);
                        break;
                    }
                }
            }

            if (data.mListPlayer.length < data.mPlayerNumber)
            {
                if (Data.instance.mDRole.mStatus == EOwnStatus.LINEUP)
                {
                    NetCenter.instance.ctsSitDown();
                }
            }

            if (data.mLeavePosition == Data.instance.mDRole.mPosition)
            {
                self.doAvatar(EAction.RemoveNormal, self.mAvatarOwn);
                self.CONTAINER.mTButton.setActionName(false);
                self.CONTAINER.mTButton.setSitDown(true);
                self.CONTAINER.mTAction.remove();
                Data.instance.mDRole.mPosition = DConst.OWN_POSITION_OUT;
                Data.instance.mDRole.mStatus = EOwnStatus.STANDUP;
                self.adjustPosition();
            }
            else
            {
                self.doAvatar(EAction.RemoveNormal, self.AVATAR_LIST[showid]);
            }
        }

        /**重新调整各玩家的桌位*/
        //--------------------------------------------------------------------------------
        private adjustPosition(): void
        {
            var self = this;
            var data = Data.instance.mDGameTable;
            var listplayer = data.mListPlayer;
            var action = EAction.RemoveNormal;
            var showid = -1;

            for (var i in self.AVATAR_LIST)
            {
                self.doAvatar(EAction.RemoveNormal, self.AVATAR_LIST[i]);
            }

            for (i in listplayer)
            {
                if (listplayer[i].UserId > 0)
                {
                    showid = this.getTablePosition(listplayer[i].Pos);

                    if (showid != DConst.OWN_POSITION || (showid == DConst.OWN_POSITION && !self.mAvatarOwn.visible))
                    {
                        self.AVATAR_LIST[showid].TB.label_status.text = listplayer[i].NickName;
                        self.AVATAR_LIST[showid].TB.label_coin.text = listplayer[i].LeftAnte;
                        self.AVATAR_LIST[showid].TB.UIA_role.source = "ly_table_head_small_png";
                        self.AVATAR_LIST[showid].TB.status = 1;
                        self.doAvatar(EAction.AddNormal, self.AVATAR_LIST[showid]);
                    }
                }
            }

            if (data.mPhase != 0)
            {
                self.CONTAINER.mTIndie.setDealer();
                self.CONTAINER.doAction();
            }
        }

        /**亮牌*/
        //--------------------------------------------------------------------------------
        public showCard(): void
        {
            var self = this;
            var data = Data.instance.mDGameTable;
            var listplayer = data.mListPlayer;
            var listgrouptype = data.mGroupTypeList;
            var showid = -1;

            for (var i in listplayer)
            {
                if (listplayer[i].UserId > 0)
                {
                    showid = self.getTablePosition(listplayer[i].Pos);

                    if (showid != DConst.OWN_POSITION || (showid == DConst.OWN_POSITION && self.mAvatar5.visible))
                    {
                        var name = self.AVATAR_LIST[showid];
                        name.TB.label_status.text = (name.TB.label_status.text == "弃牌" || name.TB.label_status.text == "ALLIN") ? name.TB.label_status.text : listplayer[i].NickName;
                    }

                    if (listplayer[i].UserId == Data.instance.mDRole.mUserId)
                    {
                        var nameown = self.mAvatarOwn;
                        nameown.TB.label_status.text = (nameown.TB.label_status.text == "弃牌" || nameown.TB.label_status.text == "ALLIN") ? nameown.TB.label_status.text : listplayer[i].NickName;
                    }
                }
            }

            for (i in listgrouptype)
            {
                showid = self.getTablePosition(listgrouptype[i].Pos);

                if (showid >= 0)
                {
                    if (showid != DConst.OWN_POSITION || (showid == DConst.OWN_POSITION && self.mAvatar5.visible))
                    {
                        self.AVATAR_LIST[showid].TB.label_status.text = DCardType.DATA[listgrouptype[i].GroupType - 1];
                        self.AVATAR_LIST[showid].TB.handleCard(true, [listgrouptype[i].CardType_1, listgrouptype[i].CardNum_1], [listgrouptype[i].CardType_2, listgrouptype[i].CardNum_2]);
                    }
                    else
                    {
                        self.mAvatarOwn.TB.label_card.text = DCardType.DATA[listgrouptype[i].GroupType - 1];
                    }
                }
            }
        }

        //--------------------------------------------------------------------------------
        public gameOver(): void
        {
            var self = this;
            var data = Data.instance.mDGameTable;

            if (data.mListPlayer.length < data.mPlayerNumber)
            {
                if (Data.instance.mDRole.mStatus == EOwnStatus.LINEUP)
                {
                    NetCenter.instance.ctsSitDown();
                }
            }

            for (var i in self.AVATAR_LIST)
            {
                self.AVATAR_LIST[i].TB.UIA_rect.visible = false;
            }

            self.mAvatarOwn.TB.UIA_rect.visible = false;

            for (i in data.mWinList)
            {
                var pos = self.getTablePosition(data.mWinList[i].Pos);

                if (pos != 5 || (pos == 5 && self.CONTAINER.mTAvatar.mAvatar5.visible))
                {
                    if (data.mWinList[i].WinAnte > 0)
                    {
                        self.AVATAR_LIST[pos].TB.UIA_rect.visible = true;
                        self.AVATAR_LIST[pos].TB.group_add.visible = true;
                        self.AVATAR_LIST[pos].TB.label_add.text = "+" + data.mWinList[i].WinAnte;
                    }
                }
                else 
                {
                    if (data.mWinList[i].WinAnte > 0)
                    {
                        self.mAvatarOwn.TB.UIA_rect.visible = true;
                        self.mAvatarOwn.TB.group_add.visible = true;
                        self.mAvatarOwn.TB.label_add.text = "+" + data.mWinList[i].WinAnte;
                    }
                }
            }
        }

        //--------------------------------------------------------------------------------
        public quit(): void
        {
            var self = this;
            
            for (var i in self.AVATAR_LIST)
            {
                self.AVATAR_LIST[i].TB.status = 0;
                self.doAvatar(EAction.RemoveNormal,self.AVATAR_LIST[i]);
            }

            self.mAvatarOwn.TB.status = 0;
            self.doAvatar(EAction.RemoveNormal, self.mAvatarOwn);
        }
    }
}