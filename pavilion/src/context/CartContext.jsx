import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { supabase } from "../supabaseClient"; // Ensure you have initialized Supabase client
import { useAuth } from "./AuthContext"; // Import the AuthContext

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { dbUser } = useAuth(); // Get the current user from the AuthContext

  useEffect(() => {
    let isMounted = true;
    if (dbUser && isMounted) {
      fetchCartItems(dbUser);
    }
    // if there is no user signed in, the cart will be empty
    else {
      setCart([]);
    }
    return () => {
      isMounted = false;
    };
  }, [dbUser]);

  const fetchCartItems = async () => {
    if (dbUser) {
      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", dbUser.user_id);
      if (error) {
        console.error("Error fetching cart:", error);
      } else {
        setCart(data || []);
      }
    }
  };

  const addToCart = async (item) => {
    if (dbUser) {
      try {
        const { error } = await supabase.rpc("add_item_to_cart", {
          user_id_param: dbUser.user_id,
          item_id_param: item.item_id,
          quantity_param: item.quantity,
        });

        if (error) {
          return { error: error.message };
        } else {
          // Fetch the updated cart items
          await fetchCartItems();
          return { error: null }; // Indicate success
        }
      } catch (error) {
        return { error: error.message };
      }
    }
  };

  const removeFromCart = async (cartItem_id) => {
    if (dbUser) {
      try {
        const { error } = await supabase.rpc("remove_item_from_cart", {
          user_id_param: dbUser.user_id,
          cart_item_id_param: cartItem_id,
        });

        if (error) {
          console.error("got erroro");
          console.error("Error removing item from cart:", error.message);
          // Handle the error, e.g., show an error message to the user
        } else {
          // Fetch the updated cart items to reflect the change in the UI
          await fetchCartItems();
          // Handle success, e.g., show a success message or toast
        }
      } catch (error) {
        console.error(
          "Unexpected error when trying to remove item from cart:",
          error
        );
        // Handle the exception here, e.g., show an error message to the user
      }
    }
  };

  const getCart = useCallback(async () => {
    if (dbUser) {
      const { data, error } = await supabase
        .from("cart")
        .select(
          `
          id,
          item_id,
          quantity,
          items ( name, category_id, model_number, manufacturer, quantity, storage_type_id, status_id )
        `
        )
        .eq("user_id", dbUser.user_id);
      if (error) {
        console.error("Error fetching cart:", error);
      } else {
        setCart(data || []);
        return data || [];
      }
    }
  }, [dbUser.user_id]);

  // Inside CartContext
  const updateCartQuantity = async (user_id, item_id, newQuantity) => {
    try {
      const { error } = await supabase.rpc("update_cart_item_quantity", {
        user_id_param: user_id,
        item_id_param: item_id,
        new_quantity_param: newQuantity,
      });

      if (error) {
        return { error: error.message };
      } else {
        // Fetch the updated cart items
        await fetchCartItems();
        return { error: null }; // Indicate success
      }
    } catch (error) {
      return { error: error.message };
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getCart, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
