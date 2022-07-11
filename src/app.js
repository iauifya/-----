// const options = {
//     method: 'POST',
//     url: 'https://todo-list.p.rapidapi.com/users/login',
//     headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
//         'X-RapidAPI-Host': 'todo-list.p.rapidapi.com'
//     },
//     data: '{"email":"aryastark@gmail.com","password":"aryatark1999"}'
// };

// axios.request(options).then(function(response) {
//     console.log(response.data);
// }).catch(function(error) {
//     console.error(error);
// });


let vm = new Vue({
    el: '#app',
    data: {
        tags: '日一二三四五六', //字串也是陣列的一種
        days: [],
        selected_day: 0,
        start_day: 0,
        lunar_day: 0,
        new_item: {
            title: '',
            time: '',
            type: []
        }
    },
    computed: {
        now_events() {
            let day = this.days[this.selected_day];
            if (day) {
                return this.sort_time(day.events); //排序好時間的event
            } else {
                return [];
            }
        }
    },
    methods: {
        get_pan(id) {
            if (id != 0) {
                return null;
            } else {
                return { 'margin-left': 'calc(${this.start_day}  * 100%/7)' }; //自動計算七個的寬度
            }
        },
        chinese_number(num) {
            let list = '十一二三四五六七八九';
            return list[num];
        },
        lunar(num) {
            if (num > 29) {
                num = num % 29;
            }
            if (num <= 10) {
                return '初' + this.chinese_number(num % 10);
            } else if (num == 20) {
                return '二十';
            } else if (num < 20) {
                return '十' + this.chinese_number(num % 10);
            } else if (num < 30) {
                return '廿' + this.chinese_number(num % 10);
            }
        },
        add_item() {
            this.days[this.selected_day].events.push(
                JSON.parse(JSON.stringify(this.new_item))
            );
        },
        sort_time(events) {
            return events.sort(
                (a, b) => {
                    return parseInt(a.time.replace(':', '')) -
                        parseInt(b.time.replace(':', ''))
                }
            )
        }
    },
    mounted() {
        for (i = 1; i <= 31; i++) {
            let new_day = {
                number: i,
                events: [],
            };
            if (Math.random() < 0.4) {
                let count = Math.random() * 3;
                // let hour = parseInt(Math.random() * 24);
                let minute = parseInt(Math.random() * 4) * 15; //15、30、45、60 這四種可能
                for (o = 0; o < count; o++) { //一天的活動不會超過3個
                    new_day.events.push({
                        title: ['學習前端', '打工', '製作畢製', '打掃家裡', '聚餐'][
                            parseInt(Math.random() * 5)
                        ],
                        time: parseInt(Math.random() * 24) + ':' + (minute == 0 ? '0' : '') + minute,
                        type: ['工作', '學習', '休閒娛樂', '重要'][parseInt(Math.random() * 4)]
                    });
                }
            }
            this.days.push(new_day);
        }
    }
});