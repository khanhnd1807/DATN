import RequestAttributes from "src/interfaces/Request";

export const Row = ({ title, detail }: { title: string; detail: string }) => {
  return (
    <tr className="panel1_table_row">
      <td className="panel1_table_row_colum1">
        <p>{title}</p>
      </td>
      <td className="panel1_table_row_colum2">
        <p>{detail}</p>
      </td>
    </tr>
  );
};

export const RowStatus = ({ request }: { request: RequestAttributes }) => {
  return (
    <tr className="panel1_table_row">
      <td className="panel1_table_row_colum1">
        <p>Trạng thái</p>
      </td>
      <td className="panel1_table_row_colum2">
        <p
          className={
            request.status === 0
              ? "waiting"
              : request.status === 1
              ? "accept"
              : "reject"
          }
        >
          {request.status === 0
            ? "Chờ duyệt"
            : request.status === 1
            ? "Đồng ý"
            : "Từ chối"}
        </p>
      </td>
    </tr>
  );
};

export const RowTableUser = ({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) => {
  return (
    <tr className="panel1_table_row">
      <td className="panel1_table_row_colum1">{title}</td>
      <td className="panel1_table_row_colum2">{detail}</td>
    </tr>
  );
};
