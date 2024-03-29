import { useAuth } from "context/auth/AuthProvider";
import { useLayout } from "context/layout/LayoutProvider";
import { SignupUserType } from "types/authTypes";
import { getInitialCharacter } from "utils/getInitialCharacter";
import Dropdown from "../Dropdown";
import { InitialCharacter } from "./style";

type Props = {
  user: Partial<SignupUserType>;
  menus?: any;
};

const Avatar: React.FC<Props> = ({ user, menus }) => {
  const { avatarMenu, openAvatarMenu, closeAvatarMenu } = useLayout();
  const { profile } = useAuth();

  const getInitials = getInitialCharacter(user);

  return (
    <div>
      {profile?.profile_image_url ? (
        <img
          src={profile.profile_image_url}
          alt="profile"
          width={30}
          height={30}
          style={{
            borderRadius: 30,
          }}
        />
      ) : (
        <InitialCharacter
          onMouseEnter={() => {
            if (menus?.length) {
              openAvatarMenu();
            }
          }}
          onMouseLeave={() => {
            if (menus?.length) {
              closeAvatarMenu();
            }
          }}
        >
          <span>{getInitials}</span>
          {avatarMenu && <Dropdown menus={menus} />}
        </InitialCharacter>
      )}
    </div>
  );
};

export default Avatar;
