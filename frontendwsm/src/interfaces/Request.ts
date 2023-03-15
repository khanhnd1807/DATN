export default interface RequestAttributes {
  request_id?: bigint;
  user_id?: bigint;
  created_at?: Date;
  detail: string;
  time_start: Date;
  time_end: Date;
  phone_number: string;
  description: string;
  status?: number;
  status_exist?: number;
  role_position?: number;
  email_user?: string;
  email_leader?: string;
}
