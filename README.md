### ReactNews-react-redux
react + create-react-app + antd + **react-redux** 制作新闻网站  

这是之前做的一个新网网站, 现在使用`react-redux`   

使用过后才发现这个项目**可能不需要redux**去管理状态  

不过为了学习 `redux` 以及 `react-redux`  强行使用一下吧  

本次学习过程主要是去理解**中间件**和**异步action** 说实话, 到目前为止还是不理解 - -!  

找了各种教程文章还是吃不透, 无奈只能依葫芦画瓢

1.先`npm install redux-thunk`    
2.在入口文件index.js里
<pre><code>import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
const store = createStore(reducer, applyMiddleware(thunk));
</code></pre>  
最主要的是这个`applyMiddleware(thunk)`参数, 加强了`createStore`  
可以让`Action Creator`先发出一个Action, 然后异步操作,拿到结果后再发出一个action  
### action.js  
![middleware](/src/assets/img/middleware.png)  




