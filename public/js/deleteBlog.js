
function deleteBlogs(id, authorID){
    axios.delete(`/api/blogs/${id}`)
    .then(response => {
        console.log("response", response)
        if (response.status === 200) {
            location.replace(`/admin/${authorID}`);
        } else if (response.status === 404) {
            location.replace('/not-found');
        }
        console.log(response)
    })
    .catch(error => {
        console.error('Error deleting blog:', error);
        // Handle error here (e.g., show an error message to the user)
    });
}