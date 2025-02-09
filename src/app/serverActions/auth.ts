

// export const LoginAction = async (formData: FormData) => {
//     try {
//         "use server"
//         const rawFormData = {
//             customerId: formData.get('customerId'),
//             amount: formData.get('amount'),
//             status: formData.get('status'),
//         }
//         console.log(formData  ,"rawFormData")
//     } catch (error) { 
//   console.log(error,"error")
//     }
// }


export const getAuthors = async() => {
    try {
        const res = await fetch(`${process.env.NEXT_BACKEND_URL}auth/users`, {
            method: 'GET',
        })
      return await res.json()
    } catch (error) {
        console.log(error,"error")
    }
}