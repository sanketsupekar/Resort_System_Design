 function getEnquiryFormat(question,answer){
    return (
        `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #4b0000;text-decoration:none;font-weight:600">Coconut County Resort</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for contacting us. Here is your Question and Answer </p>
          <h5 style="margin:0px;">Question : </h5> 
          <p style="margin:0px">${question}</p>
            <h5 style="margin:0px">Answer : </h5>
            <p style="margin:0px">${answer}</p>
        
          <p style="font-size:0.9em;">Regards,<br />Cocout County Resort</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
           <p>Murambi, </p> 
           <p>Wadiwarhe - Ahurli Road,</p>  
           <p>Trimbak, road, Nashik, </p> 
           <p>Maharashtra 422403</p> 
          </div>
        </div>
      </div>`
    )
}

 function getEmailFormat(){
    return (
        `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #4b0000;text-decoration:none;font-weight:600">Coconut County Resort</a>
          </div>
          <p style="font-size:1.1em">Dear Sanket,</p>
          <p>&emsp; We hope this email finds you well. We are delighted to inform you that your booking for a stay at R has been successfully processed, and your reservation is confirmed!</p>
          <p style="font-size:0.9em;">Regards,<br />Cocout County Resort</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
           <p>Murambi, </p> 
           <p>Wadiwarhe - Ahurli Road,</p>  
           <p>Trimbak, road, Nashik, </p> 
           <p>Maharashtra 422403</p> 
          </div>
        </div>
      </div>`
    )
}

 function getBookingConfirmationFormat(Customer,Booking){
    return (
        ` <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Resort Booking Confirmation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
        
                h1 {
                    color: #4b0000;
                }
        
                p {
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Resort Booking Confirmation</h1>
                <p>Dear ${Customer.firstName},</p>
                
                <p>We are excited to confirm your booking at Coconut County Resort. Your reservation details are as follows:</p>
        
                <ul>
                    <li><strong>Reservation ID:</strong> ${Booking._id}</li>
                    <li><strong>Check-in Date:</strong> ${Booking.checkInDate}</li>
                    <li><strong>Check-out Date:</strong>${Booking.checkOutDate}</li>
                    <li><strong>Number of Guests:</strong> Adults : ${Booking.adults} and Children : ${Booking.childrens} </li>
                    <li><strong>Total Amount Paid:</strong> ${Booking.amount}</li>
                </ul>
        
                <p>We look forward to providing you with an unforgettable experience at Coconut County Resort. If you have any questions or special requests, feel free to contact our customer service team at [Customer Service Email] or [Customer Service Phone Number].</p>
        
                <p>Thank you for choosing Coconut County Resort. We can't wait to host you!</p>
        
                <p>Best regards,<br>Coconut County Resort</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Murambi, </p> 
                  <p>Wadiwarhe - Ahurli Road,</p>  
                  <p>Trimbak, road, Nashik, </p> 
                  <p>Maharashtra 422403</p> 
              </div>
              <div style="clear: both;"></div>
            </div>
        </body>
        </html>`
    )
}
 function getArrivalConfirmationFormat(Customer,Booking){
    return (
        `  <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Arrival Confirmation </title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
        
                h1 {
                    color: #4b0000;
                }
        
                p {
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Arrival Confirmation</h1>
                <p>Dear ${Customer.firstName},</p>
                
                <p>Welcome to Coconut County Resort! We are thrilled to inform you that your arrival has been successfully processed. We hope you have a fantastic stay with us.</p>
        
                <p>Here are some key details for your reference:</p>
        
                <ul>
                    <li><strong>Reservation ID:</strong> ${Booking._id} </li>
                    <li><strong>Check-in Date:</strong> ${Booking.checkInDate}</li>
                </ul>
        
                <p>If you have any questions or need assistance during your stay, please don't hesitate to contact our front desk or visit us in person.</p>
        
                <p>Thank you for choosing Coconut County Resort. We wish you a memorable and enjoyable time with us!</p>
        
                <p>Best regards,<br>Coconut County Resort</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Murambi, </p> 
                  <p>Wadiwarhe - Ahurli Road,</p>  
                  <p>Trimbak, road, Nashik, </p> 
                  <p>Maharashtra 422403</p> 
              </div>
              <div style="clear: both;"></div>
            </div>
        </body>
        </html>`
    )
}
 function getDepartureFormat(Customer,Booking){
    return (
        ` <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Departure Confirmation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
        
                h1 {
                    color: #4b0000;
                }
        
                p {
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Departure Confirmation</h1>
                <p>Dear ${Customer.firstName},</p>
                
                <p>We hope you had a wonderful stay at Coconut County Resort. As you depart, we would like to extend our sincere gratitude for choosing us for your accommodation.</p>
        
                <p>Below are the details of your stay:</p>
        
                <ul>
                    <li><strong>Reservation ID:</strong> ${Booking._id}</li>
                    <li><strong>Check-in Date:</strong> ${Booking.checkInDate}</li>
                    <li><strong>Check-out Date:</strong> ${Booking.checkOutDate}</li>
                </ul>
        
                <p>If there's anything we can improve upon or if you have any feedback, please feel free to share it with us. We value your input and strive to make every guest's experience exceptional.</p>
        
                <p>Thank you once again for choosing Coconut County Resort. We hope to have the pleasure of hosting you again in the future!</p>
        
                <p>Best regards,<br>Coconut County Resort</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Murambi, </p> 
                  <p>Wadiwarhe - Ahurli Road,</p>  
                  <p>Trimbak, road, Nashik, </p> 
                  <p>Maharashtra 422403</p> 
              </div>
              <div style="clear: both;"></div>
            </div>
        </body>
        </html>`
    )
}
 function getCompletedFormat(Customer, Booking){
    return (
        ` <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Visiting Coconut County Resort</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
        
                h1 {
                    color: #4b0000;
                }
        
                p {
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Thank You for Visiting Us</h1>
                <p>Dear ${Customer.firstName},</p>
                
                <p>We would like to express our sincere gratitude for choosing Coconut County Resort for your recent stay. It was our pleasure to have you as our guest.</p>
        
                <p>We hope you enjoyed your time with us and that it added to the wonderful memories of your trip. Your satisfaction is our priority, and we appreciate the opportunity to serve you.</p>
        
                <p>Thank you again for choosing Coconut County Resort. We look forward to welcoming you back in the future. Please do not hesitate to reach out if there is anything we can assist you with in the meantime.</p>
        
                <p>Safe travels, and we hope to see you again soon!</p>
                <p>Best regards,<br>Coconut County Resort</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Murambi, </p> 
                  <p>Wadiwarhe - Ahurli Road,</p>  
                  <p>Trimbak, road, Nashik, </p> 
                  <p>Maharashtra 422403</p> 
              </div>
              <div style="clear: both;"></div>
            </div>
        </body>
        </html>`
    )
}



module.exports = {getEnquiryFormat,getEmailFormat,getArrivalConfirmationFormat,getBookingConfirmationFormat,getDepartureFormat,getCompletedFormat};