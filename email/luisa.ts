export const luisaEmail = (form: any) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
  
    <body>
      <div
        id=":zz"
        class="ii gt"
        jslog="20277; u014N:xr6bB; 1:WyIjdGhyZWFkLWY6MTc4OTU5NTQzMDYzNjg1MDE0NCJd; 4:WyIjbXNnLWY6MTc4OTU5NTQzMDYzNjg1MDE0NCJd"
      >
        <div id=":ub" class="a3s aiL">
          <div>
            <div class="adM"></div>
            <div>
              <div class="adM"></div>
              <a
                href="https://www.luisaviaroma.com"
                style="text-decoration: none"
                target="_blank"
                data-saferedirecturl="https://www.google.com/url?q=https://www.luisaviaroma.com&amp;source=gmail&amp;ust=1706777600649000&amp;usg=AOvVaw0wgDtElNg5yuI6nFH0xxv8"
              >
                <img
                  style="border: none"
                  src="https://ci3.googleusercontent.com/meips/ADKq_Nbhad-ZdexBo5aPWMHz1uDAtg6pv1WMu4JsnLT7cgKbNX6RCptIvzXgTpJZ0ZDW-pPdDLZ7xgP5EW40n5UIzscYCnQgkYG3P7iXMcfkLvp9hvJ1aUH42P1pimE8EJ2-vi8F6CTm54UsUbhAlOgizw=s0-d-e1-ft#https://share1.cloudhq-mkt3.net/images_2467814_73bcdf90-7274-013c-8d11-64434b0c2d74_14809"
                  alt="LUISAVIAROMA.COM"
                  class="CToWUd"
                  data-bit="iit"
                />
              </a>
              <br />
              <br />
              <br />
            </div>
            <div style="color: black; font-family: Arial; font-size: 12px">
              Dear ${form?.full_name},
              <br />
              <br />Thank you for choosing
              <a
                href="http://LUISAVIAROMA.COM"
                target="_blank"
                data-saferedirecturl="https://www.google.com/url?q=http://LUISAVIAROMA.COM&amp;source=gmail&amp;ust=1706777600649000&amp;usg=AOvVaw053tYtpjQm0i5m9uBkFGk9"
                >LUISAVIAROMA.COM</a
              >.
              <br />
              <br />
              <strong
                >Order Number: ${form?.order_number} Date: ${form?.order_date}.</strong
              >
              <br />
              <br />Order Confirmation:
              <br />
              <br />
              <div style="color: black; font-family: Arial; font-size: 12px">
                <table style="color: black; font-family: Arial; font-size: 12px">
                  <tbody>
                    <tr style="border-bottom: 1px solid #ccc">
                      <th style="padding-bottom: 5px">Item</th>
                      <th
                        style="
                          padding-bottom: 5px;
                          text-align: left;
                          width: 300px;
                        "
                      >
                        Description
                      </th>
                      <th
                        style="
                          padding-bottom: 5px;
                          text-align: left;
                          width: 100px;
                        "
                      >
                        Availability
                      </th>
                      <th
                        style="
                          padding-bottom: 5px;
                          text-align: left;
                          width: 200px;
                        "
                      >
                        Price
                      </th>
                      <th
                        style="padding-bottom: 5px; text-align: left; width: 55px"
                      >
                        Quantity
                      </th>
                      <th
                        style="
                          padding-bottom: 5px;
                          text-align: right;
                          width: 200px;
                        "
                      >
                        Total
                      </th>
                    </tr>
                    <tr style="border-bottom: 1px solid #ccc">
                      <td style="padding-bottom: 5px; padding-top: 5px">
                        <img
                          style="border: none"
                          src="${form?.image_link}"
                          alt=""
                          width="70"
                          height="93"
                          class="CToWUd"
                          data-bit="iit"
                          jslog="138226; u014N:xr6bB; 53:WzAsMl0."
                        />
                      </td>
                      <td style="padding-bottom: 10px" colspan="7">
                        <table
                          style="
                            color: black;
                            font-family: Arial;
                            font-size: 12px;
                          "
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  text-align: left;
                                  vertical-align: top;
                                  width: 300px;
                                "
                              >
                                ${form?.item_name}
                                <br />
                                <span style="text-transform: uppercase"
                                  >Size: ${form?.size}
                                  <br />
                                  <span style="text-transform: uppercase"
                                    >Color: ${form?.color}
                                    <br />
                                    <span style="text-transform: uppercase"
                                      >CODE: ${form?.style}</span
                                    >
                                  </span>
                                </span>
                              </td>
                              <td
                                style="
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100px;
                                "
                              >
                                Now
                              </td>
                              <td
                                style="
                                  text-align: left;
                                  vertical-align: top;
                                  width: 200px;
                                "
                              >
                                ${form.subtotal}
                              </td>
                              <td
                                style="
                                  text-align: left;
                                  vertical-align: top;
                                  width: 55px;
                                "
                              >
                                1
                              </td>
                              <td
                                style="
                                  text-align: right;
                                  vertical-align: top;
                                  width: 200px;
                                "
                              >
                                ${form.subtotal}
                              </td>
                            </tr>
                            <tr>
                              <td style="font-weight: bold" colspan="7">
                                &nbsp;
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>&nbsp;</p>
              </div>
              <br />
              <br />
              <div style="color: black; font-family: Arial; font-size: 12px">
                Subtotal (VAT included): ${form.subtotal}
                <br />
                <br />Shipping cost (Standard Shipping): ${form?.shipping}
                <br />
                <br />
                <strong>Total amount: ${form?.total}</strong>
                <br />
                <br />
              </div>
              <br />As soon as your order is shipped, you will receive an email
              with your tracking number. You may use this number to track your
              shipment on the courier's website.
              <br />
              <br />You can check the status of your order online by going to
              <a
                href="https://www.luisaviaroma.com/myarea/login#signin"
                target="_blank"
                data-saferedirecturl="https://www.google.com/url?q=https://www.luisaviaroma.com/myarea/login%23signin&amp;source=gmail&amp;ust=1706777600649000&amp;usg=AOvVaw0h4ZOt2endCSUA0Ip8sswZ"
                >MY AREA</a
              >.
              <br />
              <br />Items can be returned for a refund within 28 days of the
              order’s delivery date, in accordance with our Return Policy.
              <br />
              <br />For more information concerning returns from your shipping
              destination, click
              <a
                href="https://www.luisaviaroma.com/en-sk/contactus/return-policy"
                target="_blank"
                data-saferedirecturl="https://www.google.com/url?q=https://www.luisaviaroma.com/en-sk/contactus/return-policy&amp;source=gmail&amp;ust=1706777600649000&amp;usg=AOvVaw37KHGKH-xWM7AwZfG0HKLS"
                >here</a
              >.
              <br />
              <br />To request a return please go to
              <a
                href="https://www.luisaviaroma.com/myarea/login#signin"
                target="_blank"
                data-saferedirecturl="https://www.google.com/url?q=https://www.luisaviaroma.com/myarea/login%23signin&amp;source=gmail&amp;ust=1706777600649000&amp;usg=AOvVaw0h4ZOt2endCSUA0Ip8sswZ"
                >MY AREA</a
              >
              and fill out the online return form.
              <br />
              <br />For all inquiries regarding this order, please refer to the
              Order Number in an email to:
              <a
                style="color: #999999; font-size: 12px; font-family: Arial"
                href="mailto:customerservice@luisaviaroma.com"
                target="_blank"
                >customerservice@luisaviaroma.<wbr />com</a
              >
              <br />
              <br />Best, <br />LUISAVIAROMA Team
              <br />
              <br />
            </div>
            <div>
              <br />
              <br />
              <span style="color: black; font-family: Arial; font-size: 12px">
                <img
                  style="border: none"
                  src="https://ci3.googleusercontent.com/meips/ADKq_Na43uYuUzaCNbIO2hk_-JY84kqyJ8iQGj7tN5E8ENx7Img2fZw3cBDTg-7h13Quz5K-XRbvlZACAUOmjoFfW4ldzr3TXexFs7LMyQI_GoL2hD2WQmukFP0Ow0dCJgFSzVtzLmmxfs44wKOQdJST=s0-d-e1-ft#https://share1.cloudhq-mkt3.net/images_2467814_74650670-7274-013c-b09e-64434b0c2d74_9933"
                  alt="LUISAVIAROMA.COM"
                  width="180px"
                  class="CToWUd"
                  data-bit="iit"
                />
                <br />TEL. +39.055.093.60.54 <br />Email:
                <a href="mailto:customerservice@luisaviaroma.com" target="_blank"
                  >customerservice@luisaviaroma.<wbr />com</a
                >
                <br />Skype: luisaviaroma
                <br />
              </span>
              <br />
              <span
                style="
                  font-size: 8pt;
                  color: gray;
                  font-family: Tahoma;
                  font-style: italic;
                "
                >Email Confidentiality Notice and Disclaimer. This Email and any
                files transmitted with it are confidential and are intended solely
                for the use of the individual or entity to which they are
                addressed. Access to this Email by anyone else is unauthorized. If
                you are not the intended recipient, any disclosure, copying,
                distribution or any action taken or omitted to be taken in
                reliance on it, is prohibited. Luisa Via Roma S.p.A. does not
                accept responsibility for any changes made to this message after
                it was sent. Email messages are not necessarily secure. Please
                note that Luisa Via Roma S.p.A. checks outgoing Email messages for
                the presence of computer viruses.
                <br />
                <strong
                  >Luisa Via Roma S.p.A. – Via Benedetto Varchi 61 – Firenze –
                  Italia. Capitale sociale: 1.000.000,00 i.v. Numero di
                  registrazione in Italia: FI-53386 – Partita IVA: IT
                  00607970480.</strong
                >
                <div class="yj6qo"></div>
                <div class="adL"></div
              ></span>
              <div class="adL"></div>
            </div>
            <div class="adL"></div>
          </div>
          <div class="adL"></div>
        </div>
      </div>
    </body>
  </html>
  `;
};
