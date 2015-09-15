module Game {
    /**公共牌管理类*/
    export class TCommonCard extends TBase{
        /**5张公共牌*/
        public TCC: TableComCard;

        public constructor(container) {
            super(container);
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var self = this;
            self.TCC = new TableComCard();
            self.TCC.x = self.mStageWidth / 2 - 326 / 2 + 326 / 8 - 52;
            self.TCC.y = self.mStageHeight / 2 - 100;
            self.CONTAINER.addChild(self.TCC);
        }

        //--------------------------------------------------------------------------------
        public openCard(): void
        {
            var self = this;
            self.CONTAINER.mTPond.updatePond();
            Data.instance.mDGameTable.mPhase++;
            var listplayer = Data.instance.mDGameTable.mListPlayer;
            var showid = -1;
            var data = Data.instance.mDGameTable.mPondList;

            if (self.CONTAINER.mTAvatar.mAvatarOwn.TB.label_card && Data.instance.mDRole.mCardType > 0)
            {
                if (self.CONTAINER.mTAvatar.mAvatarOwn.TB.status == 2 || self.CONTAINER.mTAvatar.mAvatarOwn.TB.status == 3)
                {
                    self.CONTAINER.mTAvatar.mAvatarOwn.TB.label_card.text = DCardType.DATA[Data.instance.mDRole.mCardType - 1];
                }
                else
                {
                    self.CONTAINER.mTAvatar.mAvatarOwn.TB.label_card.text = "";
                }
            }

            for (var i in listplayer)
            {
                if (listplayer[i].UserId > 0)
                {
                    showid = self.CONTAINER.mTAvatar.getTablePosition(listplayer[i].Pos);

                    if (showid != DConst.OWN_POSITION || (showid == DConst.OWN_POSITION && self.CONTAINER.mTAvatar.mAvatar5.visible))
                    {
                        self.CONTAINER.mTAvatar.AVATAR_LIST[showid].TB.status = 2;
                        var name = self.CONTAINER.mTAvatar.AVATAR_LIST[showid];
                        name.TB.label_status.text = (name.TB.label_status.text == "弃牌" || name.TB.label_status.text == "ALLIN") ? name.TB.label_status.text : listplayer[i].NickName;
                    }

                    if (listplayer[i].UserId == Data.instance.mDRole.mUserId)
                    {
                        self.CONTAINER.mTAvatar.mAvatarOwn.TB.status = 2;
                        var nameown = self.CONTAINER.mTAvatar.mAvatarOwn;
                        nameown.TB.label_status.text = (nameown.TB.label_status.text == "弃牌" || nameown.TB.label_status.text == "ALLIN") ? nameown.TB.label_status.text : listplayer[i].NickName;
                    }
                }
            }

            self.effectShowComCard();
        }

        /**翻公共牌*/
        //--------------------------------------------------------------------------------
        public effectShowComCard(): void
        {
            var self = this;
            var com = Data.instance.mDGameTable.mComCard;
            var begin = self.TCC.status;
            var end = com.length;

            if (begin == end)
            {
                return;
            }

            self.TCC.status = end;
            var num = begin;
            var cardCall = function (target)
            {

                if (num >= end)
                {
                    return;
                }

                target[num].data = [0, 0];
                target[num].visible = true;

                egret.Tween.get(target[num]).to({ scaleX: 0 }, 150).call(function () {

                    if (num >= end) {
                        return;
                    }

                    target[num].data = Data.instance.mDGameTable.mComCard[num]
                    egret.Tween.get(target[num]).to({ scaleX: 1 }, 150).call(cardCall, self, [self.TCC.LIST_CARD]);
                    num++;
                }, target);
            }

            cardCall(self.TCC.LIST_CARD);
        }
    }
}