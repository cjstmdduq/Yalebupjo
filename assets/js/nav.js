/*  navigation.js (rev. 2025-06-28)
    깃Hub Pages & 일반 서버 양쪽을 지원하는 풀버전 네비게이션 모듈  */

    const Navigation = {
        /* ------------------------------------------------------------------
           STATE & UTILS
        ------------------------------------------------------------------ */
        _initialized: false,
      
        getBasePath() {
          const repoName = 'Yalebupjo';                 // 깃헙 Pages 레포명
          return location.hostname.endsWith('github.io') ? `/${repoName}` : '';
        },
      
        isMainPage() {
          const base = this.getBasePath();
          const path = location.pathname.replace(/\/+$/, ''); // 끝 슬래시 제거
          
          // file:// 프로토콜 처리
          if (location.protocol === 'file:') {
            return path.endsWith('/index.html') || path.endsWith('/Yalebupjo_website/index.html');
          }
          
          return (
            path === '' ||
            path === '/' ||
            path === '/index.html' ||
            path === `/${base}` ||
            path === `${base}` ||
            path === `${base}/index.html`
          );
        },
      
        /* ------------------------------------------------------------------
           CORE
        ------------------------------------------------------------------ */
        init() {
          if (this._initialized) return;     // 중복 실행 방지
          this._initialized = true;
      
          this.addStyles();
          this.render();
          this.bindEvents();
          this.handleScroll();               // 초기 스크롤 상태 반영
          
          // 메인 페이지인 경우 body에 클래스 추가
          if (this.isMainPage()) {
            document.body.classList.add('main-page');
          }
        },
      
        /* ------------------------------------------------------------------
           STYLES
        ------------------------------------------------------------------ */
        addStyles() {
          const style = document.createElement('style');
          style.textContent = `
      /* header 상태 */
      .header-transparent {background:transparent;}
      .header-scrolled    {background:#ffffff;}
      .mega-menu-open     {overflow:visible;}
      
      /* PC에서 네비게이션 위치 조정 */
      @media (min-width: 768px) {
        #header {
          top: 0px !important;
        }
        
        /* 메인 페이지에서 투명 상태일 때만 두꺼운 네비게이션 */
        body.main-page #header.header-transparent .container > div {
          padding-top: 2.5rem !important;
          padding-bottom: 1.5rem !important;
        }
      }
      
      /* mega-menu */
      #mega-menu{display:none;position:absolute;top:100%;left:0;width:100%;background:#fff;border-top:1px solid #e5e7eb;z-index:40;}
      #mega-menu.active{display:block;}
      
      /* mobile accordion */
      .mobile-accordion-content{max-height:0;overflow:hidden;transition:max-height .3s ease-out;}
      .mobile-accordion-content.show{max-height:500px;transition:max-height .3s ease-in;}
      .mobile-accordion-arrow{transition:transform .3s ease;}
      .mobile-accordion-arrow.rotate-180{transform:rotate(180deg);
          `;
          document.head.appendChild(style);
        },
      
        /* ------------------------------------------------------------------
           RENDER NAV
        ------------------------------------------------------------------ */
        render() {
          const basePath = this.getBasePath();
          const isMain   = this.isMainPage();
      
          /* dynamic values */
          const headerClass   = isMain ? 'header-transparent' : 'header-scrolled';
          const headerPosition = isMain ? 'top-0' : 'top-0';
          const textColor     = isMain ? 'text-white' : 'text-black';
          const textHover     = isMain ? 'hover:text-gray-300' : 'hover:text-gray-600';
          const logoWhiteDisp = isMain ? '' : 'hidden';
          const logoBlackDisp = isMain ? 'hidden' : '';
          const mobileBtnBg   = isMain ? 'hover:bg-white/10' : 'hover:bg-gray-100';
      
          /* nav HTML */
          const navHTML = `
      <nav id="header" class="fixed ${headerPosition} w-full ${headerClass} z-50 transition-all duration-300">
        <div class="container mx-auto px-4 md:px-4 py-4 flex justify-between items-center relative transition-all duration-300">
          <!-- logo -->
          <div class="flex items-center z-10">
            <a href="${basePath}/index.html">
              <img id="logo-white" src="${basePath}/assets/logo/Yalebupjo_logo_white(temp).png" class="h-8 md:h-10 ${logoWhiteDisp}" alt="logo white">
              <img id="logo-black" src="${basePath}/assets/logo/Yalebupjo_logo_basic(temp).png" class="h-8 md:h-10 ${logoBlackDisp}" alt="logo black">
            </a>
          </div>
      
          <!-- desktop menu -->
          <div class="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-x-8">
            <!-- <a href="#" class="${textColor} ${textHover} transition nav-link">로펌소개</a> -->
            <a href="#" class="${textColor} ${textHover} transition nav-link">전문분야</a>
            <a href="${basePath}/cases/index.html" class="${textColor} ${textHover} transition nav-link">주요사건</a>
            <a href="${basePath}/location/index.html" class="${textColor} ${textHover} transition nav-link">전국사무소</a>
            <a href="${basePath}/lawyers/index.html" class="${textColor} ${textHover} transition nav-link">구성원소개</a>
          </div>
      
          <!-- right controls -->
          <div class="flex items-center z-10">
            <!-- desktop tel -->
            <a href="tel:02-587-7787" class="hidden md:block ${textColor} ${textHover} transition-colors">
              <div class="text-right">
                <div class="text-xl font-bold">02-587-7787</div>
              </div>
            </a>
      
      
            <!-- hamburger -->
            <button id="mobile-menu-btn" class="md:hidden ${textColor} ml-4 p-2 ${mobileBtnBg} rounded-lg">
              <svg id="hamburger-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      
        <!-- mega menu -->
        <div id="mega-menu" class="mega-menu">
          <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-3 gap-8">
              <!-- 로펌소개 -->
              <!-- <div>
                <h3 class="font-bold text-gray-900 mb-4 text-lg">로펌소개</h3>
                <ul class="space-y-2">
                  <li><a href="${basePath}/about/index.html" class="text-gray-600 hover:text-blue-600 transition block py-1">법인소개</a></li>                  
                  <li><a href="${basePath}/lawyers/index.html" class="text-gray-600 hover:text-blue-600 transition block py-1">구성원 소개</a></li>
                </ul>
              </div> -->
      
              <!-- 전문분야 -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 text-lg">전문분야</h3>
                <ul class="space-y-2">
                  <li><a href="${basePath}/criminal/index.html"   class="text-gray-600 hover:text-blue-600 transition block py-1">형사</a></li>
                  <li><a href="${basePath}/civil/index.html"      class="text-gray-600 hover:text-blue-600 transition block py-1">민사</a></li>
                  <li><a href="${basePath}/realestate/index.html" class="text-gray-600 hover:text-blue-600 transition block py-1">부동산</a></li>
                  <li><a href="${basePath}/traffic/index.html"    class="text-gray-600 hover:text-blue-600 transition block py-1">교통사고</a></li>
                  <li><a href="${basePath}/corporate/index.html"  class="text-gray-600 hover:text-blue-600 transition block py-1">기업</a></li>
                  <li><a href="${basePath}/family/index.html"     class="text-gray-600 hover:text-blue-600 transition block py-1">가사</a></li>
                  <li><a href="${basePath}/notary/index.html"     class="text-gray-600 hover:text-blue-600 transition block py-1">공증센터</a></li>
                </ul>
              </div>
      
              <!-- 주요사건 -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 text-lg">주요사건</h3>
                <ul class="space-y-2">
                  <li><a href="${basePath}/cases/index.html"                      class="text-gray-600 hover:text-blue-600 transition block py-1">전체 사건</a></li>
                  <li><a href="${basePath}/cases/index.html?category=민사"        class="text-gray-600 hover:text-blue-600 transition block py-1">민사소송</a></li>
                  <li><a href="${basePath}/cases/index.html?category=형사"        class="text-gray-600 hover:text-blue-600 transition block py-1">형사소송</a></li>
                  <li><a href="${basePath}/cases/index.html?category=가사"        class="text-gray-600 hover:text-blue-600 transition block py-1">가사소송</a></li>
                  <li><a href="${basePath}/cases/index.html?category=부동산"      class="text-gray-600 hover:text-blue-600 transition block py-1">부동산소송</a></li>
                </ul>
              </div>
      
              <!-- 전국사무소 & 구성원 -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 text-lg">전국사무소</h3>
                <ul class="space-y-2">
                  <li><a href="${basePath}/location/index.html" class="text-gray-600 hover:text-blue-600 transition block py-1">전국사무소</a></li>
                </ul>
                <h3 class="font-bold text-gray-900 mb-4 text-lg mt-6">구성원</h3>
                <ul class="space-y-2">
                  <li><a href="${basePath}/lawyers/index.html" class="text-gray-600 hover:text-blue-600 transition block py-1">구성원 소개</a></li>
                </ul>
              </div>
            </div>
      
          </div>
        </div>
      
        <!-- mobile overlay -->
        <div id="mobile-menu" class="md:hidden fixed inset-0 bg-white backdrop-blur-lg translate-x-full transition-transform duration-300 z-40">
          <div class="flex flex-col h-full max-h-screen">
            <!-- header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
              <a href="${basePath}/index.html" onclick="Navigation.closeMobileMenu()">
                <img src="${basePath}/assets/logo/Yalebupjo_logo_basic(temp).png" alt="예일법조" class="h-8">
              </a>
              <button onclick="Navigation.closeMobileMenu()" class="text-gray-800 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
      
            <!-- content -->
            <div class="flex-1 flex flex-col p-4 min-h-0">
              <nav class="flex-1 space-y-2 overflow-y-auto min-h-0">
      
                <!-- 로펌소개 (임시 주석) -->
                <!-- <div class="border-b border-white/10 pb-2">
                  <button class="w-full flex items-center justify-between text-lg font-bold text-white py-2"
                          onclick="Navigation.toggleMobileAccordion('about')">
                    <span>로펌소개</span>
                    <svg class="w-4 h-4 mobile-accordion-arrow" id="about-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  <div class="mobile-accordion-content" id="about-content">
                    <div class="pl-3 space-y-1 mt-1">
                      <a href="${basePath}/about/index.html"        class="block text-gray-300 hover:text-white transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">법인소개</a>
                      <a href="${basePath}/lawyers/index.html"      class="block text-gray-300 hover:text-white transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">구성원소개</a>
                    </div>
                  </div>
                </div> -->
      
                <!-- 전문분야 -->
                <div class="border-b border-gray-200 pb-2">
                  <button class="w-full flex items-center justify-between text-lg font-medium text-gray-900 py-2"
                          onclick="Navigation.toggleMobileAccordion('expertise')">
                    <span>전문분야</span>
                    <svg class="w-4 h-4 mobile-accordion-arrow" id="expertise-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  <div class="mobile-accordion-content" id="expertise-content">
                    <div class="pl-3 space-y-1 mt-1">
                      <a href="${basePath}/criminal/index.html"   class="block text-gray-600 hover:text-gray-900 transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">형사</a>
                      <a href="${basePath}/civil/index.html"      class="block text-gray-600 hover:text-gray-900 transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">민사</a>
                      <a href="${basePath}/realestate/index.html" class="block text-gray-600 hover:text-gray-900 transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">부동산</a>
                      <a href="${basePath}/traffic/index.html"    class="block text-gray-600 hover:text-gray-900 transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">교통사고</a>
                      <a href="${basePath}/corporate/index.html"  class="block text-gray-600 hover:text-gray-900 transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">기업</a>
                      <a href="${basePath}/family/index.html"     class="block text-gray-600 hover:text-gray-900 transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">가사</a>
                      <a href="${basePath}/notary/index.html"     class="block text-gray-600 hover:text-gray-900 transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">공증센터</a>
                    </div>
                  </div>
                </div>
      
                <!-- 전국사무소 -->
                <div class="border-b border-gray-200 pb-2">
                  <button class="w-full flex items-center justify-between text-lg font-medium text-gray-900 py-2"
                          onclick="Navigation.toggleMobileAccordion('location')">
                    <span>전국사무소</span>
                    <svg class="w-4 h-4 mobile-accordion-arrow" id="location-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  <div class="mobile-accordion-content" id="location-content">
                    <div class="pl-3 space-y-1 mt-1">
                      <a href="${basePath}/location/index.html" class="block text-gray-600 hover:text-gray-900 transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">전국사무소</a>
                    </div>
                  </div>
                </div>
      
                <!-- 주요사건 -->
                <div class="border-b border-gray-200 pb-2">
                  <button class="w-full flex items-center justify-between text-lg font-medium text-gray-900 py-2"
                          onclick="Navigation.toggleMobileAccordion('cases')">
                    <span>주요사건</span>
                    <svg class="w-4 h-4 mobile-accordion-arrow" id="cases-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  <div class="mobile-accordion-content" id="cases-content">
                    <div class="pl-3 space-y-1 mt-1">
                      <a href="${basePath}/cases/index.html"                    class="block text-gray-600 hover:text-gray-900 transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">전체 사건</a>
                      <a href="${basePath}/cases/index.html?category=민사"      class="block text-gray-600 hover:text-gray-900 transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">민사소송</a>
                      <a href="${basePath}/cases/index.html?category=형사"      class="block text-gray-600 hover:text-gray-900 transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">형사소송</a>
                      <a href="${basePath}/cases/index.html?category=가사"      class="block text-gray-600 hover:text-gray-900 transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">가사소송</a>
                      <a href="${basePath}/cases/index.html?category=부동산"    class="block text-gray-600 hover:text-gray-900 transition-colors py-1.5" onclick="Navigation.closeMobileMenu()">부동산소송</a>
                    </div>
                  </div>
                </div>
      
                <!-- 구성원소개 단일 메뉴 -->
                <a href="${basePath}/lawyers/index.html" class="block text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors py-2 border-b border-gray-200" onclick="Navigation.closeMobileMenu()">구성원소개</a>
                
              </nav>
      
              <!-- footer -->
              <div class="mt-6 pt-6 border-t border-gray-200 space-y-6 flex-shrink-0">
                <a href="tel:02-587-7787" class="block bg-[#0f172a] text-white rounded-2xl p-6 hover:bg-[#1e293b] transition-colors">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-2xl font-bold">02-587-7787</div>
                    </div>
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <!-- floating buttons -->
      <div id="floating-buttons" class="floating-buttons">
        <div class="container mx-auto px-4">
          <div class="floating-content">
            <!-- CTA -->
            <a href="tel:02-587-7787" class="floating-cta">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>02-587-7787</span>
            </a>
          </div>
        </div>
      </div>
          `;
      
          /* attach */
          const existing = document.querySelector('nav#header');
          if (existing) existing.outerHTML = navHTML;
          else document.body.insertAdjacentHTML('afterbegin', navHTML);
        },
      
        /* ------------------------------------------------------------------
           EVENTS
        ------------------------------------------------------------------ */
        bindEvents() {
          /* scroll */
          window.addEventListener('scroll', this.handleScroll.bind(this));
      
          /* mega menu hover */
          const megaMenu   = () => document.getElementById('mega-menu');
          const headerDom  = () => document.getElementById('header');
          document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
              megaMenu()?.classList.add('active');
              headerDom()?.classList.add('mega-menu-open');
              this.updateLogoForMegaMenu(true);
            });
          });
          megaMenu()?.addEventListener('mouseenter', () => {
            megaMenu()?.classList.add('active');
            headerDom()?.classList.add('mega-menu-open');
            this.updateLogoForMegaMenu(true);
          });
          megaMenu()?.addEventListener('mouseleave', () => {
            megaMenu()?.classList.remove('active');
            headerDom()?.classList.remove('mega-menu-open');
            this.updateLogoForMegaMenu(false);
          });
          headerDom()?.addEventListener('mouseleave', () => {
            megaMenu()?.classList.remove('active');
            headerDom()?.classList.remove('mega-menu-open');
            this.updateLogoForMegaMenu(false);
          });
      
          /* mobile menu */
          document.getElementById('mobile-menu-btn')?.addEventListener('click', this.toggleMobileMenu.bind(this));
      
          const mobileMenu = document.getElementById('mobile-menu');
          mobileMenu?.addEventListener('click', e => {
            if (e.target === mobileMenu) this.closeMobileMenu();
          });
      
          /* ESC close */
          document.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.closeMobileMenu();
          });
        },
      
        /* ------------------------------------------------------------------
           HANDLERS
        ------------------------------------------------------------------ */
        handleScroll() {
          const header    = document.getElementById('header');
          const logoWhite = document.getElementById('logo-white');
          const logoBlack = document.getElementById('logo-black');
          const navLinks  = document.querySelectorAll('.nav-link');
          const mobileBtn = document.getElementById('mobile-menu-btn');
          const isMain    = this.isMainPage();
      
          const scrollThreshold = window.innerWidth >= 768 ? 1 : 50;
          if (isMain && window.scrollY > scrollThreshold) {
            header?.classList.replace('header-transparent', 'header-scrolled');
            logoWhite?.classList.add('hidden');
            logoBlack?.classList.remove('hidden');
            navLinks.forEach(l => {
              l.classList.replace('text-white', 'text-black');
              l.classList.replace('hover:text-gray-300', 'hover:text-gray-600');
            });
            mobileBtn?.classList.replace('text-white', 'text-black');
            mobileBtn?.classList.replace('hover:bg-white/10', 'hover:bg-gray-100');
          } else if (isMain) {
            header?.classList.replace('header-scrolled', 'header-transparent');
            logoWhite?.classList.remove('hidden');
            logoBlack?.classList.add('hidden');
            navLinks.forEach(l => {
              l.classList.replace('text-black', 'text-white');
              l.classList.replace('hover:text-gray-600', 'hover:text-gray-300');
            });
            mobileBtn?.classList.replace('text-black', 'text-white');
            mobileBtn?.classList.replace('hover:bg-gray-100', 'hover:bg-white/10');
          }
      
          /* floating buttons */
          const float = document.getElementById('floating-buttons');
          const floatingThreshold = 1;
          if (float) window.scrollY > floatingThreshold ? float.classList.add('show') : float.classList.remove('show');
        },
      
        toggleMobileMenu() {
          const menu   = document.getElementById('mobile-menu');
          const burger = document.getElementById('hamburger-icon');
          const close  = document.getElementById('close-icon');
          if (!menu || !burger || !close) return;
          const open = !menu.classList.contains('translate-x-full');
      
          if (open) {
            menu.classList.add('translate-x-full');
            burger.classList.remove('hidden');
            close.classList.add('hidden');
            document.body.style.overflow = '';
          } else {
            menu.classList.remove('translate-x-full');
            burger.classList.add('hidden');
            close.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
          }
        },
      
        closeMobileMenu() {
          const menu   = document.getElementById('mobile-menu');
          const burger = document.getElementById('hamburger-icon');
          const close  = document.getElementById('close-icon');
          if (!menu) return;
          menu.classList.add('translate-x-full');
          burger?.classList.remove('hidden');
          close?.classList.add('hidden');
          document.body.style.overflow = '';
        },
      
        toggleMobileAccordion(section) {
          const content = document.getElementById(`${section}-content`);
          const arrow   = document.getElementById(`${section}-arrow`);
          if (!content || !arrow) return;
      
          const open = content.classList.contains('show');
          document.querySelectorAll('.mobile-accordion-content.show').forEach(c => c.classList.remove('show'));
          document.querySelectorAll('.mobile-accordion-arrow.rotate-180').forEach(a => a.classList.remove('rotate-180'));
      
          if (!open) {
            content.classList.add('show');
            arrow.classList.add('rotate-180');
          }
        },
      
        updateLogoForMegaMenu(isOpen) {
          if (!this.isMainPage()) return;
          const white = document.getElementById('logo-white');
          const black = document.getElementById('logo-black');
          if (isOpen) {
            white?.classList.add('hidden');
            black?.classList.remove('hidden');
          } else {
            const megaMenuScrollThreshold = 1;
            if (window.scrollY > megaMenuScrollThreshold) {
              white?.classList.add('hidden');
              black?.classList.remove('hidden');
            } else {
              white?.classList.remove('hidden');
              black?.classList.add('hidden');
            }
          }
        }
      };
      
      /* ------------------------------------------------------------------
         BOOTSTRAP
      ------------------------------------------------------------------ */
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Navigation.init());
      } else {
        Navigation.init();
      }
      
      /* legacy global exposure */
      window.closeMobileMenu       = () => Navigation.closeMobileMenu();
      window.toggleMobileAccordion = s  => Navigation.toggleMobileAccordion(s);
      