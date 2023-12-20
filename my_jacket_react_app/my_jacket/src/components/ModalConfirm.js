import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteCartDetail } from "../service/CartService";

export default function ModalConfirm({showModalDelete, handleHideModalDelete,productDetail}) {
    if(!productDetail){
        return null;
    }
  return (
    <div>
      <Modal show={showModalDelete} animation={true}>
        <Modal.Header style={{textAlign:"center",justifyContent:"center", display:"flex", color:"red"}}>
          <Modal.Title >Delete Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "blue" }}>
          {" "}
          Are you sure to delete this product have name: {productDetail.product_name} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleHideModalDelete}>
            Close
          </Button>
          <Button variant="danger">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
