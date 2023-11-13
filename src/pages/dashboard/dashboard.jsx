import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navigation";
import "./dashboard.scss";
export default function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <UserCard />
      </div>
    </div>
  );
}

export function UserCard({ progress = 65 }) {
  const profile = useRef(null);
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (profile) {
      profile.current.style.height = profile.current.offsetWidth + "px";
    }
    window.addEventListener("resize", () => {
      if (profile) {
        profile.current.style.height = profile.current.offsetWidth + "px";
      }
    });
  }, []);

  return (
    <div
      className={browserWidth > 500 ? "usercard" : "mobile_usercard usercard"}
    >
      <div className="usercard-details">
        <div className="usercard-profile" ref={profile}></div>
        <div className="usercard-top">Hi Solarin</div>
        <div className="usercard-progress">
          <span>{progress}%</span>
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="usercard-game">
          <div className="usercard-points">
            <i class="fa-solid fa-trophy"></i>
            <span>18</span>
          </div>
          <div className="usercard-streak">
            <i class="fa-solid fa-fire"></i> <span>3</span>
          </div>
        </div>
      </div>
      <div className="usercard-tabs"></div>
    </div>
  );
}
