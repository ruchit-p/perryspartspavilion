import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

const ApproveTransactionPage = () => {
  const [checkoutRequests, setCheckoutRequests] = useState([]);
  const [returnDate, setReturnDate] = useState("");
  const { dbUser } = useAuth();

  const fetchPendingCheckoutRequests = async () => {
    try {
      // Fetch checkout requests that haven't been converted into transactions yet
      const { data, error } = await supabase.rpc(
        "get_pending_checkout_requests"
      );

      if (error) {
        console.error("Error fetching pending checkout requests:", error);
      } else {
        setCheckoutRequests(data || []);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const denyRequest = async (request_id) => {
    const { error } = await supabase
      .from("checkout_request")
      .delete()
      .match({ request_id });

    if (error) {
      console.error("Error denying request:", error);
    } else {
      setCheckoutRequests(
        checkoutRequests.filter((req) => req.request_id !== request_id)
      );
    }
  };

  useEffect(() => {
    fetchPendingCheckoutRequests();
  }, []);

  const approveRequest = async (request) => {
    try {
      await supabase.rpc("approve_checkout_request", {
        request_id_param: request.request_id,
        admin_id_param: dbUser.user_id,
      });
      // Update the UI after approving the request
      setCheckoutRequests(
        checkoutRequests.filter((cr) => cr.request_id !== request.request_id)
      );
    } catch (error) {
      console.error("Error approving transaction:", error);
    }
  };

  return (
    <div className="main">
      <div className="header">
        <h2>Approve Transactions</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>User Email</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Return Required</th>
            <th>Return Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {checkoutRequests.map((request) => (
            <tr key={request.request_id}>
              <td>{request.request_id}</td>
              <td>{request.user_email}</td>
              <td>{request.item_name}</td>
              <td>{request.quantity}</td>
              <td className="checkboxRow">
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={request.returnRequired || false}
                  onChange={(e) =>
                    setCheckoutRequests((prev) =>
                      prev.map((r) =>
                        r.request_id === request.request_id
                          ? { ...r, returnRequired: e.target.checked }
                          : r
                      )
                    )
                  }
                />
              </td>
              <td>
                <input
                  className="input"
                  type="date"
                  disabled={!request.returnRequired}
                  value={request.returnDate || ""}
                  onChange={(e) =>
                    setCheckoutRequests((prev) =>
                      prev.map((r) =>
                        r.request_id === request.request_id
                          ? { ...r, returnDate: e.target.value }
                          : r
                      )
                    )
                  }
                />
              </td>
              <td>
                <button
                  className="btn approve"
                  onClick={() => approveRequest(request)}
                >
                  Approve
                </button>
                <button
                  className="btn deny"
                  onClick={() => denyRequest(request.request_id)}
                >
                  Deny
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveTransactionPage;
