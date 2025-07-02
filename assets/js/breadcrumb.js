/* breadcrumb.js (rev. 2025-06-28)
   브레드크럼 네비게이션 모듈 */

   const Breadcrumb = {
    /* ------------------------------------------------------------------
       STATE & CONFIG
    ------------------------------------------------------------------ */
    _initialized: false,
  
    paths: {
      'about': { name: '로펌소개', parent: null },
      'lawyers': { name: '구성원 소개', parent: 'about' },
      'criminal': { name: '형사', parent: null },
      'civil': { name: '민사', parent: null },
      'realestate': { name: '부동산', parent: null },
      'traffic': { name: '교통사고', parent: null },
      'corporate': { name: '기업', parent: null },
      'family': { name: '가사', parent: null },
      'cases': { name: '주요사건', parent: null },
      'location': { name: '전국사무소', parent: null }
    },
  
    /* ------------------------------------------------------------------
       UTILS
    ------------------------------------------------------------------ */
    getBasePath() {
      const repoName = 'Yalebupjo';
      return location.hostname.endsWith('github.io') ? `/${repoName}` : '';
    },
  
    getCurrentPath() {
      const base = this.getBasePath();
      let path = location.pathname;
      
      // Remove base path if exists
      if (base && path.startsWith(base)) {
        path = path.substring(base.length);
      }
      
      // Remove leading/trailing slashes
      path = path.replace(/^\/|\/$/g, '');
      
      // Remove index.html
      path = path.replace('/index.html', '').replace('index.html', '');
      
      const segments = path.split('/').filter(Boolean);
      
      return segments[0] || '';
    },
  
    isMainPage() {
      const base = this.getBasePath();
      const path = location.pathname.replace(/\/+$/, '');
      return (
        path === '' ||
        path === `/${base}` ||
        path === `${base}` ||
        path === `${base}/index.html`
      );
    },
  
    /* ------------------------------------------------------------------
       CORE
    ------------------------------------------------------------------ */
    init() {
      if (this._initialized || this.isMainPage()) return;
      this._initialized = true;
  
      this.addStyles();
      this.render();
    },
  
    /* ------------------------------------------------------------------
       STYLES
    ------------------------------------------------------------------ */
    addStyles() {
      const style = document.createElement('style');
      style.textContent = `
.breadcrumb-container {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
  position: fixed;
  /* --- 수정: 데스크톱 네비게이션 높이 = 77px (기존보다 5px↓) --- */
  top: 77px;
  left: 0;
  right: 0;
  z-index: 40;
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  font-size: 14px;
}
.breadcrumb-item { color: #6b7280; transition: color .2s; text-decoration: none; }
.breadcrumb-item:hover { color: #1e40af; }
.breadcrumb-separator { color: #9ca3af; user-select: none; }
.breadcrumb-current { color: #111827; font-weight: 500; }

/* --- 수정: 스페이서 높이 = 네비게이션(77px) + 브레드크럼(40px) = 117px --- */
.breadcrumb-spacer {
  height: 117px;
}

@media(max-width: 767px) {
  .breadcrumb-container {
    /* --- 수정: 모바일 네비게이션 높이 = 72px (2px 위로 이동) --- */
    top: 72px;
  }
  .breadcrumb {
    font-size: 12px;
    /* 모바일 브레드크럼 자체 높이: padding(20px) + font(약 14px) = 약 34px */
    padding: 10px 0;
  }
  /* --- 수정: 스페이서 높이 = 네비게이션(72px) + 브레드크럼(34px) = 106px --- */
  .breadcrumb-spacer {
    height: 106px;
  }
}
      `;
      document.head.appendChild(style);
    },
  
    /* ------------------------------------------------------------------
       RENDER
    ------------------------------------------------------------------ */
    render() {
      const currentPath = this.getCurrentPath();
      if (!currentPath || !this.paths[currentPath]) {
        return;
      }
  
      const breadcrumbs = this.buildBreadcrumbs(currentPath);
      if (breadcrumbs.length === 0) return;
  
      const breadcrumbHTML = `
        <div class="breadcrumb-spacer"></div>
        <div class="breadcrumb-container">
          <div class="container mx-auto px-4">
            <nav class="breadcrumb" aria-label="breadcrumb">
              ${breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                const basePath = this.getBasePath();
                
                if (isLast) {
                  return `<span class="breadcrumb-current">${item.name}</span>`;
                } else {
                  const href = item.path === 'home' 
                    ? `${basePath || ''}/index.html` 
                    : `${basePath || ''}/${item.path}/index.html`;
                  return `
                    <a href="${href}" class="breadcrumb-item">${item.name}</a>
                    <span class="breadcrumb-separator">/</span>
                  `;
                }
              }).join('')}
            </nav>
          </div>
        </div>
      `;
  
      document.body.insertAdjacentHTML('afterbegin', breadcrumbHTML);
    },
  
    buildBreadcrumbs(currentPath) {
      const breadcrumbs = [{ name: '홈', path: 'home' }];
      
      const addPath = (path) => {
        const config = this.paths[path];
        if (!config) return;
        
        if (config.parent) {
          addPath(config.parent);
        }
        
        breadcrumbs.push({ name: config.name, path });
      };
      
      addPath(currentPath);
      
      return breadcrumbs;
    }
  };
  
  /* ------------------------------------------------------------------
     BOOTSTRAP
  ------------------------------------------------------------------ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Wait for navigation to be fully loaded
      setTimeout(() => Breadcrumb.init(), 100);
    });
  } else {
    setTimeout(() => Breadcrumb.init(), 100);
  }
  