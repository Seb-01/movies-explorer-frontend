import "./ProfileIconAuthorized.css";

function ProfileIconAuthorized(props) {
  return (
    <div className="profile-icon-auth">
      <img src={props.icon} alt="Иконка Профиль авторизованного пользователя" />
    </div>
  );
}

export default ProfileIconAuthorized;
