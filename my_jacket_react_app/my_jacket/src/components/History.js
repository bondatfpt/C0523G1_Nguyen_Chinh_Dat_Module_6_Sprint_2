import React, { useEffect, useState } from "react";
import { getInvoicesByUserId } from "../service/InvoiceService";
import { getIdFromJwt } from "../service/Jwt";
import { getUserByAccountId } from "../service/LoginService";

export default function History() {
  const [invoices, setInvoices] = useState([]);
  const fetchDataInvoices = async () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const idLogin = getIdFromJwt();
      const user = getUserByAccountId(idLogin);
      const invoices = await getInvoicesByUserId(user.id);
      setInvoices(invoices);
    }
  };
  useEffect(() => {
    fetchDataInvoices();
  }, []);
  if (!invoices){
    return null;
  }
  return (
    <div style={{ marginTop: "150px" }}>
      {/* {invoices.length > 0 &&( */}
          <div>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "blue",
              }}
            >
              History Order
            </h2>
            <div
              className="body container shadow pb-1"
              style={{ textAlign: "center" }}
            >
              <div>
                <table className="table table-hover border">
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>Order date</th>
                      <th>Full Name</th>
                      <th>Phone number</th>
                      <th>Location</th>
                      <th>Note</th>
                      <th>Total price</th>
                      <th>Total quantity</th>
                      <th>Payment</th>
                      <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <input
                          type="date"
                          style={{ border: "none" }}
                          readOnly
                        />
                      </td>{" "}
                      <td>Ho va ten</td>
                      <td>Dia chi</td>
                      <td>So dien thoai</td>
                      <td>Loai ung vien</td>
                      <td>Loai ung vien</td>
                      <td>Loai ung vien</td>
                      <td>Loai ung vien</td>
                      <td className="text-center">
                        {/* <button style={{marginRight:"10px"}}
                    className="btn btn-sm btn-outline-primary rounded-0"
                    type="button"
                  >
                    Xem
                  </button> */}
                        <button
                          className="btn btn-sm btn-outline-primary rounded-0"
                          type="button"
                        >
                          See Detail
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        {/* )} */}
    </div>
  );
}
