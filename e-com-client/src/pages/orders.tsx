import { ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column } from "react-table";
import TableHOC from '../components/admin/TableHOC';
import { Skeleton } from '../components/laoder';
import { useMyOrdersQuery } from '../redux/api/orderAPI';
import { CustomError } from '../types/api-types';
import { UserReducerInitialState } from '../types/reducer-types';



type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action?: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action"
  }
];

function Orders() {

  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer)
  const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!)
  
  const [rows, setRows] = useState<DataType[]>([]);
  
   useEffect(() => {
    if (data && data.ordersCount > 0)
        setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/order/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);
  

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )()
  
  if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
  return (
      <div className='container'>
          <h1>
              My Orders
          </h1>
          {isLoading ? <Skeleton length={20}/> :  data?.ordersCount == 0 ? "No Orders" :Table }
         
      </div>
  )
}

export default Orders