import React from "react";
import { useHistory } from "react-router-dom";
import { formatDate } from "components/Wallet/TransactionList";
import { formatPrice } from "utils/formatPrice";
import { PhoneListStyle } from "./style";
import { Badge } from "antd";

const PhoneList = ({
  phone,
  hidePrice = false,
  width = 100,
  height = 100,
  gridNo = "150px",
  isRoute = true,
}: any) => {
  const history = useHistory();
  return (
    <PhoneListStyle
      status={false}
      gridNo={gridNo}
      onClick={() => {
        if (isRoute) {
          history.push(`/phones/phone-detail/${phone?.device_id}`);
        }
      }}
    >
      <div className="image" style={{ width, height }}>
        <img
          src={phone?.phoneModel?.images[0]}
          alt={phone?.phoneModel?.phone_model?.name}
        />
      </div>
      <div className="">
        <div className="top">
          <h1>
            {phone?.phoneModel?.brand?.name}{" "}
            {phone?.phoneModel?.phone_model?.name} ({phone?.device_id})
          </h1>
          <div className="">
            {!hidePrice && (
              <span className="price">
                {formatPrice(phone?.phoneModel?.amount)}
              </span>
            )}
          </div>
        </div>
        <p style={{ margin: 0 }}>{phone?.phoneModel?.description}</p>
        <div className="tag">
          <Badge
            count={`${phone?.phoneModel?.internal_storage}`}
            style={{ background: "#dddddd", color: "#333333", marginRight: 10 }}
          />
          <Badge
            count={`${phone?.phoneModel?.battery} MAH`}
            style={{ background: "#dddddd", color: "#333333" }}
          />
        </div>
        <div>{formatDate(phone?.created_at)}</div>
      </div>

      {/* <div className="float-action">
        <CustomButton
          label="Sell Phone"
          style={{ width: 100 }}
          background="dodgerblue"
        />
      </div> */}
    </PhoneListStyle>
  );
};

export default PhoneList;
