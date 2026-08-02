// ============================================================
// ResultCard.jsx —— 文字实验室的"结果区"卡片
//
// 显示分析结果：原文、拼音、情感分数、情感判断。
// 一个完整的 React 组件：它自己 import 要用的 anime，自己 export 出去。
// 一挂载（出现在页面上），就自己淡入、并把情感分数滚动归位——这是它自带的"入场动画"。
// （点"开始分析"再去驱动分析，是"数据驱动界面"的活儿，留到 4.4。）
// ============================================================

import { useEffect, useRef } from "react";
import { animate, scrambleText } from "animejs";

export default function ResultCard() {
  // 两个 ref（标签）：分别贴在"整张卡"和"分数 <strong>"上，方便动画操作它们
  const cardRef = useRef(null);   // → 整张卡
  const scoreRef = useRef(null);  // → 情感分数那个数字

  // 挂载后执行一次：给卡片做"入场动画"
  useEffect(() => {
    // 卡片自己淡入：.card 默认 opacity:0，这张卡负责把自己显出来
    animate(cardRef.current, {
      opacity: [0, 1],        // 从看不见 → 完全可见
      translateY: [24, 0],    // 从往下 24px → 归位
      duration: 700,
      ease: "outBack",        // 弹性落地
    });

    // 情感分数滚动归位：数字 0-9 随机乱跳，最后停在最终值（"滚动数字"效果）
    animate(scoreRef.current, {
      innerHTML: scrambleText({ chars: "0-9" }), // 动画期间数字乱序跳动
      duration: 1500,
    });
  }, []); // 空数组：只在第一次挂载时执行

  return (
    // ref={cardRef}：把卡片"标签"贴到这整张 <article> 上
    <article ref={cardRef} className="panel panel-half lab-panel result-panel card">
      <div className="panel-heading">
        <p className="section-kicker">结果区</p>
        <h3>分析结果</h3>
      </div>

      <div className="result-stack">
        <div className="result-item">
          <span>原文</span>
          {/* 目前是写死的示例文字，4.4 会换成用户输入的内容 */}
          <p>今天的风很轻，适合把脑海里的想法慢慢写下来。</p>
        </div>

        <div className="result-item">
          <span>拼音</span>
          <p>jīn tiān de fēng hěn qīng …</p>
        </div>

        <div className="result-grid">
          <div className="result-badge">
            <span>情感分数</span>
            {/* ref={scoreRef}：分数数字贴上标签，动画就作用在它身上 */}
            <strong data-score ref={scoreRef}>0.86</strong>
          </div>
          <div className="result-badge">
            <span>情感判断</span>
            <strong>偏积极</strong>
          </div>
        </div>
      </div>
    </article>
  );
}
