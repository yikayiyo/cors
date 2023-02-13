# CORS——后端DEMO

基于 node 和 express 提供一个简单的接口

默认运行在 3010 端口

`/public-data` 会返回

```html
<h1>这部分内容来自<em style="color: red;">服务器</em></h1>
```

安装依赖，运行项目

```shell
npm install && npm run dev
```

开启CORS

```js
app.use(cors());
```

关闭CORS

```js
// app.use(cors());
```