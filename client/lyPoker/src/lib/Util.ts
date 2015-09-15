module Game
{
    export class Util
    {
        static numToStr(num : number) : string
        {
            var str = "0";
            var head = 0;
            var tail = 0;
            if (num > 0)
            {
                head = Math.floor(num / 100000000);
                if (head > 0)
                {
                    str = head.toString();
                    tail = Math.floor((num / 100000000 - head) * 10);

                    if (tail > 0)
                    {
                        str += "." + tail;
                    }

                    str += "亿";

                    return str;
                }

                head = Math.floor(num / 10000);
                if (head > 0)
                {
                    str = head.toString();
                    tail = Math.floor((num / 10000 - head) * 10);

                    if (tail > 0)
                    {
                        str += "." + tail;
                    }

                    str += "万";

                    return str;
                }

                head = Math.floor(num);
                str = head.toString();
            }

            return str;
        }
    }
}