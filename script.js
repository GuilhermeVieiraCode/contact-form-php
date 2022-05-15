const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e) => {
    e.preventDefault();
    statusTxt.style.color = "#0D6EFD";
    statusTxt.style.display = "block";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "message.php", true);
    xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            let response = xhr.response;
            let feedbacks = [
                "Email and message field are required",
                "Enter a valid email address",
                "Sorry, failed to send your message"
            ]    
            if(response.indexOf(feedbacks[0]) != -1 || response.indexOf(feedbacks[1]) != -1 || response.indexOf(feedbacks[2]) != -1){
                statusTxt.style.color = "red";    
            }else{
                form.reset();
                setTimeout(() => {
                    statusTxt.style.display = "none"
                }, 3000)
            }
            statusTxt.innerHTML = response;
        }
    }
    let formData = new FormData(form);
    xhr.send(formData);
}