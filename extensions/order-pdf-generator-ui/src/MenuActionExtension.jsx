import { useEffect, useState } from "react";
import { 
  Button,
  reactExtension, 
  useApi,
  } from '@shopify/ui-extensions-react/customer-account';

export default reactExtension(
  "customer-account.order.action.menu-item.render",
  () => <MenuActionExtension />
);

function MenuActionExtension() {
  const { orderId, query } = useApi();
  const [customerName, setCustomerName] = useState("");

  console.log('orderId', orderId);

  const getCustomerNameQuery = {
    query: `query {
      customer {
        firstName
      }
    }`
  };

  useEffect(() => {
    fetch(`shopify://customer-account/api/unstable/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getCustomerNameQuery),
      }).then((response) => response.json())
      .then((data) => { console.log('data', data)})
      .then(({data: { customer: {firstName}}}) => {
        console.log('firstName', firstName);
        setCustomerName(firstName)
      }).catch(console.error);
  });


  return (
    <Button to='extension:/'>Generate PDF</Button>
  );
}

/*
  const getCustomerNameQuery = {
    query: `query {
      customer {
        firstName
      }
    }`
  };

  useEffect(() => {
    fetch(`shopify://customer-account/api/unstable/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getCustomerNameQuery),
      }).then((response) => response.json())
      .then((data) => { console.log('data', data)})
      .then(({data: { customer: {firstName}}}) => {
        console.log('firstName', firstName);
        setCustomerName(firstName)
      }).catch(console.error);


    query(
      `query {
        customer {
          firstName
        }
      }`
    )
    .then( ({data, errors}) => {
      console.log('data', data);
      console.log('errors', errors);
    })
    .catch(console.error);

*/