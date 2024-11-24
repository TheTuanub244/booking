import React, { useEffect, useState } from 'react';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import './resultPayment.css';




function ResultPayment() {

  const location = useLocation(); // Lấy thông tin URL hiện tại
  const queryParams = new URLSearchParams(location.search); // Lấy các tham số query từ URL
  const navigate = useNavigate();

  // Lấy giá trị của tham số vnp_BankCode
  const amount = queryParams.get('vnp_Amount');
  const transactionStatus = queryParams.get('vnp_TransactionStatus');
  const payDate = queryParams.get('vnp_PayDate');
  const transactionCode = queryParams.get('vnp_TxnRef');
  const email = localStorage.getItem('email');
  const [message, setMessage] = useState(true);
  useEffect(() => {
    if (transactionStatus === '00') {
      setMessage(true);
    } else {
      setMessage(false);
    }
  }, []);


  const handleReturnHome = () => {
    navigate('/');
  }

  const handleReturnPayment = () => {
    navigate('/payment');
  }
  return (



    <div className='resultPayment'>
      {message ? (
        <div>
          <h4>Giao dịch được thực hiện thành công. Cảm ơn quý khách đã sử dụng dịch vụ</h4>
          <table className='transactionInfoTable'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>

            </thead>
            <tbody>
              <tr>
                <td>Email</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>Số tiền được thanh toán</td>
                <td>{amount}</td>
              </tr>
              <tr>
                <td>Mã giao dịch</td>
                <td>{transactionCode}</td>
              </tr>

              <tr>
                <td>Thời gian giao dịch</td>
                <td>{payDate}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={handleReturnHome}>Quay trở lại trang chủ</button>

        </div>
      ) : (
        <div>
          <h4>Giao dịch thất bại.Quý khách vui lòng quay lại trang thanh toán để thực hiện lại giao dịch</h4>
          <button onClick={handleReturnPayment}>Quay trở lại trang thanh toán</button>
        </div>
      )}

    </div>
  );
}

export default ResultPayment;