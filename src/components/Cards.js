/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/style-prop-object */
/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from "sweetalert2";
import OrderForm from "./carditem/OrderForm";

function Cards() {
  const [month, setMonth] = useState("");
  const [countOrder, setCountOrder] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [show, setShow] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [order_detail, setOrderDetail] = useState({});
  const [orderForm, setOrderForm] = useState(false);
  useEffect(() => {
    const m = new Date().getMonth() + 1;
    setMonth(m);
    async function getCountOrder() {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user != null) {
        const id = user.id;
        await axios
          .post(`http://localhost:3030/order/user`, {
            user_id: id,
          })
          .then((result) => {
            setOrderList(result?.data.data);
            setCountOrder(result?.data.data.length);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    getCountOrder();
  }, []);

  const handleOpenModal = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleIdOrder = async (id) => {
    setShow(false);
    const detail = await axios.post("http://localhost:3030/find", {
      id: id,
    });
    if (detail.data.success) {
      console.log(detail.data.data[0].id);
      setShowOrderDetail(true);
      setOrderDetail(detail.data.data[0]);
    }
  };

  const handleCloseOrderDetailModal = () => {
    setShowOrderDetail(false);
  };

  const handleOpenOrderFrom = () => {
    console.log(orderForm);
    setOrderForm(!orderForm);
  };

  const handleCancelOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`http://localhost:3030/order/${id}`)
          .then((result) => {
            console.log(result);
            if (result?.data?.success) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${result?.data?.message}`,
                showConfirmButton: false,
                timer: 1500,
              });
              setShowOrderDetail(false);
            } else {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: `${result?.data?.message}`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };
  const styles = {
    color: "black",
    fontSize: "20px",
  };
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">MANAGE</h1>
      </div>
      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Order
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    <button className="btn btn-primary btn-circle">
                      <i
                        className="fas fa-utensils"
                        onClick={handleOpenOrderFrom}
                      ></i>
                    </button>
                  </div>
                </div>
                <div className="col-auto">
                  <span style={styles}>
                    月<b>{month}</b>
                  </span>
                  <h3 title="show list" onClick={handleOpenModal}>
                    {countOrder}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Requests
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    $215,000
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Tasks
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        50%
                      </div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Pending Requests
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    18
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            List order of 月 <b>{month}</b>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {orderList.map((order) => (
              <li onClick={() => handleIdOrder(order.id)} key={order.id}>
                {order.date}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showOrderDetail} onHide={handleCloseOrderDetailModal}>
        <Modal.Header>
          <Modal.Title>Order detail of {order_detail.date}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {order_detail.user?.name ? (
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Name: {order_detail.user?.name}
              </li>
              <li className="list-group-item">
                Employee: {order_detail.user.employee_id}
              </li>
              <li className="list-group-item">
                Factory: {order_detail.canteen.factory_name}
              </li>
              <li className="list-group-item">
                Department: {order_detail.user.department?.name}
              </li>
              <li className="list-group-item">
                Food: {order_detail.food?.name}
              </li>
            </ul>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col xs={6} className="text-start">
              <Button
                variant="success"
                onClick={() => handleCancelOrder(`${order_detail?.id}`)}
              >
                Delete
              </Button>
            </Col>

            <Col xs={6} className="text-end">
              <Button variant="secondary" onClick={handleCloseOrderDetailModal}>
                Close
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>

      {orderForm ? <OrderForm /> : ""}
    </div>
  );
}

export default Cards;
