import React from "react";

function Dashboard({ user }) {
  return (
    <div>
      <h1>대시보드</h1>
      {user ? (
        <>
          <p>이메일: {user.email}</p>
          <p>
            프로필 이미지: <img src={user.picture} alt="Profile" />
          </p>
        </>
      ) : (
        <p>사용자 정보가 없습니다.</p>
      )}
    </div>
  );
}

export default Dashboard;
