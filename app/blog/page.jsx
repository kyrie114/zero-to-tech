// app/blog/page.jsx → 网站路径 "/blog"
// 练习路由的成果：在 app/ 下新建一个 blog/page.jsx 就多了个页面，
// 不用改任何"路由配置"。"文件夹结构 = 网站结构"。
// 目前复用文字实验室视图当占位，等后面给它写真正的博客页组件。
import TextLabView from "../../components/TextLabView.jsx";

export default function Page() {
  return <TextLabView />;
}
