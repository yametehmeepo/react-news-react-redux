### ReactNews-react-redux
react + create-react-app + antd + **react-redux** 制作新闻网站  

这是之前做的一个新网网站, 现在使用`react-redux`   

使用过后才发现这个项目**可能不需要redux**去管理状态  

不过为了学习 `redux` 以及 `react-redux`  强行使用一下吧  

本次学习过程主要是去理解**中间件**和**异步action** 说实话, 到目前为止还是不理解 - -!  

找了各种教程文章还是吃不透, 无奈只能依葫芦画瓢, 目前只用react-redux管理登录状态和header的所有状态   

1.先`npm install redux-thunk`    
2.在入口文件index.js里
<pre><code>import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
const store = createStore(reducer, applyMiddleware(thunk));
</code></pre>  
最主要的是这个`applyMiddleware(thunk)`参数, 加强了`store.dispatch()`  
可以让`Action Creator`先发出一个Action, 然后异步操作,拿到结果后再发出一个action  
### action.js  
![middleware](/src/assets/img/middleware.png)  



踩坑:  
1.不是每个组件的state都适合用redux管理  
当有组件UI一样但是逻辑不一样时, 比如 `imageblock.js`组件  
如果你在项目中多个位置使用了连接redux后的同一个组件，那们这些位置将具有完全一致的逻辑和UI，当然也会共享store中相同的状态属性  
如果这不是你希望的，还是应该考虑复用连接redux前的组件  
2.**reducr拆分**  
<pre><code>const reducer = combineReducers({HeaderReducer,AppReducer});
export default reducer;</code></pre>
`combineReducers` 括号内用`花括号`  如果像上面代码的写法, 在`mapStateToProps`函数里获取state必须加上key, 即  
`state.HeaderReducer.xxx`     `state.AppReducer.xxx`    来分别获取各自的state  
3.`mobilenewsdetails.js`里的`componentWillReceiveProps`生命周期里需要加上判断  
<pre><code>if(nextProps.match.params.uniqueke === this.props.match.params.uniquekey){ return false } 
axios.get....
</code></pre>
否则登录和退出都会造成获得新props而刷新页面  



