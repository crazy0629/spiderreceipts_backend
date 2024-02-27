export const supremeEmail = (form: any) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
  
    <body>
      <div
        id=":13x"
        class="ii gt"
        jslog="20277; u014N:xr6bB; 1:WyIjdGhyZWFkLWY6MTc4OTYwODYzODgyMTEwMzA3MiJd; 4:WyIjbXNnLWY6MTc4OTYwODYzODgyMTEwMzA3MiJd"
      >
        <div id=":16g" class="a3s aiL">
          <div>
            <div class="adM"></div>
            <tt
              >Supreme<br />
              ..............................<wbr />............................<br />
              ${form?.order_date} at ${form?.time}<br />
              ..............................<wbr />............................<br />
              online shop order<br />
              ..............................<wbr />............................<br />
              <br />
              Dear ${form?.full_name}<br />
              <br />
              Your order has been successfully submitted on ${form?.order_date} at
              ${form?.time}.<br />
              Please allow 3-5 business days for processing and another 5-7
              business days for shipping.<br />
              <br />
              A tracking number will be emailed to you as soon as your order has
              been shipped.<br />
              <br />
              Order ${form?.order_number}<br />
              ..............................<wbr />............................<br />
              ${form?.item}<br />
              Style: ${form?.style}<br />
              Size: ${form?.size}<br />
              Price: ${form?.subtotal}<br />
              ..............................<wbr />............................
              <br />
              cart total: ${form?.subtotal}<br />
              shipping &amp; handling: ${form?.shipping}<br />
              tax: ${form?.taxes}<br />
              order total: ${form?.total}<br />
              ..............................<wbr />............................<br />
              <br />
              Please note: Orders with multiple items may ship separately.<br />
              <br />
              The exact tax rate for your order will be calculated according to
              applicable<br />
              rates and rules for your local tax jurisdiction and will be
              reflected once<br />
              final payment is settled. For more information about sales tax,
              please visit<br />
              our faq page
              <a
                href="https://supreme.com/pages/faq"
                target="_blank"
                data-saferedirecturl="https://www.google.com/url?q=https://supreme.com/pages/faq&amp;source=gmail&amp;ust=1706790197537000&amp;usg=AOvVaw3DnMHvKaGuSA0x-DKAsp_o"
                >https://supreme.com/pages/faq</a
              ><br />
              <br />
              For more information, please review our terms
              <a
                href="https://supreme.com/pages/terms"
                target="_blank"
                data-saferedirecturl="https://www.google.com/url?q=https://supreme.com/pages/terms&amp;source=gmail&amp;ust=1706790197537000&amp;usg=AOvVaw1mPrd4yZrw11PIsbZ7MmSR"
                >https://supreme.com/pages/<wbr />terms</a
              ></tt
            >
            <div class="yj6qo"></div>
            <div class="adL"></div>
          </div>
          <div class="adL"></div>
        </div>
      </div>
    </body>
  </html>
  `;
};
