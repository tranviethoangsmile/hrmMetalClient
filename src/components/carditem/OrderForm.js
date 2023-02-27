import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { format } from "date-fns";
import { Row, Col } from "react-bootstrap";
import Swal from 'sweetalert2'
import axios from "axios";
import io from 'socket.io-client';
import "react-datepicker/dist/react-datepicker.css";
const socket = io('localhost:3030', { transports: ['websocket'] })

function OrderForm() {
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");
  const [showForm, setShowFrom] = useState(true);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [canteens, setCanteens] = useState([]);
  const [foods, setFoods] = useState([]);
  const [userId, setUserId] = useState("");
  const datePickerRef = useRef(selectedDate);
  // const [data, setData] = useState('');
  const canteenRef = useRef();
  const foodRef = useRef();

  useEffect(() => {
    socket.on('connection', () => {
      console.log('Data updated:');
    });
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user != null) {
      setUserId(user.id);
    }

    async function getCanteens() {
      const canteen = await axios.get("http://localhost:3030/canteen");
      if (canteen.data.success) {
        setCanteens(canteen.data.data);
      }
    }
    getCanteens();

    async function getFoods() {
      const food = await axios.get("http://localhost:3030/food");
      if (food.data.success) {
        setFoods(food.data.data);
      }
    }
    getFoods();
  }, []);

  const handleDate = () => {
    setSelectedDate(datePickerRef.current.value);
  };
  const handleCloseFormOrder = () => {
    setShowFrom(false);
  };

  const handleOrder = () => {
    Swal.fire({
      title: 'confirm?',
      text: `you will order food ${selectedDate}
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, order'
    }).then( async (result) => {
      if (result.isConfirmed) {
        const token = sessionStorage.getItem("token");
    const order = {
      user_id: userId,
      canteen_id: canteenRef.current.value,
      food_id: foodRef.current.value,
      date: selectedDate,
    };
    await axios
      .post(
        "http://localhost:3030/order",
        {
          ...order,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        if (result?.data?.success) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'order success',
            showConfirmButton: false,
            timer: 1500
          })
          setShowFrom(false);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'timeout or ordered',
            showConfirmButton: false,
            timer: 1500
          })
          setShowFrom(false);
        }
      })
      .catch((err) => {
        console.log("e", err);
      });
      }
    })
  };
  return (
    <Modal show={showForm} onHide={handleCloseFormOrder}>
      <Modal.Header>
        <Modal.Title>
          <Row>
            <Col xs={4}>
              <Form.Label>Date</Form.Label>
            </Col>
            <Col xs={8}>
              <input
                type="date"
                value={selectedDate}
                className="form-control"
                ref={datePickerRef}
                onChange={handleDate}
              />
            </Col>
          </Row>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={3} className="form-control">
            <Form.Label>Localtion: </Form.Label>
          </Col>
          <Col>
            <Form.Select
              className="form-control"
              ref={canteenRef}
              onChange={handleDate}
            >
              {canteens.map((canteen) => (
                <option key={canteen.id} value={canteen.id}>
                  {canteen.factory_name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col xs={3} className=" form-control">
            <Form.Label> Food: </Form.Label>
          </Col>
          <Col>
            <Form.Select
              className="form-control"
              ref={foodRef}
              onChange={handleDate}
            >
              {foods.map((food) => (
                <option key={food.id} value={food.id}>
                  {food.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseFormOrder}>
          cancel
        </Button>
        <Button variant="success" onClick={handleOrder}>
          Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrderForm;
