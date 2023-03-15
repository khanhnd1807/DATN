export default interface RequestAttributes {
  request_id: bigint;
  user_id: bigint;
  created_at: Date;
  detail: string;
  time_start: Date;
  time_end: Date;
  email_leader?: string;
  email_user?: string;
  phone_number: string;
  description: string;
  status: number;
  notify_status: number;
  status_exist: number;
  role_position?: number;
}
