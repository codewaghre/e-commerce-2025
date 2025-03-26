import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Skeleton } from "../../components/laoder";
import { useAllCouponQuery } from "../../redux/api/couponAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";

interface DataType {
  code: string;
  amount: number;
  _id: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Id",
    accessor: "_id",
  },

  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];


function Discount() {
    const { user } = useSelector((state: RootState) => state.userReducer);

    const {data , isLoading,isError,error } = useAllCouponQuery(user?._id!)
    
    const [rows, setRows] = useState<DataType[]>([]);
    

    useEffect(() => {
    if (data)
      setRows(
        data.coupons.map((i) => ({
          _id: i._id,
          code: i.code,
          amount: i.amount,
          action: <Link to={`/admin/discount/${i._id}`}>Manage</Link>,
        }))
      );
    }, [data]);
    

    const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
    )();

     
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

    return (
        <div className="admin-container">
            <AdminSidebar />
            
            <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
            <Link to="/admin/discount/new" className="create-product-btn">
                <FaPlus />
            </Link>
        </div>
  )
}

export default Discount