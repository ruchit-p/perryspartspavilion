import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  const handleClick = () => {
    console.log("ItemCard clicked"); //redirect to item details page
  };

  console.log("ItemCard item:", item);

  return (
    <div className="card m-3" onClick={handleClick}>
      {/* <img src={item.image} className="card-img-top" alt="..."></img> */}
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{item.category.category_name}</li>
        <li className="list-group-item">{item.status.status_name}</li>
        <li className="list-group-item">{item.quantity}</li>
      </ul>
      <div className="card-body">
        <Link to={`/items/${item.item_id}`}>View Details</Link>
      </div>
    </div>
  );
};

export default ItemCard;
