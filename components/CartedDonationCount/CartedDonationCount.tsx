import React from 'react';

interface CartCountProps {
  count: number;
}

export default function CartedDonationCount(props: CartCountProps) {
  return (
    <div>
      <span>Cart: {props?.count} items</span>
    </div>
  );
}
