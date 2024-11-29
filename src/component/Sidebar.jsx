import React from 'react';
import { Home, Users, FileText } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  // 메뉴 아이템 정의
  const menuItems = [
    { icon: Home, label: '홈', href: '/' },
    { icon: Users, label: '사용자 관리', href: '/users' },
    { icon: FileText, label: '피드', href: '/feed' }
  ];

  // 현재 활성화된 메뉴 확인
  const isActive = (path) => window.location.pathname === path;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">대시보드</h1>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <li key={item.label} className="sidebar-menu-item">
                <a
                  href={item.href}
                  className={`sidebar-menu-link ${active ? 'active' : ''}`}
                >
                  <Icon className="sidebar-menu-icon" />
                  <span>{item.label}</span>
                </a>
              </li>
            )}
          )}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="sidebar-profile">
          <div className="sidebar-profile-avatar" />
          <div className="sidebar-profile-info">
            <p className="sidebar-profile-name">관리자</p>
            <p className="sidebar-profile-email">sesac.seoul.kr</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;