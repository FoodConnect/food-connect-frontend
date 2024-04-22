import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import CartComponent from '@/components/CartComponent/CartComponent';
import OrderSummaryComponent from '@/components/OrderSummaryComponent/OrderSummaryComponent';
import { CartedDonationData } from '@/components/Interfaces/CartedDonationData';
import { getCartedData } from '@/utils/carting-functions';

export default function CartPage() {
  const [domLoaded, setDomLoaded] = useState(false);
  const [carted_donations, setCartedDonations] = useState<CartedDonationData>({});
  const router = useRouter();
  const { id }: any = router.query;
  const { data: session } = useSession();

  //**REMOVE */
  const items = [
    { id: 1, name: 'item1' },
    { id: 2, name: 'item2' },
];

  useEffect(() => {
    if (!id) return;
    setDomLoaded(true);
    const fetchData = async () => {
      const data = await getCartedData(); // Use getCarted Data utility function
      setCartedDonations(data);
    };
    fetchData().catch(console.error);
  }, [id, session]);

  return (
    <div>
      {domLoaded}
      <CartComponent items={items} />
      <OrderSummaryComponent />
    </div>
  );
}
