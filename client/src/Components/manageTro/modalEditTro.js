import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateTro } from "../../service/ManageService";
import { toast } from "react-toastify";
import './ModalEdittro.scss'
function ModalEditTro({
  show,
  dataTroEdit,
  handleCloseTro,
  handleEditTrofrommodal,
}) {
  const name = dataTroEdit;
  console.log(name);
  const [roomNumber, setroomNumber] = useState("");
  const [description, setdescription] = useState("Đầy đủ");
  const [price, setprice] = useState("");
  const [roomStatus, setroomStatus] = useState("Phòng trống");
  const [roomArea, setroomArea] = useState("");
  // const [max_occupancy, setmax_occupancy] = useState("");

  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [isReportBrokenVisible, setIsReportBrokenVisible] = useState("");

  const handUpdateImageTro = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files);
    } else {
      // setPreviewImage('');
    }
    // console.log('upload file', event.target.files[0]);
  };
  const handleEditTro = async () => {
    console.log("Roomafter", dataTroEdit);
    console.log("roomID", dataTroEdit.roomID);
    if (roomNumber) {
      console.log("Starting updateTro with:", {
        roomNumber,
        description,
        price,
        roomStatus,
        roomArea,
      });
      let res = await updateTro(
        dataTroEdit.roomId,
        roomNumber,
        description,
        price,
        roomStatus,
        roomArea
      );
      console.log("check res:", res);
      if (res) {
        handleEditTrofrommodal({
          roomId: dataTroEdit.roomId,
          roomNumber: roomNumber,
          description: description,
          price: price,
          roomStatus: roomStatus,
          roomArea: roomArea,
        });
        handleCloseTro();
        toast.success("Update thành công");
      } else {
        toast.error("Update thất bại");
      }
    } else {
      toast.error("Vui lòng nhập tên trước khi lưu");
    }
  };
  useEffect(() => {
    if (show) {
      setroomNumber(dataTroEdit.roomNumber);
      setprice(dataTroEdit.price);
      setdescription(dataTroEdit.description);
      setroomArea(dataTroEdit.roomArea);
      setroomStatus(dataTroEdit.roomStatus);
    }
  }, [dataTroEdit]);

  //   console.log(">>>check props : ",dataTroedit)
  return (
    <Modal
      show={show}
      onHide={handleCloseTro}
      size="xl"
      className="modal-add-tro"
    >
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa danh sách trọ</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        {console.log("data", dataTroEdit)}
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputID" className="form-label">
              Số Phòng
            </label>
            <input
              type="text"
              className="form-control"
              value={roomNumber}
              onChange={(event) => setroomNumber(event.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputType" className="form-label">
              Loại phòng
            </label>
            <select
              className="form-select"
              value={description}
              onChange={(event) => setdescription(event.target.value)}
            >
              <option value="Đầy đủ">Đầy đủ</option>
              <option value="Chưa đầy đủ">Chưa đầy đủ</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="inputPrice" className="form-label">
              Giá Thuê
            </label>
            <input
              type="text"
              className="form-control"
              value={price}
              onChange={(event) => setprice(event.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputType" className="form-label">
              {" "}
              Trình trạng{" "}
            </label>
            <select
              className="form-select"
              value={roomStatus}
              onChange={(event) => setroomStatus(event.target.value)}
            >
              <option value="Phòng trống ">Phòng trống</option>
              <option value="Đang cho thuê">Đang cho thuê</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="inputArea" className="form-label">
              Diện tích
            </label>
            <input
              type="text"
              className="form-control"
              value={roomArea}
              onChange={(event) => setroomArea(event.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label className="label-upload-anhtro" htmlFor="labelUploadTro">
              Thêm Ảnh
              <i className="fa-solid fa-circle-plus"></i>
            </label>
            <input
              type="file"
              hidden
              id="labelUploadTro"
              onChange={(event) => handUpdateImageTro(event)}
            />
          </div>
          <div className="img_tro">
            {previewImage ? (
              <img src={previewImage} alt="Preview" />
            ) : (
              <span>Ảnh chi tiết phòng</span>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseTro}>
          Đóng
        </Button>
        <Button
          variant="primary"
          onClick={(dataTroEdit) => {
            handleEditTro(dataTroEdit);
          }}
        >
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditTro;
