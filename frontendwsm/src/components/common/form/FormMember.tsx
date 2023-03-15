import ModalCaution from "../../members/Modal";
import { HeaderComponentNotHolidays } from "../HeaderComponent";
import { FieldInputName } from "./FieldInputName";
import { FieldAvatar } from "./FieldAvatar";
import { FieldGender } from "./FieldGender";
import { FieldInput } from "./FieldInput";
import { ButtonDelete, ButtonSubmit } from "./ButtonForm";
import { FieldRole } from "./FieldRole";
import { Form } from "formik";
import UserAttributes from "src/interfaces/User";
import { SelectDepartment } from "./FieldSelect";
import { DepartmentAttributes } from "src/interfaces/Department";
// import { ReadOnly } from "./FieldReadOnly";

export const FormMember = ({
  check,
  imgData,
  member,
  uploadImage,
  selectDepartment,
  departments,
  department_id,
}: {
  check: number; //0 la dang ki , 1 la sua profile, 2 la sua thong tin member
  imgData: any;
  member?: UserAttributes["user"];
  uploadImage: Function;
  selectDepartment?: Function;
  departments?: DepartmentAttributes[];
  department_id?: bigint;
}) => {
  return (
    <Form className="edit-member">
      <div>
        <HeaderComponentNotHolidays
          title={check === 0 ? "Đăng kí thông tin" : "Cập nhật profile"}
        />

        <div className="edit-member_body">
          <div className="edit-member_body_item1">
            <FieldInputName />
            <FieldAvatar
              imgData={imgData}
              member={member!}
              uploadImage={uploadImage}
            />
            <FieldGender />
            {check === 2 ? (
              <SelectDepartment
                role_position={member!.role_position!}
                department_id={member!.department_id}
                selectDepartment={selectDepartment!}
              />
            ) : check === 0 ? (
              // <SelectFormik
              //   title="Phòng ban"
              //   name="department_id"
              //   detail={departments!.map((department, index) => {
              //     return (
              //       <option
              //         key={index}
              //         value={Number(department.department_id)}
              //       >
              //         {department.name}
              //       </option>
              //     );
              //   })}
              // />
              <SelectDepartment
                role_position={member!.role_position!}
                department_id={department_id!}
                selectDepartment={selectDepartment!}
              />
            ) : (
              <FieldInput
                title="Phòng ban"
                name="department_name"
                type="text"
                readOnly={true}
              />
            )}

            <FieldInput
              title="Ngày sinh"
              name="birthday"
              type="date"
              data-date-format="DD-YYYY-MM"
            />

            <FieldInput
              type="text"
              placeholder="Số điện thoại"
              name="phone_number"
              title="Số điện thoại"
            />

            <FieldInput
              type="text"
              name="address"
              title="Địa chỉ"
              placeholder="Địa chỉ"
            />

            <div className="edit-member_body_item1_form-group">
              <div className="edit-member_body_item1_form-group_panel">
                <ButtonSubmit />
                {check < 2 ? (
                  <></>
                ) : (
                  <ButtonDelete
                    ModalCaution={ModalCaution}
                    id={member!.user_id}
                  />
                )}
              </div>
            </div>
          </div>
          <div></div>
          {/*column 2*/}
          <div className={check === 1 ? "hidden" : "edit-member_body_item2"}>
            <div className="edit-member_body_item2_panel">
              {check === 2 ? (
                <FieldRole role_position={member!.role_position!} />
              ) : (
                <FieldRole role_position={0} />
              )}

              {check === 0 ? (
                <FieldInput
                  type="text"
                  name="email"
                  title="email"
                  placeholder="Email"
                  css={false}
                />
              ) : (
                <></>
              )}

              <FieldInput
                title="Ngày vào công ty"
                name="join_company"
                type="date"
                css={false}
                data-date-format="DD-YYYY-MM"
              />
              <FieldInput
                title="Ngày lên chính thức"
                name="becoming_offcial_employee"
                type="date"
                css={false}
                data-date-format="DD-YYYY-MM"
              />

              {check === 0 ? (
                <>
                  <FieldInput
                    type="password"
                    name="password"
                    title="password"
                    css={false}
                  />
                  <FieldInput
                    type="password"
                    name="confirm_password"
                    title="Xác nhận lại mật khẩu"
                    css={false}
                  />
                </>
              ) : (
                <></>
              )}
              <FieldInput
                type="number"
                name="holidays"
                title="Số ngày nghỉ"
                css={false}
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};
