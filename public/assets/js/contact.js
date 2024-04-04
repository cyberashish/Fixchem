const form_elements = Array.from(document.querySelectorAll(".form_control"));

const formdata = new FormData();

const target_form = document.getElementById("contact-form");

const addContact = async () => {
    try{
        const res = await axios.post("/contacts",formdata,{headers:{"Content-Type":"multipart/form-data"}});
        console.log(res.data);
        if(res.status===400){
            alert("Submission Failed");
        }
        else{
            alert("Form Submitted");
        }
    }catch(error){
        console.log(error);
        alert("Submission Failed");
    }
}

target_form.addEventListener("submit",(e)=> {
    e.preventDefault();
    form_elements.map((elem)=>{
        let key = elem.getAttribute("name");
        let value = elem.value;
       formdata.append([key],value);
    });
    addContact();
})


