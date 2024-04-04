
const tbody = document.querySelector(".table > tbody");



const addInquiry = async (row_elem) => {
    const res = await axios.get("/contacts");
    const InquiryData = res.data;
    let elementName = row_elem.tagName;

    InquiryData.reverse().map((elem,index)=>{
        var htmlCode = 
        '<td class="border-bottom-0"><h6 class="fw-semibold mb-0">'+(index+1)+'</h6></td>' +
        '<td class="border-bottom-0">' +
            '<p class="mb-0 fw-normal">'+elem.name+'</p>' +
        '</td>' +
        '<td class="border-bottom-0">' +
            '<p class="mb-0 fw-normal">'+elem.email+'</p>' +
        '</td>' +
        '<td class="border-bottom-0">' +
            '<p class="mb-0 fw-normal">'+elem.subject+'</p>' +
        '</td>' +
        '<td class="border-bottom-0">' +
            '<h6 class="fw-semibold mb-0 fs-3">'+elem.phone+'</h6>' +
        '</td>' +
        '<td class="border-bottom-0">' +
            '<p class="mb-0 fw-normal">'+elem.message+'</p>' +
        '</td>' ;
    
        row_elem.innerHTML +=`<tr>${htmlCode}</tr>`;
    })
    
}
addInquiry(tbody);



