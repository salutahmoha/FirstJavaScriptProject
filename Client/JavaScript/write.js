const writeForm = document.getElementById("writeForm");

writeForm.addEventListener("submit", async function(event){
    event.preventDefault(); //prevent from refreshing or reloading the page

    const title =  document.getElementById("title").value;
    const uploadImage = document.getElementById("uploadImage").file[0]
    const excerpt = document.getElementById("excerpt").value;
    const body = document.getElementById("body").value;

    if(!authorId){
        alert("user not logged in, Please login again")
        window.location.href = "login.html"
        return
    }

    const formData = new formData();
    formData.append("title", title)
    formData.append("uploadImage", uploadImage)
    formData.append("excerpt", excerpt)
    formData.append("body", body)
    formData.append("authorId", authorId)

    try{

        const response = await fetch("http://localhost:5500/write",{
            method: "POST",
            body: formData
        })

        const result = await response.json()

        if(response.ok){
            alert("post created successfully")
            formData.reset();
            window.location.href = "Explore.html"
        }else{
            alert(result.message)
        }

    }catch(error){
        console.error("Error", error)
        alert("An error has occured while creating the post")
    }
})