export default interface UserAttributes {
  user_id: bigint;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  gender: boolean;
  birthday: Date;
  phone_number: string;
  address: string;
  password: string;
  becoming_offcial_employee: Date;
  join_company: Date;
  holidays: number;
  department_id: bigint;
  role_position: number;
  status: number;
}
