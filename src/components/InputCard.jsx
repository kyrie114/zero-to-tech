// ============================================================
// InputCard.jsx —— 文字实验室的"输入区"卡片
//
// 用户在这里贴一段中文文字。单独拆成一块，页面读起来更清爽。
//
// 注意：现在这张卡只是"摆样子"——
//   - textarea 里是写死的默认文字（defaultValue）
//   - "开始分析"按钮点了没有任何反应
// 真正的"读用户输入 → 算拼音/情感 → 显示结果"，
// 是 4.4「数据驱动界面」的活儿，到那一节才会接上。
// ============================================================

export default function InputCard() {
  return (
    <article className="panel panel-half lab-panel card">
      <div className="panel-heading">
        <p className="section-kicker">输入区</p>
        <h3>贴一段中文</h3>
      </div>

      <form className="lab-form" onSubmit={(e) => e.preventDefault()}>
        {/* htmlFor 关联下面 textarea 的 id，点 label 文字时能聚焦到输入框 */}
        <label htmlFor="text-input">文本内容</label>

        <textarea
          id="text-input"
          rows="8"   // 高度：8 行文字
          placeholder="例如：生活没有标准答案，但每一天都值得认真感受。"
          // defaultValue：文本框的初始内容（用户之后可以随便改）
          defaultValue="今天的风很轻，适合把脑海里的想法慢慢写下来。"
        />

        {/* type="button"：不会触发表单提交；"开始分析"驱动结果，是 4.4 的活儿，这里先按兵不动 */}
        <button className="primary-button" type="button">开始分析</button>
      </form>
    </article>
  );
}
