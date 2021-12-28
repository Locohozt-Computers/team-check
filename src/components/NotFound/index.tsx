import React from "react";
import { useHistory } from "react-router-dom";
import { Section } from "./style";

type Props = {
  status?: number;
  pageText?: string;
  pageMessage?: string;
};

const NotFound: React.FC<Props> = ({
  status = 404,
  pageText = "Page Not Found",
  pageMessage = "the page you are looking for not avaible!",
}) => {
  const history = useHistory();
  return (
    <Section>
      <div className="four_zero_four_bg">
        <h1 className="text-center">{status}</h1>
      </div>

      <div className="contant_box_404">
        <h3 className="h2">{pageText}</h3>

        <p>{pageMessage}</p>

        <p className="link_404" onClick={() => history.push('home')}>Go to Home</p>
      </div>
    </Section>
  );
};

export default NotFound;
