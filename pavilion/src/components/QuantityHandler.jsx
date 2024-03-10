import { supabase } from "../supabaseClient";

const QuantityHandler = ({item, setQuantity }) => {
  return (
    <>
      <button>⬆️</button>
      <input
        type="number"
        value={item.quantity}
      ></input>
      <button>⬇️</button>
      <button onClick={setQuantity(item.item_id)}>Set Quantity</button> 

    </>
  );
};

export default QuantityHandler;
