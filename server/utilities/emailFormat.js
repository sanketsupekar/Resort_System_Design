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

module.exports = {getEnquiryFormat};