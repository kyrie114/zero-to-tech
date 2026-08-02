// ============================================================
// AnimatedCardGrid.jsx —— 带"卡片飞入动画"的网格容器
//
// 用法：<AnimatedCardGrid className="dashboard-grid">… hero + 几张卡片 …</AnimatedCardGrid>
// 同一份"卡片飞入"动画，写一次，到处用。
// HomePage 和 TextLabPage 都把自己的 dashboard-grid 套在它里头，
// 里面所有 .card（hero 不是 card，不动）都自动获得 stagger 弹性入场。
//
// 涉及的两个 React 概念：
//   useRef   —— 拿一个"标签"，贴在某个真实 DOM 元素上（ref={ref}），
//               之后就能在代码里找到它、对它操作（比如找它里面的卡片）
//   useEffect—— "挂载后做点什么"：组件第一次出现在屏幕上时，执行里面的代码
// ============================================================

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs"; // animejs 动画库

export default function AnimatedCardGrid({ className, children }) {
  // ref：一个"标签"，下面贴到 <section ref={ref}> 上
  const ref = useRef(null);

  // 组件一挂载（首次出现），就跑这段动画
  useEffect(() => {
    // 从容器里找出所有 class 含 "card" 的元素（hero 不含，所以不动）
    const cards = ref.current.querySelectorAll(".card");

    // 让它们集体做动画：从透明+往下 24px，飞到原位变清晰
    animate(cards, {
      opacity: [0, 1],        // 透明度：0（看不见）→ 1（完全可见）
      translateY: [24, 0],    // 垂直位置：先往下 24px → 归位 0
      delay: stagger(120),    // 每张卡错开 120ms（第一张先动，后面的依次跟上）
      duration: 700,          // 每张卡动画持续 700ms
      ease: "outBack",        // 缓动函数：带一点"弹性落地"的回弹手感
    });
  }, []); // 空数组 = 只在第一次挂载时执行一次

  return (
    // ref 贴在这里；children 是调用方塞进来的内容（hero + 卡片们）
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
