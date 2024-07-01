import { TabContextType, useTabContext } from 'context/TabContext';
import OriginShippingForm from './OriginShippingForm';
import NewShippingForm from './NewShippingForm';

const ShippingTabDecider = () => {
  const { tab } = useTabContext() as TabContextType;
  if (tab === 'origin') return <OriginShippingForm />;
  return <NewShippingForm />;
};

export default ShippingTabDecider;
