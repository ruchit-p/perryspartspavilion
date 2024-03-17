import { supabase } from "../supabaseClient";

const QuantityHandler = ({ item, setQuantity }) => {
  return (
    <>
      <div className="mx-4 my-auto h-50">
        <button className="mx-2">⬆️</button>
        <input
          type="number input"
          className="mx-2"
          value={item.quantity}
        ></input>
        <button className="mx-2">⬇️</button>
        <button className="mx-2" onClick={setQuantity(item.item_id)}>
          Set Quantity
        </button>
      </div>
    </>
  );
};

export default QuantityHandler;
