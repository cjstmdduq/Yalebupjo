// Footer Module
const Footer = {
    init() {
        this.render();
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

    render() {
        const basePath = this.getBasePath();
        const footerHTML = `
    <footer class="bg-black text-white pt-12 pb-24">
        <div class="container mx-auto px-4">
            <!-- 메뉴 섹션 -->
            <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                <!-- 로고 -->
                <div>
                    <img src="${basePath}/assets/logo/Yalebupjo_logo_white(temp).png" alt="예일법조" class="h-8 mb-6">
                    <p class="text-sm text-gray-400">
                        믿을 수 있는 법률 파트너<br>
                        예일법조가 함께합니다
                    </p>
                </div>

                <!-- 전문분야 -->
                <div>
                    <h4 class="text-white font-bold mb-4">전문분야</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="${basePath}/criminal/index.html" class="text-gray-400 hover:text-white transition">형사</a>
                        </li>
                        <li><a href="${basePath}/civil/index.html" class="text-gray-400 hover:text-white transition">민사</a></li>
                        <li><a href="${basePath}/traffic/index.html" class="text-gray-400 hover:text-white transition">교통사고</a>
                        </li>
                        <li><a href="${basePath}/realestate/index.html" class="text-gray-400 hover:text-white transition">부동산</a>
                        </li>
                        <li><a href="${basePath}/corporate/index.html" class="text-gray-400 hover:text-white transition">기업법무</a>
                        </li>
                        <li><a href="${basePath}/family/index.html" class="text-gray-400 hover:text-white transition">가사</a>
                        </li>
                    </ul>
                </div>

                <!-- 주요사건 -->
                <div>
                    <h4 class="text-white font-bold mb-4">주요사건</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="${basePath}/cases/index.html?category=형사" class="text-gray-400 hover:text-white transition">형사사건</a></li>
                        <li><a href="${basePath}/cases/index.html?category=민사" class="text-gray-400 hover:text-white transition">민사소송</a></li>
                        <li><a href="${basePath}/cases/index.html?category=교통사고" class="text-gray-400 hover:text-white transition">교통사고</a></li>
                        <li><a href="${basePath}/cases/index.html?category=부동산" class="text-gray-400 hover:text-white transition">부동산분쟁</a></li>
                        <li><a href="${basePath}/cases/index.html?category=기업" class="text-gray-400 hover:text-white transition">기업법무</a></li>
                        <li><a href="${basePath}/cases/index.html?category=가사" class="text-gray-400 hover:text-white transition">가사사건</a></li>
                    </ul>
                </div>

                <!-- 전국지사 -->
                <div>
                    <h4 class="text-white font-bold mb-4">전국지사</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="${basePath}/location/index.html?office=seoul" class="text-gray-400 hover:text-white transition">서울본사</a></li>
                        <li><a href="${basePath}/location/index.html?office=gangnam" class="text-gray-400 hover:text-white transition">서울강남</a></li>
                        <li><a href="${basePath}/location/index.html?office=ulsan" class="text-gray-400 hover:text-white transition">울산</a></li>
                        <li><a href="${basePath}/location/index.html?office=daegu" class="text-gray-400 hover:text-white transition">대구</a></li>
                        <li><a href="${basePath}/location/index.html?office=cheongju" class="text-gray-400 hover:text-white transition">청주</a></li>
                        <li><a href="${basePath}/location/index.html?office=daejeon" class="text-gray-400 hover:text-white transition">대전</a></li>
                        <li><a href="${basePath}/location/index.html?office=gwangju" class="text-gray-400 hover:text-white transition">광주</a></li>
                    </ul>
                </div>
            </div>

            <!-- 구분선 -->
            <hr class="border-gray-800 mb-6">

            <!-- 회사 정보 -->
            <div class="flex flex-col space-y-4">
                <div class="flex flex-col md:flex-row md:flex-wrap md:items-center gap-y-1 md:gap-x-4 text-sm">
                    <span class="text-gray-400">법무법인(유한) 예일법조</span>
                    <div class="hidden md:block w-px h-3 bg-gray-700"></div>
                    <span class="text-gray-400">사업자등록번호 : 826-81-02302</span>
                    <div class="hidden md:block w-px h-3 bg-gray-700"></div>
                    <span class="text-gray-400">대표변호사 : 하영주,김진환,엄운용</span>
                    <div class="hidden md:block w-px h-3 bg-gray-700"></div>
                    <span class="text-gray-400">광고책임변호사 : 하영주</span>
                </div>

                <div class="flex flex-col md:flex-row md:flex-wrap md:items-center gap-y-1 md:gap-x-4 text-sm">
                    <span class="text-gray-400">서울특별시 서초구 반포대로 98 일신빌딩 4층</span>
                    <div class="hidden md:block w-px h-3 bg-gray-700"></div>
                    <span class="text-gray-400">대표전화 : 02-587-7787</span>
                    <div class="hidden md:block w-px h-3 bg-gray-700"></div>
                    <span class="text-gray-400">팩스 : 02-587-7788</span>
                </div>

                <div class="flex flex-wrap items-center gap-4 mt-4">
                    <a href="#" class="text-gray-500 hover:text-gray-300 text-xs transition">이용약관</a>
                    <a href="#" class="text-gray-500 hover:text-gray-300 text-xs transition">개인정보처리방침</a>
                    <a href="#" class="text-gray-500 hover:text-gray-300 text-xs transition">이메일무단수집거부</a>
                </div>

                <p class="text-gray-500 text-xs mt-4">
                    COPYRIGHT©2025 법무법인(유한) 예일법조. ALL RIGHTS RESERVED
                </p>
            </div>
        </div>
    </footer>`;

        // 기존 footer 태그를 찾아서 교체
        const existingFooter = document.querySelector('footer');
        if (existingFooter) {
            existingFooter.outerHTML = footerHTML;
        } else {
            // footer가 없는 경우 body 하단에 추가
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        }
    }
};

// DOM이 로드되면 자동으로 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Footer.init());
} else {
    Footer.init();
}