
let yPosition = 0;
document.addEventListener("readystatechange", function(event) {
	if(event.target.readyState == "interactive") {
        // display the elements when javascript is available
    
		// Adding a "JavaScript is Enabled" Body Class

        document.addEventListener('scroll', function(e) {
            yPosition = window.scrollY;
            if (yPosition > 235) {
                document.getElementById("scroll-img").style.display = "none";
            }
            else {
                document.getElementById("scroll-img").style.display = "";
            }
          }
          );
        
        /* JavaScript for Index Page */

        /*
        Shows the reservation pop up if the user selects a valid date.
        Invalid dates:
            - start date before today's date
            - start date > end date
            
        */
        document.getElementById("showbookingpopup").addEventListener("click", function(e) {
            // displays pop up
            document.getElementsByClassName("popup")[0].style.display = "flex";

            // gets the date inputs
            const startDate = document.querySelectorAll("#date-select input")[0].value;
            const endDate = document.querySelectorAll("#date-select input")[1].value;
            const end = new Date(endDate);
            const start = new Date(startDate);
            
            // calculates the number of days of the selected trip
            const numOfDays = ((new Date(endDate)-new Date(startDate)) / (1000 * 3600 * 24));

            // gets today's date
            const today = new Date();
            const todayDate = new Date(today.getFullYear(),today.getMonth(),today.getDate());
            

            console.log("today" + todayDate )
            console.log("start: " + start)
            console.log("end: " +end )

            console.log(isNaN(numOfDays));
            console.log(end < start);
            console.log(start < todayDate);
            

            let startDateFormatted = `${start.getDate()}/${start.getMonth()+1}/${start.getYear()+2000-100}`;
            console.log(startDateFormatted);
            console.log(`${start.getDate()}/${start.getMonth()}/${start.getYear()}`);
            // invalid dates if: number of days is not anumber, end date is before start date, 
            // or when startdate is before today's date;
            // if invalid, shows a message letting the user know that the dates are invalid
            if (isNaN(numOfDays) || (end < start) || (start < todayDate)) {
                document.querySelector(".popup p").innerHTML = "You have chosen \
                an invalid date/s. Please try again."
                document.getElementById("reservenow").style.display = "none";
                document.querySelectorAll("#date-select input")[0].value = "";
                document.querySelectorAll("#date-select input")[1].value = "";
            }
            
            // if the dates are valid, fill in the span of the selected dates for the user to confirm
            // once user presses confirm, they will be directed to the booking 
            // page for them to gill in their details
            else {
                //formatted dates are in format: dd/mm/yyyy
                let startDateFormatted = `${start.getDate()}/${start.getMonth()+1}/${start.getYear()+2000-100}`;
                let EndDateFormatted = `${end.getDate()}/${end.getMonth()+1}/${end.getYear()+2000-100}`;
                
                let arr = [numOfDays, startDateFormatted, EndDateFormatted];
                let span = document.querySelectorAll('.popup span');

                span.forEach((item, index) => {
                    item.innerHTML = arr[index];
                });
                // displays next button to direct user to booking page
                document.getElementById("reservenow").style.display = "";
            }
        }
    );

        // Hides the pop up of the booking date confirmation when the player selects 'cancel'
        document.getElementById("cancelpopup").addEventListener("click", function(e) {
            document.getElementsByClassName("popup")[0].style.display = "none";
            // goes back to default text of the pop up box
            document.querySelector(".popup p").innerHTML = 'You have selected \
            a <span id="numOfDays"></span>-days package from \
            <span></span> to <span></span>.';
        })

        /* 
        When the user presses the "Next" button of the Reservation Popup, 
        the dates they selected will be saved on local storage and they will be directed
        to the booking page. The information saved on the local storage will be used to 
        prefill the dates input in the booking page
        */
        document.getElementById("reservenow").addEventListener("click", function(e) {
            console.log("Clicked;");
            // links to booking page
            location.href = "booking.html";
            // gets the values of the input
            dateBookedFrom = document.querySelectorAll("input")[0].value;
            dateBookedTo = document.querySelectorAll("input")[1].value;
            // saves the values of the date input to a local storage
            localStorage.setItem("dateBookedFrom", dateBookedFrom);
            localStorage.setItem("dateBookedTo",dateBookedTo);
        }




    );


    
    }
});