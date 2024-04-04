let infodata = {};
let imageInfo = {};
let photosInfo = {};
let thumbnailData = {};
let photosData = [];
const formData = new FormData();
const formElementsData = document.querySelectorAll(".product-info");
const formElements = Array.from(formElementsData);
const form = document.getElementById("myForm");

const addProduct = async (product) => {
    try{
        const res = await axios.post('/products/',formData,{headers:{"Content-Type": "multipart/form-data"}});
        console.log(res.data);
        if(res.status===201){
            alert("Product Added Successfully");
        }
        else{
            alert("Product Not Added");
        }
    }catch(error){
      console.log(error);
        alert("Product Not Added Successfully");
    }
}

function handleSubmit(e){
    e.preventDefault();

   formElements.map((elem)=>{
       let formkey = elem.getAttribute("name") ;
           formData.append([formkey], elem.value);
   });
   addProduct();
}

form.addEventListener("submit" , handleSubmit);


document.getElementById("formFile").addEventListener("change",(e)=>{
     thumbnailData = e.target.files[0];

  if (thumbnailData) {
    if (!thumbnailData.type.startsWith('image/')) {
      alert('Please select an image thumbnailData.');
      return; 
    }
    formData.append("image",thumbnailData)

    const reader = new FileReader();

    reader.onload = function(event) {
      const img = new Image();
      img.src = event.target.result; 

      img.onload = function() {
        imagePreview.innerHTML = ''; 
        imagePreview.appendChild(img); 
        img.classList.add("w-100");
        img.classList.add("rounded-3");
      };
    };

    reader.readAsDataURL(thumbnailData); 
  }
    
});

document.getElementById("imageFiles").addEventListener("change",(e)=>{
  photosData = e.target.files;
 if(photosData){
  let formObject = {};
  for (i=0 ; i<photosData.length;i++) {
     const file = photosData[i];
     formData.append("photos",file);
  }
  console.log(formObject);
 }


})


