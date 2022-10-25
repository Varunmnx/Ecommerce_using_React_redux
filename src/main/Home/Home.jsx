import styles from "./Home.module.scss";
import Card from "../cartitem/card";
import laptop from "../data/assets/alienware.jpg"
import watch from "../data/assets/Fitbit.jpg"
import tv from "../data/assets/hitachitv.jpg"
import tablet from "../data/assets/ipadtablet.jpg"
import Refridgerator from "../data/assets/Voltasfridge.jpg"


export default function Home({products,addtocart}) {
 
  return (
    <div className={styles.HomeContainer}>
      <div className={styles.BackImage}></div>
      <div className={styles.sectionWrapper}>
        <div className={styles.ItemsWrapper1}>
          <Card
            name="Laptop"
            id="1"
            price=""
            url={laptop}
            details = {products}
            addtocart = {addtocart}

          />
          <Card
            name="TV"
            id="2"
            price=""
            url={tv}
            details = {products}
            addtocart = {addtocart}


          />
        </div>
        <div className={styles.ItemsWrapper1}>
          <Card
            name="Refridgerator"
            id="3"
            price=""
            url={Refridgerator}
            details = {products}
            addtocart = {addtocart}


          />
          <Card
            name="Tablets"
            id="4"
            price=""
            url={tablet}
            details = {products}
            addtocart = {addtocart}


          />
          <Card
            name="Watch"
            id="5"
            price=""
            url={watch}
            details = {products}
            addtocart = {addtocart}


          />
        </div>
      </div>
    </div>
  );
}
