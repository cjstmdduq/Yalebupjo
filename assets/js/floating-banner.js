/* floating-banner.js (rev. 2025-06-28)
   하단 플로팅 배너 모듈 */

const FloatingBanner = {
  /* ------------------------------------------------------------------
     STATE & UTILS
  ------------------------------------------------------------------ */
  _initialized: false,

  getBasePath() {
    const repoName = 'Yalebupjo';
    return location.hostname.endsWith('github.io') ? `/${repoName}` : '';
  },

  /* ------------------------------------------------------------------
     CORE
  ------------------------------------------------------------------ */
  init() {
    if (this._initialized) return;
    this._initialized = true;

    this.addStyles();
    this.render();
    this.bindEvents();
    this.handleScroll();
  },

  /* ------------------------------------------------------------------
     STYLES
  ------------------------------------------------------------------ */
  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* PC 플로팅 버튼 */
      .floating-buttons{position:fixed;bottom:0;left:0;right:0;background:#ffffff;border-top:1px solid #d1d5db;transform:translateY(100%);transition:transform .3s ease-in-out;z-index:1000;}
      .floating-buttons.show{transform:translateY(0);}
      
      /* PC 스타일 */
      .floating-content-pc{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:15px 0;}
      .floating-info{display:flex;gap:40px;align-items:center;}
      .floating-item{display:flex;align-items:center;gap:12px;}
      .floating-icon{width:44px;height:44px;background:rgba(0,0,0,.05);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
      .floating-text{display:flex;flex-direction:column;color:#374151;}
      .floating-label{font-size:13px;opacity:.7;margin-bottom:2px;}
      .floating-value{font-size:16px;font-weight:600;}
      .floating-cta{display:flex;align-items:center;gap:12px;background:#0f172a;color:#ffffff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:18px;transition:.3s;text-decoration:none;box-shadow:0 4px 15px rgba(15,23,42,.2);}
      .floating-cta:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(15,23,42,.3);}
      
      /* 모바일 스타일 */
      .floating-content-mobile{display:none;position:relative;padding:15px 0 10px;}
      .mobile-center-section{position:absolute;top:-15px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;}
      .mobile-center-button{width:50px;height:50px;background:linear-gradient(145deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%);border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 -3px 8px rgba(0,0,0,.1), inset 0 1px 2px rgba(255,255,255,.8), inset 0 -1px 2px rgba(0,0,0,.05);transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);text-decoration:none;}
      .mobile-center-button:hover{transform:translateY(-2px) scale(1.05);box-shadow:0 -5px 12px rgba(0,0,0,.15), inset 0 2px 3px rgba(255,255,255,.9), inset 0 -2px 3px rgba(0,0,0,.08);}
      .mobile-center-button:active{transform:translateY(1px) scale(0.98);box-shadow:0 -1px 6px rgba(0,0,0,.08), inset 0 1px 2px rgba(255,255,255,.6), inset 0 -1px 2px rgba(0,0,0,.03);}
      .mobile-center-text{margin-top:8px;font-size:10px;color:#64748b;font-weight:500;white-space:nowrap;}
      .mobile-nav-grid{display:grid;grid-template-columns:1fr 1.5fr 1.5fr 1fr;gap:8px;margin-top:15px;}
      .mobile-nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;text-decoration:none;color:#64748b;transition:.3s;}
      .mobile-nav-item:hover{opacity:.8;}
      .mobile-nav-icon{width:28px;height:28px;background:rgba(0,0,0,.05);border-radius:6px;display:flex;align-items:center;justify-content:center;}
      .mobile-nav-text{font-size:10px;font-weight:500;}
      
      /* 반응형 */
      @media(min-width:768px){
        .floating-content-pc{display:flex;}
        .floating-content-mobile{display:none;}
      }
      @media(max-width:767px){
        .floating-content-pc{display:none;}
        .floating-content-mobile{display:block;}
      }
    `;
    document.head.appendChild(style);
  },

  /* ------------------------------------------------------------------
     RENDER
  ------------------------------------------------------------------ */
  render() {
    const basePath = this.getBasePath();
    const bannerHTML = `
      <div id="floating-buttons" class="floating-buttons">
        <div class="container mx-auto px-4">
          <!-- PC 버전 -->
          <div class="floating-content-pc">
            <div class="floating-info">
              <div class="floating-item">
                <div class="floating-icon">
                  <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="floating-text">
                  <span class="floating-label">상담시간</span>
                  <span class="floating-value">평일 09:00-18:00</span>
                </div>
              </div>
              <div class="floating-item">
                <div class="floating-icon">
                  <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div class="floating-text">
                  <span class="floating-label">연락처</span>
                  <span class="floating-value">02-587-7787</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 모바일 버전 -->
          <div class="floating-content-mobile">
            <!-- 중앙 전화 버튼 및 텍스트 -->
            <div class="mobile-center-section">
              <a href="tel:02-587-7787" class="mobile-center-button">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </a>
              <span class="mobile-center-text">상담문의</span>
            </div>
            
            <!-- 네비게이션 그리드 -->
            <div class="mobile-nav-grid">
              <a href="${basePath}/location/index.html" class="mobile-nav-item">
                <div class="mobile-nav-icon">
                  <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <span class="mobile-nav-text">전국사무소</span>
              </a>
              
              <a href="${basePath}/lawyers/index.html" class="mobile-nav-item">
                <div class="mobile-nav-icon">
                  <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <span class="mobile-nav-text">변호사소개</span>
              </a>
              
              <a href="${basePath}/cases/index.html" class="mobile-nav-item">
                <div class="mobile-nav-icon">
                  <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <span class="mobile-nav-text">성공사례</span>
              </a>
              
              <a href="#expertise" class="mobile-nav-item" onclick="document.getElementById('expertise').scrollIntoView({behavior: 'smooth'});">
                <div class="mobile-nav-icon">
                  <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <span class="mobile-nav-text">전문분야</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    const existing = document.getElementById('floating-buttons');
    if (existing) {
      existing.outerHTML = bannerHTML;
    } else {
      document.body.insertAdjacentHTML('beforeend', bannerHTML);
    }
  },

  /* ------------------------------------------------------------------
     EVENTS
  ------------------------------------------------------------------ */
  bindEvents() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  },

  handleScroll() {
    const float = document.getElementById('floating-buttons');
    if (float) {
      window.scrollY > 50 ? float.classList.add('show') : float.classList.remove('show');
    }
  }
};

/* ------------------------------------------------------------------
   BOOTSTRAP
------------------------------------------------------------------ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FloatingBanner.init());
} else {
  FloatingBanner.init();
}