import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteCartDetail } from "../service/CartService";
import { getIdFromJwt } from "../service/Jwt";
import { getCartByUserId } from "../service/CartService";
import {toast} from "react-toastify";
import { AppContext } from "../context/AppContext";
import { getUserByAccountId } from "../service/LoginService";

export default function ModalConfirm({showModalDelete, handleHideModalDelete,productDetail}) {
  const handleDelete = async () => {
    const jwt = localStorage.getItem("jwt");
      if (jwt) {
        const idLogin = getIdFromJwt(jwt);
        const user = await getUserByAccountId(idLogin)
        const cartId = await getCartByUserId(user.id);
        const respone = await deleteCartDetail(user.id,cartId,productDetail.product_id,productDetail.productDetailId);
        if (respone === 201){
          handleHideModalDelete();
          toast.success(`Success deleted product have name: ${productDetail.product_name}/${productDetail.size_name}/${productDetail.color_name}`)
        }
      }
  }
    if(!productDetail){
        return null;
    }
  return (
    <div>
      <Modal show={showModalDelete} animation={true}>
        <Modal.Header style={{textAlign:"center",justifyContent:"center", display:"flex", color:"red"}}>
          <Modal.Title >Delete Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {" "}<p style={{ color: "blue", fontSize:"16px", textAlign:"center" }}>
          Are you sure you want to delete this product? <br/>
          {productDetail.product_name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleHideModalDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
