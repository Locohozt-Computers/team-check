import React from "react";
import { formatDate } from "components/Wallet/TransactionList";
import { formatPrice } from "utils/formatPrice";
import { PhoneListStyle } from "./style";
import { Badge } from "antd";
import { useHistory } from "react-router-dom";

const PhoneList = ({ phone }: any) => {
    const history = useHistory()
  return (
    <PhoneListStyle status={false} onClick={() => history.push(`/phones/phone-detail/${phone?.device_id}`)}>
      <div className="image">
        <img
          src={phone?.phoneModel?.images[0]}
          alt={phone?.phoneModel?.phone_model?.name}
        />
      </div>
      <div className="">
        <div className="top">
          <h1>{phone?.phoneModel?.brand?.name} {phone?.phoneModel?.phone_model?.name}</h1>
          <span className="price">
            {formatPrice(phone?.phoneModel?.amount)}
          </span>
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
        {/* <div>{phone?.user?.username}</div> */}
        <div>{formatDate(phone?.created_at)}</div>
      </div>
    </PhoneListStyle>
  );
};

export default PhoneList;
