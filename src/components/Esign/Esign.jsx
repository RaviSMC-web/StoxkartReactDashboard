import { Button } from "primereact/button";
import React from "react";

const Esign = ({ personal, setPersonal }) => {
  return (
    <>
      <div className="personal_1">
        <div className="line">
          <h2>Esign</h2>
          <hr />
        </div>
        <div className="other_details_esign">
          <ul class="unstyled centered">
            <li>
              <input
                className="styled-checkbox"
                id="styled-checkbox-1"
                type="checkbox"
                value="value1"
                checked
                style={{ width: "20px", height: "20px" }}
              />
              <label for="styled-checkbox-1">Accept Terms & Conditions</label>
            </li>
          </ul>
          <div className="btn_sign">
            <Button
              label="Proceed with Esign"
              style={{ width: "235px", marginTop: "1%" }}
              className="p-button-raised mr-3 p-button-sm smc_color"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Esign;
