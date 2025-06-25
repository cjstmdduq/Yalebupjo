// Footer Module
const Footer = {
    init() {
        this.render();
    },

    render() {
        const footerHTML = `
    <footer class="bg-black text-white pt-12 pb-24">
        <div class="container mx-auto px-4">
            <!-- 메뉴 섹션 -->
            <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                <!-- 로고 -->
                <div>
                    <img src="/assets/logo/Yalebupjo_logo_white(temp).png" alt="예일법조" class="h-8 mb-6">
                    <p class="text-sm text-gray-400">
                        믿을 수 있는 법률 파트너<br>
                        예일법조가 함께합니다
                    </p>
                </div>

                <!-- 전문분야 -->
                <div>
                    <h4 class="text-white font-bold mb-4">전문분야</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/criminal/index.html" class="text-gray-400 hover:text-white transition">형사</a>
                        </li>
                        <li><a href="/civil/index.html" class="text-gray-400 hover:text-white transition">민사</a></li>
                        <li><a href="/traffic/index.html" class="text-gray-400 hover:text-white transition">교통사고</a>
                        </li>
                        <li><a href="/realestate/index.html" class="text-gray-400 hover:text-white transition">부동산</a>
                        </li>
                        <li><a href="/corporate/index.html" class="text-gray-400 hover:text-white transition">기업법무</a>
                        </li>
                        <li><a href="/family/index.html" class="text-gray-400 hover:text-white transition">가사</a>
                        </li>
                    </ul>
                </div>

                <!-- 예일법조 서비스 -->
                <div>
                    <h4 class="text-white font-bold mb-4">예일법조 서비스</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#" class="text-gray-400 hover:text-white transition">변호사 매칭</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition">법률 자문</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition">온라인 상담</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition">24시간 대응</a></li>
                    </ul>
                </div>

                <!-- 전국지사 -->
                <div>
                    <h4 class="text-white font-bold mb-4">전국지사</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#" class="text-gray-400 hover:text-white transition">서울본사</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition">서울강남</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition">울산</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition">대구</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition">청주</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition">대전</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition">광주</a></li>
                    </ul>
                </div>

                <!-- 고객센터 -->
                <div>
                    <h4 class="text-white font-bold mb-4">고객센터</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#" class="text-gray-400 hover:text-white transition">공지사항</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition">자주묻는질문</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition">1:1 문의</a></li>
                        <li class="pt-2">
                            <p class="text-white font-bold text-lg">02-587-7787</p>
                            <p class="text-gray-500 text-xs">평일 09:00 - 18:00</p>
                        </li>
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
                    <span class="text-gray-400">사업자등록번호 : 000-00-00000</span>
                    <div class="hidden md:block w-px h-3 bg-gray-700"></div>
                    <span class="text-gray-400">대표변호사 : 김예일</span>
                    <div class="hidden md:block w-px h-3 bg-gray-700"></div>
                    <span class="text-gray-400">광고책임변호사 : 박법조</span>
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