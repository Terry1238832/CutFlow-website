"use strict";
(() => {
  const finder = document.querySelector('.finder');
  if (!finder) return;
  const action = document.querySelector('#demo-action');
  const reset = document.querySelector('.demo-reset');
  const status = document.querySelector('#demo-status-text');
  const title = document.querySelector('.finder-title');
  const breadcrumb = document.querySelector('.breadcrumb-current');
  const count = document.querySelector('#finder-count');
  const label = action.querySelector('.action-label');
  const key = action.querySelector('.action-key');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let phase = 'selected';
  let pendingMove;
  const states = {
    selected: ['下载', '已选中 3 个项目，体验剪切后淡化。', '已选择 3 个项目', '剪切并淡化', '⌘ X', '⌘'],
    cut: ['下载', '3 个项目已淡化，原文件暂留原处。', '3 个项目 · 等待移动', '粘贴到目标', '⌘ V', '✂'],
    moved: ['设计项目', '移动完成，原位置不再保留这些文件。', '3 个项目 · 已移动', '再试一次', '↺', '✓']
  };
  function show(next) {
    phase = next;
    finder.dataset.phase = next;
    const [folder, message, counter, text, shortcut, symbol] = states[next];
    title.textContent = breadcrumb.textContent = folder;
    status.textContent = message;
    count.textContent = counter;
    label.textContent = text;
    key.textContent = shortcut;
    finder.querySelector('.status-symbol').textContent = symbol;
    action.disabled = false;
    document.querySelectorAll('[data-step]').forEach(step => step.classList.toggle('active', step.dataset.step === next));
  }
  action.addEventListener('click', () => {
    if (phase === 'selected') show('cut');
    else if (phase === 'cut') {
      phase = 'moving';
      finder.dataset.phase = 'moving';
      action.disabled = true;
      title.textContent = breadcrumb.textContent = '设计项目';
      status.textContent = '正在移入目标文件夹…';
      pendingMove = window.setTimeout(() => show('moved'), reducedMotion.matches ? 0 : 450);
    } else if (phase === 'moved') show('selected');
  });
  reset.addEventListener('click', () => { window.clearTimeout(pendingMove); show('selected'); });
  const dimPreview = document.querySelector('#dim-preview');
  dimPreview.addEventListener('change', () => {
    document.querySelector('.dimming-compare').dataset.dimmed = String(dimPreview.checked);
    document.querySelector('#dim-preview-status').textContent = dimPreview.checked
      ? '右侧图标已淡化，文件仍在原处。'
      : '淡化预览已关闭，对比图标的原始外观。';
  });
  document.querySelectorAll('a[href="#faq-dimming"]').forEach(link => link.addEventListener('click', () => {
    document.querySelector('#faq-dimming').open = true;
  }));
  if (window.location.hash === '#faq-dimming') document.querySelector('#faq-dimming').open = true;
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }
})();
