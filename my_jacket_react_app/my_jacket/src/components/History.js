import React, { useContext, useEffect, useState } from "react";
import { getInvoicesByUserId } from "../service/InvoiceService";
import { getIdFromJwt } from "../service/Jwt";
import { getUserByAccountId } from "../service/LoginService";
import { AppContext } from "../context/AppContext";
import { formatDate } from "../service/InvoiceService";
import InvoiceDetail from "./InvoiceDetail";

export default function History() {
  const [invoices, setInvoices] = useState([]);
  const { isLogin } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState([]);
  const [date, setDate] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [invoiceId, setInvoiceId] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantiy, setTotalQuantity] = useState();
  const [dateOrder, setDateOrder] = useState();
  const [productDetailId, setProductDetailId] = useState();
  const {amountItem} = useContext(AppContext);

  const handleShowModalDetail = (
    id,
    totalQuantity,
    totalPrice,
    dateOrder,
  ) => {
    setShowDetail(true);
    setInvoiceId(id);
    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
    setDateOrder(dateOrder);
  };

  const handleHidModalDetail = () => {
    setShowDetail(false);
  };

  const totalPageArray = (totalP) => {
    const arr = [];
    for (let i = 0; i < totalP; i++) {
      arr[i] = i + 1;
    }
    return arr;
  };

  const fetchDataInvoices = async () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const idLogin = getIdFromJwt(jwt);
      const user = await getUserByAccountId(idLogin);
      const data = await getInvoicesByUserId(page, user.id, date);
      const totalP = totalPageArray(data.totalPages);
      setTotalPage(totalP);
      setInvoices(data.content);
    }
  };
  const handleSerach = (event) => {
    setDate(event.target.value);
    setIsSearch(!isSearch);
  };

  useEffect(() => {
    fetchDataInvoices();
    if (isSearch) {
      setPage(0);
      setIsSearch(!isSearch);
    }
  }, [page, date]);

  if (!totalPage) {
    return null;
  }

  return (
    <div style={{ marginTop: "150px" }}>
      <div>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "35px",
            color: "blue",
          }}
        >
          History Order
        </h2>

        <div
          className="body container shadow pb-1"
          style={{ textAlign: "center" }}
        >
          <div className="container-2 row mb-2">
            <div className="search-container col-12">
              <label  style={{ color: "blue",width:"100%",float:"right" }}>
                <b>Enter date:{"  "}</b>
                <input  style={{width:"30%"}}
                  onChange={(event) => handleSerach(event)}
                  className="input1"
                  type="date"
                />
              </label>
            </div>
          </div>
          <div>
            {invoices.length > 0 && isLogin && (
              <table className="table table-hover border">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
                    <th>Order date</th>
                    <th>Fullname</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Note</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Payment</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td style={{ width: "15%" }}>
                        {formatDate(item.dateOrder)}
                      </td>
                      <td>{item.user.name}</td>
                      <td>{item.user.phoneNumber}</td>
                      {item.otherLocation == "" && (
                        <td>{item.user.location.name}</td>
                      )}
                      {item.otherLocation !== "" && (
                        <td>{item.otherLocation}</td>
                      )}
                      <td>{item.note}</td>
                      <td>${item.totalPrice}</td>
                      <td>{item.totalQuantity}</td>
                      {item.payment.method == "Payment on delivery" && (
                        <td>Unpaid</td>
                      )}
                      {item.payment.method == "Paypal" && <td>Paid</td>}
                      <td className="text-center">
                        <button
                          onClick={() =>
                            handleShowModalDetail(
                              item.id,
                              item.totalQuantity,
                              item.totalPrice,
                              item.dateOrder,
                            )
                          }
                          className="btn btn-sm btn-outline-primary rounded-0"
                          type="button"
                        >
                          See Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <InvoiceDetail
              showDetail={showDetail}
              handleHidModalDetail={handleHidModalDetail}
              invoiceId={invoiceId}
              totalPrice={totalPrice}
              totalQuantity={totalQuantiy}
              dateOrder={dateOrder}
              productDetailId={productDetailId}
              amountItem = {amountItem}
            />
            {invoices.length < 1 && isLogin && (
              <h2 style={{ textAlign: "center", color: "blue" }}>No data</h2>
            )}
            <div
              style={{
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
              className="mt-3"
            >
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                  <li className="page-item">
                    <button
                      className={`page-link rounded-0 ${
                        page <= 0 ? "disabled" : ""
                      }`}
                      aria-label="Previous"
                      onClick={() => setPage(0)}
                    >
                      <small aria-hidden="true">&lt;&lt;</small>
                    </button>
                  </li>
                  <li className="page-item">
                    <button
                      className={`page-link rounded-0 ${
                        page <= 0 ? "disabled" : ""
                      }`}
                      onClick={() => setPage(page - 1)}
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&lt;</span>
                    </button>
                  </li>
                  {totalPage.map((item, index) => {
                    return (
                      <li className="page-item" key={index}>
                        <button
                          className={`page-link ${
                            page === index ? "active" : ""
                          }`}
                          id="page-number"
                          onClick={() => setPage(index)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    );
                  })}

                  <li className="page-item">
                    <button
                      className={`page-link rounded-0 ${
                        page + 1 >= totalPage[totalPage.length - 1] ||
                        totalPage.length === 0
                          ? "disabled"
                          : ""
                      }`}
                      onClick={() => setPage(page + 1)}
                      aria-label="Next"
                    >
                      <small aria-hidden="true">&gt;</small>
                    </button>
                  </li>
                  <li className="page-item">
                    <button
                      className={`page-link rounded-0 ${
                        page + 1 >= totalPage[totalPage.length - 1] ||
                        totalPage.length === 0
                          ? "disabled"
                          : ""
                      }`}
                      onClick={() => setPage(totalPage[totalPage.length - 2])}
                      aria-label="Next"
                    >
                      <small aria-hidden="true">&gt;&gt;</small>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* {invoices.length < 1 && (
        <h2 style={{ marginTop: "200px", textAlign: "center", color: "blue" }}>
          No data
        </h2>
      )} */}
      {!isLogin && (
        <h2 style={{ marginTop: "200px", textAlign: "center", color: "blue" }}>
          Can not access !
        </h2>
      )}
    </div>
  );
}
