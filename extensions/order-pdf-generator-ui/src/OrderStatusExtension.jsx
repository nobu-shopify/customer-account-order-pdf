import { useEffect, useState } from "react";
import {
  reactExtension,
  Banner,
  useOrder,
} from '@shopify/ui-extensions-react/customer-account';

export default reactExtension(
  'customer-account.order-status.block.render',
  () => <Extension />,
);

function Extension() {
  const order = useOrder();
//  console.log('order', order);

  const [customerName, setCustomerName] = useState("");
  const getCustomerNameQuery = {
    query: `query {
      customer {
        firstName
      }
    }`
  };

  useEffect(() => {
    fetch("shopify://customer-account/api/unstable/graphql.json",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getCustomerNameQuery),
      }).then((response) => response.json())
      .then(({data: { customer: {firstName}}}) => {
        setCustomerName(firstName)
      }).catch(console.error);
  });

  console.log("customerName", customerName);

  if (order) {
    return (
      <Banner>
        Please include your order ID ({order.id})
        in support requests
      </Banner>
    );
  }

  return null;
}
