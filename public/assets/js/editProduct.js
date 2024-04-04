function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
const productId = getQueryParameter('value');

let handleGet = async (productId) => {
  const res = await axios.get(`/products/${productId}`);
  let finalData = res.data;

const formElementsData = document.querySelectorAll(".form-control");
const formElements = Array.from(formElementsData);

formElements.map((elem)=> {
    let name = elem.getAttribute("name");
     
    for(key in finalData){
       if(key===name){
        if(key==="category"){
         elem[0].value = finalData[key];
        }
        else if(key==="brand"){
            elem[0].value = finalData[key];
        }
        else{
            elem.value = finalData[key];
        }
       }
       else{
        const img = new Image();
        let imagename = finalData["thumbnail"];
        img.src = `/uploads/${imagename}`; 

        img.onload = function(){
            document.getElementById("imagePreview").innerHTML="";
            document.getElementById("imagePreview").appendChild(img);
            img.classList.add("w-100");
            img.classList.add("rounded-3");
        }
       }
    }
})

}

handleGet(productId);

let formInfoData = {};
let imageInfo = {};
let formAction = document.getElementById("myForm");

const handleSubmit = async (e) => {
    e.preventDefault();
     try{
        let finalData = {...formInfoData,...imageInfo};
        const res = await axios.patch(`/products/${productId}`,finalData,{headers:{"Content-Type": "multipart/form-data"}});
        if(res.status===201){
            alert("Product Updated Successfully");
        }
        else{
            alert("Product Not updated");
        }
     }catch(error){
        alert("Product Not updated");
     }
    
    
}

formAction.addEventListener("submit",handleSubmit);

const formElements = Array.from(document.querySelectorAll(".product-info"));
formElements.map((elem)=>{
    elem.addEventListener("change",(e)=>{
        let formPairs = {[e.target.name]:e.target.value};
        formInfoData = {...formInfoData,...formPairs};
    })
});

document.getElementById("formFile").addEventListener("change",(e)=>{
       let imageData = e.target.files[0];
       if(imageData){
        if(!imageData.type.startsWith("image/")){
          alert("Please select an image imageData.");
          return;
        }
        else{
            imageInfo = {"image":imageData};
            const reader = new FileReader();

            reader.onload = function(event){
                const img = new Image();
                img.src = event.target.result;

                img.onload = function(){
                    document.getElementById("imagePreview").innerHTML = "";
                    document.getElementById("imagePreview").appendChild(img);
                    img.classList.add("w-100");
                    img.classList.add("rounded-3");
                }
            }
            reader.readAsDataURL(imageData);

        }
       }
})

// document.getElementById("btn-cancel").addEventListener("click",()=>{
//     window.location.href="/products.html"
// })

