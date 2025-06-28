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
      /* floating buttons */
      .floating-buttons{position:fixed;bottom:0;left:0;right:0;background:linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%);box-shadow:0 -5px 20px rgba(0,0,0,.1);transform:translateY(100%);transition:transform .3s ease-in-out;z-index:1000;}
      .floating-buttons.show{transform:translateY(0);}
      .floating-content{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:15px 0;}
      .floating-info{display:flex;gap:30px;align-items:center;}
      .floating-item{display:flex;align-items:center;gap:10px;}
      .floating-icon{width:40px;height:40px;background:rgba(255,255,255,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
      .floating-text{display:flex;flex-direction:column;color:#fff;}
      .floating-label{font-size:12px;opacity:.8;}
      .floating-value{font-size:14px;font-weight:600;}
      .floating-cta{display:flex;align-items:center;gap:10px;background:#fff;color:#1e3a8a;padding:12px 24px;border-radius:50px;font-weight:700;font-size:18px;transition:.3s;text-decoration:none;box-shadow:0 4px 15px rgba(0,0,0,.2);}
      .floating-cta:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.3);}
      
      /* responsive tweaks */
      @media(max-width:1024px){
        .floating-content{padding:12px 0;}
        .floating-info{gap:20px;}
        .floating-item:nth-child(2),.floating-item:nth-child(3){display:none;}
        .floating-cta{padding:10px 20px;font-size:16px;}
      }
      @media(max-width:640px){
        .floating-content{justify-content:center;}
        .floating-info{display:none;}
        .floating-cta{padding:12px 24px;}
      }
    `;
    document.head.appendChild(style);
  },

  /* ------------------------------------------------------------------
     RENDER
  ------------------------------------------------------------------ */
  render() {
    const bannerHTML = `
      <div id="floating-buttons" class="floating-buttons">
        <div class="container mx-auto px-4">
          <div class="floating-content">
            <!-- info -->
            <div class="floating-info">
              <div class="floating-item">
                <div class="floating-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                <div class="floating-text"><span class="floating-label">상담시간</span><span class="floating-value">평일 09:00-18:00</span></div>
              </div>
              <div class="floating-item">
                <div class="floating-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div>
                <div class="floating-text"><span class="floating-label">빠른상담</span><span class="floating-value">30분 내 연락</span></div>
              </div>
              <div class="floating-item">
                <div class="floating-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                <div class="floating-text"><span class="floating-label">온라인</span><span class="floating-value">24시간 접수</span></div>
              </div>
            </div>
            <!-- CTA -->
            <a href="tel:02-587-7787" class="floating-cta">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>02-587-7787</span>
            </a>
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