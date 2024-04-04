console.log("Jai Shree Ram");

const allProducts = async () => {
  const res = await fetch("/products");
  const data = await res.json();
  let color="";
  console.log(data);

 const handleEdit = async (Id) => {
var id = Id;
var key = 'productId';
// Construct the URL with query parameters
var url = '/edit-product.html?key=' + key + '&value=' + id;

// Redirect to the constructed URL
window.location.href = url;
 }

 handleDelete = async (Id) => {
      try{
        let value = confirm("Do you really want to Delete?");
        console.log
        if(value){
          const res = await axios.delete(`/products/${Id}`);
          if(res.status===200){
            window.location.href="/products.html";
          }
          else{
            alert("Product status not deleted successfully");
          }
        }else{
      
        }
      }catch(error){
        console.log(error);
        alert("Product not deleted");
      }
 }


  // Concatenate the HTML code into a single string
  data.map((elem,index)=>{
    let num = Math.trunc(index/5);
     let checker = (index-5*num)
    switch(checker){
      case 0: 
      color="primary";
      break;
      case 1: 
      color="secondary";
      break;
      case 2: 
      color="success";
      break;
      case 3: 
      color="info";
      break;
      case 4: 
      color="danger";
      break;
      default : 
      color="primary";
    }
    const image = elem.thumbnail;
    const title = elem.title;
    const price = elem.price;
    const productId = elem._id;
    const description = elem.description;
    var htmlCode = '<div class="col-sm-6 col-xl-4">' +
    '<div class="card overflow-hidden rounded-2">' +
      '<div class="modify-hover">' +
        '<div class="position-relative">' +
          '<a href="javascript:void(0)"><img src="./uploads/'+image+'" class="card-img-top rounded-0" alt="..."></a>' +
          '<a href="javascript:void(0)" class="bg-'+ color + ' rounded-circle p-9 text-white fs-4 d-flex round-60 align-items-center  justify-content-center  position-absolute bottom-0 end-0 mb-n4 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart">$'+ price + '</a>' +
        '</div>' +
        '<div class=" product-edit">' +
        '<button class="btn btn-info me-2 editProduct" data-productId="'+productId+'" ><i class="ti ti-edit fs-4" ></i></button>' +
          '<button class="btn btn-danger deleteProduct" data-productId="'+productId+'"><i class="ti ti-trash fs-4"></i></button>' +
        '</div>' +
      '</div>' +
      '<div class="card-body pt-3 p-4">' +
        '<h6 class="fw-bolder fs-4 mb-2">'+ title +'</h6>' +
        '<div class="d-flex align-items-start flex-column gap-1">' +
          '<h6 class="fw-semibold mb-0 order-2 text-uppercase">'+ description +'</h6>' +
          '<ul class="list-unstyled d-flex align-items-center mb-0 order-1">' +
            '<li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>' +
            '<li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>' +
            '<li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>' +
            '<li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>' +
            '<li><a class="" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';

  // Append the HTML code to a container
  var container = document.getElementById("product-container");
  container.innerHTML += htmlCode;
  });
  let groupEdit = document.querySelectorAll(".editProduct");
  let groupDelete = Array.from(document.querySelectorAll(".deleteProduct"));
  groupDelete.map((elem)=>{
    let Id = elem.getAttribute("data-productid");
    elem.addEventListener("click",()=>{
      console.log(Id);
          handleDelete(Id);
    })
  })
  let editArr = Array.from(groupEdit);
  editArr.map((elem)=>{
     let Id = elem.getAttribute("data-productid");
     elem.addEventListener("click",()=>{
       handleEdit(Id);
     });
  })

};


allProducts();
