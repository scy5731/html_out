/* Renders the shared 통합 알람 이력 left side panel.
   Set window.__ALARM = 'worker-sos' | 'vehicle-sos' | 'gas' | 'cctv' | 'nms' | 'unauth'
   before loading this script. */
(function () {
  const k = window.__ALARM || '';
  const cards = [
    { key: 'worker-sos',  href: '02_통합알람_바로가기_작업자SOS.html', name: '작업자 SOS 알람',
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0z"/></svg>' },
    { key: 'vehicle-sos', href: '03_통합알람_바로가기_차량SOS.html', name: '차량 SOS 알람',
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17h2a2 2 0 0 1 4 0h6a2 2 0 0 1 4 0h2v-5l-2-4h-5V8H3z"/></svg>' },
    { key: 'gas',         href: '06_통합알람_바로가기_유해가스.html', name: '유해가스',
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 21V11a3 3 0 0 1 6 0v10z"/></svg>' },
    { key: 'cctv',        href: '07_통합알람_바로가기_이동형CCTV.html', name: '이동형 CCTV',
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="3"/><path d="M9 14h6l-1 7h-4z"/></svg>' },
    { key: 'nms',         href: '08_통합알람_바로가기_NMS장애.html', name: 'NMS 장애',
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
    { key: 'unauth',      href: '09_통합알람_바로가기_비인가구역.html', name: '비인가 구역',
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="9" width="20" height="6"/></svg>' }
  ];

  const moreSvg = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';

  const cardsHTML = cards.map(c => {
    if (c.key === k) {
      return `<div class="alarm-card selected"><span class="ico">${c.svg}</span><span class="name">${c.name}</span><span class="more">${moreSvg}</span></div>`;
    }
    return `<a class="alarm-card" href="${c.href}" style="text-decoration:none;color:inherit;"><span class="ico">${c.svg}</span><span class="name">${c.name}</span><span class="more">${moreSvg}</span></a>`;
  }).join('');

  const html = `
    <div class="alarm-tabs">
      <a href="00_통합알람_설정.html" style="text-decoration:none;color:inherit;"><div class="tab">설정</div></a>
      <div class="tab active">바로가기</div>
    </div>
    ${cardsHTML}`;

  const slot = document.getElementById('alarm-side-slot');
  if (slot) slot.innerHTML = html;
})();
