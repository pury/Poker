module Game {
    export class NetCenter extends egret.EventDispatcher{
        /**多次尝试连接服务器的计时器*/
        public mTimerNet: egret.Timer;
        /**尝试连接服务器的次数*/
        public mTimerNetCount: number;
        /**
         * @ value 0: none
         * @ value 1: register
         * @ value 2: login
         */
        public mActionFlag: number;

        public static _instance: NetCenter;

        public constructor()
        {
            super();
            this.reset();
        }

        //--------------------------------------------------------------------------------
        public init()
        {
            if (window["WebSocket"])
            {
                try
                {
                    Scut.Net.setSignKey('3f261d4f2f8941ea90552cf7507f021b');
                    Scut.Net.setUrl("ws://" + Config.instance.LEYAN_POKER_IP + ":" + Config.instance.LEYAN_POKER_PORT + "/test", this.stcReceive);
                    Scut.Net.regOpenCallback(this.onOpen);
                    Scut.Net.regClosedCallback(this.onClose);
                    Scut.Net.regErrorCallback(this.onRrror);
                    this.addEvent(NetProtocol.ctsRegister, this.stcRegister);
                    this.addEvent(NetProtocol.ctsLogin, this.stcLogin);
                    this.addEvent(NetProtocol.stcPayResult, this.stcPayResult);
                    this.addEvent(NetProtocol.ctsDiamondToGold, this.stcDiamondToGold);
                    this.addEvent(NetProtocol.stcGetRole, this.stcGetRole);
                    this.addEvent(NetProtocol.ctsRoomAsk, this.stcRoomAsk);
                    this.addEvent(NetProtocol.stcRoomData, this.stcRoomData);
                    this.addEvent(NetProtocol.ctsLeaveTable, this.stcLeaveTable);
                    this.addEvent(NetProtocol.stcGameStart, this.stcGameStart);
                    this.addEvent(NetProtocol.stcNewCircle, this.stcNewCircle);
                    this.addEvent(NetProtocol.stcCardOwn, this.stcCardOwn);
                    this.addEvent(NetProtocol.stcDoAction, this.stcDoAction);
                    this.addEvent(NetProtocol.stcMainAction, this.stcMainAction); 
                    this.addEvent(NetProtocol.stcCardType, this.stcCardType); 
                    this.addEvent(NetProtocol.stcGameResult, this.stcGameResult); 
                    this.addEvent(NetProtocol.ctsSitDown, this.stcSitDomn); 
                    this.addEvent(NetProtocol.ctsStandUp, this.stcStandUp); 
                    this.addEvent(NetProtocol.stcComeIn, this.stcComeIn); 
                    this.addEvent(NetProtocol.stcComeOut, this.stcComeOut); 
                    Scut.Net.connect();
                }
                catch (e)
                {
                    console.error("Failed To Create Html5 WebSocket!");
                    return;
                };
            }
            else
            {
                Game.Log.L.LOG(Game.ConstString.cNotWS);
                return;
            }
        }

        //--------------------------------------------------------------------------------
        public setUrl(): void
        {
            Scut.Net.setUrl("ws://" + Config.instance.LEYAN_POKER_IP + ":" + Config.instance.LEYAN_POKER_PORT + "/test", this.stcReceive);
        }

        //--------------------------------------------------------------------------------
        public reset(): void
        {
            this.mActionFlag = 0;
            this.mTimerNetCount = 0;
        }

        //--------------------------------------------------------------------------------
        private stcReceive(data: any): void
        {
            Scut.Action.receive(data);
            Log.L.LOG("client receive: " + data, true);
        }

        //--------------------------------------------------------------------------------
        private addEvent(id: number, event: any): void
        {
            Scut.Action.events.add(id, event);
        }

        //--------------------------------------------------------------------------------
        onOpen = function (): void
        {
            Log.L.INFO("Connection Successful!");
        }

        //--------------------------------------------------------------------------------
        onRrror = function (e: any): void
        {
            Scut.Action.error();
            Log.L.ERROE("Connection Error:");
        }

        //--------------------------------------------------------------------------------
        onMessage = function (e): void
        {

        }

        //--------------------------------------------------------------------------------
        onClose = function (): void
        {
            Scut.Action.close();
            Log.L.INFO("Connection Close!");
            //window.open(DUrl.URL_ENTER, "_self");
            NetCenter.instance.quit();
        }


        //--------------------------------------------------------------------------------
        public quit(): void
        {
            GameUI.instance.reset();
            GameUI.instance.manage_panel("PanelLogin", "open");
            GameUI.instance.alertMag("未连接到服务器,请稍后再次尝试...", 1, 5, 0);
            GameLayer.instance.hideTablePlus();
            NetCenter.instance.reset();
            Data.instance.init();
            Data.instance.reset();

            if (GameLayer.instance.gameTablePlus)
            {
                GameLayer.instance.gameTablePlus = null;
            }
        }

        /*-------------------------------------------------------------------------------
                                      client --> server               
          -------------------------------------------------------------------------------*/

        //--------------------------------------------------------------------------------
        public ctsRegister(account, password): void
        {
            Data.instance.mDAccount.mAccount = account;
            Data.instance.mDAccount.mPassword = password;

            if (Scut.Net.isConnect())
            {
                this.sendMsg({
                    ActionId: NetProtocol.ctsRegister,
                    UserName: Data.instance.mDAccount.mAccount,
                    Password: Data.instance.mDAccount.mPassword
                });
            }
            else
            {
                Scut.Net.connect();
                this.mActionFlag = 1;
                this.createTimerNet();
                Log.L.LOG("连接服务器中...");
            }
        }

        //--------------------------------------------------------------------------------
        public ctsLogin(account,password): void
        {
            Data.instance.mDAccount.mAccount = account;
            Data.instance.mDAccount.mPassword = password;

            if (Scut.Net.isConnect())
            {
                this.sendMsg({
                    ActionId: NetProtocol.ctsLogin,
                    UserName: Data.instance.mDAccount.mAccount,
                    Password: Data.instance.mDAccount.mPassword
                });
            }
            else
            {
                Scut.Net.connect();
                this.mActionFlag = 2;
                this.createTimerNet();
                Log.L.LOG("连接服务器中...");
            }
        }

        //--------------------------------------------------------------------------------
        public ctsRoomAsk(roomid:number): void
        {
            this.sendMsg({
                ActionId: NetProtocol.ctsRoomAsk,
                RoomId: roomid,
                TableId: 0
            });
        }

        //--------------------------------------------------------------------------------
        public ctsLeaveTable(): void
        {
            this.sendMsg({
                ActionId: NetProtocol.ctsLeaveTable
            });
        }

        /**
         * 操作
         * @ param optype   0：无  1：让牌  2：跟注  3：加注  4：弃牌
         */
        //--------------------------------------------------------------------------------
        public ctsMainAction(optype,opvalue): void
        {
            this.sendMsg({
                ActionId: NetProtocol.stcMainAction,
                OpType: optype,
                OpValue: opvalue
            });
        }

        //--------------------------------------------------------------------------------
        public ctsDiamondToGold(costdiamond:number): void
        {
            this.sendMsg({
                ActionId: NetProtocol.ctsDiamondToGold,
                CostDiamond: costdiamond
            });
        }


        //--------------------------------------------------------------------------------
        public ctsStandUp(): void
        {
            this.sendMsg({
                ActionId: NetProtocol.ctsStandUp
            });
        }

        //--------------------------------------------------------------------------------
        public ctsSitDown(position:number = -1): void
        {
            this.sendMsg({
                ActionId: NetProtocol.ctsSitDown,
                Position:position
            });
        }
        /*--------------------------------------------------------------------------------
                                      server --> client               
          -------------------------------------------------------------------------------*/

        //--------------------------------------------------------------------------------
        private stcRegister(data:any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action1003:  注册成功!");
                var _data = data.getData();

                if (_data != null)
                {
                    Data.instance.mDRole.mUserId = _data.UserId;
                    GameUI.instance.alertMag("注册成功!", 0, 3, 0);
                }
            }
            else
            {
                GameUI.instance.alertMag("注册失败!", 1, 3, 0);
                Log.L.LOG("注册失败！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcLogin(data:any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action1004: 登录成功!");
                var _data = data.getData();

                if (_data != null)
                {
                    Data.instance.mDRole.mUserId = _data.UserId;
                    var userId = _data.UserId;
                    GameUI.instance.alertMag("登录成功!", 0, 3, 0);
                }
            }
            else
            {
                GameUI.instance.alertMag("登录失败!",1,3,0);
                Log.L.LOG("登录失败！ " + "data.getErrorCode()=" + data.getErrorCode() + "data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcPayResult(data:any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action1007: 支付成功");
                var _data = data.getData();

                if (_data != null)
                {
                    GameUI.instance.alertMag("成功充值" + _data.CostRmb + "元,获得" + _data.AddDiamond + "钻石！", 0, 5, 0);
                    Data.instance.mDRole.mDiamond = _data.Diamond;
                    Pay.popPrepare();
                    NetCenter.instance.dispatchEvent(new NetEvent(NetEvent.EVENT_PAY_RESULT, []));
                }
            }
            else
            {
                GameUI.instance.alertMag("支付失败!", 1, 3, 1);
                Log.L.LOG("支付失败！ " + "data.getErrorCode()=" + data.getErrorCode() + "data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcDiamondToGold(data: any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action1008: 钻石兑换金币成功");
                var _data = data.getData();

                if (_data != null)
                {
                    GameUI.instance.alertMag("成功使用" + _data.CostDiamond + "钻石,兑换" + _data.AddGameCoin + "金币！", 0, 3, 0);
                    Data.instance.mDRole.mDiamond = _data.Diamond;
                    Data.instance.mDRole.mCoin = _data.GameCoin;
                    NetCenter.instance.dispatchEvent(new NetEvent(NetEvent.EVENT_DIAMOND_TO_GOLD, []));
                }
            }
            else
            {
                GameUI.instance.alertMag("兑换失败!",1,3,1);
                Log.L.LOG("钻石兑换金币失败！ " + "data.getErrorCode()=" + data.getErrorCode() + "data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcGetRole(data:any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4001: 角色信息！");
                var _data = data.getData();

                if (_data != null)
                {
                    if (_data.UserId == Data.instance.mDRole.mUserId)
                    {
                        Data.instance.mDRole.mName = _data.NickName;
                        Data.instance.mDRole.mHead = _data.HeadIcon;
                        Data.instance.mDRole.mGender = _data.Sex;
                        Data.instance.mDRole.mCoin = _data.GameCoin;
                        Data.instance.mDRole.mLv = _data.UserLv;
                        Data.instance.mDRole.mDiamond = _data.Diamond;

                        if (Activate.instance.FOT_PANELHALL)
                        {
                            Activate.instance.FOT_PANELHALL = false;
                            GameUI.instance.manage_panel("PanelLogin", "close");
                            GameUI.instance.manage_panel("PanelHall", "open");
                        }
                        else
                        {
                            NetCenter.instance.dispatchEvent(new NetEvent(NetEvent.EVENT_ROLE, []));
                        }
                    }
                }
            }
            else
            {
                Log.L.LOG("获取玩家数据异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        } 

        //--------------------------------------------------------------------------------
        private stcRoomAsk(data:any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4002: 进入桌子！");
                var _data = data.getData();

                if (_data != null)
                {
                    Data.instance.mDGameTable.mStatus = _data.TableState;
                    Log.L.LOG("4002桌子状态：" + _data.TableState);
                }
            }
            else
            {
                Log.L.LOG("进入桌子异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcRoomData(data:any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4003: 获得桌子信息！");
                var _data = data.getData();

                if (_data != null)
                {
                    Data.instance.mDGameTable.mStatus = _data.TableStatus;
                    Data.instance.mDGameTable.mRoomId = _data.RoomId;
                    Data.instance.mDGameTable.mTableId = _data.TableId;
                    Data.instance.mDGameTable.mBigAnte = _data.BigBlindAnte;
                    Data.instance.mDGameTable.mListPlayer = [];
                    Data.instance.mDGameTable.mStandUp = false;
                    Data.instance.mDGameTable.mFlagPosition = true;
                    Data.instance.mDGameTable.mPlayerNumber = _data.RoomId <= 1012 ? 6 : 9;

                    for (var i in _data.PosList)
                    {
                        Data.instance.mDGameTable.mListPlayer.push(_data.PosList[i]);

                        if (_data.PosList[i].UserId == Data.instance.mDRole.mUserId)
                        {
                            Data.instance.mDRole.mName = _data.PosList[i].NickName;
                            Data.instance.mDRole.mLeftAnte = _data.PosList[i].LeftAnte;
                            Data.instance.mDRole.mPosition = _data.PosList[i].Pos;
                        }
                    }

                    if (Activate.instance.FOT_GAMETABLE)
                    {
                        Activate.instance.FOT_GAMETABLE = false;
                        GameUI.instance.manage_panel("PanelRate", "close");
                        GameLayer.instance.showTablePlus();
                    }
                    else
                    {
                        NetCenter.instance.dispatchEvent(new NetEvent(NetEvent.EVENT_ROOM_DATA, []));
                    }
                }
            }
            else
            {
                Log.L.LOG("获取桌子信息异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcLeaveTable(data:any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4004: 已离开桌子！");
            }
            else
            {
                Log.L.LOG("离开桌子异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcNewCircle(data:any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4006: 新的一轮！");
                var _data = data.getData();

                if (_data != null)
                {
                    Data.instance.mDGameTable.mComCard = [];
                    Data.instance.mDRole.mCardIndex = [];
                    Data.instance.mDGameTable.mPondList = [];
                    Data.instance.mDRole.mCardType = _data.PlayerGroupType;

                    for (var i in _data.CommonCardList)
                    {
                        Data.instance.mDGameTable.mComCard.push([_data.CommonCardList[i].CardType, _data.CommonCardList[i].CardNum]);
                    }

                    for ( i in _data.GroupIndexList)
                    {
                        Data.instance.mDRole.mCardIndex.push(_data.PlayerCardList[i]);
                    }

                    for (i in _data.PoolList)
                    {
                        var pond = new DPond;
                        pond.Id = _data.PoolList[i].Id;
                        pond.winPosList = _data.PoolList[i].winPosList;
                        pond.Ante = _data.PoolList[i].Ante;
                        Data.instance.mDGameTable.mPondList.push(pond);
                    }

                    NetCenter.instance.dispatchEvent(new NetEvent(NetEvent.EVENT_OPEN_CARD, []));
                }
            }
            else
            {
                Log.L.LOG("新的一轮异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcGameStart(data: any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4005: 开局！");
                var _data = data.getData();

                if (_data != null)
                {
                    Data.instance.mDGameTable.mStatus = _data.TableState;
                    Data.instance.mDGameTable.mBanker = _data.Banker; 
                    Data.instance.mDGameTable.mBigAnte = _data.BigBlindAnte;

                    Data.instance.mDGameTable.mCardOwn = [];

                    for (var i in _data.PlayerCardList)
                    {
                        Data.instance.mDGameTable.mCardOwn.push([_data.PlayerCardList[i].CardType, _data.PlayerCardList[i].CardNum]);
                    }

                    if (Activate.instance.FIRSET_BEFORE_ACTION[0] == 0)
                    {
                        Activate.instance.FIRSET_BEFORE_ACTION[0] = 1;
                    }

                    Activate.instance.FIRSET_BEFORE_ACTION[2] = 1;

                    NetCenter.instance.dispatchEvent(new NetEvent(NetEvent.EVENT_GAME_START, []));
                }
            }
            else
            {
                Log.L.LOG("开局异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcCardOwn(data:any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4007: 开局推送玩家自己手牌！");
                var _data = data.getData();

                if (_data != null)
                {
                    Data.instance.mDGameTable.mCardOwn = [];

                    for (var i in _data.CardList)
                    {
                        Data.instance.mDGameTable.mCardOwn.push([_data.CardList[i].CardType, _data.CardList[i].CardNum]);
                    }

                    if (Activate.instance.FIRSET_BEFORE_ACTION[1] == 0)
                    {
                        Activate.instance.FIRSET_BEFORE_ACTION[1] = 1;
                    }

                   // NetCenter.instance.dispatchEvent(new NetEvent(NetEvent.EVENT_OWN_CARD, []));
                }
            }
            else
            {
                Log.L.LOG("开局推送玩家自己手牌异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcDoAction(data: any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4008: 操作开始！");
                var _data = data.getData();

                if (_data != null)
                {
                    var gametable = Data.instance.mDGameTable;
                    gametable.mDoPosition = _data.OpPos;
                    gametable.mCanAddAnte = _data.CanAddAnte;
                    gametable.mSingleAnte = _data.SingleAnte;
                    gametable.mSingleAnteSecond = _data.SecondAnte;
                    gametable.mTotalAnte = _data.TotalAnte;
                    gametable.mPosBetList = _data.PosBetList;
                
                    for (var i in _data.PosBetList)
                    {
                        if (_data.PosBetList[i].Pos == Data.instance.mDRole.mPosition)
                        {
                            Data.instance.mDRole.mLeftAnte = _data.PosBetList[i].LeftAnte;
                        }
                    }

                    if (Activate.instance.FIRSET_BEFORE_ACTION[2] == 0)
                    {
                        Activate.instance.FIRSET_BEFORE_ACTION[2] = 1;
                    }

                    NetCenter.instance.dispatchEvent(new NetEvent(NetEvent.EVENT_DO_ACTION, []));
                }
            }
            else
            {
                Log.L.LOG("操作开始异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcMainAction(data: any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4009: 主操作！");
            }
            else
            {
                Log.L.LOG("主操作异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        public stcCardType(data:any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4010:  自己牌型");
                var _data = data.getData();

                if (_data != null)
                {
                    Data.instance.mDRole.mCardType = _data.GroupType;
                    Data.instance.mDRole.mCardIndex = [];

                    for (var i in _data.GroupIndexList)
                    {
                        Data.instance.mDRole.mCardIndex.push(_data.GroupIndexList[i]);
                    }

                    NetCenter.instance.dispatchEvent(new NetEvent(NetEvent.EVENT_CARD_TYPE, []));
                }
            }
            else
            {
                Log.L.LOG("自己牌型异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        public stcGameResult(data:any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4011:  结算");

                var _data = data.getData();

                if (_data != null)
                {
                    Data.instance.mDGameTable.mWinPositionList = [];
                    Data.instance.mDGameTable.mWinList = [];
                    Data.instance.mDGameTable.mGroupTypeList = [];
                    Data.instance.mDGameTable.mPondList = [];
                    Data.instance.mDGameTable.mComCard = [];

                    for (var i in _data.MaxPosList)
                    {
                        Data.instance.mDGameTable.mWinPositionList.push(_data.MaxPosList[i]);
                    }

                    for ( i in _data.WinList)
                    {
                        Data.instance.mDGameTable.mWinList.push(_data.WinList[i]);
                    }

                    for (i in _data.GroupTypeList)
                    {
                        Data.instance.mDGameTable.mGroupTypeList.push(_data.GroupTypeList[i]);
                    }

                    for (i in _data.PoolList)
                    {
                        var pond = new DPond;
                        pond.Id = _data.PoolList[i].Id;
                        pond.winPosList = _data.PoolList[i].winPosList;
                        pond.Ante = _data.PoolList[i].Ante;
                        Data.instance.mDGameTable.mPondList.push(pond);
                    }

                    for (i in _data.CardList)
                    {
                        Data.instance.mDGameTable.mComCard.push([_data.CardList[i].CardType, _data.CardList[i].CardNum]);
                    }

                    NetCenter.instance.dispatchEvent(new NetEvent(NetEvent.EVENT_GAME_RESULT, []));
                }
            }
            else
            {
                Log.L.LOG("结算异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcSitDomn(data: any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4012: 坐下！");
                var _data = data.getData();

                if (_data != null)
                {
                   
                }
            }
            else
            {
                Log.L.LOG("坐下异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcStandUp(data: any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4013: 站起！");
                var _data = data.getData();

                if (_data != null)
                {

                }
            }
            else
            {
                Log.L.LOG("站起异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcComeIn(data: any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4014: 有玩家进入！");
                var _data = data.getData();

                if (_data != null)
                {
                    Data.instance.mDGameTable.mComeInRole.Pos = _data.Position;
                    Data.instance.mDGameTable.mComeInRole.UserId = _data.UserId;
                    Data.instance.mDGameTable.mComeInRole.NickName = _data.NickName;
                    Data.instance.mDGameTable.mComeInRole.LeftAnte = _data.LeftAnte;

                    NetCenter.instance.dispatchEvent(new NetEvent(NetEvent.EVENT_COME_IN, []));
                }
            }
            else
            {
                Log.L.LOG("有玩家进入异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private stcComeOut(data: any): void
        {
            if (data.getErrorCode() == 0)
            {
                Log.L.LOG("action4015: 有玩家离开！");
                var _data = data.getData();

                if (_data != null)
                {
                    Data.instance.mDGameTable.mLeavePosition = _data.Position;

                    NetCenter.instance.dispatchEvent(new NetEvent(NetEvent.EVENT_COME_OUT, []));
                }
            }
            else {
                Log.L.LOG("有玩家离开异常！ " + "_data.getErrorCode()=" + data.getErrorCode() + "_data.getError() = " + data.getError());
            }
        }

        //--------------------------------------------------------------------------------
        private sendMsg(msg): void
        {
            if (msg && msg != "")
            {
                try
                {
                    Scut.Net.Instance().send(Scut.Net.Params.extend(msg));
                }
                catch (e)
                {
                    Log.L.LOG("消息发送失败！");
                }
            }
        }

        //--------------------------------------------------------------------------------
        private createTimerNet(): void
        {
            this.destoryTimerNet();
            this.mTimerNet = new egret.Timer(2000);
            this.mTimerNet.addEventListener(egret.TimerEvent.TIMER, this.handleTimerNet, this);
            this.mTimerNet.start();
        }

        //--------------------------------------------------------------------------------
        private handleTimerNet(e:egret.TimerEvent): void
        {
            var net = NetCenter.instance;
            NetCenter.instance.mTimerNetCount++;
            Log.L.LOG("try to connect the server..." + net.mTimerNetCount);

            if (net.mTimerNetCount > 20)
            {
                net.destoryTimerNet();
                return;
            }

            if (Scut.Net.isConnect())
            {
                if (net.mActionFlag == 1)
                {
                    net.ctsRegister(Data.instance.mDAccount.mAccount,Data.instance.mDAccount.mPassword);
                }
                else if (net.mActionFlag == 2)
                {
                    net.ctsLogin(Data.instance.mDAccount.mAccount, Data.instance.mDAccount.mPassword);
                }

                net.destoryTimerNet();
            }
            else
            {
                Scut.Net.connect();
            }
        }

        //--------------------------------------------------------------------------------
        private destoryTimerNet(): void
        {
            this.mTimerNetCount = 0;

            if (this.mTimerNet)
            {
                this.mTimerNet.removeEventListener(egret.TimerEvent.TIMER, this.handleTimerNet, false);
                this.mTimerNet.stop();
                this.mTimerNet = null;
            }
        }

        //--------------------------------------------------------------------------------
        public static set instance(value: NetCenter)
        {
            this._instance = value;
        }

        //--------------------------------------------------------------------------------
        public static get instance(): NetCenter
        {
            if (!this._instance)
            {
                this._instance = new NetCenter();
            }

            return <NetCenter><any>(this._instance);
        }
    }
}