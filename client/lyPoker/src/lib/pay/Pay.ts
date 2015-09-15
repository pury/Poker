module Game{

    export class Pay{

        public static DATA_PREPARE_CHARGE: number[][] = [];

        public static DATA_PREPARE_ID: number = 0;

        public constructor() {

        }

        //--------------------------------------------------------------------------------
        public static pay(money: number, diamond: number = 0): void
        {
            var url: string = DUrl.URL_PAY;
            var myDate = new Date();
            //myDate.getFullYear();    //获取完整的年份(4位,1970-????)
            //myDate.getMonth();       //获取当前月份(0-11,0代表1月)
            //myDate.getDate();        //获取当前日(1-31)
            //myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
            //myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
            //myDate.getHours();       //获取当前小时数(0-23)
            //myDate.getMinutes();     //获取当前分钟数(0-59)
            //myDate.getSeconds();     //获取当前秒数(0-59)
            //myDate.getMilliseconds();    //获取当前毫秒数(0-999)
            //myDate.toLocaleDateString();     //获取当前日期
            var out_trade_no: string = Data.instance.mDRole.mUserId.toString();
            out_trade_no += "" + myDate.getFullYear() + myDate.getMonth() + myDate.getDate() + myDate.getHours() + myDate.getMinutes() + myDate.getSeconds();
            var subject: string = money + encodeURI("元礼包");
            var price = money;
            url += "?out_trade_no=" + out_trade_no + "&subject=" + subject + "&price=" + price;
            window.open(url);
        }

        /**存储支付成功后需要直接兑换的钻石*/
        //--------------------------------------------------------------------------------
        public static pushPrepare(value: number): void
        {
            var data = DPanelShop.DATA_DIAMOND;

            for (var i in data)
            {
                if (data[i][0] == value)
                {
                    this.DATA_PREPARE_CHARGE.push([this.DATA_PREPARE_ID++, data[i][1] + data[i][2]]);
                    break;
                }
            }
        }

        /**充值成功后处理预存储的钻石*/
        //--------------------------------------------------------------------------------
        public static popPrepare(): void
        {
            var self = this, num = 0, data = self.DATA_PREPARE_CHARGE;

            if (data.length <= 0)
            {
                return;
            }

            for (var i = 0; i < data.length; i ++)
            {
                num += data[i][1];
                data.splice(i, 1);
            }

            self.charge(num);
        }

        /**钻石兑换金币*/
        //--------------------------------------------------------------------------------
        public static charge(value: number): void
        {
            if (value <= 0)
            {
                Log.L.ERROE("兑换异常!");
                return;
            }

            if (Data.instance.mDRole.mDiamond >= value)
            {
                NetCenter.instance.ctsDiamondToGold(value);
            }
            else
            {
                GameUI.instance.alertMag("钻石数量不足!", 1, 3, 0);
            }
        }
    }
} 