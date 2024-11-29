import React from "react";
import { Link } from "react-router-dom";
import './AdminPage.css';

function AdminPage() {
    return (
        <div className="admin">
            <h1>Admin 페이지</h1>
            <p>관리자 권한으로 로그인되었습니다.</p>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <button className="logout-button">
                    로그아웃
                </button>
            </Link>
        </div>
    );
}

export default AdminPage;
