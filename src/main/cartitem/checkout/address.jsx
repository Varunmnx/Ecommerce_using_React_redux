import React, { useEffect, useState } from "react";
import styles from "./checkout.module.scss";
import { commerce } from "../../data/commerce";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/productsList";
export default function Address({ stephandler, checkouttoken,step }) {
  const dispatch = useDispatch()
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [subDivision, setSubDivision] = useState(null);
  const [shippingSubdivisions, setShippingSubDivisions] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const [firstName,setFirstName] = useState("")
  const [lastname,setLastname] = useState("")
  const [pinCode,setPinCode] = useState("")
  const [address,setAddress] = useState("")
  const [email,setEmail] = useState("")
  
  let fetchShippingCountries = async (checkouttoken) => {
    let { countries } = await commerce.services.localeListShippingCountries(
      checkouttoken
    );

    let customcountry = Object.entries(countries).map(([code, name]) => ({
      id: code,
      label: name,
    }));
    setShippingCountries(customcountry);

  };

  let fetchShippingSubDivisions = async (countryId) => {

    let { subdivisions } = await commerce.services.localeListSubdivisions(
      countryId
    );
 
    subdivisions = Object.entries(subdivisions).map((e) => {
      return { id: e[0], name: e[1] };
    });
    setShippingSubDivisions(subdivisions);
  };

  const fetchshippingOptions = async (
    checkoutTokenID,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenID,
      { country, region }
    );
    setShippingOptions(options);
    setShippingOption(options[0].description)

  };

  useEffect(() => {
    fetchShippingCountries(checkouttoken.id);
   
    if (checkouttoken.id && shippingCountry)
      fetchshippingOptions(checkouttoken.id, shippingCountry, subDivision);
  }, [shippingCountry]);

  const submitHandler = (data) => {

    stephandler();
    let detaileddata = { firstName,lastname,pinCode,address,email,shippingOption, shippingCountry, subDivision }

    dispatch(actions.setCustomerData(detaileddata))  
    data.preventDefault()
  };


  return (
    <form 
      name="checkoutdetails"
      id="checkoutdetails"
      className={styles.Checkout_form}
      onSubmit={(data) =>
        submitHandler(data)
      }
    >
      <h1>Shipping Address</h1>
      <input type="text" name="firstname" required onChange={(e)=>setFirstName(e.target.value)} placeholder="First Name" />
      <input type="text" name="lastname" required onChange={e=>setLastname(e.target.value)} placeholder="Last Name" />
      <input type="text" name="Address" required onChange={e=>setAddress(e.target.value)} placeholder="Address" />
      <input type="email" name="email" required onChange={e=>{setEmail(e.target.value)}} placeholder="Email" />
      <select
        name="city"
        id="city"
        onChange={(e) => {
          e.preventDefault();
          setShippingCountry(e.target.value);
          fetchShippingSubDivisions(e.target.value);
        }}
      >
        {shippingCountries?.map((e) =>
          e.name === "India" ? (
            <option value={e.id} selected>
              {e.label}
            </option>
          ) : (
            <option value={e.id}>{e.label}</option>
          )
        )}
      </select>
      {shippingSubdivisions && (
        <select
          name="subdivisions"
          id="subdivisions"
          onChange={(e) => {
            setSubDivision(e.target.value);
      
          }}
        >
          {!shippingSubdivisions
            ? null
            : shippingSubdivisions.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
        </select>
      )}
      <input type="text" placeholder="Zipcode" onChange={e=>setPinCode(e.target.value)}/>
      {shippingOptions ? (
        <select>
          {shippingOptions.map((item) => (
            <option
              key={item.id}
              onClick={(e) => {
                setShippingOption(e.target.value);
              }}
            >
              {item.description}
              {"  "}(+{item.price.formatted_with_symbol})
            </option>
          ))}
        </select>
      ) : null}
      <button type="submit">Next</button>
    </form>
  );
}
