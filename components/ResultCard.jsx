"use client";

// 结果区卡片。
// 一挂载就自己淡入、把情感分数滚动归位（anime.js 的入场动画）。
// 原文 / 拼音来自父亲 TextLabView 传来的 result（点「开始分析」后才有值）。
// 拼音用 pinyin-pro 从原文现场算出；情感分数仍是演示用假数据（真分析等模块 5）。
import { useEffect, useRef } from "react";
import { animate, scrambleText } from "animejs";
import { pinyin } from "pinyin-pro";

export default function ResultCard({ result }) {
  const cardRef = useRef(null);
  const scoreRef = useRef(null);

  useEffect(() => {
    // 卡片自己淡入：.card 默认 opacity:0，这张卡负责把自己显出来
    animate(cardRef.current, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 700,
      ease: "outBack",
    });
    // 情感分数滚动归位
    animate(scoreRef.current, {
      innerHTML: scrambleText({ chars: "0-9" }),
      duration: 1500,
    });
  }, []);

  const pinyinText = result
    ? pinyin(result, { toneType: "symbol", type: "array" }).join(" ")
    : "点左侧「开始分析」后，拼音会出现在这里。";

  return (
    <article ref={cardRef} className="panel panel-half lab-panel result-panel card">
      <div className="panel-heading">
        <p className="section-kicker">结果区</p>
        <h3>分析结果</h3>
      </div>
      <div className="result-stack">
        <div className="result-item">
          <span>原文</span>
          <p>{result ?? "点左侧「开始分析」后，原文会出现在这里。"}</p>
        </div>
        <div className="result-item">
          <span>拼音</span>
          <p>{pinyinText}</p>
        </div>
        <div className="result-grid">
          <div className="result-badge">
            <span>情感分数</span>
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
