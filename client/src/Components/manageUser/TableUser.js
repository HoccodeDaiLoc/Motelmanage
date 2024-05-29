import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllUser } from "../../service/ManageService";
import style from "../../Components/ManagerApp.modules.scss";
import ModalAdd from "./modalAdd";
import ModalEdit from "./modalEdit";
import ModalConfirm from "./ModalConfirm"; // Kiểm tra lại tên component ModalConfirm
import _ from "lodash";
import { debounce } from "lodash";
import ModalDetailUser from "./modalDetailUser";
const TableUser = (props) => {
  const [listUser, setListUser] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const [dataUseredit, setDataUserEdit] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [dataUserDelete, setDataUserDelete] = useState({});
  const [keyword, setKeyWord] = useState("");

  const [isShowModalDetail, setIsShowModalDetail] = useState(false);
  const [dataDetailUser, setDataDetailUser] = useState({});
  const handleClose = () => {
    setIsShowModalAdd(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
    setIsShowModalDetail(false);
  };
  const handUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };
  const handleEditUserfrommodal = (user) => {
    let cloneListuser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListuser[index].first_name = user.first_name;
    setListUser(cloneListuser);
  };
  const handleDetailUserfrommodal = (user) => {
    let cloneListuser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListuser[index].first_name = user.first_name;
    setListUser(cloneListuser);
  };
  useEffect(() => {
    getUser(1);
  }, []);
  const getUser = async (page) => {
    try {
      const res = await fetchAllUser(page);

      if (res && res.renterList) {
        const { data, total_pages } = res.renterList;
        setTotalUser(res.renterList.total);
        setListUser(res.renterList);
        setTotalPage(res.total_pages);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
  };
  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };
  const handDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };
  const handDeleteUserFromModal = (user) => {
    let cloneListuser = _.cloneDeep(listUser);
    cloneListuser = cloneListuser.filter((item) => item.id !== user.id);
    setListUser(cloneListuser);
  };
  const confirmDelete = (user) => {
    console.log("Xác nhận xóa:", user);
    handleClose();
  };
  const handleSearch = debounce((event) => {
    const term = event.target.value;
    if (term) {
      const cloneListuser = _.cloneDeep(listUser);
      const filteredUsers = cloneListuser.filter((item) => 
        item.name && item.name.includes(term)
      );
      setListUser(filteredUsers);
    } else {
      getUser(1);
    }
  }, 100);
  const handDetailUser = (user) => {
    setIsShowModalDetail(true);
    setDataDetailUser(user);
  };
  // Format ngày tháng năm
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>Danh sách khách hàng:</b>
        </span>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAdd(true)}
        >
          <i class="fa-solid fa-user-plus"></i> Thêm danh sách
        </button>
      </div>
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Tìm kiếm tên khách hàng ..."
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <div className="header-red">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tên khách hàng</th>
              <th>Ngày sinh </th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Số CCCD</th>
              <th>Khác</th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.map((item, index) => (
                <tr key={`user-${index}`}>
                  <td>{item.name}</td>
                  <td>{formatDate(item.dateOfBirth)}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.cccd}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handDeleteUser(item)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success mx-2"
                      onClick={() => handDetailUser(item)}
                    >
                      Chi Tiết
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={6}
        pageCount={totalPage}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAdd
        show={isShowModalAdd}
        handleClose={handleClose}
        handUpdateTable={handUpdateTable}
      />
      <ModalEdit
        show={isShowModalEdit}
        dataUseredit={dataUseredit}
        handleClose={handleClose}
        handleEditUserfrommodal={handleEditUserfrommodal}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handDeleteUserFromModal={handDeleteUserFromModal}
      />
      <ModalDetailUser
        show={isShowModalDetail}
        dataDetailUser={dataDetailUser}
        handleClose={handleClose}
        handleDetailUserfrommodal={handleDetailUserfrommodal}
      />
    </>
  );
};
export default TableUser;