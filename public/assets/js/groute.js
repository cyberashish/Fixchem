const allProducts = async () => {
    const res = await axios.get("/products/groute");
    const productsData = res.data;
    console.log(productsData);
    let parentContainer = document.getElementById("all-products");

    productsData.map((elem)=>{
        let img= elem.thumbnail;
        let title = elem.title;
        let description = elem.description;
        let Id  = elem._id;

        let htmlCode = '<div class="col-lg-4 col-md-6 col-sm-12">' +
        '<div class="product-item mb-35">' +
          '<div class="product-thumbnail">' +
            '<a href="single_product.html?productId='+Id+'">' +
              '<img src="/uploads/'+img+'" alt="product">' +
            '</a>' +
          '</div>' +
          '<div class="product-info">' +
            '<h3 class="title">' +
              '<a href="FC-11.html">'+title+'</a>' +
            '</h3>' +
            '<ul class="rating">' +
              '<li><i class="icofont-star"></i></li>' +
              '<li><i class="icofont-star"></i></li>' +
              '<li><i class="icofont-star"></i></li>' +
              '<li><i class="icofont-star"></i></li>' +
              '<li><i class="icofont-star"></i></li>' +
            '</ul>' +
            '<span class="off-price">'+description+'</span>' +
          '</div>' +
        '</div>' +
      '</div>';

parentContainer.innerHTML += htmlCode;
    })
};

allProducts();