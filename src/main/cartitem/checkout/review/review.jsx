import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./review.module.scss";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Success } from "./success";
import {actions} from "../../../../store/store"


export default function Review({ gotoAddressPage, checkouttoken ,handleCaptureCheckout,success,step,emptyCart}) {
  //shipping details
  const dispatch = useDispatch()
  const { customerdata } = useSelector((state) => state.cart);
  const {total} = useSelector(state=>state.cart)

  const stripepromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    emptyCart()
    dispatch(actions.cartRefreshed({
      data:0
    }))

    success()
    }

  return (
    <>
    {step===1?(
    <div className={styles.container}>
      <div className={styles.reviewItems}>
        <div className={styles.title}>
          <h1>Payment</h1>
        </div>
        <div className={styles.allitems}>
          {checkouttoken.line_items.map((item) => (
            <li key={item.id}>
              <span className={styles.name_quantity}>
                {item.name} x {item.quantity}
              </span>
              - <span>{item.price.formatted_with_symbol}</span>
            </li>
          ))}
        </div>
      </div>
      <div className={styles.subtotal}>
        <h4>Total: {checkouttoken.subtotal.formatted_with_symbol}</h4>
      </div>
      <Elements stripe={stripepromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <div className={styles.stripeDivision}>
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <div className={styles.stripeCard}>
                  <CardElement />
                </div>
                <div className={styles.Buttons}>
                  <button onClick={() => gotoAddressPage()}>Go Back</button>
                  <button type="submit" id="pay" disabled={!stripe}>
                    {checkouttoken.subtotal.formatted_with_symbol}
                  </button>
                </div>
              </form>
            </div>
          )}
        </ElementsConsumer>
      </Elements>
    </div>):(<Success/>)}

    </>
  );
}
