export const HeaderComponentNotHolidays = ({ title }: { title: string }) => {
  return (
    <div className="detail-request_header">
      <p className="detail-request_header_title">{title}</p>
    </div>
  );
};

export const HeaderComponentWithHolidays = ({
  title,
  holidays,
}: {
  title: string;
  holidays: number;
}) => {
  return (
    <div className="my-request_header">
      <h3 className="my-request_header_tilte">{title}</h3>
      <span className="my-request_header_holiday">
        Số ngày nghỉ còn lại: {holidays}
      </span>
    </div>
  );
};
