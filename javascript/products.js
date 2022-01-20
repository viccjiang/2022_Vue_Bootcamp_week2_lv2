import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js'

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2', // 請加入站點
      apiPath: 'jiangs2022vue3', // 請加入個人 API Path
      products: [],
      tempProduct: {},
    }
  },
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then((res) => {
          console.log(res.data);
          // 確認登入後即可取得資料
          this.getData();
        })
        .catch((err) => {
          console.dir(err);
          console.log(err.data.error.message);
          alert(err.data.message);
          // 若登入失敗即返回首頁
          window.location = 'index.html';
        })
    },
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios.get(url)
        .then((res) => {
          console.log(res.data);
          this.products = res.data.products;
        })
        .catch((err) => {
          console.dir(err);
          console.log(err.data.error.message);
          alert(err.data.message);
        })
    },
    deleteItem(item) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${item.id}`;
      axios.delete(url)
        .then((res) => {
          console.log(res.data);
          this.getData();
        })
        .catch((err) => {
          console.dir(err);
          console.log(err.data.error.message);
          alert(err.data.message);
        })
        
    },
    openProduct(item){
      this.tempProduct = item; 
    }
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)jiangsToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    // 執行確認是否為登入
    this.checkAdmin();
  }
}).mount('#app');
