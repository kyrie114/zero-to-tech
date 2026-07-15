import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;
    
    const elements = heroRef.current.querySelectorAll('.hero-label, h1, .hero-subtitle, .hero-actions .btn');
    
    animate(elements, {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
      delay: stagger(150, { start: 300 }),
      ease: 'outElastic(1, .8)'
    });
  }, []);

  return (
    <section className="hero">
      <div className="hero-content" ref={heroRef}>
        <span className="hero-label" style={{ opacity: 0 }}>✨ 个人技术博客</span>
        <h1 style={{ opacity: 0 }}>从零开始，建立技术直觉</h1>
        <p className="hero-subtitle" style={{ opacity: 0 }}>
          分享 <span className="highlight">全栈开发</span> 与 <span className="highlight">AI</span> 领域的学习心得与实战经验
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" style={{ opacity: 0 }}>开始阅读</button>
          <button className="btn btn-outline" style={{ opacity: 0 }}>查看项目</button>
        </div>
      </div>
    </section>
  );
}
