import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js'

createApp({
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        login() {
            const api = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
            const path = 'jiangs2022vue3'; // 請加入個人 API Path
            // const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            // 發送 API 至遠端並登入（並儲存 Token）
            axios.post(`${api}/admin/signin`, this.user)
                // 登入成功的結果
                .then((res) => {
                    console.log(res.data);
                    // 用解構形式取出 token , expired
                    // 從 res 取出 token, expired 進行設定cookie
                    const { token, expired } = res.data;
                    // 寫入 cookie token
                    // expires 設置有效時間，要用 unix timestamp 時間戳格式撰寫 new Date()
                    document.cookie = `jiangsToken=${token};expires=${new Date(expired)}; path=/`;
                    // 登入成功之後轉址到 products.html 產品頁面
                    window.location = 'products.html';
                })
                // 登入失敗的結果
                .catch((err) => {
                    console.dir(err);
                    console.log(err.data.error.message);
                    alert(err.data.message);
                })
        }
    },
    mounted() {
        console.log(this);
    },
}).mount('#app');