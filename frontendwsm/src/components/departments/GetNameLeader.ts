import UserAttributes from "../../interfaces/User";

export const leader2 = (id_lead: bigint, members: UserAttributes["user"][]) => {
  let leaderName = "";
  members.forEach((member, index) => {
    if (member.user_id === id_lead && member.role_position! === 1) {
      leaderName = member.lastname + " " + member.firstname;
    }
  });
  return leaderName;
};

export const leader1 = (members: UserAttributes["user"][]) => {
  let leaderName = "";
  members.forEach((member, index) => {
    if (member.role_position === 2) {
      leaderName = member.lastname + " " + member.firstname;
    }
  });
  return leaderName;
};
