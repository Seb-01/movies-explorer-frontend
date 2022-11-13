import "./ProfileIcon.css";

function ProfileIcon(props) {
  return (
    <div className="profile-icon">
      <img src={props.icon} alt="Иконка Профиль пользователя" />
    </div>
  );
}

export default ProfileIcon;
