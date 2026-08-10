"use client";

// 文字实验室页：拼装导航、标题、输入卡、结果卡。
// 因为两张卡要共享「输入 / 分析结果」，这里做状态提升：
//   text / setText —— 输入框实时内容
//   result —— 点「开始分析」后冻结给结果区的快照
// 所以顶上标了 "use client"。
import { useState } from "react";
import Nav from "./Nav.jsx";
import PageHeading from "./PageHeading.jsx";
import AnimatedCardGrid from "./AnimatedCardGrid.jsx";
import InputCard from "./InputCard.jsx";
import ResultCard from "./ResultCard.jsx";
import { textLab } from "../data/site.js";

export default function TextLabView() {
  const [text, setText] = useState(
    "今天的风很轻，适合把脑海里的想法慢慢写下来。"
  );
  const [result, setResult] = useState(null);

  function handleAnalyze() {
    setResult(text);
  }

  return (
    <AnimatedCardGrid className="dashboard-grid">
      <article className="hero-stage panel-full">
        <Nav />
        <PageHeading title={textLab.heroTitle} subtitle={textLab.heroSubtitle} />
      </article>

      <InputCard text={text} setText={setText} onAnalyze={handleAnalyze} />
      <ResultCard result={result} />
    </AnimatedCardGrid>
  );
}
