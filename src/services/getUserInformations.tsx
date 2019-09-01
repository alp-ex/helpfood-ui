import { users } from "../fixtures";

const getUserInformations = (id: number) => {
  const user = users[id];
  return {
    username: user.username,
    selectedHue: user.selected_hue
  };
};

// here we should get current user, and call getuserinfo method with the id
const getUserHue = () => getUserInformations(1).selectedHue;

export { getUserHue };
