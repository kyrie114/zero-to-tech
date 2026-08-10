"use client";

// 文字实验室的"输入区"卡片。
// text / setText / onAnalyze 都来自父亲 TextLabView（状态提升后，输入卡自己不再藏 state）。
// 打字 → setText；点「开始分析」→ onAnalyze 喊父亲把当前 text 冻进 result。
export default function InputCard({ text, setText, onAnalyze }) {
  return (
    <article className="panel panel-half lab-panel card">
      <div className="panel-heading">
        <p className="section-kicker">输入区</p>
        <h3>贴一段中文</h3>
      </div>
      <form className="lab-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="text-input">文本内容</label>
        <textarea
          id="text-input"
          rows="8"
          placeholder="例如：生活没有标准答案，但每一天都值得认真感受。"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="lab-count">已输入 {text.length} 字</p>
        <button className="primary-button" type="button" onClick={onAnalyze}>
          开始分析
        </button>
      </form>
    </article>
  );
}
