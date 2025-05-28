// import React, { useEffect, useState, useCallback } from 'react';
// import UploadCategoryModel from '../components/UploadCategoryModel';
// import Loading from '../components/Loading';
// import NoData from '../components/NoData';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import EditCategory from '../components/EditCategory';
// import ConfirmBox from '../components/CofirmBox';
// import toast from 'react-hot-toast';
// import AxiosToastError from '../utils/AxiosToastError';

// const CategoryPage = () => {
//     const [openUploadCategory, setOpenUploadCategory] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [categoryData, setCategoryData] = useState([]);
//     const [openEdit, setOpenEdit] = useState(false);
//     const [editData, setEditData] = useState({ name: "", image: "" });
//     const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
//     const [deleteCategory, setDeleteCategory] = useState({ _id: "" });

//     // Fetch category data from API
//     const fetchCategory = useCallback(async () => {
//         try {
//             setLoading(true);
//             const response = await Axios(SummaryApi.getCategory);
//             const { data: responseData } = response;

//             if (responseData.success) {
//                 console.log("Category Data Fetched:", responseData.data); // Debugging
//                 setCategoryData(responseData.data);
//             }
//         } catch (error) {
//             AxiosToastError(error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchCategory();
//     }, [fetchCategory]);

//     // Handle delete category
//     const handleDeleteCategory = async () => {
//         try {
//             const response = await Axios({
//                 ...SummaryApi.deleteCategory,
//                 data: deleteCategory
//             });

//             const { data: responseData } = response;

//             if (responseData.success) {
//                 toast.success(responseData.message);
//                 fetchCategory();
//                 setOpenConfirmBoxDelete(false);
//             }
//         } catch (error) {
//             AxiosToastError(error);
//         }
//     };

//     return (
//         <section>
//             <div className="p-2 bg-white shadow-md flex items-center justify-between">
//                 <h2 className="font-semibold">Category</h2>
//                 <button
//                     onClick={() => setOpenUploadCategory(true)}
//                     className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
//                 >
//                     Add Category
//                 </button>
//             </div>

//             {/* Jika tidak ada kategori dan tidak sedang loading */}
//             {!loading && categoryData.length === 0 && <NoData />}

//             <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
//                 {categoryData.map((category) => (
//                     <div className="w-32 h-56 rounded shadow-md" key={category._id}>
//                         <img
//                             alt={category.name}
//                             src={category.image}
//                             className="w-full h-36 object-scale-down rounded-t"
//                         />
//                         <div className="items-center h-9 flex gap-2 p-1">
//                             <button
//                                 onClick={() => {
//                                     setOpenEdit(true);
//                                     setEditData(category);
//                                 }}
//                                 className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 onClick={() => {
//                                     setOpenConfirmBoxDelete(true);
//                                     setDeleteCategory(category);
//                                 }}
//                                 className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Loading Component */}
//             {loading && <Loading />}

//             {/* Upload Category Modal */}
//             {openUploadCategory && (
//                 <UploadCategoryModel
//                     fetchData={fetchCategory}
//                     close={() => setOpenUploadCategory(false)}
//                 />
//             )}

//             {/* Edit Category Modal */}
//             {openEdit && (
//                 <EditCategory
//                     data={editData}
//                     close={() => setOpenEdit(false)}
//                     fetchData={fetchCategory}
//                 />
//             )}

//             {/* Confirm Delete Modal */}
//             {openConfirmBoxDelete && (
//                 <ConfirmBox
//                     close={() => setOpenConfirmBoxDelete(false)}
//                     cancel={() => setOpenConfirmBoxDelete(false)}
//                     confirm={handleDeleteCategory}
//                 />
//             )}
//         </section>
//     );
// };

// export default CategoryPage;
import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import CofirmBox from "../components/CofirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.getCategory, data: {
        page, minit: 12}, });
      const { data: responseData } = response;

      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPageCount) setPage((prev) => prev + 1);
  };

  return (
    <section className="">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kategori Produk </h1>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
        >
          Tambah Kategori
        </button>
      </div>

      {/* Tidak ada data */}
      {!categoryData[0] && !loading && <NoData />}

      {/* Daftar kategori */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categoryData.map((category) => (
          <div
            key={category._id}
            className="w-full min-h-[220px] bg-white rounded shadow-md p-2 flex flex-col justify-between"
          >
            {/* Gambar kategori diperbesar */}
            <div className="flex items-center justify-center h-40">
              <img
                alt={category.name}
                src={category.image}
                className="h-full object-contain"
              />
            </div>

            {/* Tombol aksi */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(category);
                }}
                className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 text-sm font-medium py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setOpenConfirmBoxDelete(true);
                  setDeleteCategory(category);
                }}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium py-1 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

       {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className={`px-5 py-2 rounded border font-medium transition ${
              page === 1
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-blue-500 text-blue-600 hover:bg-blue-100"
            }`}
          >
            Sebelumnya
          </button>

          <div className="text-gray-700 font-semibold px-4 py-2 border rounded bg-gray-100 w-20 text-center">
            {page} / {totalPageCount}
          </div>

          <button
            onClick={handleNext}
            disabled={page === totalPageCount}
            className={`px-5 py-2 rounded border font-medium transition ${
              page === totalPageCount
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-blue-500 text-blue-600 hover:bg-blue-100"
            }`}
          >
            Selanjutnya
          </button>
        </div>

      {/* Loading */}
      {loading && <Loading />}

      {/* Modal Tambah */}
      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {/* Modal Edit */}
      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}

      {/* Modal Konfirmasi Delete */}
      {openConfimBoxDelete && (
        <CofirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
