let url = document.getElementById("url");
let button = document.getElementById("button");


button.addEventListener("click" , event => {

          event.preventDefault();                              //cancels the event if it is cancelable{Clicking on a "Submit" button  or a "link"}
          console.log("fetching for " + url.value);
          fetchFile(url.value); 
     }
)

                                                               // fetch == search for

function fetchFile(url_value){                                 //fetch is an API that allows us to make http-requsts
                                                               //fetch returns a promise {then , catch} 
     fetch(url_value).then(res => res.blob()).then(blob => {   //fetchfile will get the url-value and will fetch for it , then the search result will be turned into a blob
                                                               //a blob is an object of imutable/raw data
               let tempurl = URL.createObjectURL(blob);        // as if the page got the object we are looking for and assigned a local tempurl to it
               let atag = document.createElement("a");         //here we create a temporary <a> tag to assigne the local tempurl to it
               atag.href = tempurl;                            
               atag.download = url.replace(/^.*[\\\/]/, '');   //defines the name of the url when it downloads
               document.body.appendChild(atag);                //adds the <a> tag to the html body
               atag.click();
               atag.remove();                                  //remove the <a> tag after clicking it
               URL.revokeObjectURL(tempurl);                  //remove the tempurl from the document
               button.innerHTML = "downloading..."
          }               
     ).catch(console.log(Error('unable to download'))).catch(Error('unable to reach the server'))
}