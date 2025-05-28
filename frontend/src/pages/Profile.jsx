// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { FaRegUserCircle } from "react-icons/fa";
// import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import toast from 'react-hot-toast';
// import { setUserDetails } from '../store/userSlice';
// import fetchUserDetails from '../utils/fetchUserDetails';

// const Profile = () => {
//     const user = useSelector(state => state.user)
//     const [openProfileAvatarEdit,setProfileAvatarEdit] = useState(false)
//     const [userData,setUserData] = useState({
//         name : user.name,
//         email : user.email,
//         mobile : user.mobile,
//     })
//     const [loading,setLoading] = useState(false)
//     const dispatch = useDispatch()

//     useEffect(()=>{
//         setUserData({
//             name : user.name,
//             email : user.email,
//             mobile : user.mobile,
//         })
//     },[user])

//     const handleOnChange  = (e)=>{
//         const { name, value} = e.target

//         setUserData((preve)=>{
//             return{
//                 ...preve,
//                 [name] : value
//             }
//         })
//     }

//     const handleSubmit = async(e)=>{
//         e.preventDefault()

//         try {
//             setLoading(true)
//             const response = await Axios({
//                 ...SummaryApi.updateUserDetails,
//                 data : userData
//             })

//             const { data : responseData } = response

//             if(responseData.success){
//                 toast.success(responseData.message)
//                 const userData = await fetchUserDetails()
//                 dispatch(setUserDetails(userData.data))
//             }

//         } catch (error) {
//             AxiosToastError(error)
//         } finally{
//             setLoading(false)
//         }

//     }
//   return (
//     <div className='p-4'>

//         {/**profile upload and display image */}
//         <div className='w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
//             {
//                 user.avatar ? (
//                     <img
//                       alt={user.name}
//                       src={user.avatar}
//                       className='w-full h-full'
//                     />
//                 ) : (
//                     <FaRegUserCircle size={65}/>
//                 )
//             }
//         </div>
//         <button onClick={()=>setProfileAvatarEdit(true)} className='text-sm min-w-20 border border-primary-200 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3'>Edit</button>

//         {
//             openProfileAvatarEdit && (
//                 <UserProfileAvatarEdit close={()=>setProfileAvatarEdit(false)}/>
//             )
//         }

//         {/**name, mobile , email, change password */}
//         <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
//             <div className='grid'>
//                 <label>Nama</label>
//                 <input
//                     type='text'
//                     placeholder='Masukan nama Anda'
//                     className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
//                     value={userData.name}
//                     name='name'
//                     onChange={handleOnChange}
//                     required
//                 />
//             </div>
//             <div className='grid'>
//                 <label htmlFor='email'>Email</label>
//                 <input
//                     type='email'
//                     id='email'
//                     placeholder='Masukan email Anda'
//                     className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
//                     value={userData.email}
//                     name='email'
//                     onChange={handleOnChange}
//                     required
//                 />
//             </div>
//             <div className='grid'>
//                 <label htmlFor='mobile'>Nomer HandPhone</label>
//                 <input
//                     type='text'
//                     id='mobile'
//                     placeholder='Masukan Nomer Handphone'
//                     className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
//                     value={userData.mobile}
//                     name='mobile'
//                     onChange={handleOnChange}
//                     required
//                 />
//             </div>

//             <button className='border px-4 py-2 font-semibold hover:bg-primary-200 border-primary-200 text-primary-200 hover:text-neutral-800 rounded'>
//                 {
//                     loading ? "Loading..." : "Simpan"
//                 }
//             </button>
//         </form>
//     </div>
//   )
// }

// export default Profile
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaEnvelope, FaPhone, FaUserEdit } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);

  return (
    <div className="bg-white px-4 py-6 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Avatar section */}
        <div className="relative flex-shrink-0">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg relative group mx-auto md:mx-0">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-100 flex justify-center items-center text-blue-600">
                <FaRegUserCircle size={100} />
              </div>
            )}
            <button
              onClick={() => setProfileAvatarEdit(true)}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full border-2 border-white shadow-md hover:bg-blue-700 transition"
              title="Edit Foto"
            >
              <FaUserEdit size={16} />
            </button>
          </div>
          <p className="text-center mt-4 text-xl font-semibold text-black">{user.name}</p>
        </div>

        {/* Info section */}
        <div className="flex-1 grid gap-5">
          <div>
            <h2 className="text-xl font-bold text-black mb-2">
              Informasi Akun
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-black">
                <FaEnvelope />
                <span>{user.email || "-"}</span>
              </div>
              <div className="flex items-center gap-3 text-black">
                <FaPhone />
                <span>{user.mobile || "-"}</span>
              </div>
            </div>
          </div>

          <div>
            <a
              href="/dashboard/edit-profile"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
            >
              Edit Profile
            </a>
          </div>
        </div>
      </div>

      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
      )}
    </div>
  );
};

export default Profile;
