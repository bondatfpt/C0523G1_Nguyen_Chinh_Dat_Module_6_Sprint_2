import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { getIdFromJwt } from "../service/Jwt";
import { getUserByAccountId } from "../service/LoginService";
import { getCartByUserId } from "../service/CartService";
import { createInvoice,createInvoiceDetail } from "../service/InvoiceService";
import { getInvoiceDetailByInvoiceId } from "../service/InvoiceService";
import { deleteCartDetailFlowInvoice } from "../service/CartService";
import { updateQuantityAfterPay } from "../service/ProductService";
import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import { AppContext } from "../context/AppContext";
const style = {"layout":"vertical"};
const ButtonWrapper = ({ currency,showSpinner,amount,payload,paymentId,note,otherAddress}) => {
    const [{ isPending,options },dispatch] = usePayPalScriptReducer();
    const {setIsPay,cartDetails,totalQuantity,setAmountItem} = useContext(AppContext);
    const navigate = useNavigate();
    const handleCreateInvoice = async () => {
        let user;
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
          const idLogin = getIdFromJwt(jwt);
           user = await getUserByAccountId(idLogin);
        }
        let respone;
          const invoice = {
            note: note,
            otherLocation:otherAddress,
            totalPrice: amount,
            totalQuantity: totalQuantity,
            paymentId: paymentId,
            userId: user.id,
          };
          respone = await createInvoice(invoice);
          if (respone && respone.status === 200) {
            const invoiceDetailArr = cartDetails.map((item) => ({
              quantity: item.quantity,
              totalPrice: item.price * item.quantity,
              invoiceId: respone.data.id,
              productDetailId: item.productDetailId,
            }));
            const respone1 = await createInvoiceDetail(invoiceDetailArr);
            if (respone.status === 200 && respone1 === 201) {
              setIsPay(true);
              toast.success("Done");
              navigate("/history");
              const cartId = await getCartByUserId(user.id);
              await deleteCartDetailFlowInvoice(user.id,cartId);
              const invoiceDetails = await getInvoiceDetailByInvoiceId(respone.data.id);
              const productDetails = invoiceDetails.map((item) => ({
                quantity: item.quantity,
                userId: user.id,
                invoiceId: item.invoice.id,
                productDetailId: item.productDetail.id,
              }));
              const status = await updateQuantityAfterPay(productDetails);
              setAmountItem("");
          }}}
    useEffect(()=>{
    },[])
    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons  
                style={style}
                disabled={false}
                forceReRender={[style,currency,amount]}
                fundingSource={undefined}
                createOrder= {(data, actions) =>
                    actions.order.create({
                        purchase_units:[{
                            amount: {currency_code: currency,value:amount}}
                        ]
                    }).then(cartId => cartId)}
                onApprove={(data,actions) => {
                    actions.order.capture().then(async (response)=>{
                        if(response.status === "COMPLETED"){
                            handleCreateInvoice();
                        }
                    })
                }}
                onError={(err) =>{
                    toast.error("Thanh toán bằng paypal thất bại" + err)
                }}
            />
        </>
    );
}
export default function Paypal({amount,payload,paymentId,note,otherAddress}) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper paymentId ={paymentId} note={note} payload={payload} otherAddress={otherAddress}  currency={'USD'} amount={amount} showSpinner={false}  />
            </PayPalScriptProvider>
        </div>
    );
}