/* Renders shared header + sidebar.
   Set window.__ACTIVE = 'page-key' before loading this script. */
(function () {
  const active = window.__ACTIVE || '';

  // resolve relative path: every page lives at html_out/<folder>/<file>.html
  // so cross-folder links use ../<folder>/<file>.html
  function resolve(rel) {
    if (!rel) return '#';
    return '../' + rel;
  }

  const routes = {
    // 이력조회
    'hist-alarm':       '00_이력조회/00_통합알람_설정.html',
    'hist-in-worker-out': '00_이력조회/10_출입_작업자_외부.html',
    'hist-in-worker-in':  '00_이력조회/11_출입_작업자_내부.html',
    'hist-in-vehicle-out':'00_이력조회/12_출입_차량_외부.html',
    'hist-in-vehicle-in': '00_이력조회/13_출입_차량_내부.html',
    'hist-in-zone':       '00_이력조회/14_출입_구역.html',
    'hist-route':         '00_이력조회/15_이동경로_초기.html',
    'hist-jucksan':       '00_이력조회/17_적산_초기.html',
    'hist-recv-gas':      '00_이력조회/19_수신이력_유해가스.html',
    // 운영관리
    'op-notice':     '01_운영관리/00_공지사항.html',
    'op-route':      '01_운영관리/01_노선관리.html',
    'op-progress':   '01_운영관리/02_누적굴진량입력.html',
    // 지도관리
    'map-register':  '02_지도관리/00_현장등록.html',
    'map-manage':    '02_지도관리/01_현장관리.html',
    'map-zone-1':    '02_지도관리/02_구역관리_비인가구역.html',
    'map-zone-2':    '02_지도관리/03_구역관리_적산구역.html',
    'map-zone-3':    '02_지도관리/04_구역관리_커스텀.html',
    // 계정관리
    'acct-account':  '04_계정관리/00_계정관리.html',
    // 일반관리
    'gen-company':   '03_일반관리/00_소속사관리.html',
    'gen-worker':    '03_일반관리/01_작업자관리.html',
    'gen-vehicle':   '03_일반관리/02_차량관리.html',
    'gen-battery':   '03_일반관리/03_배터리카관리.html',
    'gen-beacon':    '03_일반관리/04_디바이스_비콘.html',
    'gen-scanner':   '03_일반관리/05_디바이스_스캐너.html',
    'gen-cctv-fix':  '03_일반관리/06_디바이스_CCTV_고정형.html',
    'gen-cctv-mob':  '03_일반관리/07_디바이스_CCTV_이동형.html',
    'gen-gas':       '03_일반관리/08_디바이스_유해가스.html',
    'gen-bell':      '03_일반관리/09_디바이스_비상벨.html',
    'gen-broadcast': '03_일반관리/10_디바이스_비상방송.html',
    'gen-wifi':      '03_일반관리/11_디바이스_와이파이.html',
    'gen-unload':    '03_일반관리/12_디바이스_하역알림센서.html',
    // 시스템 설정
    'sys-hyeonjang':    '05_시스템설정/00_현장설정_기본.html',
    'sys-broadcast':    '05_시스템설정/01_현장설정_관리자.html',
    'sys-exit-gps':     '05_시스템설정/02_퇴출관리_GPS.html',
    'sys-exit-ble':     '05_시스템설정/03_퇴출관리_BLE.html',
    'sys-scanner-grp':  '05_시스템설정/04_스캐너그룹관리.html'
  };

  // section is 'general' | 'system' | etc — determines which header is the active blue one
  const section = (() => {
    if (active.startsWith('gen-')) return 'general';
    if (active.startsWith('sys-')) return 'system';
    if (active.startsWith('map-')) return 'map';
    if (active.startsWith('op-')) return 'operation';
    if (active.startsWith('acct-')) return 'account';
    if (active.startsWith('hist-')) return 'history';
    return '';
  })();

  const dot = (k) => active === k ? '<span class="dot"></span>' : '';
  const cls = (k) => active === k ? 'nav-item active' : 'nav-item';

  const sidebarHTML = `
  <div class="logo-area">
    <button class="hamburger" aria-label="menu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
        <line x1="4" y1="7" x2="20" y2="7"/>
        <line x1="4" y1="12" x2="20" y2="12"/>
        <line x1="4" y1="17" x2="20" y2="17"/>
      </svg>
    </button>
    <div class="brand">
      <div class="brand-mark"></div>
      <span class="brand-text">GS 건설</span>
    </div>
  </div>
  <div class="top-bar"></div>
  <aside class="sidebar">
    <div class="nav-section">
      <div class="nav-section-header">
        <span>모니터링</span>
        <span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 12 8 12 11 5 14 19 17 12 21 12"/></svg></span>
      </div>
      <ul class="nav-list">
        <li class="nav-item"><span class="label">지도 대시보드</span></li>
        <li class="nav-item"><span class="label">통합 대시보드</span></li>
        <li class="nav-item"><span class="label">1-1 구간</span></li>
        <li class="nav-item"><span class="label">1-2 구간</span></li>
        <li class="nav-item"><span class="label">1-3 구간</span></li>
        <li class="nav-item"><span class="label">1-4 구간</span></li>
        <li class="nav-item"><span class="label">1-5 구간</span></li>
        <li class="nav-item"><span class="label">NMS 대시보드</span></li>
      </ul>
    </div>

    <div class="nav-section">
      <div class="nav-section-header ${section==='history' ? 'active' : ''}">
        <span>이력조회</span>
        <span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="20"/></svg></span>
      </div>
      <ul class="nav-list">
        <li class="${cls('hist-alarm')}" data-key="hist-alarm"><span class="label">통합 알람 이력</span>${dot('hist-alarm')}</li>
        <li class="${cls('hist-in-worker-out')}" data-key="hist-in-worker-out"><span class="label">출입이력 <span class="sep">|</span> <span class="sub">작업자(외부)</span></span>${dot('hist-in-worker-out')}</li>
        <li class="${cls('hist-in-worker-in')}" data-key="hist-in-worker-in"><span class="label">출입이력 <span class="sep">|</span> <span class="sub">작업자(내부)</span></span>${dot('hist-in-worker-in')}</li>
        <li class="${cls('hist-in-vehicle-out')}" data-key="hist-in-vehicle-out"><span class="label">출입이력 <span class="sep">|</span> <span class="sub">차량(외부)</span></span>${dot('hist-in-vehicle-out')}</li>
        <li class="${cls('hist-in-vehicle-in')}" data-key="hist-in-vehicle-in"><span class="label">출입이력 <span class="sep">|</span> <span class="sub">차량(내부)</span></span>${dot('hist-in-vehicle-in')}</li>
        <li class="${cls('hist-in-zone')}" data-key="hist-in-zone"><span class="label">출입이력 <span class="sep">|</span> <span class="sub">구역</span></span>${dot('hist-in-zone')}</li>
        <li class="${cls('hist-route')}" data-key="hist-route"><span class="label">이동 경로 조회</span>${dot('hist-route')}</li>
        <li class="${cls('hist-jucksan')}" data-key="hist-jucksan"><span class="label">적산조회</span>${dot('hist-jucksan')}</li>
        <li class="${cls('hist-recv-gas')}" data-key="hist-recv-gas"><span class="label">수신이력 <span class="sep">|</span> <span class="sub">유해가스</span></span>${dot('hist-recv-gas')}</li>
      </ul>
    </div>

    <div class="nav-section">
      <div class="nav-section-header ${section==='operation' ? 'active' : ''}">
        <span>운영관리</span>
        <span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 3 22 20 2 20"/><line x1="12" y1="10" x2="12" y2="15"/><circle cx="12" cy="18" r="0.8" fill="currentColor"/></svg></span>
      </div>
      <ul class="nav-list">
        <li class="${cls('op-notice')}" data-key="op-notice"><span class="label">공지사항</span>${dot('op-notice')}</li>
        <li class="${cls('op-route')}" data-key="op-route"><span class="label">노선관리</span>${dot('op-route')}</li>
        <li class="${cls('op-progress')}" data-key="op-progress"><span class="label">누적 굴진량 입력</span>${dot('op-progress')}</li>
      </ul>
    </div>

    <div class="nav-section">
      <div class="nav-section-header ${section==='map' ? 'active' : ''}">
        <span>지도 관리</span>
        <span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 7 9 4 15 7 21 4 21 17 15 20 9 17 3 20"/><line x1="9" y1="4" x2="9" y2="17"/><line x1="15" y1="7" x2="15" y2="20"/></svg></span>
      </div>
      <ul class="nav-list">
        <li class="${cls('map-register')}" data-key="map-register"><span class="label">현장등록</span>${dot('map-register')}</li>
        <li class="${cls('map-manage')}" data-key="map-manage"><span class="label">현장관리</span>${dot('map-manage')}</li>
        <li class="${(active==='map-zone-1'||active==='map-zone-2'||active==='map-zone-3')?'nav-item active':'nav-item'}" data-key="map-zone-1"><span class="label">구역관리</span>${(active==='map-zone-1'||active==='map-zone-2'||active==='map-zone-3')?'<span class="dot"></span>':''}</li>
      </ul>
    </div>

    <div class="nav-section">
      <div class="nav-section-header ${section==='general' ? 'active' : ''}">
        <span>일반관리</span>
        <span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="11" y2="6"/><line x1="15" y1="6" x2="20" y2="6"/><circle cx="13" cy="6" r="2"/><line x1="4" y1="12" x2="8" y2="12"/><line x1="12" y1="12" x2="20" y2="12"/><circle cx="10" cy="12" r="2"/><line x1="4" y1="18" x2="14" y2="18"/><line x1="18" y1="18" x2="20" y2="18"/><circle cx="16" cy="18" r="2"/></svg></span>
      </div>
      <ul class="nav-list">
        <li class="${cls('gen-company')}" data-key="gen-company"><span class="label">소속사 관리</span>${dot('gen-company')}</li>
        <li class="${cls('gen-worker')}" data-key="gen-worker"><span class="label">작업자 관리</span>${dot('gen-worker')}</li>
        <li class="${cls('gen-vehicle')}" data-key="gen-vehicle"><span class="label">차량 관리</span>${dot('gen-vehicle')}</li>
        <li class="${cls('gen-battery')}" data-key="gen-battery"><span class="label">배터리카 관리</span>${dot('gen-battery')}</li>
        <li class="${cls('gen-beacon')}" data-key="gen-beacon"><span class="label">디바이스 관리 <span class="sep">|</span> <span class="sub">비콘</span></span>${dot('gen-beacon')}</li>
        <li class="${cls('gen-scanner')}" data-key="gen-scanner"><span class="label">디바이스 관리 <span class="sep">|</span> <span class="sub">스캐너</span></span>${dot('gen-scanner')}</li>
        <li class="${cls('gen-cctv-fix')} ${cls('gen-cctv-mob').includes('active') ? 'active' : ''}" data-key="gen-cctv-fix"><span class="label">디바이스 관리 <span class="sep">|</span> <span class="sub">CCTV</span></span>${(active==='gen-cctv-fix'||active==='gen-cctv-mob') ? '<span class="dot"></span>' : ''}</li>
        <li class="${cls('gen-gas')}" data-key="gen-gas"><span class="label">디바이스 관리 <span class="sep">|</span> <span class="sub">유해가스</span></span>${dot('gen-gas')}</li>
        <li class="${cls('gen-bell')}" data-key="gen-bell"><span class="label">디바이스 관리 <span class="sep">|</span> <span class="sub">비상벨</span></span>${dot('gen-bell')}</li>
        <li class="${cls('gen-broadcast')}" data-key="gen-broadcast"><span class="label">디바이스 관리 <span class="sep">|</span> <span class="sub">비상방송</span></span>${dot('gen-broadcast')}</li>
        <li class="${cls('gen-wifi')}" data-key="gen-wifi"><span class="label">디바이스 관리 <span class="sep">|</span> <span class="sub">와이파이</span></span>${dot('gen-wifi')}</li>
        <li class="${cls('gen-unload')}" data-key="gen-unload"><span class="label">디바이스 관리 <span class="sep">|</span> <span class="sub">하역 알림 센서</span></span>${dot('gen-unload')}</li>
      </ul>
    </div>

    <div class="nav-section">
      <div class="nav-section-header ${section==='account' ? 'active' : ''}">
        <span>계정 관리</span>
        <span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 12 8 12 11 5 14 19 17 12 21 12"/></svg></span>
      </div>
      <ul class="nav-list">
        <li class="${cls('acct-account')}" data-key="acct-account"><span class="label">계정 관리</span>${dot('acct-account')}</li>
      </ul>
    </div>

    <div class="nav-section">
      <div class="nav-section-header ${section==='system' ? 'active' : ''}">
        <span>시스템 설정</span>
        <span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg></span>
      </div>
      <ul class="nav-list">
        <li class="${cls('sys-hyeonjang')}" data-key="sys-hyeonjang"><span class="label">현장 설정</span>${dot('sys-hyeonjang')}</li>
        <li class="${cls('sys-broadcast')}" data-key="sys-broadcast"><span class="label">방송 설정</span>${dot('sys-broadcast')}</li>
        <li class="${cls('sys-exit-gps')}" data-key="sys-exit-gps"><span class="label">퇴출관리 <span class="sep">|</span> <span class="sub">GPS</span></span>${dot('sys-exit-gps')}</li>
        <li class="${cls('sys-exit-ble')}" data-key="sys-exit-ble"><span class="label">퇴출관리 <span class="sep">|</span> <span class="sub">BLE</span></span>${dot('sys-exit-ble')}</li>
        <li class="${cls('sys-scanner-grp')}" data-key="sys-scanner-grp"><span class="label">스캐너 그룹 관리</span>${dot('sys-scanner-grp')}</li>
      </ul>
    </div>
  </aside>`;

  const slot = document.getElementById('sidebar-slot');
  if (slot) slot.outerHTML = sidebarHTML;

  // routing
  document.querySelectorAll('.nav-item[data-key]').forEach(el => {
    el.addEventListener('click', () => {
      const k = el.dataset.key;
      if (routes[k]) location.href = resolve(routes[k]);
    });
  });
})();
