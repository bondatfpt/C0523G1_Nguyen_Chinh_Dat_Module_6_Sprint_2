import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getInvoiceDetailByInvoiceId } from "../service/InvoiceService";
import { formatDate, getImageByProductId } from "../service/InvoiceService";
import { AppContext } from "../context/AppContext";
export default function InvoiceDetail({
  showDetail,
  handleHidModalDetail,
  invoiceId,
  totalQuantity,
  totalPrice,
  dateOrder,
  amountItem,
}) {
  const [invoiceDetails, setInvoiceDetails] = useState();
  const [path, setPath] = useState();
  const [productDetailId, setProductDetailId] = useState();
  const fetchDataInvoices = async () => {
    const invoiceDetails = await getInvoiceDetailByInvoiceId(invoiceId);
    setInvoiceDetails(invoiceDetails);
  };



  useEffect(() => {
    if (invoiceId !== undefined) {
      fetchDataInvoices();
    }
  }, [invoiceId]);
  if (!invoiceId || !invoiceDetails) {
    return null;
  }
  return (
    <div>
      <Modal show={showDetail} animation={true}>
        <Modal.Header
          style={{
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            color: "red",
            paddingBottom: "0px",
          }}
        >
          <Modal.Title>
            Invoice Detail ({formatDate(dateOrder)})<br />{" "}
            <p>
              Total Price: ${totalPrice}/Total items: {invoiceDetails.length}
              /Total Quantity: {totalQuantity}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center", color: "blue" }}>
            Product(s) Detail
          </h5>
          <div style={{ marginTop: "20px" }} className="scrollable-div">
            {invoiceDetails.map((item) => (
              <div key={item.id} className="card mb-3 product-order">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <div>
            
                          <img
                            src={item.path}
                            className="img-fluid rounded-3"
                            style={{ width: 65 }}
                        
                          />
             
                      </div>
                      <div className="ms-3">
                        <h6>{item.name}</h6>
                        <p className="small mb-0">
                          ${item.price}/
                          {item.colorName}/
                          {item.sizeName}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <div style={{ width: 50 }}>
                        <h5 className="fw-normal mb-0">{item.quantity}</h5>
                      </div>
                      <div style={{ width: 80 }}>
                        <h5 className="mb-0">${item.total_price}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ width: "100%" }}
            variant="primary"
            onClick={handleHidModalDetail}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
