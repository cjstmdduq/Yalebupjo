// Navigation Module
const Navigation = {
    init() {
        this.addStyles();
        this.render();
        this.bindEvents();
    },

    getBasePath() {
        // GitHub Pages 환경인지 확인
        const isGitHubPages = window.location.hostname.includes('github.io');
        const pathSegments = window.location.pathname.split('/').filter(Boolean);
        
        if (isGitHubPages && pathSegments.length > 0 && pathSegments[0] === 'Yalebupjo') {
            return '/Yalebupjo';
        }
        return '';
    },

    addStyles() {
        // 모바일 아코디언 스타일 추가
        const style = document.createElement('style');
        style.textContent = `
            .mobile-accordion-content {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease-out;
            }
            
            .mobile-accordion-content.show {
                max-height: 500px;
                transition: max-height 0.3s ease-in;
            }
            
            .mobile-accordion-arrow {
                transition: transform 0.3s ease;
            }
            
            .mobile-accordion-arrow.rotate-180 {
                transform: rotate(180deg);
            }
            
            /* 플로팅 버튼 영역 스타일 */
            .floating-buttons {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
                box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.1);
                transform: translateY(100%);
                transition: transform 0.3s ease-in-out;
                z-index: 1000;
                padding: 0;
            }

            .floating-buttons.show {
                transform: translateY(0);
            }

            .floating-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
                padding: 15px 0;
            }

            /* 좌측 정보 영역 */
            .floating-info {
                display: flex;
                gap: 30px;
                align-items: center;
            }

            .floating-item {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .floating-icon {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .floating-text {
                display: flex;
                flex-direction: column;
                color: white;
            }

            .floating-label {
                font-size: 12px;
                opacity: 0.8;
            }

            .floating-value {
                font-size: 14px;
                font-weight: 600;
            }

            /* CTA 버튼 */
            .floating-cta {
                display: flex;
                align-items: center;
                gap: 10px;
                background: white;
                color: #1e3a8a;
                padding: 12px 24px;
                border-radius: 50px;
                font-weight: 700;
                font-size: 18px;
                transition: all 0.3s ease;
                text-decoration: none;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }

            .floating-cta:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            }

            /* 모바일 반응형 */
            @media (max-width: 1024px) {
                .floating-content {
                    padding: 12px 0;
                }

                .floating-info {
                    gap: 20px;
                }

                .floating-item:nth-child(2),
                .floating-item:nth-child(3) {
                    display: none;
                }

                .floating-cta {
                    padding: 10px 20px;
                    font-size: 16px;
                }
            }

            @media (max-width: 640px) {
                .floating-content {
                    justify-content: center;
                }

                .floating-info {
                    display: none;
                }

                .floating-cta {
                    padding: 12px 24px;
                }
            }
        `;
        document.head.appendChild(style);
    },

    render() {
        const basePath = this.getBasePath();
        
        // 페이지 유형 확인
        const isMainPage = window.location.pathname === '/' || 
                          window.location.pathname.endsWith('/index.html') ||
                          window.location.pathname.endsWith('/Yalebupjo/') ||
                          window.location.pathname.endsWith('/Yalebupjo/index.html');
        
        // 페이지에 따른 초기 스타일 설정
        const headerClass = isMainPage ? 'header-transparent' : 'header-scrolled';
        const textColor = isMainPage ? 'text-white' : 'text-black';
        const textHover = isMainPage ? 'hover:text-gray-300' : 'hover:text-gray-600';
        const logoWhiteDisplay = isMainPage ? '' : 'hidden';
        const logoBlackDisplay = isMainPage ? 'hidden' : '';
        const mobileMenuBtnBg = isMainPage ? 'hover:bg-white/10' : 'hover:bg-gray-100';
        
        const navHTML = `
    <nav id="header" class="fixed top-0 w-full ${headerClass} z-50 transition-all duration-300">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center relative">
            <!-- 로고 -->
            <div class="flex items-center z-10">
                <a href="${basePath}/index.html">
                    <img id="logo-white" src="${basePath}/assets/logo/Yalebupjo_logo_white(temp).png" alt="예일법조 흰색 로고"
                        class="h-8 md:h-10 ${logoWhiteDisplay}">
                    <img id="logo-black" src="${basePath}/assets/logo/Yalebupjo_logo_basic(temp).png" alt="예일법조 검은색 로고"
                        class="h-8 md:h-10 ${logoBlackDisplay}">
                </a>
            </div>

            <!-- 데스크톱 메뉴 -->
            <div class="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-x-8">
                <a href="#" class="${textColor} ${textHover} transition nav-link">로펌소개</a>
                <a href="#" class="${textColor} ${textHover} transition nav-link">전문분야</a>
                <a href="${basePath}/cases/index.html" class="${textColor} ${textHover} transition nav-link">주요사건</a>
                <a href="#" class="${textColor} ${textHover} transition nav-link">전국사무소</a>
            </div>

            <!-- 우측 컨트롤 -->
            <div class="flex items-center z-10">
                <!-- 데스크톱 전화번호 -->
                <a href="tel:02-587-7787" class="hidden md:block ${textColor} ${textHover} transition-colors">
                    <div class="text-right">
                        <div class="text-sm opacity-80 font-medium">상담문의</div>
                        <div class="text-xl font-bold">02-587-7787</div>
                    </div>
                </a>

                <!-- 모바일 전화번호 버튼 -->
                <a href="tel:02-587-7787" class="md:hidden mr-4 ${textColor} ${textHover} transition">
                    <div class="text-right">
                        <div class="text-xs opacity-80">상담문의</div>
                        <div class="text-lg font-bold">02-587-7787</div>
                    </div>
                </a>

                <!-- 모바일 햄버거 메뉴 버튼 -->
                <button id="mobile-menu-btn"
                    class="md:hidden ${textColor} ml-2 p-2 ${mobileMenuBtnBg} rounded-lg transition-colors">
                    <svg id="hamburger-icon" class="w-6 h-6 transition-transform duration-300" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    <svg id="close-icon" class="w-6 h-6 hidden transition-transform duration-300" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- 통합 메가메뉴 -->
        <div id="mega-menu" class="mega-menu">
            <div class="container mx-auto px-4 py-8">
                <div class="grid grid-cols-4 gap-8">
                    <!-- 로펌소개 -->
                    <div>
                        <h3 class="font-bold text-gray-900 mb-4 text-lg">로펌소개</h3>
                        <ul class="space-y-2">
                            <li><a href="${basePath}/about/index.html"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">법인소개</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-blue-600 transition block py-1">대표변호사
                                    인사말</a></li>
                            <li><a href="${basePath}/lawyers/index.html"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">구성원 소개</a></li>
                        </ul>
                    </div>

                    <!-- 전문분야 -->
                    <div>
                        <h3 class="font-bold text-gray-900 mb-4 text-lg">전문분야</h3>
                        <ul class="space-y-2">
                            <li><a href="${basePath}/criminal/index.html"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">형사</a></li>
                            <li><a href="${basePath}/civil/index.html"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">민사</a></li>
                            <li><a href="${basePath}/realestate/index.html"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">부동산</a></li>
                            <li><a href="${basePath}/traffic/index.html"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">교통사고</a></li>
                            <li><a href="${basePath}/corporate/index.html"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">기업</a></li>
                            <li><a href="${basePath}/family/index.html"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">가사</a></li>
                        </ul>
                    </div>

                    <!-- 주요사건 -->
                    <div>
                        <h3 class="font-bold text-gray-900 mb-4 text-lg">주요사건</h3>
                        <ul class="space-y-2">
                            <li><a href="${basePath}/cases/index.html"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">전체 사건</a></li>
                            <li><a href="${basePath}/cases/index.html?category=민사"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">민사소송</a></li>
                            <li><a href="${basePath}/cases/index.html?category=형사"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">형사소송</a></li>
                            <li><a href="${basePath}/cases/index.html?category=가사"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">가사소송</a></li>
                            <li><a href="${basePath}/cases/index.html?category=부동산"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">부동산소송</a></li>
                        </ul>
                    </div>

                    <!-- 전국사무소 -->
                    <div>
                        <h3 class="font-bold text-gray-900 mb-4 text-lg">전국사무소</h3>
                        <ul class="space-y-2">
                            <li><a href="${basePath}/location/seoul.html"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">서울본사</a></li>
                            <li><a href="${basePath}/location/gangnam.html"
                                    class="text-gray-600 hover:text-blue-600 transition block py-1">서울강남</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-blue-600 transition block py-1">울산</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-blue-600 transition block py-1">대구</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-blue-600 transition block py-1">청주</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-blue-600 transition block py-1">대전</a></li>
                            <li><a href="#" class="text-gray-600 hover:text-blue-600 transition block py-1">광주</a></li>
                        </ul>
                    </div>
                </div>

                <!-- 하단 상담 안내 -->
                <div class="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p class="text-gray-600">빠른 상담이 필요하신가요? <span class="font-bold text-gray-900">02-587-7787</span> 로
                        연락주세요. <span class="text-sm text-gray-500">(평일 09:00-18:00)</span></p>
                </div>
            </div>
        </div>

        <!-- 모바일 메뉴 오버레이 -->
        <div id="mobile-menu"
            class="md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg transform translate-x-full transition-transform duration-300 ease-in-out z-40">
            <div class="flex flex-col h-full max-h-screen">
                <!-- 메뉴 헤더 -->
                <div class="flex items-center justify-between p-6 border-b border-white/10">
                    <img src="${basePath}/assets/logo/Yalebupjo_logo_white(temp).png" alt="예일법조" class="h-8">

                    <!-- 닫기 버튼 -->
                    <button onclick="Navigation.closeMobileMenu()"
                        class="text-white hover:text-gray-300 p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- 메뉴 내용 -->
                <div class="flex-1 flex flex-col p-6 min-h-0">
                    <!-- 메뉴 리스트 -->
                    <nav class="flex-1 space-y-4 overflow-y-auto min-h-0">
                        <!-- 로펌소개 아코디언 -->
                        <div class="border-b border-white/10 pb-4">
                            <button class="w-full flex items-center justify-between text-xl font-bold text-white py-3"
                                onclick="Navigation.toggleMobileAccordion('about')">
                                <span>로펌소개</span>
                                <svg class="w-5 h-5 mobile-accordion-arrow" id="about-arrow" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div class="mobile-accordion-content" id="about-content">
                                <div class="pl-4 space-y-2 mt-2">
                                    <a href="${basePath}/about/index.html"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">법인소개</a>
                                    <a href="#" class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">대표변호사 인사말</a>
                                    <a href="${basePath}/lawyers/index.html"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">구성원소개</a>
                                </div>
                            </div>
                        </div>

                        <!-- 전문분야 아코디언 -->
                        <div class="border-b border-white/10 pb-4">
                            <button class="w-full flex items-center justify-between text-xl font-bold text-white py-3"
                                onclick="Navigation.toggleMobileAccordion('expertise')">
                                <span>전문분야</span>
                                <svg class="w-5 h-5 mobile-accordion-arrow" id="expertise-arrow" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div class="mobile-accordion-content" id="expertise-content">
                                <div class="pl-4 space-y-2 mt-2">
                                    <a href="${basePath}/criminal/index.html"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">형사</a>
                                    <a href="${basePath}/civil/index.html"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">민사</a>
                                    <a href="${basePath}/realestate/index.html"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">부동산</a>
                                    <a href="${basePath}/traffic/index.html"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">교통사고</a>
                                    <a href="${basePath}/corporate/index.html"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">기업</a>
                                    <a href="${basePath}/family/index.html"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">가사</a>
                                </div>
                            </div>
                        </div>

                        <!-- 오시는길 아코디언 -->
                        <div class="border-b border-white/10 pb-4">
                            <button class="w-full flex items-center justify-between text-xl font-bold text-white py-3"
                                onclick="Navigation.toggleMobileAccordion('location')">
                                <span>오시는길</span>
                                <svg class="w-5 h-5 mobile-accordion-arrow" id="location-arrow" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div class="mobile-accordion-content" id="location-content">
                                <div class="pl-4 space-y-2 mt-2">
                                    <a href="${basePath}/location/seoul.html"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">서울본사</a>
                                    <a href="${basePath}/location/gangnam.html"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">서울강남</a>
                                    <a href="#offices"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">울산</a>
                                    <a href="#offices"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">대구</a>
                                    <a href="#offices"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">청주</a>
                                    <a href="#offices"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">대전</a>
                                    <a href="#offices"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">광주</a>
                                </div>
                            </div>
                        </div>

                        <!-- 주요사건 아코디언 -->
                        <div class="border-b border-white/10 pb-4">
                            <button class="w-full flex items-center justify-between text-xl font-bold text-white py-3"
                                onclick="Navigation.toggleMobileAccordion('cases')">
                                <span>주요사건</span>
                                <svg class="w-5 h-5 mobile-accordion-arrow" id="cases-arrow" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div class="mobile-accordion-content" id="cases-content">
                                <div class="pl-4 space-y-2 mt-2">
                                    <a href="${basePath}/cases/index.html"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">전체 사건</a>
                                    <a href="${basePath}/cases/index.html?category=민사"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">민사소송</a>
                                    <a href="${basePath}/cases/index.html?category=형사"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">형사소송</a>
                                    <a href="${basePath}/cases/index.html?category=가사"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">가사소송</a>
                                    <a href="${basePath}/cases/index.html?category=부동산"
                                        class="block text-gray-300 hover:text-white transition-colors py-2"
                                        onclick="Navigation.closeMobileMenu()">부동산소송</a>
                                </div>
                            </div>
                        </div>

                        <!-- 단일 메뉴들 -->
                        <a href="#"
                            class="block text-xl font-medium text-white hover:text-gray-300 transition-colors py-3 border-b border-white/10"
                            onclick="Navigation.closeMobileMenu()">
                            상담예약
                        </a>
                    </nav>

                    <!-- 하단 연락처 정보 -->
                    <div class="mt-6 pt-6 border-t border-white/10 space-y-6 flex-shrink-0">
                        <!-- 대표 전화번호 -->
                        <a href="tel:02-587-7787"
                            class="block bg-white text-black rounded-2xl p-6 hover:bg-gray-100 transition-colors">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-sm text-gray-600 mb-1">대표 상담 전화</div>
                                    <div class="text-2xl font-bold">02-587-7787</div>
                                </div>
                                <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                    </path>
                                </svg>
                            </div>
                        </a>

                        <!-- 운영시간 -->
                        <div class="text-center text-white/70">
                            <div class="text-sm">평일 09:00 - 18:00</div>
                            <div class="text-xs mt-1">24시간 상담 접수 가능</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    
    <!-- 플로팅 버튼 영역 -->
    <div id="floating-buttons" class="floating-buttons">
        <div class="container mx-auto px-4">
            <div class="floating-content">
                <!-- 좌측 정보 영역 -->
                <div class="floating-info">
                    <!-- 상담시간 -->
                    <div class="floating-item">
                        <div class="floating-icon">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div class="floating-text">
                            <span class="floating-label">상담시간</span>
                            <span class="floating-value">평일 09:00-18:00</span>
                        </div>
                    </div>
                    <!-- 빠른상담 -->
                    <div class="floating-item">
                        <div class="floating-icon">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <div class="floating-text">
                            <span class="floating-label">빠른상담</span>
                            <span class="floating-value">30분 내 연락</span>
                        </div>
                    </div>
                    <!-- 24시간 접수 -->
                    <div class="floating-item">
                        <div class="floating-icon">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div class="floating-text">
                            <span class="floating-label">온라인</span>
                            <span class="floating-value">24시간 접수</span>
                        </div>
                    </div>
                </div>
                <!-- 우측 CTA 버튼 -->
                <a href="tel:02-587-7787" class="floating-cta">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                        </path>
                    </svg>
                    <span>02-587-7787</span>
                </a>
            </div>
        </div>
    </div>`;

        // 기존 nav 태그를 찾아서 교체
        const existingNav = document.querySelector('nav#header');
        if (existingNav) {
            existingNav.outerHTML = navHTML;
        } else {
            // nav가 없는 경우 body 최상단에 추가
            document.body.insertAdjacentHTML('afterbegin', navHTML);
        }

        // 서브페이지라면 강제로 스타일 한 번 더 적용
        if (!isMainPage) {
            const header = document.getElementById('header');
            const logoWhite = document.getElementById('logo-white');
            const logoBlack = document.getElementById('logo-black');
            const navLinks = document.querySelectorAll('.nav-link');
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            if (header) {
                header.classList.remove('header-transparent');
                header.classList.add('header-scrolled');
            }
            if (logoWhite) logoWhite.classList.add('hidden');
            if (logoBlack) logoBlack.classList.remove('hidden');
            navLinks.forEach(link => {
                link.classList.remove('text-white', 'hover:text-gray-300');
                link.classList.add('text-black', 'hover:text-gray-600');
            });
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('hover:bg-white/10');
                mobileMenuBtn.classList.add('hover:bg-gray-100');
            }
        }
    },

    bindEvents() {
        // DOM이 완전히 로드된 후 이벤트 바인딩
        setTimeout(() => {
            // 초기 스타일 설정
            this.handleScroll();
            
            // 스크롤 이벤트
            window.addEventListener('scroll', this.handleScroll.bind(this));

            // 메가메뉴 이벤트
            const navLinks = document.querySelectorAll('.nav-link');
            const megaMenu = document.getElementById('mega-menu');
            const header = document.getElementById('header');

            if (navLinks && megaMenu && header) {
                navLinks.forEach(link => {
                    link.addEventListener('mouseenter', () => {
                        megaMenu.classList.add('active');
                        header.classList.add('mega-menu-open');
                        this.updateLogoForMegaMenu(true);
                    });
                });

                megaMenu.addEventListener('mouseenter', () => {
                    megaMenu.classList.add('active');
                    header.classList.add('mega-menu-open');
                    this.updateLogoForMegaMenu(true);
                });

                megaMenu.addEventListener('mouseleave', () => {
                    megaMenu.classList.remove('active');
                    header.classList.remove('mega-menu-open');
                    this.updateLogoForMegaMenu(false);
                });

                header.addEventListener('mouseleave', () => {
                    megaMenu.classList.remove('active');
                    header.classList.remove('mega-menu-open');
                    this.updateLogoForMegaMenu(false);
                });
            }

            // 모바일 메뉴 이벤트
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener('click', this.toggleMobileMenu.bind(this));
            }

            // 모바일 메뉴 오버레이 클릭 시 닫기
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.addEventListener('click', (e) => {
                    if (e.target === mobileMenu) {
                        this.closeMobileMenu();
                    }
                });
            }

            // ESC 키로 모바일 메뉴 닫기
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
                        this.closeMobileMenu();
                    }
                }
            });
        }, 100);
    },

    handleScroll() {
        // 페이지 유형 확인
        const isMainPage = window.location.pathname === '/' || 
                          window.location.pathname.endsWith('/index.html') ||
                          window.location.pathname.endsWith('/Yalebupjo/') ||
                          window.location.pathname.endsWith('/Yalebupjo/index.html');
        const header = document.getElementById('header');
        const logoWhite = document.getElementById('logo-white');
        const logoBlack = document.getElementById('logo-black');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');

        // 서브페이지면 네비게이션 스타일 변경 로직을 아예 실행하지 않음
        if (!isMainPage) {
            // 플로팅 버튼만 제어
            const floatingButtons = document.getElementById('floating-buttons');
            if (floatingButtons) {
                const heroHeight = window.innerHeight;
                if (window.scrollY > heroHeight * 0.8) {
                    floatingButtons.classList.add('show');
                } else {
                    floatingButtons.classList.remove('show');
                }
            }
            return; // 네비게이션 스타일 로직 종료
        }

        // 이하 메인페이지에서만 네비게이션 스타일 변경
        if (isMainPage) {
            if (window.scrollY > 50) {
                header.classList.remove('header-transparent');
                header.classList.add('header-scrolled');
                if (logoWhite) logoWhite.classList.add('hidden');
                if (logoBlack) logoBlack.classList.remove('hidden');
                navLinks.forEach(link => {
                    link.classList.remove('text-white', 'hover:text-gray-300');
                    link.classList.add('text-black', 'hover:text-gray-600');
                });
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('hover:bg-white/10');
                    mobileMenuBtn.classList.add('hover:bg-gray-100');
                }
            } else {
                header.classList.remove('header-scrolled');
                header.classList.add('header-transparent');
                if (logoWhite) logoWhite.classList.remove('hidden');
                if (logoBlack) logoBlack.classList.add('hidden');
                navLinks.forEach(link => {
                    link.classList.remove('text-black', 'hover:text-gray-600');
                    link.classList.add('text-white', 'hover:text-gray-300');
                });
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('hover:bg-gray-100');
                    mobileMenuBtn.classList.add('hover:bg-white/10');
                }
            }
        }

        // 플로팅 버튼 제어 (메인페이지)
        const floatingButtons = document.getElementById('floating-buttons');
        if (floatingButtons) {
            const heroHeight = window.innerHeight;
            if (window.scrollY > heroHeight * 0.8) {
                floatingButtons.classList.add('show');
            } else {
                floatingButtons.classList.remove('show');
            }
        }
    },

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburgerIcon = document.getElementById('hamburger-icon');
        const closeIcon = document.getElementById('close-icon');
        
        if (mobileMenu && hamburgerIcon && closeIcon) {
            const isOpen = !mobileMenu.classList.contains('translate-x-full');
            
            if (isOpen) {
                // 메뉴 닫기
                mobileMenu.classList.add('translate-x-full');
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                document.body.style.overflow = '';
            } else {
                // 메뉴 열기
                mobileMenu.classList.remove('translate-x-full');
                hamburgerIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        }
    },

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburgerIcon = document.getElementById('hamburger-icon');
        const closeIcon = document.getElementById('close-icon');
        
        if (mobileMenu && hamburgerIcon && closeIcon) {
            mobileMenu.classList.add('translate-x-full');
            hamburgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            document.body.style.overflow = '';
        }
    },

    toggleMobileAccordion(section) {
        const content = document.getElementById(`${section}-content`);
        const arrow = document.getElementById(`${section}-arrow`);
        
        if (content && arrow) {
            if (content.classList.contains('show')) {
                content.classList.remove('show');
                arrow.classList.remove('rotate-180');
            } else {
                // 다른 열려있는 아코디언 닫기
                document.querySelectorAll('.mobile-accordion-content.show').forEach(item => {
                    item.classList.remove('show');
                });
                document.querySelectorAll('.mobile-accordion-arrow.rotate-180').forEach(item => {
                    item.classList.remove('rotate-180');
                });
                
                content.classList.add('show');
                arrow.classList.add('rotate-180');
            }
        }
    },

    updateLogoForMegaMenu(isOpen) {
        // 메가메뉴 열림/닫힘에 따른 처리는 메인 페이지에서만 필요
        const isMainPage = window.location.pathname === '/' || 
                          window.location.pathname.endsWith('/index.html') ||
                          window.location.pathname.endsWith('/Yalebupjo/') ||
                          window.location.pathname.endsWith('/Yalebupjo/index.html');
        
        if (!isMainPage) return;
        
        const logoWhite = document.getElementById('logo-white');
        const logoBlack = document.getElementById('logo-black');
        
        if (isOpen) {
            // 메가메뉴 열림: 검정 로고 표시
            if (logoWhite) logoWhite.classList.add('hidden');
            if (logoBlack) logoBlack.classList.remove('hidden');
        } else {
            // 메가메뉴 닫힘: 스크롤 위치에 따라 로고 결정
            if (window.scrollY > 50) {
                if (logoWhite) logoWhite.classList.add('hidden');
                if (logoBlack) logoBlack.classList.remove('hidden');
            } else {
                if (logoWhite) logoWhite.classList.remove('hidden');
                if (logoBlack) logoBlack.classList.add('hidden');
            }
        }
    }
};

// DOM이 로드되면 자동으로 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Navigation.init());
} else {
    Navigation.init();
}

// 전역 함수로도 노출 (기존 코드 호환성을 위해)
window.closeMobileMenu = () => Navigation.closeMobileMenu();
window.toggleMobileAccordion = (section) => Navigation.toggleMobileAccordion(section);