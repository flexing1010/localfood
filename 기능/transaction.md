## 결제 프로세스

### 결제

- 아임포트 API를 사용하여 결제 시스템을 구현하였습니다(테스트 모드 이기 때문에 결제된 비용은 오후 11시 이후 자동 취소됩니다.)

```
client-side

  const submitOrder = (e) => {
    orderItems.forEach((item) => {
      item.stock = item.stock - item.quantity;
    });
    e.preventDefault();
    const data = {
      pay_method: values.pay_method,
      merchant_uid: `min_${new Date().getTime()}`,
      amount: orderInfo.grandTotal,
      buyer_name: values.name,
      buyer_tel: values.buyer_tel,
      buyer_email: values.email,
      buyer_addr: `${fullAddress} ${values.address2}`,
      name:
        orderItems.length === 1
          ? orderItems[0].product_name
          : `${orderItems[0].product_name} 외 ${orderItems.length - 1}`,
      m_redirect_url: `https://sleepy-austin-0254fa.netlify.app/order/payment/${transactionInfo.order_id}/mobile`,
    };

    const { IMP } = window;
    IMP.init("imp83950599");

    IMP.request_pay(data, (response) => {
      if (response.success === true) {

        axios
          .post("https://tennis365-api.herokuapp.com/order/result", {
            user_id: transactionInfo.user_id,
            order_id: transactionInfo.order_id,
            merchant_uid: data.merchant_uid,
            imp_uid: response.imp_uid,
            status: 0,
            orderItems,
            amount: orderInfo.grandTotal,
          })
          .then((res) => {
            if (res.status === 200) {
              history.push({
                pathname: `/order/payment/${response.merchant_uid}`,
              });
            }
          });
      } else {
         console.log(response);
      }
    });

  };
```

- 주문페이지에서 결제하기 버튼을 누르면 PG사의 결제창에 연결된다.
- 결제를 성공적으로 마치면 서버 API에 결제 정보를 post request로 보내 내용을 저장한다.
- 저장이 완료 되면 결제완료 페이지로 이동
